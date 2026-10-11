import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink, Navigate, useLocation } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Modules from './pages/Modules'
import Schedule from './pages/Schedule'
import Tasks from './pages/Tasks'
import More from './pages/More'
import Friends from './pages/Friends'
import Focus from './pages/Focus'
import Login from './pages/Login'
import Landing from './pages/Landing'
import Widget from './pages/Widget'
import { AuthProvider, useAuth } from './auth'

const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: 'hive' },
  { path: '/modules', label: 'Modules', icon: 'school' },
  { path: '/schedule', label: 'Schedule', icon: 'calendar_month' },
  { path: '/tasks', label: 'Tasks', icon: 'checklist' },
  { path: '/focus', label: 'Focus', icon: 'timer' },
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
  const { user, logout } = useAuth()
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
        {import.meta.env.VITE_APP_DOWNLOAD_URL && (
          <a
            className="icon-btn"
            href={import.meta.env.VITE_APP_DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download the app"
            title="Download the app"
          >
            <span className="material-symbols-outlined">download</span>
          </a>
        )}
        <button type="button" className="icon-btn" aria-label="Notifications">
          <span className="material-symbols-outlined">notifications</span>
          <span className="dot" />
        </button>
        <button type="button" className="btn btn-bee">
          <img src="/SmartBee.png" alt="" className="bee-icon" />
          <span>Bee AI</span>
        </button>
        <div className="avatar" title={user?.name} aria-hidden="true">
          {(user?.name || 'B').charAt(0).toUpperCase()}
        </div>
        <button type="button" className="icon-btn" onClick={logout} aria-label="Log out">
          <span className="material-symbols-outlined">logout</span>
        </button>
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
            <Route path="/focus" element={<Focus />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/more" element={<More />} />
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

function Gate() {
  const { user, loading } = useAuth()
  if (loading) return null
  return (
    <BrowserRouter>
      {user ? (
        <Routes>
          <Route path="/widget" element={<Widget />} />
          <Route path="*" element={<Shell />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="*" element={<Login />} />
        </Routes>
      )}
    </BrowserRouter>
  )
}

function App() {
  return (
    <AuthProvider>
      <Gate />
    </AuthProvider>
  )
}

export default App
