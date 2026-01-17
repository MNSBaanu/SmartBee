# 🐝 BeeWith - Connect & Collaborate

BeeWith is a community-focused mobile app that helps people connect, collaborate, and create together. Built with React Native and Expo, it provides a platform for discovering like-minded individuals, joining interest-based groups, and participating in local events.

## ✨ Features

- **🏠 Home Dashboard**: Quick access to activities and community updates
- **🔍 Explore Communities**: Discover groups by interests and categories
- **👥 Group Management**: Join and manage your community groups
- **💬 Messaging**: Connect with individuals and group chats
- **👤 Profile**: Customize your profile and showcase interests

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   cd BeeWith_App
   npm install
   ```

2. **Start the development server**
   ```bash
   npx expo start
   ```

3. **Run on your device**
   - Scan QR code with Expo Go app
   - Press `a` for Android emulator
   - Press `i` for iOS simulator
   - Press `w` for web browser

## 🛠 Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router with file-based routing
- **UI**: Custom themed components with light/dark mode
- **Icons**: SF Symbols via expo-symbols
- **Animations**: React Native Reanimated
- **TypeScript**: Full type safety

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

## 🎨 Design System

- **Primary Color**: #FFB800 (Bee Yellow)
- **Typography**: System fonts with custom themed text
- **Components**: Reusable themed components for consistency
- **Icons**: SF Symbols for native feel

## 🔄 Development Workflow

1. **Feature Development**: Create new screens in `app/` directory
2. **Components**: Add reusable components to `components/`
3. **Styling**: Use themed components for consistent design
4. **Navigation**: Leverage file-based routing for new screens

## 🤝 Contributing

This is a community-focused project. Feel free to contribute by:
- Adding new features
- Improving UI/UX
- Fixing bugs
- Enhancing documentation

## 📄 License

This project is open source and available under the MIT License.
