import { useEffect, useState } from 'react'
import '../App.css'

const SESSION_TYPES = [
  {
    id: 'focus',
    label: 'Focus Session',
    icon: 'timer',
    work: 25,
    rest: 5,
    rounds: 4,
    blurb: 'Classic Pomodoro for problem sets and lecture notes'
  },
  {
    id: 'study',
    label: 'Deep Study',
    icon: 'menu_book',
    work: 50,
    rest: 10,
    rounds: 3,
    blurb: 'Longer stretches for readings and revision'
  },
  {
    id: 'group',
    label: 'Group Assignment',
    icon: 'groups',
    work: 60,
    rest: 15,
    rounds: 3,
    blurb: 'Team work block with a proper breather'
  },
  {
    id: 'revision',
    label: 'Quick Revision',
    icon: 'bolt',
    work: 15,
    rest: 3,
    rounds: 4,
    blurb: 'Short bursts before a quiz or viva'
  }
]

const pad = (value) => String(value).padStart(2, '0')

const formatClock = (totalSeconds) =>
  `${pad(Math.floor(totalSeconds / 60))}:${pad(totalSeconds % 60)}`

function Focus() {
  const [typeId, setTypeId] = useState('focus')
  const [phase, setPhase] = useState('work')
  const [secondsLeft, setSecondsLeft] = useState(SESSION_TYPES[0].work * 60)
  const [running, setRunning] = useState(false)
  const [round, setRound] = useState(1)
  const [subject, setSubject] = useState('')
  const [log, setLog] = useState([])
  const [now, setNow] = useState(new Date())

  const type = SESSION_TYPES.find(item => item.id === typeId)
  const totalSeconds = (phase === 'work' ? type.work : type.rest) * 60
  const progress = Math.min(100, ((totalSeconds - secondsLeft) / totalSeconds) * 100)

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (!running) return undefined
    const id = setInterval(() => {
      setSecondsLeft(value => (value > 0 ? value - 1 : 0))
    }, 1000)
    return () => clearInterval(id)
  }, [running])

  useEffect(() => {
    if (secondsLeft > 0 || !running) return
    advance(true)
  }, [secondsLeft, running])

  const resetTo = (nextType) => {
    setRunning(false)
    setPhase('work')
    setRound(1)
    setSecondsLeft(nextType.work * 60)
  }

  const advance = (completed) => {
    if (phase === 'work') {
      if (completed) {
        setLog(entries => [
          {
            id: Date.now(),
            label: type.label,
            subject: subject.trim(),
            minutes: type.work,
            at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          },
          ...entries
        ])
      }

      if (round >= type.rounds) {
        resetTo(type)
        return
      }

      setPhase('rest')
      setSecondsLeft(type.rest * 60)
      return
    }

    setPhase('work')
    setRound(value => value + 1)
    setSecondsLeft(type.work * 60)
  }

  const selectType = (nextId) => {
    const nextType = SESSION_TYPES.find(item => item.id === nextId)
    setTypeId(nextId)
    resetTo(nextType)
  }

  const minutesFocused = log.reduce((sum, entry) => sum + entry.minutes, 0)

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Focus Sessions</h2>
          <p className="muted">Timed study, revision, and group work blocks</p>
        </div>
        <div className="wall-clock">
          <span className="material-symbols-outlined">schedule</span>
          <div>
            <p className="wall-time">{now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
            <p className="eyebrow">
              {now.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'short' })}
            </p>
          </div>
        </div>
      </div>

      <div className="session-types">
        {SESSION_TYPES.map(item => (
          <button
            key={item.id}
            type="button"
            className={`card session-type ${item.id === typeId ? 'session-type-active' : ''}`}
            onClick={() => selectType(item.id)}
            aria-pressed={item.id === typeId}
          >
            <span className="session-icon material-symbols-outlined icon-fill">{item.icon}</span>
            <h3>{item.label}</h3>
            <p className="muted small">{item.blurb}</p>
            <span className="pill pill-soft">
              {item.work} min work • {item.rest} min break
            </span>
          </button>
        ))}
      </div>

      <div className={`focus-layout phase-${phase}`}>
        <section className="card timer-card">
          <div className="card-head">
            <div>
              <p className="eyebrow">{type.label}</p>
              <h3>{phase === 'work' ? 'Time to focus' : 'Take a break'}</h3>
            </div>
            <span className={`pill ${phase === 'work' ? 'pill-bee' : 'pill-info'}`}>
              Round {round} of {type.rounds}
            </span>
          </div>

          <div className="timer-ring" style={{ '--progress': `${progress}%` }}>
            <div className="timer-face">
              <p className="timer-display">{formatClock(secondsLeft)}</p>
              <p className="eyebrow">{phase === 'work' ? 'Focus' : 'Break'}</p>
            </div>
          </div>

          <div className="round-dots" aria-hidden="true">
            {Array.from({ length: type.rounds }).map((_, index) => (
              <span
                key={index}
                className={`round-dot ${index < round - 1 ? 'round-dot-done' : ''} ${index === round - 1 ? 'round-dot-current' : ''}`}
              />
            ))}
          </div>

          <div className="timer-controls">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setRunning(value => !value)}
            >
              <span className="material-symbols-outlined">{running ? 'pause' : 'play_arrow'}</span>
              {running ? 'Pause' : 'Start'}
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => advance(false)}>
              <span className="material-symbols-outlined">skip_next</span>
              Skip
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => resetTo(type)}>
              <span className="material-symbols-outlined">restart_alt</span>
              Reset
            </button>
          </div>

          <div className="form-field subject-field">
            <label htmlFor="subject">Working on</label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g., OS assignment, DBMS revision"
            />
          </div>
        </section>

        <div className="focus-side">
          <section className="stat-row focus-stats">
            <article className="stat-tile card tone-bee">
              <span className="stat-icon material-symbols-outlined icon-fill">timelapse</span>
              <p className="eyebrow">Focused</p>
              <h3>{minutesFocused}m</h3>
              <p className="muted small">Today so far</p>
            </article>
            <article className="stat-tile card tone-success">
              <span className="stat-icon material-symbols-outlined icon-fill">task_alt</span>
              <p className="eyebrow">Sessions</p>
              <h3>{log.length}</h3>
              <p className="muted small">Completed blocks</p>
            </article>
          </section>

          <section className="card log-card">
            <div className="card-head">
              <div>
                <p className="eyebrow">History</p>
                <h3>Today's Sessions</h3>
              </div>
            </div>

            {log.length > 0 ? (
              <ul className="session-log">
                {log.map(entry => (
                  <li key={entry.id}>
                    <span className="log-icon">
                      <span className="material-symbols-outlined icon-fill">check</span>
                    </span>
                    <div className="log-body">
                      <p className="log-title">{entry.subject || entry.label}</p>
                      <p className="muted small">{entry.label} • {entry.minutes} min</p>
                    </div>
                    <span className="pill pill-soft">{entry.at}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="muted small">
                Finish a block and it will show up here with the time you wrapped it up.
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

export default Focus
