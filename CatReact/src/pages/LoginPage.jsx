import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthShell from '../components/AuthShell'
import PasswordField from '../components/PasswordField'
import { appRoutes } from '../config/site'

function getLoginErrors({ email, password }) {
  const errors = {}

  if (!email.trim()) {
    errors.email = 'Informe seu e-mail para continuar.'
  } else if (!email.includes('@')) {
    errors.email = 'Digite um e-mail válido.'
  }

  if (!password.trim()) {
    errors.password = 'Informe sua senha.'
  } else if (password.trim().length < 8) {
    errors.password = 'Use pelo menos 8 caracteres.'
  }

  return errors
}

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const errors = useMemo(() => getLoginErrors({ email, password }), [email, password])

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)

    if (Object.keys(errors).length > 0) {
      return
    }

    setLoading(true)

    window.setTimeout(() => {
      setLoading(false)
      navigate(appRoutes.home)
    }, 800)
  }

  const emailError = submitted ? errors.email : ''
  const passwordError = submitted ? errors.password : ''

  return (
    <AuthShell
      title="Bem-vindo de volta"
      description="Entre para continuar ajudando gatinhos a encontrarem um novo lar."
      footer={
        <>
          Ainda não tem conta? <Link to={`/${appRoutes.register}`}>Cadastre-se</Link>
        </>
      }
    >
      <form className="stack-form" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label className="field-label" htmlFor="login-email">
            E-mail
          </label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="seu@email.com"
            autoComplete="email"
            aria-invalid={emailError ? 'true' : 'false'}
            aria-describedby={emailError ? 'login-email-error' : 'login-email-hint'}
            required
          />
          <p id="login-email-hint" className="field-hint">
            Use o mesmo e-mail cadastrado na plataforma.
          </p>
          {emailError ? (
            <p id="login-email-error" className="field-error" role="alert">
              {emailError}
            </p>
          ) : null}
        </div>

        <PasswordField
          id="login-password"
          label="Senha"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Digite sua senha"
          showPassword={showPwd}
          onToggleVisibility={() => setShowPwd((value) => !value)}
          autoComplete="current-password"
          error={passwordError}
          hint="Sua senha deve ter pelo menos 8 caracteres."
        />

        <button
          type="submit"
          className="button button-primary button-block"
          disabled={loading}
          aria-busy={loading ? 'true' : 'false'}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </AuthShell>
  )
}
