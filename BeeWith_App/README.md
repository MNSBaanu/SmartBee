# 🐝 BeeWith – Challenge-Driven Skill Collaboration Mobile App

BeeWith is a free, challenge-driven collaboration platform that helps people connect through skills, teamwork, and real-world projects. Inspired by the collaborative nature of a beehive, BeeWith focuses on **learning by doing**, **working together**, and **growing without financial barriers**.

> **Be Together. Build Together.**

---

## 🌟 Purpose of the Mobile App

The BeeWith mobile app provides on-the-go access to the platform where users can:
- Discover and showcase skills
- Participate in individual and team challenges
- Collaborate on projects
- Build reputation through contribution rather than payments
- Stay connected with real-time notifications and messaging

The platform is designed to be **free-first**, especially for students, beginners, and early-career professionals.

---

## 🚀 Core Features

### 🧠 Skill Collaboration
- User profiles with skill listings
- Skill offer and skill request posts
- Peer-to-peer collaboration

### 🏆 Challenges (Main Feature)
- **Solo Challenges** – Improve individual skills  
- **Team Challenges** – Build real projects together  
- **Community Challenges** – Open participation with leaderboards  

Example challenges:
- 48-Hour UI Design Challenge  
- Build a Web App in 5 Days  
- Bug-Fix Sprint  

### 👥 Team & Project Builder
- Create or join teams
- Role-based collaboration (Developer, Designer, etc.)
- Project workspaces with task tracking

### 🎖 Reputation & Gamification
- Contribution-based reputation points
- Achievement badges
- Public leaderboards

### 💬 Communication
- One-to-one chat
- Team chat rooms
- Project-based discussions

---

## 🌐 Platform Scope

- **Website:** Full dashboard for challenges, teams, and projects  
- **Mobile App:** Notifications, chat, and quick actions  

---

## 🛠 Technology Stack

### Mobile Framework
- React Native with Expo
- Expo Router with file-based routing
- TypeScript for full type safety

### UI & Design
- Custom themed components with light/dark mode
- SF Symbols via expo-symbols
- React Native Reanimated for animations
- Primary Color: #FFB800 (Bee Yellow)

### Backend Integration (BeeWith API)
- **Node.js + Express** backend
- REST APIs via Axios
- Real-time features via Socket.IO
- JWT Authentication
- MongoDB database

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Expo CLI
- BeeWith API running locally or deployed

### Installation

1. **Navigate to app directory**
   ```bash
   cd BeeWith_App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file:
   ```env
   EXPO_PUBLIC_API_URL=http://localhost:5000/api
   EXPO_PUBLIC_SOCKET_URL=http://localhost:5000
   ```

4. **Start the development server**
   ```bash
   npx expo start
   ```

5. **Run on your device**
   - Scan QR code with Expo Go app
   - Press `a` for Android emulator
   - Press `i` for iOS simulator
   - Press `w` for web browser

---

## 📱 App Structure

```
app/
├── (tabs)/
│   ├── index.tsx      # Home screen
│   ├── explore.tsx    # Community discovery
│   ├── groups.tsx     # Group management
│   ├── messages.tsx   # Chat interface
│   ├── profile.tsx    # User profile
│   └── _layout.tsx    # Tab navigation
├── modal.tsx          # Modal screens
└── _layout.tsx        # Root layout
```

---

## 🔄 Development Workflow

1. **Feature Development**: Create new screens in `app/` directory
2. **Components**: Add reusable components to `components/`
3. **Styling**: Use themed components for consistent design
4. **Navigation**: Leverage file-based routing for new screens

---

## 🎯 Target Users

- University students
- Self-learners and beginners
- Developers, designers, writers
- Community learning groups

---

## 🔮 Future Enhancements

- AI-based skill matching
- Smart team recommendations
- Auto-generated portfolios
- Push notifications for challenges
- Offline mode support

---

## 📂 Project Status

🟡 In Development  
Initial focus is on building a scalable, free-first mobile experience.

---

## 🤝 Contributing

Contributions, feedback, and suggestions are welcome.
Feel free to fork the repository or open an issue.

---

## 📜 License

This project is licensed under the MIT License.

---

## 🐝 Vision

BeeWith aims to create a collaborative ecosystem where skills, teamwork, and challenges matter more than money.

**Build skills. Build teams. Build together.**
