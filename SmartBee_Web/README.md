# SmartBee Web

The web application for SmartBee - a comprehensive platform to simplify campus life for students.

## Overview

SmartBee Web provides a responsive, user-friendly interface for managing all aspects of campus life including module tracking, attendance monitoring, daily planning, and AI-powered assistance.

## Features

- 📚 **Module Management** - Add, edit, and track your academic modules with course codes, credits, instructors, and schedules
- 📅 **Daily Dashboard** - Get an overview of your day with classes, assignments, and events
- 📊 **Attendance Tracking** - Monitor your attendance percentage and get alerts
- 🤖 **Virtual Friend** - Chat with an AI assistant that helps break down tasks and keeps you motivated
- ⏰ **Smart Planner** - Plan your day with AI-powered suggestions
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile browsers

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Styling**: Custom CSS with modern design patterns
- **State Management**: React Hooks (useState)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:5173`

## Project Structure

```
SmartBee_Web/
├── public/              # Static assets
│   └── SmartBee.png    # Logo and favicon
├── src/
│   ├── components/     # Reusable components (future)
│   ├── context/        # React context providers (future)
│   ├── lib/            # Utility functions (future)
│   ├── pages/          # Page components
│   │   ├── Home.jsx    # Dashboard/home page
│   │   └── Modules.jsx # Module management page
│   ├── App.jsx         # Main app component with routing
│   ├── App.css         # Global styles
│   ├── main.jsx        # App entry point
│   └── index.css       # Base CSS
├── index.html          # HTML template
├── vite.config.js      # Vite configuration
└── package.json        # Dependencies and scripts
```

## Available Routes

- `/` - Home dashboard with daily overview
- `/modules` - Module management interface

## Development

The application uses Vite for fast development and hot module replacement (HMR). Any changes you make will be reflected immediately in the browser.

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

## Contributing

Contributions are welcome! Please ensure your code follows the existing style and structure.

## License

To be decided.
