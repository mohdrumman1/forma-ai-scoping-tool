# Forma AI — Client Scoping Tool

A lightweight web app for Forma AI that turns a short client intake form into a structured project scope document. A client fills in their business name, industry, problem, budget, and timeline — then the app calls the Anthropic Claude API and returns a clean, professional scope broken down into phases, risks, investment range, and a recommended next step. Built to make the sales and discovery process faster and more consistent.

---

## How to use

1. Open the app and enter your Anthropic API key when prompted. Your key is stored in the browser session only — it is never logged or sent anywhere except Anthropic's API.
2. Fill in the client intake brief: business name, industry, the problem they want to solve, budget range, and timeline.
3. Click **Generate Scope**. The app calls the Claude API and renders a full project scope document on the right.
4. Use **Copy to clipboard** to grab the plain-text scope, or **Print / Save as PDF** to export a clean printable version.

---

## Run locally

No install needed.

1. Download or clone this repo.
2. Open `index.html` in any modern browser.
3. That's it.

---

## Deploy to GitHub Pages

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set source to **Deploy from a branch**.
4. Set branch to `main` and folder to `/ (root)`.
5. Click **Save**.

Alternatively, the included GitHub Actions workflow (`.github/workflows/deploy.yml`) deploys automatically on every push to `main` using the Pages API — no manual setup needed beyond enabling Pages in your repo settings.

---

## Tech

- Vanilla HTML, CSS, and JavaScript — no frameworks, no bundler, no npm
- [Anthropic Claude API](https://www.anthropic.com/) — model: `claude-sonnet-4-20250514`

---

Built by **Rumman Chowdhury** — Technical Project Manager & Founder of Forma AI
