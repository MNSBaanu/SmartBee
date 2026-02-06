import './App.css'

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="logo">🐝 BeeWith</div>
        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <button className="btn-primary">Get Started</button>
        </nav>
      </header>

      <main className="hero">
        <h1>Build Skills. Build Teams. Build Together.</h1>
        <p>
          A free, challenge-driven collaboration platform that helps people 
          connect through skills, teamwork, and real-world projects.
        </p>
        <div className="hero-buttons">
          <button className="btn-primary btn-large">Start Collaborating</button>
          <button className="btn-secondary btn-large">Learn More</button>
        </div>
      </main>

      <section className="features">
        <h2>Why BeeWith?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <span className="feature-icon">🧠</span>
            <h3>Skill Collaboration</h3>
            <p>Connect with others, share skills, and learn together</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🏆</span>
            <h3>Challenges</h3>
            <p>Solo, team, and community challenges to level up</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">👥</span>
            <h3>Team Building</h3>
            <p>Form teams and work on real projects together</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🎖</span>
            <h3>Reputation System</h3>
            <p>Build your reputation through contributions</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2024 BeeWith - Free-first collaboration platform</p>
      </footer>
    </div>
  )
}

export default App
