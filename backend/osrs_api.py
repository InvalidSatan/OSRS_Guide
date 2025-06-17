import requests

API_BASE = "https://prices.runescape.wiki/api/v1/osrs"


def get_item_price(item_id: int) -> dict:
    url = f"{API_BASE}/latest?id={item_id}"
    response = requests.get(url, timeout=10)
    response.raise_for_status()
    data = response.json()
    return data.get("data", {}).get(str(item_id), {})
