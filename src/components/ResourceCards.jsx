import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { herramientas } from '../data/herramientas'
import { LUGARES } from '../data/lugares'

const mapCount  = LUGARES.length
const toolCount = herramientas.length

const cards = [
  {
    to: '/mapa',
    icon: 'fa-location-dot',
    iconBg: 'bg-pri/10 text-pri',
    label: 'Sitios silenciosos',
    description: 'Mapa de lugares con hora silenciosa, salas sensoriales y distintivo Sunflower en España.',
    linkText: 'Abrir el mapa',
    linkColor: 'text-pri',
    badge: `${mapCount} espacios`,
    badgeColor: 'text-pri bg-pri/8 border-pri/15',
    glow: 'rgba(58,130,202,0.08)',
  },
  {
    to: '/biblioteca',
    icon: 'fa-toolbox',
    iconBg: 'bg-sec/10 text-sec',
    label: 'Herramientas',
    description: 'Apps y recursos digitales clasificados por categoría y perfil neurodivergente.',
    linkText: 'Ver herramientas',
    linkColor: 'text-sec',
    badge: `${toolCount}+ herramientas`,
    badgeColor: 'text-sec bg-sec/8 border-sec/15',
    glow: 'rgba(129,106,183,0.08)',
  },
  {
    href: 'https://www.youtube.com/@LilPenguinStudios',
    icon: 'fa-headphones',
    iconBg: 'bg-coral/10 text-coral',
    label: 'Lil Penguin Studios',
    description: 'Sonidos ambientales y ruido blanco en YouTube para calmar la sobrecarga sensorial.',
    linkText: 'Ver el canal',
    linkColor: 'text-coral',
    badge: 'YouTube',
    badgeColor: 'text-coral bg-coral/8 border-coral/15',
    glow: 'rgba(240,100,80,0.08)',
  },
  {
    to: '/trayectos',
    icon: 'fa-route',
    iconBg: 'bg-acc/10 text-acc',
    label: 'Trayectos Sensoriales',
    description: 'Planifica tu recorrido diario y descubre refugios sensoriales a menos de 5 minutos de tu ruta.',
    linkText: 'Planificar ruta',
    linkColor: 'text-acc',
    badge: 'Nuevo',
    badgeColor: 'text-acc bg-acc/8 border-acc/15',
    glow: 'rgba(72,176,161,0.08)',
  },
]

export default function ResourceCards() {
  const prefersReduced = useReducedMotion()

  return (
    <section aria-labelledby="cards-heading" className="px-4 pb-14">
      <h2 id="cards-heading" className="sr-only">Secciones principales</h2>
      <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => {
          const isExternal = !!card.href
          const className = `group relative flex flex-col p-7 rounded-card border border-border bg-surface overflow-hidden
                             transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/25
                             focus-visible:ring-2 focus-visible:ring-pri focus-visible:ring-offset-2 focus-visible:ring-offset-bg`
          const inner = (
            <>
              {/* Glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-card"
                style={{ background: `radial-gradient(ellipse at 20% 20%, ${card.glow}, transparent 65%)` }}
                aria-hidden="true"
              />

              {/* Header */}
              <div className="relative flex items-start justify-between gap-3 mb-5">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg shrink-0 ${card.iconBg}`}>
                  <i className={`fa-solid ${card.icon}`} aria-hidden="true" />
                </div>
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border ${card.badgeColor}`}>
                  {card.badge}
                </span>
              </div>

              <h3 className="relative text-xl font-bold text-text mb-2 leading-snug">{card.label}</h3>
              <p className="relative text-sm leading-relaxed text-muted flex-1 mb-6">{card.description}</p>

              <span className={`relative inline-flex items-center gap-2 text-sm font-semibold ${card.linkColor}`}>
                {card.linkText}
                <i className="fa-solid fa-arrow-right text-xs transition-transform duration-200 group-hover:translate-x-1.5" aria-hidden="true" />
              </span>
            </>
          )

          return (
            <motion.div
              key={card.to || card.href}
              initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: prefersReduced ? 0 : 0.5, delay: prefersReduced ? 0 : i * 0.1, ease: 'easeOut' }}
            >
              {isExternal ? (
                <a href={card.href} target="_blank" rel="noopener noreferrer" className={className}>
                  {inner}
                </a>
              ) : (
                <Link to={card.to} className={className}>
                  {inner}
                </Link>
              )}
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

