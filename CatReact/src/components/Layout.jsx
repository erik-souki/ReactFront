import { Cat, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { desktopActionItems, footerLinks, mobileActionItems, navItems } from '../config/site'

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="site-header__inner">
          <Link to="/" className="brand" onClick={() => setMenuOpen(false)}>
            <span className="brand__mark">
              <Cat size={26} strokeWidth={1.8} />
            </span>
            <span className="brand__name">MiauLar</span>
          </Link>

          <nav className="site-nav">
            {navItems.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `site-nav__link${isActive ? ' is-active' : ''}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="site-actions">
            {desktopActionItems.map(({ to, label, icon: Icon, variant }) => (
              <Link key={to} to={to} className={`site-actions__${variant}`}>
                <Icon size={15} />
                {label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            className="site-menu-toggle"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen ? (
          <div className="site-mobile-menu">
            {navItems.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `site-mobile-menu__link${isActive ? ' is-active' : ''}`
                }
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            ))}
            {mobileActionItems.map(({ to, label, primary }) => (
              <Link
                key={to}
                to={to}
                className={`site-mobile-menu__link${
                  primary ? ' site-mobile-menu__link--primary' : ''
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        ) : null}
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="site-footer__inner">
          <div className="site-footer__brand">
            <Cat size={18} />
            <span>MiauLar</span>
          </div>
          <p>Conectando gatos a lares cheios de amor.</p>
          <div className="site-footer__links">
            {footerLinks.map(({ to, label }) => (
              <Link key={to} to={to}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
