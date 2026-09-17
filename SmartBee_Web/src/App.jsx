import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Modules from './pages/Modules'
import Schedule from './pages/Schedule'
import Tasks from './pages/Tasks'
import More from './pages/More'
import Friends from './pages/Friends'

const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: 'hive' },
  { path: '/modules', label: 'Modules', icon: 'school' },
  { path: '/schedule', label: 'Schedule', icon: 'calendar_month' },
  { path: '/tasks', label: 'Tasks', icon: 'checklist' },
  { path: '/friends', label: 'Friends', icon: 'group' },
  { path: '/more', label: 'More', icon: 'tune' }
]

function Sidebar({ open, onClose, collapsed, onToggle }) {
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
          <button
            type="button"
            className="icon-btn collapse-btn"
            onClick={onToggle}
            aria-expanded={!collapsed}
            aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
          >
            <span className="material-symbols-outlined">
              {collapsed ? 'chevron_right' : 'chevron_left'}
            </span>
          </button>
        </div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          {NAV_ITEMS.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) => `nav-item ${isActive ? 'nav-item-active' : ''}`}
            >
              {({ isActive }) => (
                <>
                  <span className={`material-symbols-outlined ${isActive ? 'icon-fill' : ''}`}>
                    {item.icon}
                  </span>
                  <span className="nav-label">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-foot">
          <div className="bee-promo">
            <span className="material-symbols-outlined icon-fill promo-mark">auto_awesome</span>
            <h4>Ask Bee AI</h4>
            <p>Bee breaks big assignments into small, doable steps.</p>
            <button
              type="button"
              className="btn btn-primary btn-block"
              title={collapsed ? 'Ask Bee AI' : undefined}
            >
              <span className="material-symbols-outlined">bolt</span>
              <span className="nav-label">Start a chat</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

function Topbar({ onMenu }) {
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
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setNavOpen(false)
  }, [location.pathname])

  return (
    <div className={`app-shell ${collapsed ? 'app-shell-collapsed' : ''}`}>
      <Sidebar
        open={navOpen}
        onClose={() => setNavOpen(false)}
        collapsed={collapsed}
        onToggle={() => setCollapsed(value => !value)}
      />
      <div className="app-main">
        <Topbar onMenu={() => setNavOpen(true)} />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/modules" element={<Modules />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/friends" element={<Friends />} />
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
