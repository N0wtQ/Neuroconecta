import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { usePageMeta } from '../hooks/usePageMeta'
import Breadcrumb from '../components/ui/Breadcrumb'

const SECCIONES = [
  {
    to: '/entender-y-prepararse/estados',
    icon: 'fa-brain',
    color: 'text-coral',
    bg: 'bg-coral/10',
    border: 'border-coral/25',
    bgCard: 'bg-coral/5',
    glow: 'rgba(229,123,134,0.07)',
    titulo: 'Meltdown, shutdown y burnout',
    desc: 'Entiende qué son, por qué ocurren y cómo diferenciarlos. Con señales, estrategias de ayuda e infografías descargables.',
    badge: 'Empieza aquí',
  },
  {
    to: '/entender-y-prepararse/senales',
    icon: 'fa-triangle-exclamation',
    color: 'text-sec',
    bg: 'bg-sec/10',
    border: 'border-sec/25',
    bgCard: 'bg-sec/5',
    glow: 'rgba(129,106,183,0.07)',
    titulo: 'Señales de aviso',
    desc: 'Aprende a reconocer las señales corporales, cognitivas, emocionales y conductuales antes de llegar al límite.',
    badge: null,
  },
  {
    to: '/entender-y-prepararse/tecnicas',
    icon: 'fa-heart-pulse',
    color: 'text-acc',
    bg: 'bg-acc/10',
    border: 'border-acc/25',
    bgCard: 'bg-acc/5',
    glow: 'rgba(72,176,161,0.07)',
    titulo: 'Técnicas de regulación',
    desc: '9 técnicas de regulación sensorial y emocional para aplicar cuando lo necesitas: frío, respiración, grounding y más.',
    badge: null,
  },
  {
    to: '/entender-y-prepararse/kit-de-bolso',
    icon: 'fa-kit-medical',
    color: 'text-pri',
    bg: 'bg-pri/10',
    border: 'border-pri/25',
    bgCard: 'bg-pri/5',
    glow: 'rgba(58,130,202,0.07)',
    titulo: 'Kit de bolso',
    desc: '¿Qué llevar cuando sales? Elige el tamaño de tu kit y descubre qué meter para estar preparado ante cualquier situación.',
    badge: null,
  },
  {
    to: '/entender-y-prepararse/guias',
    icon: 'fa-folder-open',
    color: 'text-sec',
    bg: 'bg-sec/10',
    border: 'border-sec/25',
    bgCard: 'bg-sec/5',
    glow: 'rgba(129,106,183,0.07)',
    titulo: 'Guías y recursos',
    desc: 'PDFs, artículos y guías verificadas sobre autismo y neurodiversidad para leer, descargar y compartir.',
    badge: null,
  },
]

export default function EntenderPrepararsePage() {
  usePageMeta({
    title: 'Entender y prepararse — Meltdown, regulación y crisis autista | Refugio Sensorial',
    description: 'Aprende sobre meltdown, shutdown y burnout autista. Señales de aviso, técnicas de regulación, kit de bolso y guías descargables para personas neurodivergentes.',
  })
  const prefersReduced = useReducedMotion()

  return (
    <div className="max-w-3xl mx-auto px-4 pb-20 pt-8">
      <Breadcrumb items={[
        { href: '/', label: 'Inicio' },
        { label: 'Entender y prepararse' },
      ]} />

      <motion.div
        initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReduced ? 0 : 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-sec/10 flex items-center justify-center text-sec shrink-0">
            <i className="fa-solid fa-book-open-reader" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text leading-tight">Entender y prepararse</h1>
            <p className="text-sm text-muted">Todo lo que necesitas para conocerte mejor y salir al mundo con más seguridad</p>
          </div>
        </div>
      </motion.div>

      <nav aria-label="Secciones de Entender y prepararse" className="space-y-3">
        {SECCIONES.map((s, i) => (
          <motion.div
            key={s.to}
            initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: prefersReduced ? 0 : 0.4, delay: prefersReduced ? 0 : i * 0.07 }}
          >
            <Link
              to={s.to}
              className={`group relative flex items-start gap-4 p-5 rounded-card border ${s.border} ${s.bgCard} overflow-hidden transition-all duration-200 hover:shadow-md hover:shadow-black/20 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pri focus-visible:ring-offset-2 focus-visible:ring-offset-bg block`}
            >
              <div
                className="absolute inset-0 pointer-events-none rounded-card"
                style={{ background: `radial-gradient(ellipse at 8% 8%, ${s.glow}, transparent 55%)` }}
                aria-hidden="true"
              />
              <div className={`relative w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${s.bg} ${s.color}`}>
                <i className={`fa-solid ${s.icon} text-base`} aria-hidden="true" />
              </div>
              <div className="relative flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <p className="text-sm font-bold text-text leading-snug">{s.titulo}</p>
                  {s.badge && (
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${s.bg} ${s.color} border-current/25`}>
                      {s.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted leading-relaxed">{s.desc}</p>
              </div>
              <i className="relative fa-solid fa-chevron-right text-xs text-faint group-hover:text-muted mt-0.5 shrink-0 transition-colors duration-200" aria-hidden="true" />
            </Link>
          </motion.div>
        ))}
      </nav>

      {/* CTA crisis */}
      <motion.div
        initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: prefersReduced ? 0 : 0.4, delay: prefersReduced ? 0 : 0.42 }}
        className="mt-8 flex items-center gap-4 p-5 rounded-card border border-coral/25 bg-coral/5"
      >
        <div className="w-10 h-10 rounded-xl bg-coral/10 flex items-center justify-center text-coral shrink-0">
          <i className="fa-solid fa-heart-pulse text-base" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-text mb-0.5">¿Lo estás pasando mal ahora mismo?</p>
          <p className="text-xs text-muted">Técnicas inmediatas, sonidos calmantes y líneas de apoyo disponibles ahora.</p>
        </div>
        <Link
          to="/ayuda"
          className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-coral text-white text-xs font-semibold hover:bg-coral/85 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          Ir ahora
          <i className="fa-solid fa-arrow-right text-[10px]" aria-hidden="true" />
        </Link>
      </motion.div>
    </div>
  )
}
