import { Cat, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const initialForm = {
  name: '',
  email: '',
  city: '',
  password: '',
  confirm: '',
}

export default function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)

  function setField(field) {
    return (event) => {
      setForm((current) => ({ ...current, [field]: event.target.value }))
    }
  }

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
          <h1>Criar conta</h1>
          <p>Junte-se a comunidade MiauLar e publique perfis com a mesma identidade visual.</p>
        </div>

        <form className="stack-form" onSubmit={handleSubmit}>
          <label className="field">
            <span className="field-label">Nome completo</span>
            <input value={form.name} onChange={setField('name')} placeholder="Maria Silva" required />
          </label>

          <label className="field">
            <span className="field-label">E-mail</span>
            <input type="email" value={form.email} onChange={setField('email')} placeholder="seu@email.com" required />
          </label>

          <label className="field">
            <span className="field-label">Cidade</span>
            <input value={form.city} onChange={setField('city')} placeholder="Sao Paulo, SP" required />
          </label>

          <label className="field">
            <span className="field-label">Senha</span>
            <span className="password-field">
              <input
                type={showPwd ? 'text' : 'password'}
                value={form.password}
                onChange={setField('password')}
                placeholder="Minimo 8 caracteres"
                required
              />
              <button type="button" onClick={() => setShowPwd((value) => !value)}>
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </span>
          </label>

          <label className="field">
            <span className="field-label">Confirmar senha</span>
            <input
              type="password"
              value={form.confirm}
              onChange={setField('confirm')}
              placeholder="Repita a senha"
              required
            />
          </label>

          <button type="submit" className="button button-primary button-block" disabled={loading}>
            {loading ? 'Criando conta...' : 'Criar conta'}
          </button>
        </form>

        <p className="auth-footnote">
          Ja tem uma conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </section>
  )
}
