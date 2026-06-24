/**
 * EntenderEstadoPage — individual page for /entender-y-prepararse/estados/:slug
 * Shows full detail: qué es, señales, qué ayuda, qué evitar, related content.
 */

import { useMemo } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { usePageMeta } from '../hooks/usePageMeta'
import Breadcrumb from '../components/ui/Breadcrumb'
import RelatedContent from '../components/ui/RelatedContent'
import { ESTADOS } from '../components/KitSensorial'
import {
  SLUG_TO_ESTADO_ID,
  getRelatedForEstado,
} from '../lib/content-graph/index'

// Supplementary "qué evitar" data not present in the base ESTADOS array
const EVITAR = {
  meltdown: [
    'Hablar mucho o dar instrucciones complejas',
    'Tocar a la persona sin su permiso explícito',
    'Pedir que se calme o que pare (no puede)',
    'Intentar razonar o explicar durante la crisis',
    'Públicamente llamar la atención sobre lo que ocurre',
  ],
  shutdown: [
    'Forzar el contacto visual o la respuesta verbal',
    'Interpretar el silencio como enfado o rechazo',
    'Bombardear con preguntas o decisiones',
    'Encender luces brillantes o subir el volumen',
    'Exigir que "vuelva" de golpe sin tiempo de recuperación',
  ],
  burnout: [
    'Añadir más responsabilidades o compromisos',
    'Comparar con cómo era antes o cuánto podía hacer',
    'Sugerir que "solo necesita salir más" o socializar',
    'Ignorar las señales de agotamiento esperando que pase solo',
    'Presionar para retomar rutinas normales antes de tiempo',
  ],
}

// Duration / recovery text
const DURACION = {
  meltdown: 'Minutos a horas. El sistema nervioso necesita tiempo para desregularse y volver a la línea base.',
  shutdown:  'Horas a días. La recuperación es gradual — forzar el ritmo lo alarga.',
  burnout:   'Semanas o meses. El burnout requiere reducción sostenida de la carga, no solo un día de descanso.',
}

function List({ items, icon, iconColor }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm text-muted leading-relaxed">
          <i className={`fa-solid ${icon} ${iconColor} text-xs mt-1 shrink-0`} aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function Section({ title, children, className = '' }) {
  return (
    <section className={`${className}`}>
      <h2 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">{title}</h2>
      {children}
    </section>
  )
}

export default function EntenderEstadoPage() {
  const { slug } = useParams()
  const prefersReduced = useReducedMotion()

  const estadoId = SLUG_TO_ESTADO_ID[slug]
  const estado = useMemo(() => ESTADOS.find(e => e.id === estadoId), [estadoId])

  usePageMeta({
    title: estado
      ? `${estado.titulo} — ${estado.subtitulo} | Refugio Sensorial`
      : `Estado · ${slug} — Refugio Sensorial`,
    description: estado?.que ?? '',
    section: 'estados',
  })

  if (!estado) return <Navigate to="/entender-y-prepararse/estados" replace />

  const relatedItems = getRelatedForEstado(estadoId)
  const otrosEstados = ESTADOS.filter(e => e.id !== estadoId)

  const breadcrumbItems = [
    { href: '/',                              label: 'Inicio' },
    { href: '/entender-y-prepararse',         label: 'Entender y prepararse' },
    { href: '/entender-y-prepararse/estados', label: 'Estados' },
    {                                          label: estado.titulo },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      <Breadcrumb items={breadcrumbItems} className="mb-8" />

      {/* Hero */}
      <motion.div
        initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReduced ? 0 : 0.4 }}
        className={`relative rounded-card border ${estado.borderColor} ${estado.bgColor} p-6 mb-8 overflow-hidden`}
      >
        <div
          className="absolute inset-0 pointer-events-none rounded-card"
          style={{ background: `radial-gradient(ellipse at 10% 10%, ${estado.glowColor}, transparent 60%)` }}
          aria-hidden="true"
        />
        <div className="relative flex items-start gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${estado.iconBg}`}>
            <i className={`fa-solid ${estado.icon} ${estado.iconColor} text-xl`} aria-hidden="true" />
          </div>
          <div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${estado.badgeBg} uppercase tracking-wider`}>
              {estado.subtitulo}
            </span>
            <h1 className="text-2xl font-bold text-text mt-1 mb-2">{estado.titulo}</h1>
            <p className="text-sm text-muted leading-relaxed">{estado.que}</p>
          </div>
        </div>
      </motion.div>

      <div className="space-y-8">
        {/* Señales */}
        <Section title="Señales de alerta">
          <div className={`p-4 rounded-xl border ${estado.borderColor} bg-surface`}>
            <List items={estado.signos} icon="fa-circle-dot" iconColor={`text-${estado.color}`} />
          </div>
        </Section>

        {/* Qué ayuda */}
        <Section title="Qué ayuda">
          <div className="p-4 rounded-xl border border-acc/20 bg-acc/5">
            <List items={estado.ayuda} icon="fa-check" iconColor="text-acc" />
          </div>
        </Section>

        {/* Qué evitar */}
        {EVITAR[estadoId] && (
          <Section title="Qué evitar">
            <div className="p-4 rounded-xl border border-coral/20 bg-coral/5">
              <List items={EVITAR[estadoId]} icon="fa-xmark" iconColor="text-coral" />
            </div>
          </Section>
        )}

        {/* Duración */}
        {DURACION[estadoId] && (
          <Section title="Duración y recuperación">
            <div className="p-4 rounded-xl border border-border bg-surface flex items-start gap-3">
              <i className="fa-regular fa-clock text-faint text-sm mt-0.5 shrink-0" aria-hidden="true" />
              <p className="text-sm text-muted leading-relaxed">{DURACION[estadoId]}</p>
            </div>
          </Section>
        )}

        {/* Audio description */}
        {estado.tts && (
          <Section title="Descripción para momentos difíciles">
            <div className={`p-4 rounded-xl border ${estado.borderColor} bg-surface`}>
              <p className="text-sm text-muted leading-relaxed italic">"{estado.tts}"</p>
            </div>
          </Section>
        )}

        {/* Related content */}
        {relatedItems.length > 0 && (
          <RelatedContent
            items={relatedItems}
            title="Recursos relacionados"
          />
        )}

        {/* Other estados */}
        <section>
          <h2 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Otros estados</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {otrosEstados.map(e => (
              <Link
                key={e.id}
                to={`/entender-y-prepararse/estados/${e.id === 'burnout' ? 'burnout-autista' : e.id}`}
                className={`group flex items-center gap-3 p-4 rounded-xl border ${e.borderColor} bg-surface
                            hover:bg-surfaceH hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/20
                            transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pri`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${e.iconBg}`}>
                  <i className={`fa-solid ${e.icon} ${e.iconColor} text-sm`} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text group-hover:text-pri transition-colors duration-200">{e.titulo}</p>
                  <p className="text-xs text-muted">{e.subtitulo}</p>
                </div>
                <i className="fa-solid fa-chevron-right text-faint text-[10px] ml-auto" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>

        {/* Bottom CTAs */}
        <div className="grid sm:grid-cols-2 gap-3 pt-2">
          <Link
            to="/entender-y-prepararse/tecnicas"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-surface border border-border
                       text-sm font-semibold text-muted hover:border-acc/30 hover:text-text transition-all duration-200"
          >
            <i className="fa-solid fa-heart-pulse text-acc text-xs" aria-hidden="true" />
            Técnicas de regulación
          </Link>
          <Link
            to="/ayuda"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-coral/10 border border-coral/25
                       text-sm font-semibold text-coral hover:bg-coral/20 transition-all duration-200"
          >
            <i className="fa-solid fa-circle-exclamation text-xs" aria-hidden="true" />
            Necesito ayuda ahora
          </Link>
        </div>
      </div>
    </div>
  )
}
