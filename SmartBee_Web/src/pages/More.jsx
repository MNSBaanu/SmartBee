import { useState } from 'react'
import '../App.css'

const STATUSES = ['Present', 'Absent', 'Late']

const STATUS_ICONS = {
  Present: 'check_circle',
  Absent: 'cancel',
  Late: 'schedule'
}

const todayString = () => new Date().toISOString().slice(0, 10)

function More() {
  const [records, setRecords] = useState([])
  const [formData, setFormData] = useState({
    module: '',
    date: todayString(),
    status: 'Present'
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    const existing = records.find(
      record => record.module === formData.module && record.date === formData.date
    )

    if (existing) {
      setRecords(records.map(record =>
        record.id === existing.id ? { ...record, status: formData.status } : record
      ))
    } else {
      setRecords([...records, { ...formData, id: Date.now() }])
    }

    setFormData({ ...formData, module: '' })
  }

  const handleDelete = (id) => {
    setRecords(records.filter(record => record.id !== id))
  }

  const total = records.length
  const presentCount = records.filter(record => record.status === 'Present').length
  const overallRate = total ? Math.round((presentCount / total) * 100) : 0

  const byModule = [...new Set(records.map(record => record.module))].map(module => {
    const moduleRecords = records.filter(record => record.module === module)
    const present = moduleRecords.filter(record => record.status === 'Present').length
    return {
      module,
      total: moduleRecords.length,
      present,
      rate: Math.round((present / moduleRecords.length) * 100)
    }
  })

  const sortedRecords = [...records].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>More</h2>
          <p className="muted">Attendance tracking and app information</p>
        </div>
      </div>

      <section className="section">
        <div className="section-head">
          <div className="section-icon">
            <span className="material-symbols-outlined icon-fill">fact_check</span>
          </div>
          <div>
            <h3>Attendance</h3>
            <p className="muted">Mark your classes and keep an eye on your attendance rate</p>
          </div>
        </div>

        <form className="page-form card attendance-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="module">Module</label>
              <input
                id="module"
                type="text"
                placeholder="e.g., CS301"
                value={formData.module}
                onChange={(e) => setFormData({ ...formData, module: e.target.value })}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="date">Date</label>
              <input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                {STATUSES.map(status => <option key={status} value={status}>{status}</option>)}
              </select>
            </div>
            <div className="form-field form-field-submit">
              <button type="submit" className="btn btn-primary">
                <span className="material-symbols-outlined">add_task</span>
                Record
              </button>
            </div>
          </div>
        </form>

        {total > 0 ? (
          <>
            <div className="stat-row">
              <article className="stat-tile card tone-bee">
                <span className="stat-icon material-symbols-outlined icon-fill">percent</span>
                <p className="eyebrow">Overall Rate</p>
                <h3>{overallRate}%</h3>
                <div className="progress">
                  <div className="progress-fill" style={{ width: `${overallRate}%` }} />
                </div>
              </article>
              <article className="stat-tile card tone-info">
                <span className="stat-icon material-symbols-outlined icon-fill">event_available</span>
                <p className="eyebrow">Classes Marked</p>
                <h3>{total}</h3>
                <p className="muted small">Across {byModule.length} module{byModule.length === 1 ? '' : 's'}</p>
              </article>
              <article className="stat-tile card tone-success">
                <span className="stat-icon material-symbols-outlined icon-fill">how_to_reg</span>
                <p className="eyebrow">Attended</p>
                <h3>{presentCount}</h3>
                <p className="muted small">Keep showing up</p>
              </article>
            </div>

            <div className="card-grid">
              {byModule.map((stat, index) => (
                <article key={stat.module} className={`card entity-card accent-${index % 4}`}>
                  <div className="entity-head">
                    <div className="entity-badge">{stat.module.slice(0, 2).toUpperCase()}</div>
                    <div className="entity-title">
                      <span className="pill pill-soft">{stat.module}</span>
                      <h3>{stat.rate}% attended</h3>
                    </div>
                  </div>
                  <div className="progress">
                    <div
                      className={`progress-fill ${stat.rate < 75 ? 'progress-low' : ''}`}
                      style={{ width: `${stat.rate}%` }}
                    />
                  </div>
                  <div className="detail-list">
                    <div className="detail-item">
                      <span className="detail-label">
                        <span className="material-symbols-outlined">how_to_reg</span>
                        Present
                      </span>
                      <span>{stat.present} of {stat.total}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="card record-list">
              <div className="card-head">
                <div>
                  <p className="eyebrow">History</p>
                  <h3>Recent Records</h3>
                </div>
              </div>
              <ul>
                {sortedRecords.map(record => (
                  <li key={record.id}>
                    <span className={`status-icon status-${record.status.toLowerCase()}`}>
                      <span className="material-symbols-outlined icon-fill">
                        {STATUS_ICONS[record.status]}
                      </span>
                    </span>
                    <div className="record-body">
                      <p className="record-module">{record.module}</p>
                      <p className="muted small">{record.date}</p>
                    </div>
                    <span className={`pill pill-${record.status.toLowerCase()}`}>
                      {record.status}
                    </span>
                    <button
                      type="button"
                      className="icon-btn icon-btn-danger"
                      onClick={() => handleDelete(record.id)}
                      aria-label="Delete record"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div className="empty-state card">
            <div className="empty-icon">
              <span className="material-symbols-outlined">fact_check</span>
            </div>
            <h3>No attendance recorded</h3>
            <p className="muted">Mark a class above to start seeing your stats.</p>
          </div>
        )}
      </section>

      <section className="section">
        <div className="section-head">
          <div className="section-icon">
            <span className="material-symbols-outlined icon-fill">info</span>
          </div>
          <div>
            <h3>About SmartBee</h3>
            <p className="muted">
              An open source platform bringing modules, planning, attendance, and an AI
              study companion into one place.
            </p>
          </div>
        </div>

        <div className="card-grid">
          <article className="card info-card">
            <div className="info-icon">
              <span className="material-symbols-outlined">menu_book</span>
            </div>
            <h3>Documentation</h3>
            <p className="muted small">
              API reference and interactive docs are served by the backend at
              <code> /api/docs</code> when it is running locally.
            </p>
          </article>
          <article className="card info-card">
            <div className="info-icon">
              <span className="material-symbols-outlined">code</span>
            </div>
            <h3>Contributing</h3>
            <p className="muted small">
              Fork the repository, branch from <code>main</code>, and keep pull requests
              focused. See the root README for the full guide.
            </p>
          </article>
          <article className="card info-card">
            <div className="info-icon">
              <span className="material-symbols-outlined">favorite</span>
            </div>
            <h3>Open Source</h3>
            <p className="muted small">
              Contributions are welcome — fix bugs, improve docs, add features, or just
              share feedback.
            </p>
          </article>
        </div>
      </section>
    </div>
  )
}

export default More
