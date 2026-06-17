import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

const links = [
  { to: '/mapa',       icon: 'fa-location-dot', label: 'Mapa de espacios',  color: 'text-pri  bg-pri/10  border-pri/20'  },
  { to: '/biblioteca', icon: 'fa-toolbox',       label: 'Herramientas',      color: 'text-sec  bg-sec/10  border-sec/20'  },
  { to: '/kit',        icon: 'fa-kit-medical',   label: 'Kit Sensorial',     color: 'text-acc  bg-acc/10  border-acc/20'  },
]

export default function NotFoundPage() {
  const reduced = useReducedMotion()

  return (
    <div className="min-h-[80dvh] flex flex-col items-center justify-center px-6 py-16 text-center">

      {/* Big soft 404 behind everything */}
      <div
        aria-hidden="true"
        className="select-none pointer-events-none absolute font-black text-[clamp(6rem,30vw,16rem)] leading-none text-pri/5"
        style={{ userSelect: 'none' }}
      >
        404
      </div>

      {/* Icon */}
      <motion.div
        initial={reduced ? {} : { scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: reduced ? 0 : 0.4, ease: 'easeOut' }}
        className="relative mb-8"
      >
        <div className="w-24 h-24 rounded-3xl bg-pri/10 border border-pri/20 flex items-center justify-center shadow-lg shadow-pri/5">
          <i className="fa-solid fa-map text-4xl text-pri" aria-hidden="true" />
        </div>
        {/* Small pulse ring — respects reduced motion */}
        {!reduced && (
          <motion.div
            className="absolute inset-0 rounded-3xl border border-pri/20"
            animate={{ scale: [1, 1.18], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            aria-hidden="true"
          />
        )}
      </motion.div>

      {/* Text */}
      <motion.div
        initial={reduced ? {} : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.1, ease: 'easeOut' }}
        className="relative max-w-sm"
      >
        <h1 className="text-3xl font-bold text-text mb-3 leading-snug">
          Esta página no existe
        </h1>
        <p className="text-base text-muted leading-relaxed mb-2">
          No pasa nada. La dirección que visitaste no se encontró,
          pero el resto del sitio está bien.
        </p>
        <p className="text-sm text-faint leading-relaxed">
          Puedes volver al inicio o ir directamente a una sección.
        </p>
      </motion.div>

      {/* Primary button */}
      <motion.div
        initial={reduced ? {} : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.2, ease: 'easeOut' }}
        className="relative mt-8"
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
        transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.3, ease: 'easeOut' }}
        className="relative mt-10 w-full max-w-sm"
      >
        <p className="text-xs text-faint mb-4 uppercase tracking-wider font-medium">
          O ve directamente a
        </p>
        <div className="flex flex-col gap-2.5">
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
