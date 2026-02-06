# 🐝 BeeWith API – Backend Service

The BeeWith API is the backend service powering the BeeWith platform. Built with Node.js, Express, and MongoDB, it provides RESTful APIs and real-time communication for the web and mobile applications.

> **The backbone of skill collaboration.**

---

## 🌟 Purpose

The BeeWith API serves as the central backend for:
- User authentication and authorization
- Skill profiles and collaboration management
- Challenge creation and participation
- Team and project management
- Real-time messaging and notifications
- Reputation and gamification systems

---

## 🚀 Core Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control
- Secure password hashing with bcrypt
- Token refresh mechanism

### 👤 User Management
- User registration and profile management
- Skill listings and endorsements
- Reputation tracking
- Achievement badges

### 🏆 Challenge System
- Create and manage challenges (Solo, Team, Community)
- Challenge submissions and evaluations
- Leaderboard generation
- Challenge notifications

### 👥 Team & Collaboration
- Team creation and management
- Role assignments (Developer, Designer, etc.)
- Project workspaces
- Task tracking

### 💬 Real-Time Communication
- One-to-one messaging
- Team chat rooms
- Project discussions
- WebSocket connections via Socket.IO

### 📊 Gamification
- Reputation point calculations
- Badge awarding system
- Leaderboard APIs
- Activity tracking

---

## 🛠 Technology Stack

### Backend Framework
- **Node.js** – JavaScript runtime
- **Express.js** – Web application framework
- **TypeScript** – Type safety (optional)

### Database
- **MongoDB** – NoSQL database
- **Mongoose** – ODM for MongoDB

### Authentication
- **JWT** – JSON Web Tokens
- **bcrypt** – Password hashing

### Real-Time
- **Socket.IO** – WebSocket communication

### Validation & Security
- **express-validator** – Input validation
- **helmet** – Security headers
- **cors** – Cross-origin resource sharing
- **rate-limiter** – API rate limiting

### Development Tools
- **nodemon** – Auto-restart during development
- **dotenv** – Environment variable management
- **morgan** – HTTP request logger

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone and navigate to API directory**
   ```bash
   cd BeeWith_API
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/beewith
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=7d
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Start the production server**
   ```bash
   npm start
   ```

---

## 📁 Project Structure

```
BeeWith_API/
├── src/
│   ├── config/
│   │   ├── database.js      # MongoDB connection
│   │   └── socket.js        # Socket.IO setup
│   ├── controllers/
│   │   ├── auth.js          # Authentication logic
│   │   ├── user.js          # User management
│   │   ├── challenge.js     # Challenge operations
│   │   ├── team.js          # Team management
│   │   └── message.js       # Messaging logic
│   ├── models/
│   │   ├── User.js          # User schema
│   │   ├── Challenge.js     # Challenge schema
│   │   ├── Team.js          # Team schema
│   │   ├── Message.js       # Message schema
│   │   └── Reputation.js    # Reputation schema
│   ├── routes/
│   │   ├── auth.js          # Auth routes
│   │   ├── user.js          # User routes
│   │   ├── challenge.js     # Challenge routes
│   │   ├── team.js          # Team routes
│   │   └── message.js       # Message routes
│   ├── middleware/
│   │   ├── auth.js          # JWT verification
│   │   ├── validation.js    # Input validation
│   │   └── errorHandler.js  # Error handling
│   ├── utils/
│   │   ├── jwt.js           # JWT utilities
│   │   ├── email.js         # Email service
│   │   └── helpers.js       # Helper functions
│   └── server.js            # Entry point
├── .env                     # Environment variables
├── .gitignore
├── package.json
└── README.md
```

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register      # Register new user
POST   /api/auth/login         # User login
POST   /api/auth/refresh       # Refresh token
POST   /api/auth/logout        # User logout
```

### Users
```
GET    /api/users/:id          # Get user profile
PUT    /api/users/:id          # Update user profile
GET    /api/users/:id/skills   # Get user skills
POST   /api/users/:id/skills   # Add skill
```

### Challenges
```
GET    /api/challenges         # List all challenges
POST   /api/challenges         # Create challenge
GET    /api/challenges/:id     # Get challenge details
PUT    /api/challenges/:id     # Update challenge
POST   /api/challenges/:id/join # Join challenge
POST   /api/challenges/:id/submit # Submit solution
```

### Teams
```
GET    /api/teams              # List teams
POST   /api/teams              # Create team
GET    /api/teams/:id          # Get team details
POST   /api/teams/:id/join     # Join team
PUT    /api/teams/:id/members  # Update members
```

### Messages
```
GET    /api/messages/:userId   # Get conversation
POST   /api/messages           # Send message
GET    /api/messages/teams/:teamId # Get team chat
```

---

## 🔄 Development Workflow

1. **Create Models**: Define MongoDB schemas in `models/`
2. **Build Controllers**: Implement business logic in `controllers/`
3. **Define Routes**: Set up API endpoints in `routes/`
4. **Add Middleware**: Create validation and auth middleware
5. **Test APIs**: Use Postman or Thunder Client

---

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

---

## 🚢 Deployment

### Backend Deployment (Render/Railway/Heroku)
1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables
4. Deploy

### Database (MongoDB Atlas)
1. Create cluster on MongoDB Atlas
2. Whitelist IP addresses
3. Update `MONGODB_URI` in environment variables

---

## 🎯 Target Clients

- **BeeWith Web** (React.js)
- **BeeWith Mobile App** (React Native)

---

## 🔮 Future Enhancements

- GraphQL API support
- Microservices architecture
- Redis caching
- Advanced analytics
- AI-based recommendations
- File upload service (AWS S3)

---

## 📂 Project Status

🟡 In Development  
Building a scalable, secure backend for the BeeWith platform.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

---

## 📜 License

This project is licensed under the MIT License.

---

## 🐝 Vision

Powering a collaborative ecosystem where skills, teamwork, and challenges matter more than money.

**Build the foundation. Build together.**
