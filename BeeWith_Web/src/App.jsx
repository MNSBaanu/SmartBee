import './App.css'

function App() {
  const roleModes = ['Frontend', 'Backend', 'QA', 'DevOps', 'Security']

  const findings = [
    {
      id: 'F-101',
      category: 'bug',
      severity: 'high',
      file: 'src/services/auth.js',
      summary: 'Potential null access when user token is missing.',
    },
    {
      id: 'F-102',
      category: 'duplicate',
      severity: 'medium',
      file: 'src/utils/formatDate.js',
      summary: 'Similar date formatting logic appears in multiple files.',
    },
    {
      id: 'F-103',
      category: 'hardcoded',
      severity: 'low',
      file: 'src/config/appConfig.js',
      summary: 'API base URL is hardcoded instead of using environment variables.',
    },
  ]

  return (
    <div className="app-shell">
      <header className="page-header">
        <h1 className="page-title">BeeWith Developer Support</h1>
        <p className="page-subtitle">
          Code Health is one included module in a broader AI developer support platform.
        </p>
      </header>

      <section className="panel">
        <h2 className="panel-title">1) Code Health: Submit Repository</h2>
        <label className="field-label" htmlFor="repoUrl">
          Repository URL
        </label>
        <input
          className="input-control"
          id="repoUrl"
          placeholder="https://github.com/owner/repository"
        />
        <button className="btn-primary">Run Code Health Check</button>
      </section>

      <section className="panel">
        <h2 className="panel-title">Role-Aware Review Mode</h2>
        <p className="panel-note">Choose perspective-specific recommendations for the same findings.</p>
        <div className="role-list">
          {roleModes.map((role) => (
            <span key={role} className="role-chip">{role}</span>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2 className="panel-title">2) Analysis Status</h2>
        <div className="status-grid">
          <p className="status-item"><strong>Analysis ID:</strong> ANL-0001</p>
          <p className="status-item"><strong>Status:</strong> Running</p>
          <p className="status-item"><strong>Progress:</strong> 42%</p>
        </div>
      </section>

      <section className="panel">
        <h2 className="panel-title">3) Findings (Mock)</h2>
        {findings.map((item) => (
          <article key={item.id} className="finding-card">
            <p className="finding-head">
              <strong>{item.id}</strong> | {item.category} |{' '}
              <span className={`severity ${item.severity}`}>{item.severity}</span>
            </p>
            <p className="finding-file"><strong>File:</strong> {item.file}</p>
            <p className="finding-summary">{item.summary}</p>
          </article>
        ))}
      </section>
    </div>
  )
}

export default App
