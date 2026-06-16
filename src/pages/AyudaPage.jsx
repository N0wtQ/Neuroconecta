import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

const recursos = [
  {
    urgente: true,
    nombre: 'Teléfono de la Esperanza',
    descripcion: 'Apoyo emocional 24 horas. Atienden crisis emocionales, ansiedad y momentos difíciles.',
    accion: 'Llamar ahora',
    href: 'tel:717003717',
    icono: 'fa-phone',
    color: 'coral',
  },
  {
    urgente: true,
    nombre: 'Emergencias generales',
    descripcion: 'Si tú o alguien a tu alrededor está en peligro inmediato.',
    accion: 'Llamar al 112',
    href: 'tel:112',
    icono: 'fa-ambulance',
    color: 'coral',
  },
  {
    nombre: 'Autismo España',
    descripcion: 'Recursos, orientación y apoyo para personas autistas y sus familias en España.',
    accion: 'Visitar web',
    href: 'https://autismo.org.es',
    icono: 'fa-infinity',
    color: 'pri',
  },
  {
    nombre: 'Federación Autismo Madrid',
    descripcion: 'Apoyo directo, orientación y red de servicios en la Comunidad de Madrid.',
    accion: 'Visitar web',
    href: 'https://www.autismomadrid.es',
    icono: 'fa-map-location-dot',
    color: 'sec',
  },
  {
    nombre: 'ACNAF — Red de apoyo',
    descripcion: 'Asociación de familias con miembros neurodivergentes. Grupos de apoyo presencial.',
    accion: 'Visitar web',
    href: 'https://acnaf.org',
    icono: 'fa-people-group',
    color: 'acc',
  },
  {
    nombre: 'Proyecto STOP SUICIDIO',
    descripcion: 'Información y recursos sobre conducta suicida para personas y familiares.',
    accion: 'Visitar web',
    href: 'https://stopsuicidio.com',
    icono: 'fa-heart',
    color: 'sec',
  },
]

const TECNICAS = [
  {
    icono: 'fa-wind',
    titulo: 'Respiración 4-7-8',
    pasos: [
      'Inhala durante 4 segundos por la nariz',
      'Mantén el aire 7 segundos',
      'Exhala lentamente por la boca durante 8 segundos',
      'Repite 3 o 4 veces',
    ],
  },
  {
    icono: 'fa-hand',
    titulo: 'Técnica 5-4-3-2-1 (grounding)',
    pasos: [
      'Nombra 5 cosas que puedes VER ahora mismo',
      'Nombra 4 cosas que puedes TOCAR',
      'Nombra 3 cosas que puedes OÍR',
      'Nombra 2 cosas que puedes OLER',
      'Nombra 1 cosa que puedes SABOREAR',
    ],
  },
  {
    icono: 'fa-snowflake',
    titulo: 'Regulación con frío',
    pasos: [
      'Busca agua fría o hielo si lo tienes a mano',
      'Pon las manos bajo agua fría 30 segundos',
      'O sostén un cubito de hielo en la mano',
      'El frío activa el sistema nervioso parasimpático',
    ],
  },
]

const colorMap = {
  coral: { bg: 'bg-coral/8', border: 'border-coral/25', text: 'text-coral', btn: 'bg-coral/10 text-coral border-coral/25 hover:bg-coral/18' },
  pri:   { bg: 'bg-pri/8',   border: 'border-pri/25',   text: 'text-pri',   btn: 'bg-pri/10   text-pri   border-pri/25   hover:bg-pri/18' },
  sec:   { bg: 'bg-sec/8',   border: 'border-sec/25',   text: 'text-sec',   btn: 'bg-sec/10   text-sec   border-sec/25   hover:bg-sec/18' },
  acc:   { bg: 'bg-acc/8',   border: 'border-acc/25',   text: 'text-acc',   btn: 'bg-acc/10   text-acc   border-acc/25   hover:bg-acc/18' },
}

export default function AyudaPage() {
  const prefersReduced = useReducedMotion()

  return (
    <main className="max-w-3xl mx-auto px-4 pb-20 pt-8">
      {/* Back */}
      <nav aria-label="Ruta de navegación" className="mb-6 text-sm text-faint flex items-center gap-2">
        <Link to="/" className="hover:text-text transition-colors duration-200">Inicio</Link>
        <i className="fa-solid fa-chevron-right text-[10px]" aria-hidden="true" />
        <span className="text-muted" aria-current="page">Necesito ayuda</span>
      </nav>

      {/* Header */}
      <header className="mb-10 text-center">
        <div className="w-16 h-16 rounded-full bg-coral/10 border border-coral/25 flex items-center justify-center mx-auto mb-5">
          <i className="fa-solid fa-heart-pulse text-coral text-2xl" aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-bold text-text mb-3">Estás en un lugar seguro</h1>
        <p className="text-muted text-base leading-relaxed max-w-md mx-auto">
          Aquí encontrarás recursos de apoyo y técnicas para momentos de sobrecarga sensorial o crisis emocional.
          Ve a tu ritmo.
        </p>
      </header>

      {/* Grounding techniques */}
      <section aria-labelledby="tecnicas-heading" className="mb-10">
        <h2 id="tecnicas-heading" className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
          <i className="fa-solid fa-anchor text-acc text-base" aria-hidden="true" />
          Técnicas rápidas de regulación
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {TECNICAS.map((t, i) => (
            <motion.div
              key={t.titulo}
              initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReduced ? 0 : 0.4, delay: prefersReduced ? 0 : i * 0.1 }}
              className="p-5 rounded-card bg-surface border border-border"
            >
              <i className={`fa-solid ${t.icono} text-acc text-lg mb-3 block`} aria-hidden="true" />
              <h3 className="font-semibold text-text text-sm mb-3">{t.titulo}</h3>
              <ol className="flex flex-col gap-1.5 list-none">
                {t.pasos.map((p, pi) => (
                  <li key={pi} className="text-xs text-muted leading-relaxed flex items-start gap-2">
                    <span className="shrink-0 w-4 h-4 rounded-full bg-acc/10 text-acc text-[9px] font-bold flex items-center justify-center mt-0.5">
                      {pi + 1}
                    </span>
                    {p}
                  </li>
                ))}
              </ol>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Urgent resources */}
      <section aria-labelledby="urgentes-heading" className="mb-8">
        <h2 id="urgentes-heading" className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
          <i className="fa-solid fa-phone text-coral text-base" aria-hidden="true" />
          Apoyo inmediato
        </h2>
        <div className="flex flex-col gap-3">
          {recursos.filter(r => r.urgente).map(r => {
            const c = colorMap[r.color]
            return (
              <div
                key={r.nombre}
                className={`flex items-center justify-between gap-4 p-4 rounded-xl border ${c.bg} ${c.border}`}
              >
                <div className="flex items-center gap-3">
                  <i className={`fa-solid ${r.icono} ${c.text} text-base w-5 text-center`} aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-text text-sm">{r.nombre}</p>
                    <p className="text-xs text-muted">{r.descripcion}</p>
                  </div>
                </div>
                <a
                  href={r.href}
                  className={`shrink-0 px-4 py-2 rounded-lg text-xs font-semibold border transition-colors duration-200 ${c.btn}`}
                >
                  {r.accion}
                </a>
              </div>
            )
          })}
        </div>
      </section>

      {/* Other resources */}
      <section aria-labelledby="otros-heading">
        <h2 id="otros-heading" className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
          <i className="fa-solid fa-link text-sec text-base" aria-hidden="true" />
          Más recursos de apoyo
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {recursos.filter(r => !r.urgente).map(r => {
            const c = colorMap[r.color]
            return (
              <div
                key={r.nombre}
                className="flex flex-col gap-3 p-5 rounded-card bg-surface border border-border"
              >
                <i className={`fa-solid ${r.icono} ${c.text} text-lg`} aria-hidden="true" />
                <div>
                  <h3 className="font-semibold text-text text-sm mb-1">{r.nombre}</h3>
                  <p className="text-xs text-muted leading-relaxed">{r.descripcion}</p>
                </div>
                <a
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`self-start px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors duration-200 ${c.btn}`}
                >
                  {r.accion}
                  <i className="fa-solid fa-arrow-up-right-from-square ml-1.5 text-[9px]" aria-hidden="true" />
                </a>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}
