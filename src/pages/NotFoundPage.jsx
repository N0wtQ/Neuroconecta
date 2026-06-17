import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

const links = [
  { to: '/mapa',       icon: 'fa-location-dot', label: 'Mapa de espacios', color: 'text-pri bg-pri/10 border-pri/20'  },
  { to: '/biblioteca', icon: 'fa-toolbox',       label: 'Herramientas',     color: 'text-sec bg-sec/10 border-sec/20'  },
  { to: '/kit',        icon: 'fa-kit-medical',   label: 'Kit Sensorial',    color: 'text-acc bg-acc/10 border-acc/20'  },
]

export default function NotFoundPage() {
  const reduced = useReducedMotion()

  return (
    <div className="min-h-[80dvh] flex flex-col items-center justify-center px-6 py-12 text-center">

      {/* GIF animation with 404 number on top */}
      <motion.div
        initial={reduced ? {} : { opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.5, ease: 'easeOut' }}
        className="relative w-full max-w-sm h-52 sm:h-64 mb-2"
      >
        {/* Dribbble 404 GIF */}
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-80"
          style={{
            backgroundImage: "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')",
          }}
          role="img"
          aria-label="Ilustración animada de una página no encontrada"
        />
        {/* 404 number overlay */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-4 text-center text-7xl sm:text-8xl font-black text-text/90 leading-none select-none"
        >
          404
        </span>
      </motion.div>

      {/* Text */}
      <motion.div
        initial={reduced ? {} : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.15, ease: 'easeOut' }}
        className="max-w-xs"
      >
        <h1 className="text-2xl font-bold text-text mb-2 leading-snug">
          Esta página no existe
        </h1>
        <p className="text-sm text-muted leading-relaxed">
          No pasa nada. Puedes volver al inicio o ir a otra sección.
        </p>
      </motion.div>

      {/* Primary button */}
      <motion.div
        initial={reduced ? {} : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.25, ease: 'easeOut' }}
        className="mt-7"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2.5 px-7 py-3 rounded-xl bg-pri text-white font-semibold text-sm
                     shadow-lg shadow-pri/20 hover:bg-pri/90 active:scale-95
                     transition-all duration-200 focus-visible:outline-2 focus-visible:outline-pri focus-visible:outline-offset-2"
        >
          <i className="fa-solid fa-house text-sm" aria-hidden="true" />
          Volver al inicio
        </Link>
      </motion.div>

      {/* Quick-links */}
      <motion.div
        initial={reduced ? {} : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.35, ease: 'easeOut' }}
        className="mt-8 w-full max-w-xs"
      >
        <p className="text-xs text-faint mb-3 uppercase tracking-wider font-medium">
          O ve directamente a
        </p>
        <div className="flex flex-col gap-2">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium
                          transition-all duration-200 hover:-translate-x-0.5 hover:shadow-sm
                          focus-visible:outline-2 focus-visible:outline-pri focus-visible:outline-offset-2
                          ${l.color}`}
            >
              <i className={`fa-solid ${l.icon} text-sm shrink-0`} aria-hidden="true" />
              {l.label}
              <i className="fa-solid fa-arrow-right text-xs ml-auto opacity-50" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </motion.div>

    </div>
  )
}
