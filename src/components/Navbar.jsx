import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { to: '/',           label: 'Inicio' },
  { to: '/mapa',       label: 'Mapa' },
  { to: '/biblioteca', label: 'Herramientas' },
  {
    label: 'Kit Sensorial',
    basePath: '/kit',
    children: [
      { to: '/kit',          label: 'Kit Sensorial',   icon: 'fa-kit-medical',          color: 'text-sec' },
      { to: '/kit/senales',  label: 'Señales previas', icon: 'fa-triangle-exclamation', color: 'text-coral' },
      { to: '/kit/recursos', label: 'Recursos',        icon: 'fa-folder-open',          color: 'text-pri' },
    ],
  },
  { to: '/#contacto',  label: 'Contacto', scroll: true },
]

// ── Desktop dropdown ───────────────────────────────────────────────────────────

function DesktopDropdown({ link, pathname }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const active = pathname.startsWith(link.basePath)

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 ${
          active ? 'bg-white/8 text-text' : 'text-muted hover:text-text hover:bg-white/5'
        }`}
      >
        {link.label}
        <i
          className={`fa-solid fa-chevron-down text-[9px] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.14 }}
            className="absolute top-full left-0 mt-1.5 w-52 rounded-xl border border-border bg-bg/98 backdrop-blur-md shadow-xl shadow-black/30 overflow-hidden z-50 py-1"
            role="menu"
          >
            {link.children.map((child) => {
              const childActive = pathname === child.to
              return (
                <Link
                  key={child.to}
                  to={child.to}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150 hover:bg-white/5 ${
                    childActive ? 'text-text font-semibold' : 'text-muted'
                  }`}
                >
                  <i className={`fa-solid ${child.icon} text-xs ${child.color}`} aria-hidden="true" />
                  {child.label}
                  {childActive && (
                    <i className="fa-solid fa-check text-[10px] text-pri ml-auto" aria-hidden="true" />
                  )}
                </Link>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Main Navbar ────────────────────────────────────────────────────────────────

export default function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [expandedMobile, setExpandedMobile] = useState(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setExpandedMobile(null)
  }, [pathname])

  const handleScrollLink = (e, to) => {
    if (!to.startsWith('/#')) return
    e.preventDefault()
    const id = to.slice(2)
    if (pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/', { state: { scrollTo: id } })
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
          {links.map((link) => {
            if (link.children) {
              return <DesktopDropdown key={link.label} link={link} pathname={pathname} />
            }
            const active = link.scroll ? false : pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={(e) => link.scroll && handleScrollLink(e, link.to)}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 ${
                  active
                    ? 'bg-white/8 text-text'
                    : 'text-muted hover:text-text hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            )
          })}

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
            className="md:hidden border-t border-border bg-bg/98 backdrop-blur-md px-5 pb-4 pt-3 flex flex-col gap-0.5"
            aria-label="Menú móvil"
          >
            {links.map((link) => {
              if (link.children) {
                const isExpanded = expandedMobile === link.label
                const isActive = pathname.startsWith(link.basePath)
                return (
                  <div key={link.label}>
                    <button
                      type="button"
                      onClick={() => setExpandedMobile(isExpanded ? null : link.label)}
                      aria-expanded={isExpanded}
                      className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        isActive ? 'text-text bg-white/5' : 'text-muted hover:text-text hover:bg-white/5'
                      }`}
                    >
                      {link.label}
                      <i
                        className={`fa-solid fa-chevron-down text-[10px] transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="ml-4 mt-1 mb-1.5 border-l border-border/50 pl-3 flex flex-col gap-0.5">
                            {link.children.map((child) => {
                              const childActive = pathname === child.to
                              return (
                                <Link
                                  key={child.to}
                                  to={child.to}
                                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                                    childActive
                                      ? 'text-text font-semibold bg-white/5'
                                      : 'text-muted hover:text-text hover:bg-white/5'
                                  }`}
                                >
                                  <i className={`fa-solid ${child.icon} text-xs ${child.color}`} aria-hidden="true" />
                                  {child.label}
                                </Link>
                              )
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              }

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={(e) => link.scroll && handleScrollLink(e, link.to)}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-muted hover:text-text hover:bg-white/5 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              )
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
