<div align="center">

# 🐝 SmartBee

**One app for your classes, tasks, schedule and attendance — with an AI study buddy.**

[![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing)
![React](https://img.shields.io/badge/React-18-61dafb)
![Expo](https://img.shields.io/badge/Expo-54-000020)
![Postgres](https://img.shields.io/badge/Postgres-Neon-336791)

[Live demo](#) · [Download the app](#) · [API docs](#) · [Report a bug](../../issues)

</div>

<!-- Add screenshots here, e.g. docs/screenshots/home.png, schedule.png, bee-chat.png -->

## Why SmartBee

Student life is scattered across timetables, chat groups, notes and spreadsheets. SmartBee puts it in one open-source place, so you always know what's next.

## Features

- **Modules** — track courses, credits, instructors and schedules
- **Tasks** — deadlines and to-dos linked to your modules
- **Schedule** — weekly timetable and daily view
- **Attendance** — monitor attendance per module
- **Bee AI** — chat assistant that helps break down tasks and plan your day
- **Web + mobile** — React web app and an Expo app

## Tech Stack

| Part | Stack |
| --- | --- |
| `web/` | React 18, Vite, Tailwind, React Router |
| `app/` | React Native, Expo, TypeScript |
| `api/` | Node.js, Express, JWT, Zod, Swagger, Vitest |
| Database | PostgreSQL (Neon) |
| Hosting | Vercel (web), Render (API) |

## Getting Started

**Prerequisites:** Node.js 18+ and a PostgreSQL database (a free [Neon](https://neon.tech) project works).

### 1. API

```bash
cd api
npm ci
cp .env.example .env   # set DATABASE_URL, JWT_SECRET, CORS_ORIGIN, AI_API_KEY
npm run migrate
npm run dev
```

API: `http://localhost:3000` · Docs: `http://localhost:3000/api/docs`

### 2. Web

```bash
cd web
npm ci
npm run dev
```

### 3. Mobile

```bash
cd app
npm ci
npx expo start
```

## Project Structure

```text
SmartBee/
  api/   # Express API, migrations, tests
  app/   # Mobile app (Expo)
  web/   # Web app (React + Vite)
```

## Contributing

Contributions are welcome — bug fixes, docs, features or feedback.

1. Fork the repo and branch from `main`
2. Follow the code style of the module you're changing
3. Add or update tests where applicable (especially in `api`)
4. Keep pull requests focused and explain what changed and why

Not sure where to start? Check the [issues](../../issues) or open one with your idea.

## License

Released under the [MIT License](LICENSE).
