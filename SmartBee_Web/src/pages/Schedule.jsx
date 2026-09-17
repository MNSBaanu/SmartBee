import { useState } from 'react'
import '../App.css'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const TYPES = ['Lecture', 'Lab', 'Tutorial', 'Seminar']

const TYPE_ICONS = {
  Lecture: 'co_present',
  Lab: 'science',
  Tutorial: 'groups',
  Seminar: 'record_voice_over'
}

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

  const renderEntry = (entry, index) => (
    <article key={entry.id} className={`class-block accent-${index % 4}`}>
      <div className="class-block-head">
        <span className="class-time">
          <span className="material-symbols-outlined">schedule</span>
          {entry.start} – {entry.end}
        </span>
        <div className="row-actions">
          <button
            type="button"
            className="icon-btn icon-btn-sm"
            onClick={() => handleEdit(entry)}
            aria-label="Edit class"
          >
            <span className="material-symbols-outlined">edit</span>
          </button>
          <button
            type="button"
            className="icon-btn icon-btn-sm icon-btn-danger"
            onClick={() => handleDelete(entry.id)}
            aria-label="Remove class"
          >
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>
      </div>
      <h4>{entry.title}</h4>
      {(entry.code || entry.room) && (
        <p className="muted small">{[entry.code, entry.room].filter(Boolean).join(' • ')}</p>
      )}
      <span className="pill pill-soft">
        <span className="material-symbols-outlined">{TYPE_ICONS[entry.type]}</span>
        {entry.type}
      </span>
    </article>
  )

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Weekly Schedule</h2>
          <p className="muted">Plan your classes, labs, and tutorials</p>
        </div>
        <div className="header-tools">
          <div className="segmented" role="group" aria-label="Schedule view">
            <button
              type="button"
              className={`seg ${view === 'grid' ? 'seg-active' : ''}`}
              onClick={() => setView('grid')}
            >
              <span className="material-symbols-outlined">grid_view</span>
              Grid
            </button>
            <button
              type="button"
              className={`seg ${view === 'list' ? 'seg-active' : ''}`}
              onClick={() => setView('list')}
            >
              <span className="material-symbols-outlined">view_agenda</span>
              List
            </button>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => (showForm ? handleCancel() : setShowForm(true))}
          >
            <span className="material-symbols-outlined">{showForm ? 'close' : 'add'}</span>
            {showForm ? 'Cancel' : 'Add Class'}
          </button>
        </div>
      </div>

      {showForm && (
        <form className="page-form card" onSubmit={handleSubmit}>
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
            <button type="submit" className="btn btn-primary">
              <span className="material-symbols-outlined">check</span>
              {editingId ? 'Update Class' : 'Add Class'}
            </button>
            <button type="button" className="btn btn-ghost" onClick={handleCancel}>
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
              <section key={day} className="day-column card">
                <div className="day-head">
                  <p className="eyebrow">{day.slice(0, 3)}</p>
                  <span className={`day-count ${dayEntries.length ? 'day-count-on' : ''}`}>
                    {dayEntries.length}
                  </span>
                </div>
                {dayEntries.length === 0
                  ? <p className="muted small day-empty">Free day</p>
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
              <section key={day} className="card list-day">
                <div className="card-head">
                  <h3>{day}</h3>
                  <span className="pill pill-soft">{dayEntries.length} scheduled</span>
                </div>
                <div className="list-day-entries">
                  {dayEntries.map(renderEntry)}
                </div>
              </section>
            )
          })}
        </div>
      )}

      {entries.length === 0 && !showForm && (
        <div className="empty-state card">
          <div className="empty-icon">
            <span className="material-symbols-outlined">calendar_month</span>
          </div>
          <h3>Your week is empty</h3>
          <p className="muted">Add your first class to start building a weekly schedule.</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
          >
            <span className="material-symbols-outlined">add</span>
            Add Your First Class
          </button>
        </div>
      )}

      {entries.length > 0 && (
        <p className="muted small page-footnote">
          {entries.length} {entries.length === 1 ? 'class' : 'classes'} scheduled this week
        </p>
      )}
    </div>
  )
}

export default Schedule
