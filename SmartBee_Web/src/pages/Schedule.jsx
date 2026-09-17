import { useState } from 'react'
import '../App.css'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const TYPES = ['Lecture', 'Lab', 'Tutorial', 'Seminar']

const emptyForm = {
  day: 'Monday',
  title: '',
  code: '',
  start: '',
  end: '',
  room: '',
  type: 'Lecture'
}

function Schedule() {
  const [entries, setEntries] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [view, setView] = useState('grid')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editingId) {
      setEntries(entries.map(entry =>
        entry.id === editingId ? { ...formData, id: editingId } : entry
      ))
      setEditingId(null)
    } else {
      setEntries([...entries, { ...formData, id: Date.now() }])
    }

    setFormData(emptyForm)
    setShowForm(false)
  }

  const handleEdit = (entry) => {
    setFormData(entry)
    setEditingId(entry.id)
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (confirm('Remove this class from your schedule?')) {
      setEntries(entries.filter(entry => entry.id !== id))
    }
  }

  const handleCancel = () => {
    setFormData(emptyForm)
    setEditingId(null)
    setShowForm(false)
  }

  const sortByTime = (a, b) => a.start.localeCompare(b.start)

  const renderEntry = (entry) => (
    <article key={entry.id} className="class-block">
      <div className="class-block-head">
        <span className="class-time">{entry.start} – {entry.end}</span>
        <div className="module-actions">
          <button
            type="button"
            className="icon-btn"
            onClick={() => handleEdit(entry)}
            aria-label="Edit class"
          >
            ✏️
          </button>
          <button
            type="button"
            className="icon-btn"
            onClick={() => handleDelete(entry.id)}
            aria-label="Remove class"
          >
            🗑️
          </button>
        </div>
      </div>
      <h4>{entry.title}</h4>
      <p className="muted">{[entry.code, entry.room].filter(Boolean).join(' • ')}</p>
      <span className="class-tag">{entry.type}</span>
    </article>
  )

  return (
    <div className="modules-page">
      <div className="page-header">
        <div>
          <h2>Weekly Schedule</h2>
          <p className="muted">Plan your classes, labs, and tutorials</p>
        </div>
        <div className="header-tools">
          <div className="view-toggle" role="group" aria-label="Schedule view">
            <button
              type="button"
              className={`toggle-chip ${view === 'grid' ? 'toggle-chip-active' : ''}`}
              onClick={() => setView('grid')}
            >
              Grid
            </button>
            <button
              type="button"
              className={`toggle-chip ${view === 'list' ? 'toggle-chip-active' : ''}`}
              onClick={() => setView('list')}
            >
              List
            </button>
          </div>
          <button
            type="button"
            className="primary-btn"
            onClick={() => (showForm ? handleCancel() : setShowForm(true))}
          >
            {showForm ? 'Cancel' : '+ Add Class'}
          </button>
        </div>
      </div>

      {showForm && (
        <form className="page-form air-card" onSubmit={handleSubmit}>
          <h3>{editingId ? 'Edit Class' : 'Add New Class'}</h3>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="title">Class Name</label>
              <input
                id="title"
                type="text"
                placeholder="e.g., Operating Systems"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="code">Module Code</label>
              <input
                id="code"
                type="text"
                placeholder="e.g., CS301"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label htmlFor="day">Day</label>
              <select
                id="day"
                value={formData.day}
                onChange={(e) => setFormData({ ...formData, day: e.target.value })}
              >
                {DAYS.map(day => <option key={day} value={day}>{day}</option>)}
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="type">Type</label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                {TYPES.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="start">Start Time</label>
              <input
                id="start"
                type="time"
                value={formData.start}
                onChange={(e) => setFormData({ ...formData, start: e.target.value })}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="end">End Time</label>
              <input
                id="end"
                type="time"
                value={formData.end}
                onChange={(e) => setFormData({ ...formData, end: e.target.value })}
                required
              />
            </div>
            <div className="form-field full-width">
              <label htmlFor="room">Room</label>
              <input
                id="room"
                type="text"
                placeholder="e.g., Room B-204"
                value={formData.room}
                onChange={(e) => setFormData({ ...formData, room: e.target.value })}
              />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="primary-btn">
              {editingId ? 'Update Class' : 'Add Class'}
            </button>
            <button type="button" className="secondary-btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {entries.length > 0 && view === 'grid' && (
        <div className="week-grid">
          {DAYS.map(day => {
            const dayEntries = entries.filter(entry => entry.day === day).sort(sortByTime)
            return (
              <section key={day} className="day-column air-card">
                <div className="day-head">
                  <p className="section-label">{day.slice(0, 3)}</p>
                  <span className="day-count">{dayEntries.length}</span>
                </div>
                {dayEntries.length === 0
                  ? <p className="muted day-empty">No classes</p>
                  : dayEntries.map(renderEntry)}
              </section>
            )
          })}
        </div>
      )}

      {entries.length > 0 && view === 'list' && (
        <div className="schedule-list">
          {DAYS.map(day => {
            const dayEntries = entries.filter(entry => entry.day === day).sort(sortByTime)
            if (dayEntries.length === 0) return null
            return (
              <section key={day} className="list-day air-card">
                <h3>{day}</h3>
                <div className="list-day-entries">
                  {dayEntries.map(renderEntry)}
                </div>
              </section>
            )
          })}
        </div>
      )}

      {entries.length === 0 && !showForm && (
        <div className="empty-state air-card">
          <p>Your week is empty — add your first class to build a schedule</p>
          <button
            type="button"
            className="primary-btn"
            onClick={() => setShowForm(true)}
          >
            Add Your First Class
          </button>
        </div>
      )}

      {entries.length > 0 && (
        <p className="muted schedule-footnote">
          {entries.length} {entries.length === 1 ? 'class' : 'classes'} scheduled this week
        </p>
      )}
    </div>
  )
}

export default Schedule
