import { useState } from 'react'
import '../App.css'

function Modules() {
  const [modules, setModules] = useState([
    { id: 1, code: 'CS301', name: 'Operating Systems', credits: 4, semester: 'Fall 2026', instructor: 'Dr. Smith' },
    { id: 2, code: 'CS302', name: 'Database Management Systems', credits: 4, semester: 'Fall 2026', instructor: 'Dr. Johnson' },
    { id: 3, code: 'CS303', name: 'Artificial Intelligence', credits: 3, semester: 'Fall 2026', instructor: 'Dr. Williams' },
  ])
  
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    credits: '',
    semester: '',
    instructor: ''
  })
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
    
    setFormData({ code: '', name: '', credits: '', semester: '', instructor: '' })
    setShowForm(false)
  }

  const handleEdit = (module) => {
    setFormData(module)
    setEditingId(module.id)
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this module?')) {
      setModules(modules.filter(mod => mod.id !== id))
    }
  }

  const handleCancel = () => {
    setFormData({ code: '', name: '', credits: '', semester: '', instructor: '' })
    setEditingId(null)
    setShowForm(false)
  }

  return (
    <div className="modules-page">
      <div className="modules-header">
        <div>
          <h2>Campus Modules</h2>
          <p className="muted">Manage your academic modules and courses</p>
        </div>
        <button 
          type="button" 
          className="primary-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : '+ Add Module'}
        </button>
      </div>

      {showForm && (
        <form className="module-form air-card" onSubmit={handleSubmit}>
          <h3>{editingId ? 'Edit Module' : 'Add New Module'}</h3>
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
            <button type="submit" className="primary-btn">
              {editingId ? 'Update Module' : 'Add Module'}
            </button>
            <button type="button" className="secondary-btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="modules-grid">
        {modules.map((module) => (
          <article key={module.id} className="module-card air-card">
            <div className="module-header">
              <div>
                <span className="module-code">{module.code}</span>
                <h3>{module.name}</h3>
              </div>
              <div className="module-actions">
                <button 
                  type="button" 
                  className="icon-btn"
                  onClick={() => handleEdit(module)}
                  aria-label="Edit module"
                >
                  ✏️
                </button>
                <button 
                  type="button" 
                  className="icon-btn"
                  onClick={() => handleDelete(module.id)}
                  aria-label="Delete module"
                >
                  🗑️
                </button>
              </div>
            </div>
            <div className="module-details">
              <div className="detail-item">
                <span className="detail-label">Credits:</span>
                <span>{module.credits}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Semester:</span>
                <span>{module.semester}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Instructor:</span>
                <span>{module.instructor}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {modules.length === 0 && !showForm && (
        <div className="empty-state air-card">
          <p>No modules added yet</p>
          <button 
            type="button" 
            className="primary-btn"
            onClick={() => setShowForm(true)}
          >
            Add Your First Module
          </button>
        </div>
      )}
    </div>
  )
}

export default Modules
