# SmartBee API

Backend API service for SmartBee - providing data management and business logic for web and mobile clients.

## Overview

SmartBee API is a RESTful service that handles backend operations for the SmartBee platform, including user authentication, module management, attendance tracking, task scheduling, and AI-powered features.

## Status

✅ **Initial implementation** — Express server, JWT auth, CRUD endpoints, Swagger docs, and Vitest tests. Uses an in-memory store by default; configure Supabase for persistent storage.

## Features

- 🔐 **Authentication** — Register, login, logout, and current user (`/api/auth`)
- 📚 **Module Management** — CRUD for academic modules (`/api/modules`)
- 📊 **Attendance Tracking** — Record, list, and statistics (`/api/attendance`)
- 📅 **Task Management** — CRUD for tasks and assignments (`/api/tasks`)
- 🤖 **AI Integration** — Virtual friend chat (`/api/chat`); planner generation (`/api/planner`)
- 🔔 **Notifications** — Planned
- 📈 **Analytics** — Attendance stats available; broader analytics planned

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: In-memory (dev) / PostgreSQL via Supabase (production)
- **Authentication**: JWT
- **API Documentation**: Swagger UI at `/api/docs`
- **Validation**: Zod
- **Testing**: Vitest + Supertest

## API Endpoints

### Authentication
```
POST   /api/auth/register      # Register new user
POST   /api/auth/login         # User login
POST   /api/auth/logout        # User logout (Bearer token)
GET    /api/auth/me            # Get current user
```

### Modules
```
GET    /api/modules            # Get all modules
GET    /api/modules/:id        # Get module by ID
POST   /api/modules            # Create new module
PUT    /api/modules/:id        # Update module
DELETE /api/modules/:id        # Delete module
```

### Attendance
```
GET    /api/attendance         # Get attendance records (?moduleId, ?from, ?to)
POST   /api/attendance         # Record attendance
GET    /api/attendance/stats   # Get attendance statistics
```

### Tasks
```
GET    /api/tasks              # Get all tasks
GET    /api/tasks/:id          # Get task by ID
POST   /api/tasks              # Create new task
PUT    /api/tasks/:id          # Update task
DELETE /api/tasks/:id          # Delete task
```

### Virtual Friend
```
POST   /api/chat               # Send message to AI assistant
GET    /api/chat/history       # Get chat history
```

### Planner
```
GET    /api/planner/daily      # Get daily plan (?date=YYYY-MM-DD)
POST   /api/planner/generate   # Generate AI-powered plan
```

### Health
```
GET    /api/health             # Service health check
```

Protected routes require header: `Authorization: Bearer <token>`

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation
```bash
cd SmartBee_API

npm install

cp .env.example .env

npm run migrate

npm run dev
```

API: `http://localhost:3000`  
Docs: `http://localhost:3000/api/docs`

```bash
npm test
```

## Environment Variables

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
SUPABASE_URL=https://...
SUPABASE_KEY=your-key
AI_API_KEY=your-ai-key
```

## Project Structure

```
SmartBee_API/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── validators/
│   ├── config/
│   └── index.js
├── scripts/
│   └── migrate.js
├── tests/
├── .env.example
├── package.json
└── README.md
```

## Development Roadmap

- [x] Set up Express server
- [x] Configure database connection (Supabase client + in-memory fallback)
- [x] Implement authentication system
- [x] Create module management endpoints
- [x] Add attendance tracking
- [x] Implement task management
- [x] Integrate AI services (stub; wire real provider with `AI_API_KEY`)
- [ ] Add notification system
- [x] Write API documentation (Swagger)
- [x] Add comprehensive tests (initial suite)
- [ ] Set up CI/CD pipeline
- [ ] Persist all entities in Supabase/PostgreSQL

## API Documentation

Interactive docs: **http://localhost:3000/api/docs**  
OpenAPI JSON: **http://localhost:3000/api/docs.json**

## Contributing

Contributions are welcome! Please ensure:
- Code follows Node.js best practices
- All endpoints are properly documented
- Tests are included for new features
- Error handling is comprehensive

## License

To be decided.
