import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import SoundPlayer from '../components/SoundPlayer'
import TTSButton from '../components/ui/TTSButton'
import { usePageMeta } from '../hooks/usePageMeta'

const URGENTES = [
  { nombre:'Teléfono de la Esperanza', desc:'Apoyo emocional 24h — crisis, ansiedad, momentos difíciles.', accion:'Llamar al 717 003 717', href:'tel:717003717', icon:'fa-phone', color:'coral' },
  { nombre:'Emergencias generales', desc:'Si tú o alguien está en peligro inmediato.', accion:'Llamar al 112', href:'tel:112', icon:'fa-truck-medical', color:'coral' },
]

const APOYO = [
  { nombre:'Autismo España', desc:'Recursos, orientación y red de servicios para personas autistas y familias.', href:'https://autismo.org.es', icon:'fa-infinity', color:'pri' },
  { nombre:'Federación Autismo Madrid', desc:'Apoyo directo y orientación en la Comunidad de Madrid.', href:'https://www.autismomadrid.es', icon:'fa-map-location-dot', color:'sec' },
  { nombre:'ConecTEA — Red de apoyo', desc:'Familias con miembros neurodivergentes. Grupos de apoyo presencial.', href:'https://www.fundacionconectea.org/', icon:'fa-people-group', color:'acc' },
  { nombre:'Proyecto STOP SUICIDIOS', desc:'Información y recursos sobre conducta suicida.', href:'https://stopsuicidios.org', icon:'fa-heart', color:'sec' },
]

const COLOR = {
  coral:{ ring:'border-coral/30', bg:'bg-coral/8',  text:'text-coral', btn:'bg-coral/10 text-coral border border-coral/25 hover:bg-coral/20' },
  pri:  { ring:'border-pri/30',   bg:'bg-pri/8',    text:'text-pri',   btn:'bg-pri/10  text-pri  border border-pri/25  hover:bg-pri/20' },
  sec:  { ring:'border-sec/30',   bg:'bg-sec/8',    text:'text-sec',   btn:'bg-sec/10  text-sec  border border-sec/25  hover:bg-sec/20' },
  acc:  { ring:'border-acc/30',   bg:'bg-acc/8',    text:'text-acc',   btn:'bg-acc/10  text-acc  border border-acc/25  hover:bg-acc/20' },
}

// ── Breathing exercise (4-7-8) with animated ring ─────────────────────────
const PHASES = [
  { label: 'Inhala', duration: 4, color: '#3A82CA' },
  { label: 'Mantén', duration: 7, color: '#816AB7' },
  { label: 'Exhala', duration: 8, color: '#48B0A1' },
]

function BreathingExercise({ prefersReduced }) {
  const [running, setRunning]   = useState(false)
  const [phase, setPhase]       = useState(0)
  const [seconds, setSeconds]   = useState(PHASES[0].duration)
  const [cycles, setCycles]     = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!running) { clearInterval(intervalRef.current); return }
    intervalRef.current = setInterval(() => {
      setSeconds(s => {
        if (s <= 1) {
          setPhase(p => {
            const next = (p + 1) % PHASES.length
            if (next === 0) setCycles(c => c + 1)
            return next
          })
          return PHASES[(phase + 1) % PHASES.length].duration
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [running, phase])

  const stop = () => { setRunning(false); setPhase(0); setSeconds(PHASES[0].duration); setCycles(0) }
  const cur  = PHASES[phase]
  const progress = 1 - (seconds / cur.duration)

  return (
    <div className="flex flex-col items-center gap-5 p-6 rounded-card bg-surface border border-border">
      <div className="flex items-center gap-3 w-full">
        <div className="w-10 h-10 rounded-xl bg-pri/10 border border-pri/20 flex items-center justify-center shrink-0">
          <i className="fa-solid fa-wind text-pri text-base" aria-hidden="true" />
        </div>
        <h3 className="font-semibold text-text text-sm flex-1">Respiración 4-7-8</h3>
        <TTSButton text="La respiración cuatro siete ocho te ayuda a calmarte ahora mismo. Inhala contando hasta cuatro, mantén el aire contando hasta siete, y suéltalo muy despacio contando hasta ocho. Cuando exhalas más de lo que inhalas le dices a tu cuerpo que estás a salvo. Puedes repetir el ciclo dos o tres veces." iconOnly />
      </div>

      {/* Animated ring */}
      <div className="relative w-32 h-32">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
          <circle
            cx="60" cy="60" r="52"
            fill="none"
            stroke={cur.color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 52}`}
            strokeDashoffset={`${2 * Math.PI * 52 * (1 - (prefersReduced ? 0.5 : progress))}`}
            style={{ transition: prefersReduced ? 'none' : 'stroke-dashoffset 1s linear, stroke 0.5s ease' }}
          />
        </svg>
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          aria-live="assertive"
          aria-atomic="true"
        >
          {running ? (
            <>
              <span className="text-2xl font-bold tabular-nums" style={{ color: cur.color }}>{seconds}</span>
              <span className="text-xs font-semibold text-muted mt-0.5">{cur.label}</span>
            </>
          ) : (
            <span className="text-xs text-faint text-center px-2">Pulsa para<br/>comenzar</span>
          )}
        </div>
      </div>

      {/* Phase dots — decorativo, la fase se anuncia vía aria-live */}
      <div className="flex items-center gap-3" aria-hidden="true">
        {PHASES.map((p, i) => (
          <div key={p.label} className="flex flex-col items-center gap-1">
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${running && phase === i ? 'scale-125' : 'scale-100'}`}
                 style={{ backgroundColor: running && phase === i ? p.color : '#374151' }} />
            <span className="text-[10px] text-faint">{p.label} {p.duration}s</span>
          </div>
        ))}
      </div>

      <p className="text-xs text-acc font-medium min-h-[1.1rem]" aria-live="polite" aria-atomic="true">
        {cycles > 0 ? `${cycles} ciclo${cycles > 1 ? 's' : ''} completado${cycles > 1 ? 's' : ''}` : ''}
      </p>

      <div className="flex gap-2">
        <button
          onClick={() => running ? stop() : setRunning(true)}
          aria-label={running ? 'Detener ejercicio de respiración' : 'Comenzar ejercicio de respiración 4-7-8'}
          className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
            running
              ? 'bg-faint/15 text-muted hover:bg-faint/25'
              : 'bg-acc/12 text-acc border border-acc/25 hover:bg-acc/20'
          }`}
        >
          {running ? 'Detener' : 'Comenzar'}
        </button>
      </div>
    </div>
  )
}

// ── 5-4-3-2-1 Grounding ───────────────────────────────────────────────────
const GROUNDING_5 = [
  { n: 5, sense: 'VER',    icon: 'fa-eye',           color: '#3A82CA' },
  { n: 4, sense: 'TOCAR',  icon: 'fa-hand',          color: '#816AB7' },
  { n: 3, sense: 'OÍR',    icon: 'fa-ear-listen',    color: '#48B0A1' },
  { n: 2, sense: 'OLER',   icon: 'fa-wind',          color: '#9CC156' },
  { n: 1, sense: 'SABOREAR',icon:'fa-droplet',       color: '#FBB027' },
]

function GroundingCard() {
  const [step, setStep] = useState(0)
  const done = step >= GROUNDING_5.length
  const cur  = GROUNDING_5[step] ?? GROUNDING_5[GROUNDING_5.length - 1]

  return (
    <div className="flex flex-col gap-4 p-6 rounded-card bg-surface border border-border">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-sec/10 border border-sec/20 flex items-center justify-center shrink-0">
          <i className="fa-solid fa-anchor text-sec text-base" aria-hidden="true" />
        </div>
        <h3 className="font-semibold text-text text-sm flex-1">Técnica 5-4-3-2-1</h3>
        <TTSButton text="Esta técnica te trae de vuelta al presente cuando la mente se dispara. Sin prisa, busca cinco cosas que puedas ver ahora mismo. Luego cuatro que puedas tocar. Tres que puedas oír. Dos que puedas oler. Y una que puedas saborear. No hace falta decirlas en voz alta, solo notarlas. Cada sentido que activas reduce la activación del sistema nervioso." iconOnly />
      </div>

      <div className="flex gap-1.5">
        {GROUNDING_5.map((g, i) => (
          <div
            key={g.n}
            className="flex-1 h-1.5 rounded-full transition-all duration-300"
            style={{ backgroundColor: i < step ? g.color : 'rgba(255,255,255,0.08)' }}
            aria-hidden="true"
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center gap-3 py-4"
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                 style={{ backgroundColor: `${cur.color}18`, border: `1px solid ${cur.color}30` }}>
              <i className={`fa-solid ${cur.icon}`} style={{ color: cur.color }} aria-hidden="true" />
            </div>
            <p className="text-center">
              <span className="block text-3xl font-black tabular-nums" style={{ color: cur.color }}>{cur.n}</span>
              <span className="text-xs text-muted mt-1 block">cosas que puedes <strong className="text-text">{cur.sense}</strong> ahora mismo</span>
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="done"
            role="status"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-2 py-4 text-center"
          >
            <i className="fa-solid fa-check-circle text-3xl text-acc" aria-hidden="true" />
            <p className="text-sm font-semibold text-text">¡Completado!</p>
            <p className="text-xs text-muted">Tómate un momento antes de seguir.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-2">
        {!done ? (
          <button
            onClick={() => setStep(s => s + 1)}
            aria-label={
              step + 1 < GROUNDING_5.length
                ? `Siguiente: ${GROUNDING_5[step + 1].n} cosas que puedes ${GROUNDING_5[step + 1].sense}`
                : 'Completar ejercicio'
            }
            className="flex-1 py-2 rounded-xl text-sm font-semibold bg-acc/10 text-acc border border-acc/25 hover:bg-acc/20 transition-colors duration-200"
          >
            Siguiente <span aria-hidden="true">→</span>
          </button>
        ) : (
          <button
            onClick={() => setStep(0)}
            className="flex-1 py-2 rounded-xl text-sm font-semibold bg-surface text-muted border border-border hover:text-text transition-colors duration-200"
          >
            Repetir
          </button>
        )}
      </div>
    </div>
  )
}

// ── Cold water technique ──────────────────────────────────────────────────
const COLD_STEPS = [
  { icon: 'fa-droplet',     text: 'Busca agua fría o un cubo de hielo' },
  { icon: 'fa-hand',        text: 'Pon las manos bajo agua fría 30 segundos' },
  { icon: 'fa-snowflake',   text: 'O sostén un cubito de hielo en la mano' },
  { icon: 'fa-circle-info', text: 'El frío activa el sistema nervioso parasimpático y frena la respuesta de alarma' },
]

function ColdWaterCard() {
  return (
    <div className="flex flex-col gap-4 p-6 rounded-card bg-surface border border-border">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-acc/10 border border-acc/20 flex items-center justify-center shrink-0">
          <i className="fa-solid fa-snowflake text-acc text-base" aria-hidden="true" />
        </div>
        <h3 className="font-semibold text-text text-sm flex-1">Regulación con frío</h3>
        <TTSButton text="El frío es una herramienta muy efectiva para calmarte en pocos segundos. Busca agua fría o un cubito de hielo. Pon las manos bajo el agua durante unos treinta segundos, o simplemente sostén el hielo. El frío activa el sistema nervioso parasimpático y frena la respuesta de alarma del cuerpo casi de inmediato." iconOnly />
      </div>
      <div className="flex flex-col gap-2.5 flex-1">
        {COLD_STEPS.map((step, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="shrink-0 w-7 h-7 rounded-lg bg-pri/8 border border-pri/15 flex items-center justify-center mt-0.5">
              <i className={`fa-solid ${step.icon} text-pri text-[11px]`} aria-hidden="true" />
            </div>
            <p className="text-xs text-muted leading-relaxed pt-1">{step.text}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 p-3 rounded-xl bg-pri/6 border border-pri/15">
        <i className="fa-solid fa-bolt text-pri text-sm" aria-hidden="true" />
        <p className="text-xs text-muted">Ideal cuando hay mucha activación o sensación de pánico.</p>
      </div>
    </div>
  )
}

export default function AyudaPage() {
  usePageMeta({
    title: 'Necesito ayuda ahora — Técnicas de crisis para personas neurodivergentes | Refugio Sensorial',
    description: 'Técnicas de regulación inmediata para crisis autista: respiración 4-7-8, grounding 5-4-3, agua fría. Contactos de apoyo y recursos de emergencia para TEA y TDAH.',
  })
  const prefersReduced = useReducedMotion()

  return (
    <div className="max-w-3xl mx-auto px-4 pb-20 pt-8">
      {/* Breadcrumb */}
      <nav aria-label="Ruta de navegación" className="mb-6 text-sm text-faint">
        <ol className="flex items-center gap-2 list-none p-0 m-0">
          <li><Link to="/" className="hover:text-text transition-colors duration-200">Inicio</Link></li>
          <li aria-hidden="true"><i className="fa-solid fa-chevron-right text-[10px]" /></li>
          <li><span className="text-muted" aria-current="page">Necesito ayuda</span></li>
        </ol>
      </nav>

      {/* Header */}
      <motion.header
        initial={prefersReduced ? {} : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReduced ? 0 : 0.4 }}
        className="text-center mb-10"
      >
        <div className="w-16 h-16 rounded-2xl bg-coral/10 border border-coral/25 flex items-center justify-center mx-auto mb-5">
          <i className="fa-solid fa-heart-pulse text-coral text-2xl" aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-bold text-text mb-3">Estás en un lugar seguro</h1>
        <p className="text-muted text-base leading-relaxed max-w-md mx-auto">
          Aquí encontrarás técnicas de regulación y recursos de apoyo. Ve a tu ritmo, no hay prisa.
        </p>
      </motion.header>

      {/* ── Contactos urgentes ── */}
      <section aria-labelledby="urgentes-h" className="mb-10">
        <h2 id="urgentes-h" className="text-base font-semibold text-text mb-3 flex items-center gap-2">
          <i className="fa-solid fa-phone text-coral text-sm" aria-hidden="true" />
          Apoyo inmediato
        </h2>
        <div className="flex flex-col gap-3">
          {URGENTES.map(r => (
            <div key={r.nombre} className={`flex items-center justify-between gap-4 p-4 rounded-xl border ${COLOR[r.color].bg} ${COLOR[r.color].ring}`}>
              <div className="flex items-center gap-3">
                <i className={`fa-solid ${r.icon} ${COLOR[r.color].text} text-base w-5 text-center`} aria-hidden="true" />
                <div>
                  <p className="font-semibold text-text text-sm">{r.nombre}</p>
                  <p className="text-xs text-muted">{r.desc}</p>
                </div>
              </div>
              <a href={r.href} className={`shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-colors duration-200 ${COLOR[r.color].btn}`}>
                {r.accion}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── Técnicas interactivas ── */}
      <section aria-labelledby="tecnicas-h" className="mb-10">
        <h2 id="tecnicas-h" className="text-base font-semibold text-text mb-3 flex items-center gap-2">
          <i className="fa-solid fa-anchor text-acc text-sm" aria-hidden="true" />
          Técnicas de regulación
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <BreathingExercise prefersReduced={prefersReduced} />
          <GroundingCard />
          <ColdWaterCard />
        </div>
      </section>

      {/* ── Sonidos ambientales ── */}
      <section aria-labelledby="sonidos-h" className="mb-10">
        <h2 id="sonidos-h" className="text-base font-semibold text-text mb-3 flex items-center gap-2">
          <i className="fa-solid fa-headphones text-sec text-sm" aria-hidden="true" />
          Sonidos para calmar
        </h2>
        <div className="flex flex-col gap-4">
          <SoundPlayer />

          {/* Lil Penguin Studios featured card */}
          <a
            href="https://www.youtube.com/@LilPenguinStudios"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-4 p-5 rounded-card bg-surface border border-border hover:border-coral/30 hover:bg-surfaceH transition-all duration-300"
            aria-label="Lil Penguin Studios en YouTube — sonidos de larga duración (se abre en nueva pestaña)"
          >
            {/* YouTube icon badge */}
            <div className="shrink-0 w-12 h-12 rounded-2xl bg-[#FF0000]/10 border border-[#FF0000]/20 flex items-center justify-center">
              <i className="fa-brands fa-youtube text-[#FF0000] text-xl" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-semibold text-text text-sm group-hover:text-coral transition-colors duration-200">
                  Lil Penguin Studios
                </h3>
                <span className="shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#FF0000]/10 text-[#FF0000] border border-[#FF0000]/20">
                  YouTube
                </span>
              </div>
              <p className="text-xs text-muted leading-relaxed mb-2">
                Vídeos de horas de duración con sonidos relajantes: lluvia, ruido blanco, cafeterías,
                chimeneas y más. Especialmente recomendado durante meltdowns y momentos de
                sobrecarga sensorial.
              </p>
              <span className="text-xs text-faint flex items-center gap-1 group-hover:text-coral/70 transition-colors duration-200">
                Abrir en YouTube
                <i className="fa-solid fa-arrow-up-right-from-square text-[9px]" aria-hidden="true" />
              </span>
            </div>
          </a>
        </div>
      </section>

      {/* ── Más recursos ── */}
      <section aria-labelledby="apoyo-h">
        <h2 id="apoyo-h" className="text-base font-semibold text-text mb-3 flex items-center gap-2">
          <i className="fa-solid fa-link text-sec text-sm" aria-hidden="true" />
          Más recursos de apoyo
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {APOYO.map(r => (
            <a
              key={r.nombre}
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${r.nombre}: ${r.desc} (se abre en nueva pestaña)`}
              className={`group flex flex-col gap-3 p-5 rounded-card bg-surface border border-border hover:border-${r.color}/30 hover:bg-surfaceH transition-all duration-300`}
            >
              <i className={`fa-solid ${r.icon} ${COLOR[r.color].text} text-lg`} aria-hidden="true" />
              <div>
                <h3 className={`font-semibold text-sm mb-1 ${COLOR[r.color].text} group-hover:underline`}>{r.nombre}</h3>
                <p className="text-xs text-muted leading-relaxed">{r.desc}</p>
              </div>
              <span className="text-xs text-faint flex items-center gap-1">
                Visitar web <i className="fa-solid fa-arrow-up-right-from-square text-[9px]" aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
