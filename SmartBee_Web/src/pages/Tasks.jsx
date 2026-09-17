import { useState } from 'react'
import '../App.css'

const PRIORITIES = ['High', 'Medium', 'Low']
const FILTERS = ['All', 'Active', 'Completed']

const emptyForm = {
  title: '',
  module: '',
  dueDate: '',
  priority: 'Medium',
  notes: ''
}

function Tasks() {
  const [tasks, setTasks] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [filter, setFilter] = useState('All')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (editingId) {
      setTasks(tasks.map(task =>
        task.id === editingId ? { ...task, ...formData } : task
      ))
      setEditingId(null)
    } else {
      setTasks([...tasks, { ...formData, id: Date.now(), completed: false }])
    }

    setFormData(emptyForm)
    setShowForm(false)
  }

  const handleEdit = (task) => {
    const { id, completed, ...rest } = task
    setFormData(rest)
    setEditingId(id)
    setShowForm(true)
  }

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== id))
    }
  }

  const handleToggle = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const handleCancel = () => {
    setFormData(emptyForm)
    setEditingId(null)
    setShowForm(false)
  }

  const activeCount = tasks.filter(task => !task.completed).length
  const completedCount = tasks.length - activeCount

  const countFor = (name) => {
    if (name === 'Active') return activeCount
    if (name === 'Completed') return completedCount
    return tasks.length
  }

  const visibleTasks = tasks
    .filter(task => {
      if (filter === 'Active') return !task.completed
      if (filter === 'Completed') return task.completed
      return true
    })
    .sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1
      if (a.dueDate !== b.dueDate) {
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return a.dueDate.localeCompare(b.dueDate)
      }
      return PRIORITIES.indexOf(a.priority) - PRIORITIES.indexOf(b.priority)
    })

  const formatDue = (date) => {
    if (!date) return 'No due date'
    const due = new Date(`${date}T00:00:00`)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const days = Math.round((due - today) / 86400000)

    if (days === 0) return 'Due today'
    if (days === 1) return 'Due tomorrow'
    if (days < 0) return `Overdue by ${Math.abs(days)}d`
    return `Due in ${days}d`
  }

  const isOverdue = (task) =>
    !task.completed && task.dueDate && new Date(`${task.dueDate}T23:59:59`) < new Date()

  return (
    <div className="modules-page">
      <div className="page-header">
        <div>
          <h2>Tasks</h2>
          <p className="muted">Track assignments, deadlines, and study goals</p>
        </div>
        <button
          type="button"
          className="primary-btn"
          onClick={() => (showForm ? handleCancel() : setShowForm(true))}
        >
          {showForm ? 'Cancel' : '+ Add Task'}
        </button>
      </div>

      {tasks.length > 0 && (
        <div className="task-summary">
          <div className="summary-tile air-card">
            <p className="section-label">Active</p>
            <h3>{activeCount}</h3>
          </div>
          <div className="summary-tile air-card">
            <p className="section-label">Completed</p>
            <h3>{completedCount}</h3>
          </div>
          <div className="summary-tile air-card">
            <p className="section-label">Overdue</p>
            <h3>{tasks.filter(isOverdue).length}</h3>
          </div>
        </div>
      )}

      {showForm && (
        <form className="page-form air-card" onSubmit={handleSubmit}>
          <h3>{editingId ? 'Edit Task' : 'Add New Task'}</h3>
          <div className="form-grid">
            <div className="form-field full-width">
              <label htmlFor="title">Task</label>
              <input
                id="title"
                type="text"
                placeholder="e.g., Complete AI Mini Project"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="module">Module</label>
              <input
                id="module"
                type="text"
                placeholder="e.g., CS301"
                value={formData.module}
                onChange={(e) => setFormData({ ...formData, module: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label htmlFor="dueDate">Due Date</label>
              <input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              >
                {PRIORITIES.map(level => <option key={level} value={level}>{level}</option>)}
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="notes">Notes</label>
              <input
                id="notes"
                type="text"
                placeholder="Optional details"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="primary-btn">
              {editingId ? 'Update Task' : 'Add Task'}
            </button>
            <button type="button" className="secondary-btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {tasks.length > 0 && (
        <div className="view-toggle task-filters" role="group" aria-label="Filter tasks">
          {FILTERS.map(name => (
            <button
              key={name}
              type="button"
              className={`toggle-chip ${filter === name ? 'toggle-chip-active' : ''}`}
              onClick={() => setFilter(name)}
            >
              {name} ({countFor(name)})
            </button>
          ))}
        </div>
      )}

      <div className="task-list">
        {visibleTasks.map(task => (
          <article
            key={task.id}
            className={`task-card air-card ${task.completed ? 'task-done' : ''}`}
          >
            <label className="task-check">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggle(task.id)}
              />
              <span className="sr-only">Mark {task.title} as complete</span>
            </label>

            <div className="task-body">
              <div className="task-title-row">
                <h3>{task.title}</h3>
                <span className={`priority-tag priority-${task.priority.toLowerCase()}`}>
                  {task.priority}
                </span>
              </div>
              <p className="muted">
                {[
                  task.module,
                  task.notes
                ].filter(Boolean).join(' • ') || 'No module assigned'}
              </p>
              <span className={`task-due ${isOverdue(task) ? 'task-overdue' : ''}`}>
                {formatDue(task.dueDate)}
              </span>
            </div>

            <div className="module-actions">
              <button
                type="button"
                className="icon-btn"
                onClick={() => handleEdit(task)}
                aria-label="Edit task"
              >
                ✏️
              </button>
              <button
                type="button"
                className="icon-btn"
                onClick={() => handleDelete(task.id)}
                aria-label="Delete task"
              >
                🗑️
              </button>
            </div>
          </article>
        ))}
      </div>

      {tasks.length === 0 && !showForm && (
        <div className="empty-state air-card">
          <p>No tasks yet — add one to start tracking your deadlines</p>
          <button
            type="button"
            className="primary-btn"
            onClick={() => setShowForm(true)}
          >
            Add Your First Task
          </button>
        </div>
      )}

      {tasks.length > 0 && visibleTasks.length === 0 && (
        <div className="empty-state air-card">
          <p>No {filter.toLowerCase()} tasks right now</p>
        </div>
      )}
    </div>
  )
}

export default Tasks
