import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

const cards = [
  {
    to: '/mapa',
    icon: 'fa-location-dot',
    iconClass: 'text-pri bg-pri/10',
    label: 'Sitios silenciosos',
    description:
      'Mapa interactivo de lugares con hora silenciosa, salas sensoriales y distintivos de discapacidad invisible en España.',
    linkText: 'Abrir el mapa',
    borderColor: 'rgba(58,130,202,0.25)',
    glowColor: 'rgba(58,130,202,0.07)',
  },
  {
    to: '/biblioteca',
    icon: 'fa-toolbox',
    iconClass: 'text-sec bg-sec/10',
    label: 'Herramientas digitales',
    description:
      'Biblioteca de apps, webs y recursos digitales clasificados por categoría y perfil neurodivergente.',
    linkText: 'Ver herramientas',
    borderColor: 'rgba(129,106,183,0.25)',
    glowColor: 'rgba(129,106,183,0.07)',
  },
]

export default function ResourceCards() {
  const prefersReduced = useReducedMotion()

  return (
    <section aria-labelledby="cards-heading" className="px-4 pb-16">
      <h2 id="cards-heading" className="sr-only">Secciones principales de la plataforma</h2>
      <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={card.to}
            initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{
              duration: prefersReduced ? 0 : 0.5,
              delay: prefersReduced ? 0 : i * 0.12,
              ease: 'easeOut',
            }}
          >
            <Link
              to={card.to}
              className="group relative flex flex-col p-8 rounded-card border bg-surface overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30 focus-visible:ring-2 focus-visible:ring-pri focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              style={{ borderColor: card.borderColor }}
              aria-label={`${card.label} — ${card.description}`}
            >
              {/* Soft background glow on hover — no flash */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[400ms] pointer-events-none rounded-card"
                style={{ background: `radial-gradient(ellipse at 30% 30%, ${card.glowColor}, transparent 70%)` }}
                aria-hidden="true"
              />

              {/* Icon */}
              <div
                className={`relative w-14 h-14 rounded-xl flex items-center justify-center text-xl mb-6 ${card.iconClass}`}
                aria-hidden="true"
              >
                <i className={`fa-solid ${card.icon}`} />
              </div>

              {/* Content */}
              <h3 className="relative text-xl font-semibold text-text mb-3 leading-snug">
                {card.label}
              </h3>
              <p className="relative text-sm leading-relaxed text-muted mb-6 flex-1">
                {card.description}
              </p>

              {/* Link indicator */}
              <span className="relative inline-flex items-center gap-2 text-sm font-semibold text-pri">
                {card.linkText}
                <i
                  className="fa-solid fa-arrow-right text-xs transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
