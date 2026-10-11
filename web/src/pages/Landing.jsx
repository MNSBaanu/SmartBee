import { Link } from 'react-router-dom'

const REPO = 'https://github.com/MNSBaanu/SmartBee'

const FEATURES = [
  { icon: 'school', title: 'Modules', text: 'Track courses, credits, instructors and grades in one place.' },
  { icon: 'checklist', title: 'Tasks', text: 'Deadlines and to-dos linked to the modules they belong to.' },
  { icon: 'calendar_month', title: 'Schedule', text: 'Your weekly timetable and today’s classes at a glance.' },
  { icon: 'how_to_reg', title: 'Attendance', text: 'Keep an eye on attendance so nothing slips.' },
  { icon: 'timer', title: 'Focus', text: 'Timed study sessions that keep you on track.' },
  { icon: 'group', title: 'Friends', text: 'Study with classmates and see who’s in your classes.' },
  { icon: 'auto_awesome', title: 'Bee AI', text: 'Breaks big assignments into small, doable steps.' },
  { icon: 'devices', title: 'Web + mobile', text: 'Use it in the browser or on your phone.' }
]

const STEPS = [
  { title: 'Create your account', text: 'Sign up in seconds. It’s free, no card needed.' },
  { title: 'Add your modules', text: 'Enter your courses, class times and deadlines.' },
  { title: 'Let Bee plan it', text: 'Ask Bee AI to turn assignments into a day-by-day plan.' }
]

const STATS = [
  { value: '100%', label: 'Free & open source' },
  { value: '2', label: 'Platforms: web & mobile' },
  { value: 'MIT', label: 'Licensed' }
]

const PREVIEW = [
  { time: '09:00', name: 'Data Structures', tag: 'Lecture', room: 'Hall A', status: 'done' },
  { time: '11:30', name: 'Algorithms', tag: 'Lab', room: 'Lab 3', status: 'now' },
  { time: '14:00', name: 'Database Systems', tag: 'Tutorial', room: 'Room 204', status: 'next' }
]

function Landing() {
  const downloadUrl = import.meta.env.VITE_APP_DOWNLOAD_URL

  return (
    <div className="landing">
      <header className="landing-nav">
        <span className="landing-brand">
          <img src="/SmartBee.png" alt="" className="brand-logo" />
          SmartBee
        </span>
        <nav className="landing-links">
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <Link to="/login" className="btn btn-primary">Log in</Link>
        </nav>
      </header>

      <section className="landing-hero">
        <div className="landing-hero-copy">
          <span className="landing-pill">Open-source campus companion</span>
          <h1>One app for your <span className="landing-accent">classes, tasks and attendance.</span></h1>
          <p>SmartBee is a free campus-life companion with an AI study buddy that helps you plan what’s next.</p>
          <div className="landing-cta">
            <Link to="/login" className="btn btn-primary">Get started free</Link>
            {downloadUrl && (
              <a className="btn" href={downloadUrl} target="_blank" rel="noopener noreferrer">
                <span className="material-symbols-outlined">download</span>
                Download the app
              </a>
            )}
          </div>
          <ul className="landing-trust">
            <li><span className="material-symbols-outlined icon-fill">check_circle</span>Free forever</li>
            <li><span className="material-symbols-outlined icon-fill">check_circle</span>No card needed</li>
            <li><span className="material-symbols-outlined icon-fill">check_circle</span>Open source</li>
          </ul>
        </div>

        <div className="landing-preview" aria-hidden="true">
          <img src="/hero-bee.png" alt="" className="landing-bee-art" />
          <div className="landing-preview-head">
            <span className="landing-preview-icon material-symbols-outlined icon-fill">hive</span>
            <div>
              <strong>Today</strong>
              <small>Monday · 3 classes</small>
            </div>
          </div>
          <div className="landing-progress">
            <span style={{ width: '45%' }} />
          </div>
          {PREVIEW.map(row => (
            <div key={row.name} className={`landing-preview-row is-${row.status}`}>
              <span className="landing-preview-time">{row.time}</span>
              <span className="landing-preview-name">
                {row.name}
                <small>{row.status === 'now' ? <><i className="landing-live" />In progress · {row.room}</> : row.room}</small>
              </span>
              <span className="landing-preview-tag">
                {row.status === 'done' && <span className="material-symbols-outlined">check</span>}
                {row.status === 'next' && row.tag}
                {row.status === 'now' && (
                  <>
                    <span className="landing-tag-text">{row.tag}</span>
                    <span className="landing-tag-check material-symbols-outlined">check</span>
                  </>
                )}
              </span>
              {row.status === 'now' && <span className="landing-cursor material-symbols-outlined icon-fill">arrow_selector_tool</span>}
            </div>
          ))}
        </div>
      </section>

      <section className="landing-stats" aria-label="Highlights">
        {STATS.map(item => (
          <div key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      <section id="features" className="landing-section">
        <h2>Everything student life needs</h2>
        <p className="landing-sub">Stop juggling timetables, chats and spreadsheets.</p>
        <div className="landing-features">
          {FEATURES.map(item => (
            <article key={item.title} className="landing-card">
              <span className="material-symbols-outlined icon-fill">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section landing-bee">
        <div>
          <h2>Meet Bee AI</h2>
          <p className="landing-sub">Staring at a big assignment? Tell Bee what’s due and get small, doable steps scheduled around your classes.</p>
        </div>
        <div className="landing-chat" aria-hidden="true">
          <p className="landing-msg landing-msg-user">I have a 3,000-word report due Friday.</p>
          <p className="landing-msg landing-msg-bee">Let’s split it up: outline today, draft Wednesday, polish Thursday. Want me to add these to your tasks?</p>
        </div>
      </section>

      <section id="how" className="landing-section">
        <h2>How it works</h2>
        <ol className="landing-steps">
          {STEPS.map((step, index) => (
            <li key={step.title}>
              <span className="landing-step-num">{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="landing-final">
        <h2>Ready to get organised?</h2>
        <p>Join SmartBee and know what’s next, every day.</p>
        <Link to="/login" className="btn btn-primary">Get started free</Link>
      </section>

      <footer className="landing-foot">
        <p>Open source under the MIT License. Contributions welcome on <a href={REPO} target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
        <p>© 2026 SmartBee · Built by <a href="https://github.com/MNSBaanu" target="_blank" rel="noopener noreferrer">MNS Baanu</a></p>
      </footer>
    </div>
  )
}

export default Landing
