import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthShell from '../components/AuthShell'
import PasswordField from '../components/PasswordField'
import { appRoutes } from '../config/site'

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
    <AuthShell
      title="Bem-vindo de volta"
      description="Entre para continuar ajudando gatinhos a encontrarem um novo lar."
      footer={
        <>
          Ainda nao tem conta? <Link to={`/${appRoutes.register}`}>Cadastre-se</Link>
        </>
      }
    >
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

          <PasswordField
            label="Senha"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Digite sua senha"
            showPassword={showPwd}
            onToggleVisibility={() => setShowPwd((value) => !value)}
          />

          <button type="submit" className="button button-primary button-block" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
    </AuthShell>
  )
}
