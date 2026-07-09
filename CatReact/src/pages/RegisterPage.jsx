import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthShell from '../components/AuthShell'
import PasswordField from '../components/PasswordField'
import { appRoutes } from '../config/site'
import { createFieldSetter } from '../utils/form'

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
  const setField = createFieldSetter(setForm)

  function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)

    window.setTimeout(() => {
      setLoading(false)
      navigate('/')
    }, 800)
  }

  return (
    <AuthShell
      title="Criar conta"
      description="Junte-se a comunidade MiauLar e publique perfis com a mesma identidade visual."
      footer={
        <>
          Ja tem uma conta? <Link to={`/${appRoutes.login}`}>Entrar</Link>
        </>
      }
    >
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

          <PasswordField
            label="Senha"
            name="password"
            value={form.password}
            onChange={setField('password')}
            placeholder="Minimo 8 caracteres"
            showPassword={showPwd}
            onToggleVisibility={() => setShowPwd((value) => !value)}
          />

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
    </AuthShell>
  )
}
