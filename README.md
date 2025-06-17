# OSRS Guide

A comprehensive resource for leveling and end-game preparation in **Old School RuneScape (OSRS)**. This repository hosts the original "OSRS Max Level and End-Game Preparation Guide" PDF and a static website that highlights the material in web form. The site includes calculators, persistent checklists, a mobile-friendly navigation menu, and a light/dark theme toggle. It also serves as the base for future improvements such as more advanced interactive tools and detailed training breakdowns.

## Contents

- [Overview](#overview)
- [Repository Layout](#repository-layout)
- [Quick Start](#quick-start)
- [Development Workflow](#development-workflow)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project began as a concise PDF with step-by-step instructions for maxing an OSRS account. It covers AFK-friendly training methods, essential quest recommendations, and tips for gearing up for end-game boss content. The repository now includes a small static website in the [`site/`](site/) directory to showcase the guide online. The long-term goal is to transform this into a polished and professional reference hub.

## Repository Layout

```
.
├── LICENSE                          # MIT license for the project
├── README.md                        # This document
├── requirements.txt                 # Python dependencies for optional tools
├── scripts/                         # Helper scripts
│   └── validate_html.sh             # HTML linting helper
├── OSRS Max Level and End-Game Preparation Guide.pdf
└── site/
    ├── index.html                   # Landing page with a summary of the guide
    ├── styles.css                   # Basic styling for the site
    └── script.js                    # Minimal JavaScript for smooth scrolling
```

### OSRS Max Level and End-Game Preparation Guide.pdf
The PDF is the original source material. It contains thorough training plans, quest order suggestions, and explanations for efficient leveling. You can open it directly or view it through the website.

### `site/`
The `site` directory is a static HTML/CSS/JS implementation. Opening `index.html` in a browser will display an abbreviated version of the guide. Styling is minimal at the moment, but the structure allows for future expansion into a fully featured website.

## Quick Start

The project requires only minimal tooling. To view the website locally, simply open `site/index.html` in your browser. You can optionally run a lightweight HTTP server:

```bash
pip install -r requirements.txt  # optional, enables helper scripts
```

This installs development dependencies such as HTML validators.

You can then start a basic server:

```bash
# From the repository root
cd site
python3 -m http.server 8000
```

Then navigate to <http://localhost:8000> in your web browser.

If you would like to validate the HTML, install `tidy` and run the helper script:

```bash
sudo apt-get install tidy  # once per environment
./scripts/validate_html.sh
```

The PDF can be viewed directly using any PDF reader or in most browsers.

## Development Workflow

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd OSRS_Guide
   ```
   Install Python dependencies if you plan to use the helper scripts:
   ```bash
   pip install -r requirements.txt
   ```
2. **Create a new branch for your changes**
   ```bash
   git checkout -b my-feature
   ```
3. **Implement your changes**
   - Update the PDF or website files under `site/` as needed.
   - Keep commits focused and descriptive.
4. **Test locally**
   - Open `site/index.html` to verify layout and content.
   - Run `./scripts/validate_html.sh` to ensure the HTML passes linting.
5. **Commit and push**
   ```bash
   git add .
   git commit -m "Add my feature"
   git push origin my-feature
   ```
6. **Open a pull request**
   - Describe your changes thoroughly and request review.

This workflow keeps the codebase organized as the project evolves.

## Deployment

The website can be deployed using any static site host (e.g., GitHub Pages, Netlify). The basic approach for GitHub Pages is:

1. Enable GitHub Pages on the repository (Settings → Pages).
2. Choose the `site/` directory or a dedicated branch as the publishing source.
3. Commit and push your changes. GitHub will automatically build and publish the site.

Future iterations might introduce a build step or tooling (such as a static site generator). At that point the deployment section will be updated accordingly.

## Roadmap

- **Polished Website** – Expand `site/` with a consistent design language, responsive layout, and more detailed content extracted from the PDF.
- **Interactive Tools** – The site now includes calculators, checklists, a light/dark theme toggle, and responsive navigation. Future updates will expand these tools further.
- **Testing Setup** – Integrate automated linting or HTML validation for quality assurance.
- **User Accounts & Progress Tracking** – Implement authentication and cloud storage so players can save skill levels, quest completion, and gear setups across devices.
- **Live Data Integration** – Sync calculators with OSRS APIs for real-time item prices, experience tables, and high-score statistics.
- **Dynamic Training Planner** – Provide an interactive interface that schedules skill goals and quest order based on user preferences.
- **Community Features** – Introduce comment sections or discussion boards so players can share tips and feedback.
- **Contribution Guide** – Provide guidelines and templates for external contributions in [CONTRIBUTING.md](CONTRIBUTING.md).

## Contributing

Contributions are welcome! Refer to [CONTRIBUTING.md](CONTRIBUTING.md) for full guidelines. In short, follow these general steps:

1. Fork the repository and create a feature branch.
2. Make your changes following the [Development Workflow](#development-workflow).
3. Open a pull request describing your changes in detail.

For significant features or ideas, feel free to open an issue first to discuss the direction.

## License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute the code and the PDF under the terms of that license.

