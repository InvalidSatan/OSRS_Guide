from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import uuid

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///osrs.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    token = db.Column(db.String(36), unique=True)


class Progress(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    skill = db.Column(db.String(20))
    level = db.Column(db.Integer)


def get_user_from_token(token: str):
    if not token:
        return None
    return User.query.filter_by(token=token).first()


@app.post("/register")
def register():
    data = request.json or {}
    if not data.get("username") or not data.get("password"):
        return jsonify({"error": "invalid data"}), 400
    if User.query.filter_by(username=data["username"]).first():
        return jsonify({"error": "exists"}), 400
    user = User(
        username=data["username"],
        password_hash=generate_password_hash(data["password"]),
        token=str(uuid.uuid4()),
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({"token": user.token})


@app.post("/login")
def login():
    data = request.json or {}
    user = User.query.filter_by(username=data.get("username")).first()
    if not user or not check_password_hash(
        user.password_hash, data.get("password", "")
    ):
        return jsonify({"error": "invalid"}), 401
    if not user.token:
        user.token = str(uuid.uuid4())
        db.session.commit()
    return jsonify({"token": user.token})


@app.get("/progress")
def get_progress():
    user = get_user_from_token(request.headers.get("Authorization"))
    if not user:
        return jsonify({"error": "unauthorized"}), 401
    result = {p.skill: p.level for p in Progress.query.filter_by(user_id=user.id)}
    return jsonify(result)


@app.post("/progress")
def save_progress():
    user = get_user_from_token(request.headers.get("Authorization"))
    if not user:
        return jsonify({"error": "unauthorized"}), 401
    data = request.json or {}
    for skill, level in data.items():
        row = Progress.query.filter_by(user_id=user.id, skill=skill).first()
        if row:
            row.level = level
        else:
            db.session.add(Progress(user_id=user.id, skill=skill, level=level))
    db.session.commit()
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    db.create_all()
    app.run(debug=True)
