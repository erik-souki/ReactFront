import { Eye, EyeOff } from 'lucide-react'

export default function PasswordField({
  label,
  value,
  onChange,
  placeholder,
  showPassword,
  onToggleVisibility,
  name,
}) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      <span className="password-field">
        <input
          type={showPassword ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
        />
        <button type="button" onClick={onToggleVisibility}>
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </span>
    </label>
  )
}
