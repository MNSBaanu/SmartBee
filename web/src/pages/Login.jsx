import { useState } from 'react'
import { useAuth } from '../auth'

export default function Login() {
  const { login, register } = useAuth()
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const isRegister = mode === 'register'
  const update = field => e => setForm(prev => ({ ...prev, [field]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      if (isRegister) await register(form.name, form.email, form.password)
      else await login(form.email, form.password)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="auth-page">
      <form className="card auth-card" onSubmit={submit}>
        <img src="/SmartBee.png" alt="" className="brand-logo" />
        <h2>{isRegister ? 'Create your account' : 'Welcome back'}</h2>
        {isRegister && (
          <input
            className="auth-input"
            placeholder="Name"
            value={form.name}
            onChange={update('name')}
            required
          />
        )}
        <input
          className="auth-input"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={update('email')}
          required
        />
        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          minLength={8}
          value={form.password}
          onChange={update('password')}
          required
        />
        {error && <p className="auth-error">{error}</p>}
        <button type="submit" className="btn btn-primary btn-block" disabled={busy}>
          {isRegister ? 'Sign up' : 'Log in'}
        </button>
        <button
          type="button"
          className="btn btn-ghost btn-block"
          onClick={() => {
            setError('')
            setMode(isRegister ? 'login' : 'register')
          }}
        >
          {isRegister ? 'I already have an account' : 'Create an account'}
        </button>
      </form>
    </div>
  )
}
