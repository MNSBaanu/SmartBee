# 🐝 BeeWith - Connect & Collaborate

A community-focused platform that helps people connect, collaborate, and create together. BeeWith brings like-minded individuals together through interest-based groups, local events, and meaningful conversations.

## 🌟 Project Overview

BeeWith is designed to foster genuine connections in our increasingly digital world. Whether you're looking to join a hiking group, find study partners, or connect with fellow creatives, BeeWith makes it easy to discover your tribe and build lasting relationships.

## 📱 Applications

### Mobile App (React Native + Expo)
Located in `BeeWith_App/` - A cross-platform mobile application with:

- **🏠 Home Dashboard**: Quick access to activities and community updates
- **🔍 Explore Communities**: Discover groups by interests and categories  
- **👥 Group Management**: Join and manage your community groups
- **💬 Messaging**: Connect with individuals and group chats
- **👤 Profile**: Customize your profile and showcase interests

### Web Application (Coming Soon)
Future web platform to complement the mobile experience.

## 🎨 Design System

**Brand Colors:**
- **Primary**: #FFB800 (BeeWith Yellow) 🟡
- **Background**: #FFFFFF (Clean White) ⚪
- **Text**: #000000 (Sharp Black) ⚫
- **Accents**: Various shades of yellow for highlights and interactions

**Design Philosophy:**
- Clean, minimalist interface with excellent readability
- Bee-themed branding with warm, welcoming aesthetics
- Consistent yellow accents for interactive elements
- Professional appearance suitable for all age groups

## 🚀 Getting Started

### Mobile App Development

1. **Navigate to the app directory**
   ```bash
   cd BeeWith_App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npx expo start
   ```

4. **Run on your device**
   - Scan QR code with Expo Go app
   - Press `a` for Android emulator
   - Press `i` for iOS simulator  
   - Press `w` for web browser

## 🛠 Tech Stack

### Mobile App
- **Framework**: React Native with Expo SDK 54
- **Navigation**: Expo Router (file-based routing)
- **Language**: TypeScript for type safety
- **UI Components**: Custom themed components
- **Icons**: SF Symbols via expo-symbols
- **Animations**: React Native Reanimated
- **State Management**: React hooks and context

### Planned Web App
- **Framework**: Next.js or React
- **Styling**: Tailwind CSS or styled-components
- **Backend**: Node.js with Express/Fastify
- **Database**: PostgreSQL or MongoDB
- **Authentication**: Auth0 or Firebase Auth

## 📁 Project Structure

```
BeeWith/
├── BeeWith_App/           # React Native mobile app
│   ├── app/               # Expo Router screens
│   │   ├── (tabs)/        # Tab navigation screens
│   │   │   ├── index.tsx  # Home screen
│   │   │   ├── explore.tsx # Community discovery
│   │   │   ├── groups.tsx  # Group management
│   │   │   ├── messages.tsx # Chat interface
│   │   │   └── profile.tsx # User profile
│   │   └── _layout.tsx    # Root layout
│   ├── components/        # Reusable UI components
│   ├── constants/         # Theme and configuration
│   ├── hooks/            # Custom React hooks
│   └── assets/           # Images and static files
├── BeeWith_Web/          # Future web application
└── README.md             # This file
```

## 🎯 Features Roadmap

### ✅ Completed (v1.0)
- [x] Mobile app foundation with Expo
- [x] 5-tab navigation (Home, Explore, Groups, Messages, Profile)
- [x] BeeWith branding and design system
- [x] White background with yellow accents theme
- [x] Mock data and UI components

### 🚧 In Progress (v1.1)
- [ ] User authentication and registration
- [ ] Real-time messaging functionality
- [ ] Group creation and management
- [ ] Event scheduling and RSVP
- [ ] Push notifications

### 🔮 Future (v2.0+)
- [ ] Web application launch
- [ ] Advanced matching algorithms
- [ ] Video calling integration
- [ ] Location-based discovery
- [ ] Premium features and monetization
- [ ] Admin dashboard and analytics

## 🤝 Contributing

We welcome contributions to make BeeWith even better! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes** following our coding standards
4. **Test thoroughly** on multiple devices/platforms
5. **Commit your changes** (`git commit -m 'Add amazing feature'`)
6. **Push to the branch** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request** with a clear description

### Development Guidelines
- Follow TypeScript best practices
- Use the established design system colors and components
- Write clear, descriptive commit messages
- Test on both iOS and Android when possible
- Maintain consistent code formatting

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact & Support

- **Project Lead**: [Your Name]
- **Email**: [your.email@example.com]
- **Issues**: [GitHub Issues](https://github.com/yourusername/beewith/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/beewith/discussions)

---

**Built with 💛 by the BeeWith community**

*Connecting people, one conversation at a time* 🐝