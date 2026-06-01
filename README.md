# SmartBee

SmartBee is an **open source** platform designed to simplify campus life for students. It helps manage academic tasks, track modules, monitor attendance, and provides AI-powered assistance to make student life easier and more organized.

**Contributions are welcome** — whether you fix bugs, improve docs, add features, or share feedback.

## Overview

SmartBee brings together essential campus management tools in one place, helping students stay on top of academic responsibilities, deadlines, and daily schedules with intelligent planning and reminders.

## Repository Structure

```text
SmartBee/
  SmartBee_API/   # Backend API service
  SmartBee_App/   # Mobile app (React Native + Expo)
  SmartBee_Web/   # Web application (React + Vite)
  supabase/       # Database migrations and schema
  README.md
```

## Modules

### SmartBee_Web
Frontend web application providing a responsive interface for campus management.

- Framework: React 18
- Build Tool: Vite
- Features: Module management, daily planner, attendance tracking, virtual assistant
- Location: `SmartBee_Web/`

### SmartBee_App
Cross-platform mobile application for iOS and Android with native mobile experience.

### SmartBee_API
Backend API service providing data management and business logic.

### Supabase
Database layer with PostgreSQL for data persistence and real-time features.

## Key Features

-  **Module Management** — Track courses, credits, instructors, and schedules
-  **Smart Planner** — AI-powered daily planning and task organization
-  **Attendance Tracking** — Monitor class attendance and get alerts
-  **Virtual Friend** — AI assistant for breaking down tasks and motivation
-  **Smart Reminders** — Never miss deadlines or important events
-  **Cross-Platform** — Access from web or mobile devices

## Tech Stack

- **Frontend Web**: React 18, Vite, React Router
- **Mobile**: React Native, Expo, Expo Router
- **Backend**: Node.js, Express, JWT, Zod
- **Database**: Supabase (PostgreSQL)
- **Styling**: Custom CSS with responsive design

## Getting Started

### Web Application
```bash
cd SmartBee_Web
npm install
npm run dev
```

### Mobile Application
```bash
cd SmartBee_App
npm install
npx expo start
```

### Backend API
```bash
cd SmartBee_API
npm install
cp .env.example .env
npm run dev
```

API: `http://localhost:3000` · Docs: `http://localhost:3000/api/docs`

See each module’s README for more detail.

## Contributing

SmartBee is open source and **contributions are welcome** from everyone.

**Before you contribute**

1. Fork the repository and create a branch from `main`
2. Follow existing code style and patterns in the module you’re changing
3. Add or update tests where applicable (especially for `SmartBee_API`)
4. Keep pull requests focused and describe what changed and why

Questions or ideas? Open an issue — we’re happy to help you get started.

## License

Open source. A formal license file will be added to the repository; until then, treat the project as openly available for community contribution and learning.
