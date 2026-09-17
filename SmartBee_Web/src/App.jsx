import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Modules from './pages/Modules'
import Schedule from './pages/Schedule'
import Tasks from './pages/Tasks'
import More from './pages/More'

const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: 'space_dashboard', title: 'Dashboard' },
  { path: '/modules', label: 'Modules', icon: 'school', title: 'Campus Modules' },
  { path: '/schedule', label: 'Schedule', icon: 'calendar_month', title: 'Weekly Schedule' },
  { path: '/tasks', label: 'Tasks', icon: 'checklist', title: 'Tasks' },
  { path: '/more', label: 'More', icon: 'tune', title: 'More' }
]

function Sidebar({ open, onClose }) {
  return (
    <>
      <div
        className={`scrim ${open ? 'scrim-open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        <div className="sidebar-brand">
          <img src="/SmartBee.png" alt="" className="brand-logo" />
          <span className="brand-name">SmartBee</span>
        </div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `nav-item ${isActive ? 'nav-item-active' : ''}`}
            >
              {({ isActive }) => (
                <>
                  <span className={`material-symbols-outlined ${isActive ? 'icon-fill' : ''}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-foot">
          <div className="bee-promo">
            <span className="material-symbols-outlined icon-fill">auto_awesome</span>
            <h4>Ask Bee AI</h4>
            <p>Break big assignments into small, doable steps.</p>
            <button type="button" className="btn btn-primary btn-block">
              <span className="material-symbols-outlined">bolt</span>
              Start a chat
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

function Topbar({ onMenu }) {
  const location = useLocation()
  const current = NAV_ITEMS.find(item =>
    item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path)
  )

  return (
    <header className="topbar">
      <button
        type="button"
        className="icon-btn menu-btn"
        onClick={onMenu}
        aria-label="Open navigation"
      >
        <span className="material-symbols-outlined">menu</span>
      </button>

      <div className="topbar-title">
        <p className="eyebrow">SmartBee</p>
        <h1>{current?.title ?? 'SmartBee'}</h1>
      </div>

      <div className="topbar-search">
        <span className="material-symbols-outlined">search</span>
        <input type="search" placeholder="Search modules, tasks, classes…" aria-label="Search" />
      </div>

      <div className="topbar-actions">
        <button type="button" className="icon-btn" aria-label="Notifications">
          <span className="material-symbols-outlined">notifications</span>
          <span className="dot" />
        </button>
        <button type="button" className="btn btn-bee">
          <img src="/SmartBee.png" alt="" className="bee-icon" />
          <span>Bee AI</span>
        </button>
        <div className="avatar" aria-hidden="true">B</div>
      </div>
    </header>
  )
}

function Shell() {
  const [navOpen, setNavOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setNavOpen(false)
  }, [location.pathname])

  return (
    <div className="app-shell">
      <Sidebar open={navOpen} onClose={() => setNavOpen(false)} />
      <div className="app-main">
        <Topbar onMenu={() => setNavOpen(true)} />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/modules" element={<Modules />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/more" element={<More />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  )
}

export default App
