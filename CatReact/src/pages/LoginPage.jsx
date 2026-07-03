import { Cat, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)

    window.setTimeout(() => {
      setLoading(false)
      navigate('/')
    }, 800)
  }

  return (
    <section className="auth-shell">
      <div className="auth-card">
        <div className="auth-hero">
          <div className="auth-hero__icon">
            <Cat size={26} />
          </div>
          <h1>Bem-vindo de volta</h1>
          <p>Entre para continuar ajudando gatinhos a encontrarem um novo lar.</p>
        </div>

        <form className="stack-form" onSubmit={handleSubmit}>
          <label className="field">
            <span className="field-label">E-mail</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="seu@email.com"
              required
            />
          </label>

          <label className="field">
            <span className="field-label">Senha</span>
            <span className="password-field">
              <input
                type={showPwd ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Digite sua senha"
                required
              />
              <button type="button" onClick={() => setShowPwd((value) => !value)}>
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </span>
          </label>

          <button type="submit" className="button button-primary button-block" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="auth-footnote">
          Ainda nao tem conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </div>
    </section>
  )
}
