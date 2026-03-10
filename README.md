# SmartBee

SmartBee is a comprehensive platform designed to simplify campus life for students. It helps manage academic tasks, track modules, monitor attendance, and provides AI-powered assistance to make student life easier and more organized.

## Overview

SmartBee brings together all essential campus management tools in one place, helping students stay on top of their academic responsibilities, deadlines, and daily schedules with intelligent planning and reminders.

## Current Status

- ✅ Web application (React + Vite)
- ✅ Mobile application (React Native + Expo)
- ✅ Module management system
- ✅ AI-powered virtual assistant
- 🚧 Backend API (in development)
- 🚧 Database integration (Supabase)

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

- Framework: React Native + Expo
- Navigation: Expo Router
- Features: Module CRUD, dashboard, explore features
- Location: `SmartBee_App/`

### SmartBee_API
Backend API service providing data management and business logic.

- Runtime: Node.js
- Purpose: RESTful API for web and mobile clients
- Location: `SmartBee_API/`

### Supabase
Database layer with PostgreSQL for data persistence and real-time features.

- Database: PostgreSQL
- Features: Authentication, real-time subscriptions, storage
- Location: `supabase/migrations/`

## Key Features

- 📚 **Module Management** - Track courses, credits, instructors, and schedules
- 📅 **Smart Planner** - AI-powered daily planning and task organization
- 📊 **Attendance Tracking** - Monitor class attendance and get alerts
- 🤖 **Virtual Friend** - AI assistant for breaking down tasks and motivation
- ⏰ **Smart Reminders** - Never miss deadlines or important events
- 📱 **Cross-Platform** - Access from web or mobile devices

## Tech Stack

- **Frontend Web**: React 18, Vite, React Router
- **Mobile**: React Native, Expo, Expo Router
- **Backend**: Node.js (planned)
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

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests to help improve SmartBee.

## License

To be decided.
