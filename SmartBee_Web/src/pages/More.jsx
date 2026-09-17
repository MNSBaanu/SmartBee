import { useState } from 'react'
import '../App.css'

const STATUSES = ['Present', 'Absent', 'Late']

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
    <div className="modules-page">
      <div className="page-header">
        <div>
          <h2>More</h2>
          <p className="muted">Attendance tracking and app information</p>
        </div>
      </div>

      <section className="more-section">
        <h3>Attendance</h3>
        <p className="muted">Mark your classes and keep an eye on your attendance rate</p>

        <form className="page-form air-card attendance-form" onSubmit={handleSubmit}>
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
              <button type="submit" className="primary-btn">Record</button>
            </div>
          </div>
        </form>

        {total > 0 ? (
          <>
            <div className="task-summary">
              <div className="summary-tile air-card">
                <p className="section-label">Overall Rate</p>
                <h3>{overallRate}%</h3>
              </div>
              <div className="summary-tile air-card">
                <p className="section-label">Classes Marked</p>
                <h3>{total}</h3>
              </div>
              <div className="summary-tile air-card">
                <p className="section-label">Attended</p>
                <h3>{presentCount}</h3>
              </div>
            </div>

            <div className="modules-grid">
              {byModule.map(stat => (
                <article key={stat.module} className="module-card air-card">
                  <div className="module-header">
                    <div>
                      <span className="module-code">{stat.module}</span>
                      <h3>{stat.rate}% attended</h3>
                    </div>
                  </div>
                  <div className="rate-bar" role="img" aria-label={`${stat.rate} percent attendance`}>
                    <div className="rate-fill" style={{ width: `${stat.rate}%` }} />
                  </div>
                  <div className="module-details">
                    <div className="detail-item">
                      <span className="detail-label">Present:</span>
                      <span>{stat.present} of {stat.total}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="air-card record-list">
              <p className="section-label">Recent Records</p>
              <ul>
                {sortedRecords.map(record => (
                  <li key={record.id}>
                    <span className="record-date">{record.date}</span>
                    <p>{record.module}</p>
                    <span className={`status-tag status-${record.status.toLowerCase()}`}>
                      {record.status}
                    </span>
                    <button
                      type="button"
                      className="icon-btn"
                      onClick={() => handleDelete(record.id)}
                      aria-label="Delete record"
                    >
                      🗑️
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div className="empty-state air-card">
            <p>No attendance recorded yet — mark a class above to see your stats</p>
          </div>
        )}
      </section>

      <section className="more-section">
        <h3>About SmartBee</h3>
        <p className="muted">
          SmartBee is an open source platform that brings modules, planning, attendance,
          and an AI study companion into one place. Contributions are welcome.
        </p>
        <div className="modules-grid">
          <article className="module-card air-card">
            <h3>Documentation</h3>
            <p className="muted">
              API reference and interactive docs are served by the backend at
              <code> /api/docs</code> when it is running locally.
            </p>
          </article>
          <article className="module-card air-card">
            <h3>Contributing</h3>
            <p className="muted">
              Fork the repository, branch from <code>main</code>, and keep pull requests
              focused. See the root README for the full guide.
            </p>
          </article>
        </div>
      </section>
    </div>
  )
}

export default More
