import '../App.css'

function Home() {
  return (
    <main className="content-grid">
      <section className="hero-card air-card">
        <p className="section-label">Today at a glance</p>
        <h2>Good Morning, Baanu</h2>
        <p className="muted">
          You have 2 classes, 1 assignment due, and a club event at 4:00 PM.
        </p>
        <div className="action-row">
          <button type="button" className="primary-btn">Open My Planner</button>
          <button type="button" className="secondary-btn">Start Focus Session</button>
        </div>
      </section>

      <section className="card-grid">
        <article className="info-card air-card">
          <p className="section-label">Classes</p>
          <h3>Operating Systems</h3>
          <p className="muted">Starts in 45 mins • Room B-204</p>
        </article>
        <article className="info-card air-card">
          <p className="section-label">Deadline</p>
          <h3>AI Mini Project</h3>
          <p className="muted">Submission due today at 11:59 PM</p>
        </article>
        <article className="info-card air-card">
          <p className="section-label">Attendance</p>
          <h3>89%</h3>
          <p className="muted">Need 3 more attended classes this week</p>
        </article>
      </section>

      <section className="friend-card air-card">
        <p className="section-label">Virtual Friend</p>
        <h3>Bee says:</h3>
        <p className="quote">
          "You are closest to your goal when you do the next small task. Want me
          to break your assignment into 3 quick steps?"
        </p>
        <form className="chat-form" onSubmit={(event) => event.preventDefault()}>
          <input
            type="text"
            placeholder="Ask Bee to plan your day..."
            aria-label="Ask SmartBee"
          />
          <button type="submit" className="primary-btn">Send</button>
        </form>
      </section>

      <section className="tasks-card air-card">
        <p className="section-label">Upcoming</p>
        <ul>
          <li>
            <span>10:00 AM</span>
            <p>DBMS Lab</p>
          </li>
          <li>
            <span>1:30 PM</span>
            <p>Library Book Return Reminder</p>
          </li>
          <li>
            <span>4:00 PM</span>
            <p>Coding Club Meetup</p>
          </li>
        </ul>
      </section>
    </main>
  )
}

export default Home
