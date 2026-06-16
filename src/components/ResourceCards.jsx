import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { herramientas } from '../data/herramientas'
import { LUGARES, TIPOS } from '../data/lugares'

// Live counts from actual data
const mapCount   = LUGARES.length
const toolCount  = herramientas.length
const tipoCount  = TIPOS.length

const cards = [
  {
    to: '/mapa',
    icon: 'fa-location-dot',
    iconBg: 'bg-pri/10 text-pri',
    label: 'Sitios silenciosos',
    description: 'Mapa interactivo de lugares con hora silenciosa, salas sensoriales y distintivos de discapacidad invisible en España.',
    linkText: 'Abrir el mapa',
    badge: `${mapCount} espacios verificados`,
    badgeColor: 'text-pri bg-pri/8 border-pri/15',
    border: 'border-pri/20',
    glow: 'rgba(58,130,202,0.08)',
    preview: [
      { icon: 'fa-cart-shopping', label: 'Hora silenciosa', count: LUGARES.filter(l=>l.tipo==='supermercado').length },
      { icon: 'fa-plane',         label: 'Aeropuertos',     count: LUGARES.filter(l=>l.tipo==='aeropuerto').length },
      { icon: 'fa-landmark',      label: 'Cultura',         count: LUGARES.filter(l=>l.tipo==='cultura').length },
      { icon: 'fa-tree',          label: 'Nat. / Parques',  count: LUGARES.filter(l=>l.tipo==='espacio_natural').length },
    ],
  },
  {
    to: '/biblioteca',
    icon: 'fa-toolbox',
    iconBg: 'bg-sec/10 text-sec',
    label: 'Herramientas digitales',
    description: 'Biblioteca de apps, webs y recursos digitales clasificados por categoría y perfil neurodivergente.',
    linkText: 'Ver herramientas',
    badge: `${toolCount}+ herramientas`,
    badgeColor: 'text-sec bg-sec/8 border-sec/15',
    border: 'border-sec/20',
    glow: 'rgba(129,106,183,0.08)',
    preview: [
      { icon: 'fa-calendar-check', label: 'Gestión Ejecutiva',   count: herramientas.filter(h=>h.categoria==='Gestión Ejecutiva').length },
      { icon: 'fa-ear-listen',     label: 'Reg. Sensorial',      count: herramientas.filter(h=>h.categoria==='Regulación Sensorial').length },
      { icon: 'fa-heart',          label: 'Salud Emocional',     count: herramientas.filter(h=>h.categoria==='Salud Emocional').length },
      { icon: 'fa-brain',          label: 'Accesibilidad Cog.',  count: herramientas.filter(h=>h.categoria==='Accesibilidad Cognitiva').length },
    ],
  },
]

export default function ResourceCards() {
  const prefersReduced = useReducedMotion()

  return (
    <section aria-labelledby="cards-heading" className="px-4 pb-14">
      <h2 id="cards-heading" className="sr-only">Secciones principales</h2>
      <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={card.to}
            initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: prefersReduced ? 0 : 0.5, delay: prefersReduced ? 0 : i * 0.1, ease: 'easeOut' }}
          >
            <Link
              to={card.to}
              className={`group relative flex flex-col p-7 rounded-card border bg-surface overflow-hidden
                          transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/25
                          focus-visible:ring-2 focus-visible:ring-pri focus-visible:ring-offset-2 focus-visible:ring-offset-bg`}
              style={{ borderColor: card.border.replace('border-','') }}
            >
              {/* Glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-[500ms] pointer-events-none rounded-card"
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

              {/* Text */}
              <h3 className="relative text-xl font-bold text-text mb-2 leading-snug">{card.label}</h3>
              <p className="relative text-sm leading-relaxed text-muted mb-5 flex-1">{card.description}</p>

              {/* Mini preview grid */}
              <div className="relative grid grid-cols-2 gap-2 mb-5">
                {card.preview.map(p => (
                  <div key={p.label} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-bg border border-border/60">
                    <i className={`fa-solid ${p.icon} text-xs text-faint`} aria-hidden="true" />
                    <span className="text-[11px] text-muted flex-1 truncate">{p.label}</span>
                    <span className="text-[11px] font-bold text-text">{p.count}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <span className="relative inline-flex items-center gap-2 text-sm font-semibold text-pri">
                {card.linkText}
                <i className="fa-solid fa-arrow-right text-xs transition-transform duration-200 group-hover:translate-x-1.5" aria-hidden="true" />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
