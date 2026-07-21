import { useMemo, useState } from 'react'
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

function getRegisterErrors(form) {
  const errors = {}

  if (!form.name.trim()) {
    errors.name = 'Informe seu nome completo.'
  }

  if (!form.email.trim()) {
    errors.email = 'Informe um e-mail para criar sua conta.'
  } else if (!form.email.includes('@')) {
    errors.email = 'Digite um e-mail válido.'
  }

  if (!form.city.trim()) {
    errors.city = 'Informe sua cidade.'
  }

  if (!form.password.trim()) {
    errors.password = 'Crie uma senha para proteger sua conta.'
  } else if (form.password.trim().length < 8) {
    errors.password = 'Use pelo menos 8 caracteres.'
  }

  if (!form.confirm.trim()) {
    errors.confirm = 'Repita a senha para confirmar.'
  } else if (form.confirm !== form.password) {
    errors.confirm = 'As senhas precisam ser iguais.'
  }

  return errors
}

export default function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [showPwd, setShowPwd] = useState(false)
  const [showConfirmPwd, setShowConfirmPwd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const setField = createFieldSetter(setForm)

  const errors = useMemo(() => getRegisterErrors(form), [form])

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

  const visibleErrors = submitted ? errors : {}

  return (
    <AuthShell
      title="Criar conta"
      description="Junte-se à comunidade MiauLar e publique perfis com segurança e acolhimento."
      footer={
        <>
          Já tem uma conta? <Link to={`/${appRoutes.login}`}>Entrar</Link>
        </>
      }
    >
      <form className="stack-form" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label className="field-label" htmlFor="register-name">
            Nome completo
          </label>
          <input
            id="register-name"
            value={form.name}
            onChange={setField('name')}
            placeholder="Maria Silva"
            autoComplete="name"
            aria-invalid={visibleErrors.name ? 'true' : 'false'}
            aria-describedby={visibleErrors.name ? 'register-name-error' : undefined}
            required
          />
          {visibleErrors.name ? (
            <p id="register-name-error" className="field-error" role="alert">
              {visibleErrors.name}
            </p>
          ) : null}
        </div>

        <div className="field">
          <label className="field-label" htmlFor="register-email">
            E-mail
          </label>
          <input
            id="register-email"
            type="email"
            value={form.email}
            onChange={setField('email')}
            placeholder="seu@email.com"
            autoComplete="email"
            aria-invalid={visibleErrors.email ? 'true' : 'false'}
            aria-describedby={visibleErrors.email ? 'register-email-error' : undefined}
            required
          />
          {visibleErrors.email ? (
            <p id="register-email-error" className="field-error" role="alert">
              {visibleErrors.email}
            </p>
          ) : null}
        </div>

        <div className="field">
          <label className="field-label" htmlFor="register-city">
            Cidade
          </label>
          <input
            id="register-city"
            value={form.city}
            onChange={setField('city')}
            placeholder="São Paulo, SP"
            autoComplete="address-level2"
            aria-invalid={visibleErrors.city ? 'true' : 'false'}
            aria-describedby={visibleErrors.city ? 'register-city-error' : undefined}
            required
          />
          {visibleErrors.city ? (
            <p id="register-city-error" className="field-error" role="alert">
              {visibleErrors.city}
            </p>
          ) : null}
        </div>

        <PasswordField
          id="register-password"
          label="Senha"
          name="password"
          value={form.password}
          onChange={setField('password')}
          placeholder="Mínimo de 8 caracteres"
          showPassword={showPwd}
          onToggleVisibility={() => setShowPwd((value) => !value)}
          autoComplete="new-password"
          error={visibleErrors.password}
          hint="Combine letras e números para deixar a conta mais segura."
        />

        <PasswordField
          id="register-confirm"
          label="Confirmar senha"
          name="confirm-password"
          value={form.confirm}
          onChange={setField('confirm')}
          placeholder="Repita a senha"
          showPassword={showConfirmPwd}
          onToggleVisibility={() => setShowConfirmPwd((value) => !value)}
          autoComplete="new-password"
          error={visibleErrors.confirm}
          hint="Repita exatamente a mesma senha do campo anterior."
        />

        <button
          type="submit"
          className="button button-primary button-block"
          disabled={loading}
          aria-busy={loading ? 'true' : 'false'}
        >
          {loading ? 'Criando conta...' : 'Criar conta'}
        </button>
      </form>
    </AuthShell>
  )
}
