import '../App.css'

const STATS = [
  {
    label: 'Attendance',
    value: '89%',
    hint: '3 more classes this week',
    icon: 'fact_check',
    tone: 'success'
  },
  {
    label: 'Classes Today',
    value: '2',
    hint: 'Next one in 45 mins',
    icon: 'school',
    tone: 'info'
  },
  {
    label: 'Due Today',
    value: '1',
    hint: 'AI Mini Project',
    icon: 'assignment_late',
    tone: 'danger'
  },
  {
    label: 'Focus Streak',
    value: '4d',
    hint: 'Keep the momentum going',
    icon: 'local_fire_department',
    tone: 'bee'
  }
]

const UPCOMING = [
  { time: '10:00', meridiem: 'AM', title: 'DBMS Lab', detail: 'Lab 3 • Practical', icon: 'science' },
  { time: '01:30', meridiem: 'PM', title: 'Library Book Return', detail: 'Reminder', icon: 'menu_book' },
  { time: '04:00', meridiem: 'PM', title: 'Coding Club Meetup', detail: 'Auditorium', icon: 'groups' }
]

function Home() {
  return (
    <div className="dash">
      <section className="hero">
        <div className="hero-body">
          <span className="pill pill-bee">
            <span className="material-symbols-outlined icon-fill">wb_sunny</span>
            Today at a glance
          </span>
          <h2>Good morning, Baanu</h2>
          <p className="muted">
            You have <strong>2 classes</strong>, <strong>1 assignment</strong> due, and a
            club event at 4:00 PM. Bee has already sorted your day by priority.
          </p>
          <div className="hero-actions">
            <button type="button" className="btn btn-primary">
              <span className="material-symbols-outlined">event_note</span>
              Open My Planner
            </button>
            <button type="button" className="btn btn-ghost">
              <span className="material-symbols-outlined">timer</span>
              Start Focus Session
            </button>
          </div>
        </div>

        <div className="hero-ring" aria-hidden="true">
          <div className="ring">
            <span className="ring-value">68%</span>
            <span className="ring-label">Day done</span>
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
        {STATS.map(stat => (
          <article key={stat.label} className={`stat-tile card tone-${stat.tone}`}>
            <span className="stat-icon material-symbols-outlined icon-fill">{stat.icon}</span>
            <p className="eyebrow">{stat.label}</p>
            <h3>{stat.value}</h3>
            <p className="muted small">{stat.hint}</p>
          </article>
        ))}
      </section>

      <div className="dash-grid">
        <section className="card next-class">
          <div className="card-head">
            <div>
              <p className="eyebrow">Up next</p>
              <h3>Operating Systems</h3>
            </div>
            <span className="pill pill-info">In 45 mins</span>
          </div>
          <div className="meta-row">
            <span className="meta">
              <span className="material-symbols-outlined">location_on</span>
              Room B-204
            </span>
            <span className="meta">
              <span className="material-symbols-outlined">person</span>
              Dr. Smith
            </span>
            <span className="meta">
              <span className="material-symbols-outlined">schedule</span>
              09:00 – 10:30
            </span>
          </div>
          <div className="progress">
            <div className="progress-fill" style={{ width: '35%' }} />
          </div>
          <p className="muted small">Module progress • 35% of syllabus covered</p>
        </section>

        <section className="card deadline-card">
          <div className="card-head">
            <div>
              <p className="eyebrow">Closest deadline</p>
              <h3>AI Mini Project</h3>
            </div>
            <span className="pill pill-danger">Due 11:59 PM</span>
          </div>
          <p className="muted">
            Submission closes tonight. Bee suggests finishing the evaluation section first.
          </p>
          <div className="hero-actions">
            <button type="button" className="btn btn-soft">
              <span className="material-symbols-outlined">splitscreen</span>
              Break into steps
            </button>
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
              <h3>Rest of your day</h3>
            </div>
          </div>
          <ul className="timeline">
            {UPCOMING.map(item => (
              <li key={item.title}>
                <div className="timeline-time">
                  <strong>{item.time}</strong>
                  <span>{item.meridiem}</span>
                </div>
                <span className="timeline-dot" aria-hidden="true" />
                <div className="timeline-body">
                  <div className="timeline-icon">
                    <span className="material-symbols-outlined">{item.icon}</span>
                  </div>
                  <div>
                    <p className="timeline-title">{item.title}</p>
                    <p className="muted small">{item.detail}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

export default Home
