import { Cat } from 'lucide-react'

export default function AuthShell({
  title,
  description,
  footer,
  children,
}) {
  return (
    <section className="auth-shell">
      <div className="auth-card">
        <div className="auth-hero">
          <div className="auth-hero__icon">
            <Cat size={26} />
          </div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>

        {children}

        {footer ? <p className="auth-footnote">{footer}</p> : null}
      </div>
    </section>
  )
}
