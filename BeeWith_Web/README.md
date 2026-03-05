# BeeWith Web

Frontend for BeeWith's developer-support platform.

This app is focused on a simple and professional MVP where developers can submit repositories and view AI-assisted engineering feedback.

## MVP Goals

The web app should support:
1. Repository submission flow (URL or connected provider later)
2. Analysis status tracking (queued, running, completed)
3. Findings dashboard grouped by category
4. Clear severity labels and file-path references

## Planned Feedback Categories

- `Bugs`
- `Code Smells`
- `Duplicate Code`
- `Hardcoded Values`
- `Improvement Suggestions`

## Tech Stack

- React 18
- React Router 6
- Vite 5

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Run Locally

```bash
cd BeeWith_Web
npm install
npm run dev
```

The app runs on Vite's default local server.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Suggested Environment Variables

Create `BeeWith_Web/.env` when API integration starts:

```env
VITE_API_BASE_URL=http://localhost:5000
```

## Folder Overview

```text
BeeWith_Web/
  src/
    components/
    pages/
    services/
    store/
```

## Current Status

Product pivot in progress from collaboration platform to developer-support AI.

Current focus:
1. Define clean information architecture for analysis reports
2. Implement submission and report list screens
3. Connect with backend analysis endpoints

## Contributing

Contributions are welcome.
Please open an issue for bugs, feature proposals, or UX improvements.
