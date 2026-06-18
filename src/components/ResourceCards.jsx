import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { herramientas } from '../data/herramientas'
import { LUGARES } from '../data/lugares'
import { injectGlowStyles } from '@/components/ui/spotlight-card'

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
    hueBase: 210, hueSpread: 40,   // stays blue
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
    hueBase: 260, hueSpread: 50,   // stays purple
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
    hueBase: 345, hueSpread: 30,   // stays red/coral
  },
  {
    to: '/kit',
    icon: 'fa-kit-medical',
    iconBg: 'bg-acc/10 text-acc',
    label: 'Kit Sensorial',
    description: 'Meltdown, Shutdown, Burnout — qué son, cómo regularte y qué meter en tu bolso.',
    linkText: 'Ver el kit',
    linkColor: 'text-acc',
    badge: 'Guía',
    badgeColor: 'text-acc bg-acc/8 border-acc/15',
    glow: 'rgba(72,176,161,0.08)',
    hueBase: 172, hueSpread: 40,   // stays teal
  },
]

// Each card is its own component so it gets an independent ref and pointer tracker.
// --x/--y  = viewport coords   → used by ::before/::after (background-attachment: fixed)
// --xp/--yp= viewport ratio    → used for hue calculation
// --rx/--ry= element-relative  → used for the card's own background spotlight (no fixed)
function ResourceCard({ card, index, prefersReduced }) {
  const cardRef = useRef(null)

  useEffect(() => {
    injectGlowStyles()
    const el = cardRef.current
    if (!el) return
    const handler = (e) => {
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--x',  e.clientX.toFixed(2))
      el.style.setProperty('--xp', (e.clientX / window.innerWidth).toFixed(2))
      el.style.setProperty('--y',  e.clientY.toFixed(2))
      el.style.setProperty('--yp', (e.clientY / window.innerHeight).toFixed(2))
      // Element-relative: gradient stays on the card under the cursor
      el.style.setProperty('--rx', (e.clientX - rect.left).toFixed(2))
      el.style.setProperty('--ry', (e.clientY - rect.top).toFixed(2))
    }
    document.addEventListener('pointermove', handler)
    return () => document.removeEventListener('pointermove', handler)
  }, [])

  const isExternal = !!card.href

  // --rx/--ry default to -9999 so the inner glow is invisible until cursor enters the card
  const glowStyle = {
    '--base':           String(card.hueBase),
    '--spread':         String(card.hueSpread),
    '--size':           '280',
    '--border':         '3',
    '--radius':         '14',
    '--outer':          '1',
    '--spotlight-size': 'calc(var(--size, 150) * 1px)',
    '--border-size':    'calc(var(--border, 2) * 1px)',
    '--hue':            'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',
    backgroundImage: `radial-gradient(
      var(--spotlight-size) var(--spotlight-size) at
      calc(var(--rx, -9999) * 1px) calc(var(--ry, -9999) * 1px),
      hsl(var(--hue, 210) 100% 70% / 0.18),
      transparent
    )`,
    backgroundColor:    '#13152B',
    backgroundSize:     '100% 100%',
    backgroundPosition: '0 0',
    border:             '3px solid rgba(129,106,183,0.12)',
    position:           'relative',
    touchAction:        'pan-y',
  }

  const cardClass = `group flex flex-col p-7 rounded-card overflow-hidden
                     transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/25
                     focus-visible:ring-2 focus-visible:ring-pri focus-visible:ring-offset-2 focus-visible:ring-offset-bg`

  const inner = (
    <>
      {/* Bloom diffusion layer */}
      <div data-glow aria-hidden="true" />

      {/* Per-card colour glow on hover */}
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
      initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: prefersReduced ? 0 : 0.5, delay: prefersReduced ? 0 : index * 0.1, ease: 'easeOut' }}
    >
      {isExternal ? (
        <a
          ref={cardRef}
          href={card.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cardClass}
          data-glow
          style={glowStyle}
        >
          {inner}
        </a>
      ) : (
        <Link
          ref={cardRef}
          to={card.to}
          className={cardClass}
          data-glow
          style={glowStyle}
        >
          {inner}
        </Link>
      )}
    </motion.div>
  )
}

export default function ResourceCards() {
  const prefersReduced = useReducedMotion()

  return (
    <section aria-labelledby="cards-heading" className="px-4 pb-14">
      <h2 id="cards-heading" className="sr-only">Secciones principales</h2>
      <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-6">
        {cards.map((card, i) => (
          <ResourceCard key={card.to || card.href} card={card} index={i} prefersReduced={prefersReduced} />
        ))}
      </div>
    </section>
  )
}
