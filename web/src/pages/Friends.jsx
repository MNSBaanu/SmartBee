import { useState } from 'react'
import '../App.css'

const MY_YEAR = 3
const MY_MODULES = ['CS301', 'CS310', 'CS322']

// Placeholder directory - replace with GET /api/students once the endpoint exists.
const STUDENTS = [
  { id: 1, name: 'Aarav Mehta', programme: 'Computer Science', year: 3, modules: ['CS301', 'CS322', 'CS340'] },
  { id: 2, name: 'Priya Raman', programme: 'Computer Science', year: 3, modules: ['CS301', 'CS310'] },
  { id: 3, name: 'Kavin Dass', programme: 'Data Science', year: 2, modules: ['DS210', 'CS301'] },
  { id: 4, name: 'Nisha Fernando', programme: 'Software Engineering', year: 3, modules: ['SE330', 'CS322'] },
  { id: 5, name: 'Rahul Verma', programme: 'Computer Science', year: 4, modules: ['CS410', 'CS322'] },
  { id: 6, name: 'Sanjana Iyer', programme: 'Information Systems', year: 2, modules: ['IS220'] },
  { id: 7, name: 'Dinesh Kumar', programme: 'Computer Science', year: 3, modules: ['CS310', 'CS322', 'CS301'] },
  { id: 8, name: 'Meera Nair', programme: 'Data Science', year: 4, modules: ['DS410', 'CS310'] }
]

const FILTERS = ['All Students', 'Same Modules', 'Same Year', 'My Friends']

const initials = (name) =>
  name.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase()

const sharedModules = (student) =>
  student.modules.filter(code => MY_MODULES.includes(code))

function Friends() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All Students')
  const [friendIds, setFriendIds] = useState([])

  const toggleFriend = (id) => {
    setFriendIds(friendIds.includes(id)
      ? friendIds.filter(friendId => friendId !== id)
      : [...friendIds, id])
  }

  const countFor = (name) => {
    if (name === 'Same Modules') return STUDENTS.filter(s => sharedModules(s).length > 0).length
    if (name === 'Same Year') return STUDENTS.filter(s => s.year === MY_YEAR).length
    if (name === 'My Friends') return friendIds.length
    return STUDENTS.length
  }

  const visibleStudents = STUDENTS
    .filter(student => {
      if (filter === 'Same Modules') return sharedModules(student).length > 0
      if (filter === 'Same Year') return student.year === MY_YEAR
      if (filter === 'My Friends') return friendIds.includes(student.id)
      return true
    })
    .filter(student => {
      const term = query.trim().toLowerCase()
      if (!term) return true
      return student.name.toLowerCase().includes(term)
        || student.programme.toLowerCase().includes(term)
        || student.modules.some(code => code.toLowerCase().includes(term))
    })
    .sort((a, b) => sharedModules(b).length - sharedModules(a).length)

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Find Friends</h2>
          <p className="muted">Connect with students on your modules and in your year</p>
        </div>
        <span className="pill pill-soft">
          <span className="material-symbols-outlined">group</span>
          {friendIds.length} connected
        </span>
      </div>

      <div className="search-field card">
        <span className="material-symbols-outlined">search</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, programme, or module code…"
          aria-label="Search students"
        />
        {query && (
          <button
            type="button"
            className="icon-btn icon-btn-sm"
            onClick={() => setQuery('')}
            aria-label="Clear search"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        )}
      </div>

      <div className="segmented friend-filters" role="group" aria-label="Filter students">
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

      <div className="card-grid">
        {visibleStudents.map((student, index) => {
          const shared = sharedModules(student)
          const isFriend = friendIds.includes(student.id)

          return (
            <article key={student.id} className={`card friend-card accent-${index % 4}`}>
              <div className="friend-head">
                <div className="friend-avatar">{initials(student.name)}</div>
                <div className="friend-title">
                  <h3>{student.name}</h3>
                  <p className="muted small">{student.programme} • Year {student.year}</p>
                </div>
              </div>

              <div className="friend-modules">
                {shared.length > 0 ? (
                  shared.map(code => (
                    <span key={code} className="pill pill-bee">
                      <span className="material-symbols-outlined">school</span>
                      {code}
                    </span>
                  ))
                ) : (
                  <span className="pill pill-soft">No shared modules</span>
                )}
              </div>

              <div className="friend-actions">
                <button
                  type="button"
                  className={`btn ${isFriend ? 'btn-ghost' : 'btn-primary'}`}
                  onClick={() => toggleFriend(student.id)}
                >
                  <span className="material-symbols-outlined">
                    {isFriend ? 'how_to_reg' : 'person_add'}
                  </span>
                  {isFriend ? 'Connected' : 'Connect'}
                </button>
                {isFriend && (
                  <button type="button" className="btn btn-soft">
                    <span className="material-symbols-outlined">chat_bubble</span>
                    Message
                  </button>
                )}
              </div>
            </article>
          )
        })}
      </div>

      {visibleStudents.length === 0 && (
        <div className="empty-state card">
          <div className="empty-icon">
            <span className="material-symbols-outlined">person_search</span>
          </div>
          <h3>No students found</h3>
          <p className="muted">
            {filter === 'My Friends'
              ? 'You have not connected with anyone yet.'
              : 'Try a different search or filter.'}
          </p>
        </div>
      )}
    </div>
  )
}

export default Friends
