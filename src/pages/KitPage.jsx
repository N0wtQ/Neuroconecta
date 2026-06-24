import { Link } from 'react-router-dom'
import KitSensorial from '../components/KitSensorial'
import { usePageMeta } from '../hooks/usePageMeta'
import { useReducedMotion } from '../hooks/useReducedMotion'

const SUBNAV = [
  { id: 'estados',    label: 'Estados',      icon: 'fa-brain',       color: 'text-coral', bg: 'bg-coral/10',  border: 'border-coral/25'  },
  { id: 'regulacion', label: 'Regulación',   icon: 'fa-heart-pulse', color: 'text-acc',   bg: 'bg-acc/10',    border: 'border-acc/25'    },
  { id: 'kit-bolso',  label: 'Kit de bolso', icon: 'fa-kit-medical', color: 'text-sec',   bg: 'bg-sec/10',    border: 'border-sec/25'    },
]

function scrollTo(id, prefersReduced) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' })
}

export default function KitPage() {
  usePageMeta({
    title: 'Kit Sensorial para personas autistas y con TDAH — Refugio Sensorial',
    description: 'Aprende a identificar meltdown, shutdown y burnout autista. Técnicas de regulación sensorial y guía de kit de bolso para salidas. Recursos para TEA y TDAH.',
  })
  const prefersReduced = useReducedMotion()

  return (
    <div className="min-h-dvh">
      {/* Header with open background so canvas particles are visible */}
      <div className="relative max-w-3xl mx-auto px-4 pt-14 pb-8">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 60% 40%, rgba(129,106,183,0.08) 0%, transparent 65%), radial-gradient(ellipse at 20% 80%, rgba(72,176,161,0.06) 0%, transparent 55%)',
          }}
          aria-hidden="true"
        />
        <nav aria-label="Ruta de navegación" className="relative mb-4 text-sm text-faint">
          <ol className="flex items-center gap-2 list-none p-0 m-0">
            <li><Link to="/" className="hover:text-text transition-colors duration-200">Inicio</Link></li>
            <li aria-hidden="true"><i className="fa-solid fa-chevron-right text-[10px]" /></li>
            <li><span className="text-muted" aria-current="page">Kit Sensorial</span></li>
          </ol>
        </nav>
        <h1 className="relative text-2xl font-bold text-text mb-1">Kit Sensorial</h1>
        <p className="relative text-sm text-muted">
          Entiende lo que te pasa, regúlate y prepara tu kit para salir al mundo.
        </p>
      </div>

      {/* Sticky sub-nav */}
      <div className="sticky top-[64px] z-40 bg-[#0C0E1E]/95 backdrop-blur-sm border-b border-border">
        <nav
          aria-label="Secciones de esta página"
          className="max-w-3xl mx-auto px-4 flex items-center gap-2 py-2.5 overflow-x-auto scrollbar-none"
        >
          {SUBNAV.map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id, prefersReduced)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold border transition-all duration-150 whitespace-nowrap shrink-0 ${item.color} ${item.bg} ${item.border} hover:opacity-80 active:scale-95`}
            >
              <i className={`fa-solid ${item.icon} text-xs`} aria-hidden="true" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <KitSensorial />
    </div>
  )
}
