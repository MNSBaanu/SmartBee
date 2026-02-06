import './App.css'

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="logo">🐝 BeeWith</div>
        <nav className="nav">
          <a href="#hive">The Hive</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <button className="btn-primary">Join the Hive</button>
        </nav>
      </header>

      <main className="hero">
        <div className="hero-badge">🍯 Free-First Collaboration Platform</div>
        <h1>
          Build Skills. Build Teams.<br />
          <span className="highlight">Build Together.</span>
        </h1>
        <p>
          Where busy bees collaborate on real projects, share knowledge, 
          and create something sweet together. Join our thriving hive today.
        </p>
        <div className="hero-buttons">
          <button className="btn-primary btn-large">Start Buzzing</button>
          <button className="btn-secondary btn-large">Explore the Hive</button>
        </div>
      </main>

      <section className="features">
        <div className="section-header">
          <div className="section-subtitle">Why BeeWith</div>
          <h2>Everything You Need to Thrive</h2>
        </div>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="bee-icon">🐝</div>
            <h3>Worker Bees Unite</h3>
            <p>Connect with talented individuals, share your expertise, and pollinate ideas across the hive</p>
          </div>
          <div className="feature-card">
            <div className="bee-icon">🏆</div>
            <h3>Hive Challenges</h3>
            <p>Take on solo missions, team swarms, or colony-wide challenges to sharpen your skills</p>
          </div>
          <div className="feature-card">
            <div className="bee-icon">🍯</div>
            <h3>Build the Honeycomb</h3>
            <p>Form productive swarms and construct real projects together, cell by cell</p>
          </div>
          <div className="feature-card">
            <div className="bee-icon">⭐</div>
            <h3>Earn Your Stripes</h3>
            <p>Build reputation through meaningful contributions and rise to queen bee status</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Join the Swarm?</h2>
        <p>Be part of a thriving community where collaboration creates honey</p>
        <button className="btn-primary btn-large">Buzz In Now</button>
      </section>

      <footer className="footer">
        <p>© 2024 BeeWith - Where collaboration creates honey</p>
        <p className="tagline">Be Together. Build Together. Bee Together.</p>
      </footer>
    </div>
  )
}

export default App
