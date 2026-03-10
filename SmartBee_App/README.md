# SmartBee Mobile App

The mobile application for SmartBee - your intelligent campus companion for iOS and Android.

## Overview

SmartBee Mobile brings campus life management to your fingertips with a native mobile experience. Track modules, manage your schedule, monitor attendance, and get AI-powered assistance wherever you go.

## Features

- 📚 **Module Management** - Full CRUD operations for managing your academic modules
- 🏠 **Home Dashboard** - Quick overview of your day with classes, deadlines, and tasks
- 📊 **Attendance Tracking** - Monitor your attendance and get timely alerts
- 🤖 **Virtual Friend** - AI assistant that helps you stay organized and motivated
- 📅 **Smart Planner** - Plan your day with intelligent suggestions
- 🌟 **Explore** - Discover SmartBee features and capabilities
- 🎨 **Light Theme** - Clean, modern interface optimized for readability
- 📱 **Native Experience** - Smooth animations and native UI components

## Tech Stack

- **Framework**: React Native
- **Platform**: Expo (SDK 52+)
- **Navigation**: Expo Router (file-based routing)
- **Language**: TypeScript
- **UI Components**: Custom themed components
- **Icons**: SF Symbols (iOS) / Material Icons (Android)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Installation

```bash
# Install dependencies
npm install

# Start Expo development server
npx expo start

# Run on iOS simulator
npx expo start --ios

# Run on Android emulator
npx expo start --android

# Run on web
npx expo start --web
```

## Project Structure

```
SmartBee_App/
├── app/
│   ├── (tabs)/              # Tab-based navigation
│   │   ├── index.tsx        # Home screen
│   │   ├── modules.tsx      # Modules management
│   │   ├── explore.tsx      # Explore features
│   │   └── _layout.tsx      # Tab layout configuration
│   ├── modal.tsx            # Modal screen
│   └── _layout.tsx          # Root layout
├── assets/
│   └── images/
│       └── SmartBee.png     # App logo
├── components/              # Reusable components
│   ├── themed-text.tsx      # Themed text component
│   ├── themed-view.tsx      # Themed view component
│   └── ui/                  # UI components
├── constants/
│   └── theme.ts             # Theme colors and fonts
├── hooks/                   # Custom React hooks
│   └── use-color-scheme.ts  # Color scheme hook
├── app.json                 # Expo configuration
├── package.json             # Dependencies
└── tsconfig.json            # TypeScript configuration
```

## Screens

### Home
- Daily overview with greeting
- Quick planner for tasks
- Class schedule and deadlines
- Attendance summary
- Virtual friend chat interface
- Upcoming tasks list

### Modules
- List of all enrolled modules
- Add new modules with form
- Edit existing modules
- Delete modules with confirmation
- Module details: code, name, credits, semester, instructor

### Explore
- App features showcase
- Statistics and metrics
- About SmartBee
- Feature descriptions with icons

## Configuration

### App Settings (app.json)
- App name: SmartBee
- Icon: SmartBee.png
- Splash screen: SmartBee logo with yellow background
- Theme: Light mode only
- Orientation: Portrait

### Theme Colors
- Primary (Tint): #FECC0B (SmartBee Yellow)
- Text: #11181C
- Background: #FFFFFF
- Icons: #687076

## Building for Production

### iOS
```bash
npx expo build:ios
```

### Android
```bash
npx expo build:android
```

### EAS Build (Recommended)
```bash
# Install EAS CLI
npm install -g eas-cli

# Configure EAS
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

## Development Tips

- Use `npx expo start` and press `r` to reload the app
- Press `m` to toggle menu
- Press `j` to open debugger
- Shake device to open developer menu on physical devices

## Contributing

Contributions are welcome! Please ensure your code:
- Follows TypeScript best practices
- Uses the existing theme system
- Maintains consistent styling
- Includes proper error handling

## License

To be decided.
