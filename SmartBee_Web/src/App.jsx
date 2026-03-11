import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Modules from './pages/Modules'

function Navigation() {
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/modules', label: 'Modules' },
    { path: '/schedule', label: 'Schedule' },
    { path: '/tasks', label: 'Tasks' },
    { path: '/more', label: 'More' },
  ]
  
  return (
    <>
      <header className="topbar air-frame">
        <div className="brand-wrap">
          <img src="/SmartBee.png" alt="SmartBee Logo" className="brand-logo" />
          <h1>SmartBee</h1>
        </div>
        <nav className="top-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <button 
                type="button" 
                className={`nav-chip ${location.pathname === item.path ? 'nav-chip-active' : ''}`}
              >
                {item.label}
              </button>
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <button type="button" className="bee-ai-btn">
            <img src="/SmartBee.png" alt="Bee AI" className="bee-icon" />
            <span>Bee AI</span>
          </button>
        </div>
      </header>

      <section className="search-bar air-frame" aria-label="Quick planner">
        <div className="search-segment">
          <p className="segment-label">What</p>
          <p className="segment-value">Plan my day</p>
        </div>
        <div className="search-segment">
          <p className="segment-label">When</p>
          <p className="segment-value">Today</p>
        </div>
        <div className="search-segment">
          <p className="segment-label">Focus</p>
          <p className="segment-value">Classes + Assignment</p>
        </div>
        <button type="button" className="search-cta">Ask Bee</button>
      </section>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="page-shell">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/schedule" element={<div className="coming-soon">Schedule - Coming Soon</div>} />
          <Route path="/tasks" element={<div className="coming-soon">Tasks - Coming Soon</div>} />
          <Route path="/more" element={<div className="coming-soon">More - Coming Soon</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
