import { Eye, EyeOff } from 'lucide-react'

export default function PasswordField({
  id,
  label,
  value,
  onChange,
  placeholder,
  showPassword,
  onToggleVisibility,
  name,
  autoComplete,
  error,
  hint,
}) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined

  return (
    <div className="field">
      <label className="field-label" htmlFor={id}>
        {label}
      </label>
      <span className="password-field">
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={describedBy}
          required
        />
        <button
          type="button"
          onClick={onToggleVisibility}
          aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
          aria-pressed={showPassword ? 'true' : 'false'}
        >
          {showPassword ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
        </button>
      </span>
      {hint ? (
        <p id={hintId} className="field-hint">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="field-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
