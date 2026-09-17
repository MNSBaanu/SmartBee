import { useState } from 'react'
import '../App.css'

const emptyForm = {
  code: '',
  name: '',
  credits: '',
  semester: '',
  instructor: ''
}

function Modules() {
  const [modules, setModules] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editingId) {
      setModules(modules.map(mod =>
        mod.id === editingId ? { ...formData, id: editingId } : mod
      ))
      setEditingId(null)
    } else {
      setModules([...modules, { ...formData, id: Date.now() }])
    }

    setFormData(emptyForm)
    setShowForm(false)
  }

  const handleEdit = (module) => {
    setFormData(module)
    setEditingId(module.id)
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (confirm('Remove this blossom from your garden?')) {
      setModules(modules.filter(mod => mod.id !== id))
    }
  }

  const handleCancel = () => {
    setFormData(emptyForm)
    setEditingId(null)
    setShowForm(false)
  }

  const totalCredits = modules.reduce((sum, mod) => sum + (Number(mod.credits) || 0), 0)

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Your Blossoms</h2>
          <p className="muted">Every module your bee gathers knowledge from</p>
        </div>
        <div className="header-tools">
          {modules.length > 0 && (
            <span className="pill pill-soft">
              <span className="material-symbols-outlined">workspace_premium</span>
              {totalCredits} credits
            </span>
          )}
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => (showForm ? handleCancel() : setShowForm(true))}
          >
            <span className="material-symbols-outlined">{showForm ? 'close' : 'add'}</span>
            {showForm ? 'Cancel' : 'Add Blossom'}
          </button>
        </div>
      </div>

      {showForm && (
        <form className="page-form card" onSubmit={handleSubmit}>
          <h3>{editingId ? 'Edit Blossom' : 'Add New Blossom'}</h3>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="code">Module Code</label>
              <input
                id="code"
                type="text"
                placeholder="e.g., CS301"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="name">Module Name</label>
              <input
                id="name"
                type="text"
                placeholder="e.g., Operating Systems"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="credits">Credits</label>
              <input
                id="credits"
                type="number"
                placeholder="e.g., 4"
                value={formData.credits}
                onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="semester">Semester</label>
              <input
                id="semester"
                type="text"
                placeholder="e.g., Fall 2026"
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                required
              />
            </div>
            <div className="form-field full-width">
              <label htmlFor="instructor">Instructor</label>
              <input
                id="instructor"
                type="text"
                placeholder="e.g., Dr. Smith"
                value={formData.instructor}
                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              <span className="material-symbols-outlined">check</span>
              {editingId ? 'Update Blossom' : 'Add Blossom'}
            </button>
            <button type="button" className="btn btn-ghost" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="card-grid">
        {modules.map((module, index) => (
          <article key={module.id} className={`card entity-card accent-${index % 4}`}>
            <div className="entity-head">
              <div className="entity-badge">{module.code.slice(0, 2).toUpperCase()}</div>
              <div className="entity-title">
                <span className="pill pill-soft">{module.code}</span>
                <h3>{module.name}</h3>
              </div>
              <div className="row-actions">
                <button
                  type="button"
                  className="icon-btn"
                  onClick={() => handleEdit(module)}
                  aria-label="Edit module"
                >
                  <span className="material-symbols-outlined">edit</span>
                </button>
                <button
                  type="button"
                  className="icon-btn icon-btn-danger"
                  onClick={() => handleDelete(module.id)}
                  aria-label="Delete module"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>

            <div className="detail-list">
              <div className="detail-item">
                <span className="detail-label">
                  <span className="material-symbols-outlined">workspace_premium</span>
                  Credits
                </span>
                <span>{module.credits}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">
                  <span className="material-symbols-outlined">calendar_today</span>
                  Semester
                </span>
                <span>{module.semester}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">
                  <span className="material-symbols-outlined">person</span>
                  Instructor
                </span>
                <span>{module.instructor}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {modules.length === 0 && !showForm && (
        <div className="empty-state card">
          <div className="empty-icon">
            <span className="material-symbols-outlined">local_florist</span>
          </div>
          <h3>No blossoms yet</h3>
          <p className="muted">Add your courses so Bee knows where to forage.</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
          >
            <span className="material-symbols-outlined">add</span>
            Plant Your First Blossom
          </button>
        </div>
      )}
    </div>
  )
}

export default Modules
