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

  const isOverdue = (task) =>
    !task.completed && task.dueDate && new Date(`${task.dueDate}T23:59:59`) < new Date()

  const overdueCount = tasks.filter(isOverdue).length
  const progress = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0

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

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Tasks</h2>
          <p className="muted">Track assignments, deadlines, and study goals</p>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => (showForm ? handleCancel() : setShowForm(true))}
        >
          <span className="material-symbols-outlined">{showForm ? 'close' : 'add'}</span>
          {showForm ? 'Cancel' : 'Add Task'}
        </button>
      </div>

      {tasks.length > 0 && (
        <section className="stat-row">
          <article className="stat-tile card tone-info">
            <span className="stat-icon material-symbols-outlined icon-fill">pending_actions</span>
            <p className="eyebrow">Active</p>
            <h3>{activeCount}</h3>
            <p className="muted small">Still to do</p>
          </article>
          <article className="stat-tile card tone-success">
            <span className="stat-icon material-symbols-outlined icon-fill">task_alt</span>
            <p className="eyebrow">Completed</p>
            <h3>{completedCount}</h3>
            <p className="muted small">Nicely done</p>
          </article>
          <article className="stat-tile card tone-danger">
            <span className="stat-icon material-symbols-outlined icon-fill">running_with_errors</span>
            <p className="eyebrow">Overdue</p>
            <h3>{overdueCount}</h3>
            <p className="muted small">Needs attention</p>
          </article>
          <article className="stat-tile card tone-bee">
            <span className="stat-icon material-symbols-outlined icon-fill">trending_up</span>
            <p className="eyebrow">Progress</p>
            <h3>{progress}%</h3>
            <div className="progress">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </article>
        </section>
      )}

      {showForm && (
        <form className="page-form card" onSubmit={handleSubmit}>
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
            <button type="submit" className="btn btn-primary">
              <span className="material-symbols-outlined">check</span>
              {editingId ? 'Update Task' : 'Add Task'}
            </button>
            <button type="button" className="btn btn-ghost" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {tasks.length > 0 && (
        <div className="segmented task-filters" role="group" aria-label="Filter tasks">
          {FILTERS.map(name => (
            <button
              key={name}
              type="button"
              className={`seg ${filter === name ? 'seg-active' : ''}`}
              onClick={() => setFilter(name)}
            >
              {name}
              <span className="seg-count">{countFor(name)}</span>
            </button>
          ))}
        </div>
      )}

      <div className="task-list">
        {visibleTasks.map(task => (
          <article
            key={task.id}
            className={`card task-card prio-${task.priority.toLowerCase()} ${task.completed ? 'task-done' : ''}`}
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
                <span className={`pill pill-${task.priority.toLowerCase()}`}>{task.priority}</span>
              </div>
              <div className="meta-row">
                {task.module && (
                  <span className="meta">
                    <span className="material-symbols-outlined">school</span>
                    {task.module}
                  </span>
                )}
                <span className={`meta ${isOverdue(task) ? 'meta-danger' : ''}`}>
                  <span className="material-symbols-outlined">event</span>
                  {formatDue(task.dueDate)}
                </span>
                {task.notes && (
                  <span className="meta">
                    <span className="material-symbols-outlined">sticky_note_2</span>
                    {task.notes}
                  </span>
                )}
              </div>
            </div>

            <div className="row-actions">
              <button
                type="button"
                className="icon-btn"
                onClick={() => handleEdit(task)}
                aria-label="Edit task"
              >
                <span className="material-symbols-outlined">edit</span>
              </button>
              <button
                type="button"
                className="icon-btn icon-btn-danger"
                onClick={() => handleDelete(task.id)}
                aria-label="Delete task"
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      {tasks.length === 0 && !showForm && (
        <div className="empty-state card">
          <div className="empty-icon">
            <span className="material-symbols-outlined">checklist</span>
          </div>
          <h3>No tasks yet</h3>
          <p className="muted">Add one to start tracking your deadlines and assignments.</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
          >
            <span className="material-symbols-outlined">add</span>
            Add Your First Task
          </button>
        </div>
      )}

      {tasks.length > 0 && visibleTasks.length === 0 && (
        <div className="empty-state card">
          <div className="empty-icon">
            <span className="material-symbols-outlined">inbox</span>
          </div>
          <h3>Nothing here</h3>
          <p className="muted">No {filter.toLowerCase()} tasks right now.</p>
        </div>
      )}
    </div>
  )
}

export default Tasks
