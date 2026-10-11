import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'
import '../App.css'

const pad = n => String(n).padStart(2, '0')

function Widget() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const load = () => api.get('/schedule').then(data => { setEntries(data); setError('') }).catch(err => setError(err.message))
    load()
    const refresh = setInterval(load, 5 * 60 * 1000)
    const tick = setInterval(() => setNow(new Date()), 60 * 1000)
    return () => { clearInterval(refresh); clearInterval(tick) }
  }, [])

  const today = now.toLocaleDateString('en-US', { weekday: 'long' })
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}`
  const classes = entries.filter(entry => entry.day === today).sort((a, b) => a.start.localeCompare(b.start))
  const nextIndex = classes.findIndex(entry => entry.end > time)

  const statusOf = (entry, index) => {
    if (entry.end <= time) return 'done'
    if (entry.start <= time) return 'now'
    return index === nextIndex ? 'next' : 'later'
  }

  return (
    <div className="widget">
      <header className="widget-head">
        <img src="/SmartBee.png" alt="" className="brand-logo" />
        <div>
          <h1>Today’s classes</h1>
          <small>{today} · {classes.length} {classes.length === 1 ? 'class' : 'classes'}</small>
        </div>
      </header>

      {error && <p className="widget-empty">{error}</p>}
      {!error && classes.length === 0 && <p className="widget-empty">No classes today.</p>}

      <ul className="widget-list">
        {classes.map((entry, index) => {
          const status = statusOf(entry, index)
          return (
            <li key={entry.id} className={`widget-row is-${status}`}>
              <span className="widget-time">{entry.start}</span>
              <span className="widget-name">
                {entry.title}
                <small>{status === 'now' ? `Now · until ${entry.end}` : `${entry.start}–${entry.end}`}{entry.room ? ` · ${entry.room}` : ''}</small>
              </span>
              {status === 'next' && <span className="widget-tag">Next</span>}
              {status === 'done' && <span className="material-symbols-outlined">check</span>}
            </li>
          )
        })}
      </ul>

      <Link to="/schedule" className="widget-open">Open SmartBee</Link>
    </div>
  )
}

export default Widget
