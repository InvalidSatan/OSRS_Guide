# Contributing to OSRS Guide

Thank you for considering a contribution! This project aims to provide helpful resources for Old School RuneScape players. Whether you want to improve the PDF, tweak the website, or add new tools, your help is appreciated.

## Getting Started

1. [Fork](https://github.com/yourname/OSRS_Guide/fork) the repository on GitHub and clone your fork.
2. Create a new branch for your changes:
   ```bash
   git checkout -b my-feature
   ```
3. Make your edits. If you update the website, you can test locally by serving the `site/` directory:
   ```bash
   cd site
   python3 -m http.server 8000
   ```
   Then visit <http://localhost:8000> in your browser.

## Commit Guidelines

- Keep commits focused on a single change. Write clear commit messages, e.g.:
  ```
  Add detailed agility training section
  ```
- Use descriptive branch names (e.g., `add-agility-guide`).
- Format markdown files using standard GitHub Markdown conventions.

## Pull Requests

1. Push your branch to your fork:
   ```bash
   git push origin my-feature
   ```
2. Open a pull request against the main repository. Provide a summary of your changes and reference any related issues.
3. Make sure your branch is up to date with `main` and resolve merge conflicts if necessary.
4. Be open to feedback and revisions from reviewers.

## Reporting Issues

If you encounter a bug or have a feature request, open an issue on GitHub. Search existing issues first to avoid duplicates and provide as much detail as possible.

## Code of Conduct

Please be respectful and constructive in all interactions. This project follows the [Contributor Covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct/) as its code of conduct.

---

We appreciate every suggestion and pull request. Thanks for helping improve the OSRS Guide!
