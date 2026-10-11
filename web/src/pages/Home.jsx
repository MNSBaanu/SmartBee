import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'
import { useAuth } from '../auth'
import '../App.css'

const day = d => (d || '').slice(0, 10)
const fmtDate = d => new Date(`${day(d)}T00:00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })

function Home() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState([])
  const [modules, setModules] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/tasks').then(setTasks).catch(err => setError(err.message))
    api.get('/modules').then(setModules).catch(err => setError(err.message))
  }, [])

  const today = new Date().toLocaleDateString('en-CA')
  const active = tasks.filter(t => !t.completed)
  const dueToday = active.filter(t => day(t.dueDate) === today)
  const overdue = active.filter(t => day(t.dueDate) && day(t.dueDate) < today)
  const upcoming = active
    .filter(t => day(t.dueDate) >= today)
    .sort((a, b) => day(a.dueDate).localeCompare(day(b.dueDate)))
  const nearest = upcoming[0]
  const progress = tasks.length ? Math.round(((tasks.length - active.length) / tasks.length) * 100) : 0
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  const stats = [
    { label: 'Modules', value: modules.length, hint: 'Courses you are tracking', icon: 'school', tone: 'info' },
    { label: 'Active Tasks', value: active.length, hint: `${tasks.length - active.length} completed`, icon: 'fact_check', tone: 'success' },
    { label: 'Due Today', value: dueToday.length, hint: dueToday[0]?.title || 'Nothing due today', icon: 'assignment_late', tone: 'danger' },
    { label: 'Overdue', value: overdue.length, hint: overdue.length ? 'Catch up when you can' : 'You are on track', icon: 'local_fire_department', tone: 'bee' }
  ]

  return (
    <div className="dash">
      {error && <p className="auth-error" role="alert">{error}</p>}
      <section className="hero">
        <div className="hero-body">
          <span className="pill pill-bee">
            <span className="material-symbols-outlined icon-fill">wb_sunny</span>
            Today in the hive
          </span>
          <h2>{greeting}, {user?.name}</h2>
          <p className="muted">
            You have <strong>{active.length} active {active.length === 1 ? 'task' : 'tasks'}</strong>, <strong>{dueToday.length}</strong> due today.
          </p>
          <div className="hero-actions">
            <button type="button" className="btn btn-primary">
              <span className="material-symbols-outlined">event_note</span>
              Open My Planner
            </button>
            <Link to="/tasks" className="btn btn-ghost">
              <span className="material-symbols-outlined">checklist</span>
              View Tasks
            </Link>
          </div>
        </div>

        <div className="hero-ring" aria-hidden="true">
          <div className="ring">
            <span className="ring-value">{progress}%</span>
            <span className="ring-label">Tasks done</span>
          </div>
        </div>
      </section>

      <section className="planner-strip" aria-label="Quick planner">
        <div className="strip-segment">
          <p className="strip-label">What</p>
          <p className="strip-value">Plan my day</p>
        </div>
        <div className="strip-segment">
          <p className="strip-label">When</p>
          <p className="strip-value">Today</p>
        </div>
        <div className="strip-segment">
          <p className="strip-label">Focus</p>
          <p className="strip-value">Classes + Assignment</p>
        </div>
        <button type="button" className="btn btn-primary strip-cta">
          <span className="material-symbols-outlined">auto_awesome</span>
          Ask Bee
        </button>
      </section>

      <section className="stat-row">
        {stats.map(stat => (
          <article key={stat.label} className={`stat-tile card tone-${stat.tone}`}>
            <span className="stat-icon material-symbols-outlined icon-fill">{stat.icon}</span>
            <p className="eyebrow">{stat.label}</p>
            <h3>{stat.value}</h3>
            <p className="muted small">{stat.hint}</p>
          </article>
        ))}
      </section>

      <div className="dash-grid">
        <section className="card deadline-card">
          <div className="card-head">
            <div>
              <p className="eyebrow">Nearest deadline</p>
              <h3>{nearest ? nearest.title : 'All clear'}</h3>
            </div>
            {nearest && <span className="pill pill-danger">Due {fmtDate(nearest.dueDate)}</span>}
          </div>
          <p className="muted">
            {nearest ? nearest.description || 'Stay on top of it and tick it off.' : 'No upcoming deadlines.'}
          </p>
          <div className="hero-actions">
            <Link to="/tasks" className="btn btn-soft">
              <span className="material-symbols-outlined">checklist</span>
              Open tasks
            </Link>
          </div>
        </section>

        <section className="card bee-card">
          <div className="card-head">
            <div className="bee-head">
              <img src="/SmartBee.png" alt="" className="bee-avatar" />
              <div>
                <p className="eyebrow">Virtual Friend</p>
                <h3>Bee says</h3>
              </div>
            </div>
          </div>
          <blockquote className="quote">
            “You are closest to your goal when you do the next small task. Want me to
            break your assignment into 3 quick steps?”
          </blockquote>
          <form className="chat-form" onSubmit={(event) => event.preventDefault()}>
            <span className="material-symbols-outlined">chat_bubble</span>
            <input
              type="text"
              placeholder="Ask Bee to plan your day…"
              aria-label="Ask SmartBee"
            />
            <button type="submit" className="btn btn-primary">
              <span className="material-symbols-outlined">send</span>
              <span className="btn-text">Send</span>
            </button>
          </form>
        </section>

        <section className="card timeline-card">
          <div className="card-head">
            <div>
              <p className="eyebrow">Upcoming</p>
              <h3>Next deadlines</h3>
            </div>
          </div>
          {upcoming.length === 0 ? (
            <p className="muted">No upcoming tasks. Add one from the Tasks page.</p>
          ) : (
            <ul className="timeline">
              {upcoming.slice(0, 4).map(item => (
                <li key={item.id}>
                  <div className="timeline-time">
                    <strong>{fmtDate(item.dueDate)}</strong>
                  </div>
                  <span className="timeline-dot" aria-hidden="true" />
                  <div className="timeline-body">
                    <div className="timeline-icon">
                      <span className="material-symbols-outlined">assignment</span>
                    </div>
                    <div>
                      <p className="timeline-title">{item.title}</p>
                      <p className="muted small">{item.category} • {item.priority}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}

export default Home
