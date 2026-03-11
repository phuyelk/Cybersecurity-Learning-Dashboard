# CyberLearn Interactive Dashboard (Flask)

A polished cybersecurity learning dashboard built with Flask, including interactive threat education,
quiz practice, password analysis, and phishing detection tools.

## Features

- **Dashboard + Learning Modules**
  - Dashboard overview
  - Threat Library (interactive cards, filters, search, expandable details)
  - Quiz Lab (randomized questions, progress tracking, instant feedback, score summary)

- **New Interactive Security Tools**
  - **Password Analyzer** (`/password-analyzer`)
    - password strength meter
    - entropy estimate
    - estimated crack time
    - actionable security recommendations
  - **Phishing Detector** (`/phishing-detector`)
    - phishing risk score (0–100)
    - risk level (Low, Moderate, High, Critical)
    - detected phishing indicators
    - practical response recommendations

- **Design**
  - dark cybersecurity dashboard theme
  - neon accent color system
  - modern cards, smooth transitions, hover interactions
  - responsive layout

## Project Structure

```text
app.py
templates/
  base.html
  index.html
  password_tool.html
  phishing_tool.html
static/
  css/styles.css
  js/dashboard.js
  js/password_tool.js
```

## Run Locally

1. Install dependencies:

```bash
pip install -r requirements.txt
```

2. Start the Flask app:

```bash
python app.py
```

3. Open:

`http://127.0.0.1:5000`
