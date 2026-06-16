import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { to: '/',           label: 'Inicio' },
  { to: '/mapa',       label: 'Mapa' },
  { to: '/biblioteca', label: 'Herramientas' },
  { to: '/#contacto',  label: 'Contacto', scroll: true },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  const handleScrollLink = (e, to) => {
    if (!to.startsWith('/#')) return
    const id = to.slice(2)
    if (pathname === '/') {
      e.preventDefault()
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg/95 backdrop-blur-md border-b border-border shadow-lg shadow-black/20'
          : 'bg-bg/80 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-5 flex items-center justify-between h-[72px] gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label="Refugio Sensorial — inicio">
          <img src={`${import.meta.env.BASE_URL}logo-icon.svg`} alt="" className="h-10 w-auto" aria-hidden="true" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Navegación principal">
          {links.map(({ to, label, scroll }) => {
            const active = scroll ? false : pathname === to
            return (
              <Link
                key={to}
                to={to}
                onClick={(e) => scroll && handleScrollLink(e, to)}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 ${
                  active
                    ? 'bg-white/8 text-text'
                    : 'text-muted hover:text-text hover:bg-white/5'
                }`}
              >
                {label}
              </Link>
            )
          })}

          {/* Crisis button */}
          <Link
            to="/ayuda"
            className="ml-1 flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold text-coral border border-coral/25 bg-coral/5 hover:bg-coral/12 hover:border-coral/40 transition-all duration-200"
            aria-label="Necesito ayuda — acceso a recursos de apoyo en crisis"
          >
            <i className="fa-solid fa-heart-pulse text-xs" aria-hidden="true" />
            Necesito ayuda
          </Link>
        </nav>

        {/* Mobile right side */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            to="/ayuda"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-coral border border-coral/25 bg-coral/5"
            aria-label="Necesito ayuda"
          >
            <i className="fa-solid fa-heart-pulse" aria-hidden="true" />
            Ayuda
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="p-2 rounded-lg text-muted hover:text-text hover:bg-white/5 transition-colors duration-200"
          >
            <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'} text-base`} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden border-t border-border bg-bg/98 backdrop-blur-md px-5 pb-4 pt-3 flex flex-col gap-1"
            aria-label="Menú móvil"
          >
            {links.map(({ to, label, scroll }) => (
              <Link
                key={to}
                to={to}
                onClick={(e) => scroll && handleScrollLink(e, to)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-muted hover:text-text hover:bg-white/5 transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
