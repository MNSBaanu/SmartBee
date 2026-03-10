import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Modules from './pages/Modules'

function Navigation() {
  const location = useLocation()
  
  return (
    <>
      <header className="topbar air-frame">
        <div className="brand-wrap">
          <span className="brand-dot" aria-hidden="true" />
          <h1>SmartBee</h1>
        </div>
        <nav className="top-nav" aria-label="Main navigation">
          <Link to="/">
            <button type="button" className={`nav-chip ${location.pathname === '/' ? 'nav-chip-active' : ''}`}>
              Home
            </button>
          </Link>
          <Link to="/modules">
            <button type="button" className={`nav-chip ${location.pathname === '/modules' ? 'nav-chip-active' : ''}`}>
              Modules
            </button>
          </Link>
          <button type="button" className="nav-chip">Virtual Friend</button>
        </nav>
        <button type="button" className="ghost-btn">My Profile</button>
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
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
