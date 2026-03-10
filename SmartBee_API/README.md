# SmartBee API

Backend API service for SmartBee - providing data management and business logic for web and mobile clients.

## Overview

SmartBee API is a RESTful service that handles all backend operations for the SmartBee platform, including user authentication, module management, attendance tracking, task scheduling, and AI-powered features.

## Status

🚧 **In Development** - API structure and endpoints are being designed and implemented.

## Planned Features

- 🔐 **Authentication** - User registration, login, and session management
- 📚 **Module Management** - CRUD operations for academic modules
- 📊 **Attendance Tracking** - Record and retrieve attendance data
- 📅 **Task Management** - Create, update, and track tasks and assignments
- 🤖 **AI Integration** - Virtual friend chat and smart planning features
- 🔔 **Notifications** - Push notifications for reminders and alerts
- 📈 **Analytics** - Student performance and progress tracking

## Tech Stack (Planned)

- **Runtime**: Node.js
- **Framework**: Express.js or Fastify
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: JWT or Supabase Auth
- **API Documentation**: Swagger/OpenAPI
- **Validation**: Joi or Zod
- **Testing**: Jest or Vitest

## Planned API Endpoints

### Authentication
```
POST   /api/auth/register      # Register new user
POST   /api/auth/login         # User login
POST   /api/auth/logout        # User logout
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
GET    /api/attendance         # Get attendance records
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
GET    /api/planner/daily      # Get daily plan
POST   /api/planner/generate   # Generate AI-powered plan
```

## Getting Started (Future)

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL or Supabase account
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run database migrations
npm run migrate

# Start development server
npm run dev

# Run tests
npm test
```

## Environment Variables (Planned)

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
SUPABASE_URL=https://...
SUPABASE_KEY=your-key
AI_API_KEY=your-ai-key
```

## Project Structure (Planned)

```
SmartBee_API/
├── src/
│   ├── controllers/     # Request handlers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── services/        # Business logic
│   ├── utils/           # Helper functions
│   ├── config/          # Configuration files
│   └── index.js         # Entry point
├── tests/               # Test files
├── .env.example         # Environment template
├── package.json         # Dependencies
└── README.md           # This file
```

## Development Roadmap

- [ ] Set up Express/Fastify server
- [ ] Configure database connection
- [ ] Implement authentication system
- [ ] Create module management endpoints
- [ ] Add attendance tracking
- [ ] Implement task management
- [ ] Integrate AI services
- [ ] Add notification system
- [ ] Write API documentation
- [ ] Add comprehensive tests
- [ ] Set up CI/CD pipeline

## API Documentation

API documentation will be available at `/api/docs` once implemented using Swagger UI.

## Contributing

Contributions are welcome! Please ensure:
- Code follows Node.js best practices
- All endpoints are properly documented
- Tests are included for new features
- Error handling is comprehensive

## License

To be decided.
