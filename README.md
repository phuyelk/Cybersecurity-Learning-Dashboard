# CyberLearn Interactive Dashboard

A polished, interactive cybersecurity learning web app designed for portfolio showcase use (GitHub / LinkedIn).

## Project Highlights

- **Modern cybersecurity UI**: dark theme, neon accents, responsive layout, hover effects, and smooth transitions.
- **Focused experience**: streamlined to core learning modules only:
  - Dashboard
  - Threat Library
  - Quiz Lab
- **Expanded Threat Library**:
  - 12+ detailed threat topics
  - category filters + keyword search
  - interactive expandable cards
  - real-world examples and prevention strategies
- **Expanded Interactive Quiz Lab**:
  - 35+ questions across:
    - phishing
    - malware
    - ransomware
    - password security
    - social engineering
    - network security
    - data privacy
    - safe browsing
    - authentication practices
  - randomized question order + shuffled answer options
  - progress indicator
  - instant feedback with explanations
  - final score summary with topic-level breakdown and targeted study recommendations
- **Persistent learning metrics**:
  - threats explored
  - quizzes completed
  - best score
  - topic mastery trends (stored in browser localStorage)

## Removed Scope

To keep the experience focused and streamlined, there are **no Cyber Statistics** or **Live Vulnerabilities** pages, links, or routes in this project.

## Tech Stack

- HTML
- CSS
- Vanilla JavaScript

## Run Locally

Because this is a static frontend project, you can run it by opening `index.html` directly, or serve it locally:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.
