import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import ResourceCards from '../components/ResourceCards'
import ContactForm from '../components/ContactForm'
import { useReducedMotion } from '../hooks/useReducedMotion'

function FadeSection({ id, children, className = '', delay = 0 }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.section
      id={id}
      initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: prefersReduced ? 0 : 0.5, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

// ── "Cómo funciona" strip ──────────────────────────────────────────────────
const STEPS = [
  {
    n: '1',
    icon: 'fa-location-dot',
    color: 'text-pri bg-pri/10 border-pri/20',
    title: 'Encuentra un espacio',
    text: 'Busca en el mapa lugares con hora silenciosa, accesibilidad sensorial o distintivo Sunflower cerca de ti.',
    to: '/mapa',
    cta: 'Ir al mapa',
  },
  {
    n: '2',
    icon: 'fa-toolbox',
    color: 'text-sec bg-sec/10 border-sec/20',
    title: 'Descubre herramientas',
    text: 'Filtra por tu perfil neurodivergente (TEA, TDAH, AACC…) y encuentra apps que se adaptan a tu forma de funcionar.',
    to: '/biblioteca',
    cta: 'Ver herramientas',
  },
  {
    n: '3',
    icon: 'fa-heart-pulse',
    color: 'text-coral bg-coral/10 border-coral/20',
    title: 'Pide ayuda si la necesitas',
    text: 'Accede en cualquier momento a técnicas de regulación y recursos de apoyo en crisis. Siempre accesible.',
    to: '/ayuda',
    cta: 'Recursos de ayuda',
  },
]

// ── Neurodiversity badge types ─────────────────────────────────────────────
const ND_PROFILES = [
  { label: 'TEA', desc: 'Trastorno del Espectro Autista',    color: 'text-pri border-pri/25 bg-pri/8' },
  { label: 'TDAH', desc: 'Trastorno por Déficit de Atención',color: 'text-sec border-sec/25 bg-sec/8' },
  { label: 'AACC', desc: 'Altas Capacidades',                color: 'text-acc border-acc/25 bg-acc/8' },
  { label: 'DIS',  desc: 'Dislexia y dificultades lectoras', color: 'text-green border-green/25 bg-green/8' },
  { label: 'TOC',  desc: 'Trastorno Obsesivo-Compulsivo',    color: 'text-warm border-warm/25 bg-warm/8' },
  { label: 'TCE',  desc: 'Trastorno de Comunicación',        color: 'text-coral border-coral/25 bg-coral/8' },
]

export default function Home() {
  const prefersReduced = useReducedMotion()

  return (
    <div className="max-w-5xl mx-auto px-4 pb-20">
      <Hero />
      <ResourceCards />

      {/* ── Cómo funciona ── */}
      <FadeSection id="como-funciona" className="mb-14">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-text mb-2">Cómo funciona</h2>
          <p className="text-muted text-sm max-w-md mx-auto">Tres pasos para aprovechar la plataforma, sin complicaciones.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={prefersReduced ? {} : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: prefersReduced ? 0 : 0.4, delay: prefersReduced ? 0 : i * 0.1 }}
              className="relative flex flex-col gap-4 p-6 rounded-card bg-surface border border-border"
            >
              {/* Step number */}
              <span className="absolute top-4 right-4 text-[11px] font-black text-faint/40 tabular-nums">0{step.n}</span>

              <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-base border ${step.color}`}>
                <i className={`fa-solid ${step.icon}`} aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-semibold text-text text-base mb-1.5">{step.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{step.text}</p>
              </div>
              <Link
                to={step.to}
                className={`self-start text-xs font-semibold mt-auto flex items-center gap-1.5 ${step.color.split(' ')[0]} hover:underline`}
              >
                {step.cta}
                <i className="fa-solid fa-arrow-right text-[9px]" aria-hidden="true" />
              </Link>
            </motion.div>
          ))}
        </div>
      </FadeSection>

      {/* ── ND Profiles ── */}
      <FadeSection className="mb-14">
        <div className="rounded-card bg-surface border border-border p-7">
          <h2 className="text-lg font-bold text-text mb-1.5">Pensado para toda la neurodiversidad</h2>
          <p className="text-sm text-muted mb-5 leading-relaxed">
            Cada herramienta y espacio está etiquetado por perfil para que encuentres exactamente lo que necesitas.
          </p>
          <div className="flex flex-wrap gap-2">
            {ND_PROFILES.map(p => (
              <span
                key={p.label}
                className={`px-3 py-1.5 rounded-xl text-sm font-semibold border ${p.color}`}
                title={p.desc}
              >
                {p.label}
                <span className="ml-1.5 text-xs font-normal opacity-70">{p.desc}</span>
              </span>
            ))}
          </div>
        </div>
      </FadeSection>

      {/* ── Sobre mí ── */}
      <FadeSection id="sobre-mi" className="mb-10">
        <div className="rounded-card bg-surface border border-border overflow-hidden">
          {/* Top accent bar */}
          <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #3A82CA, #816AB7, #48B0A1)' }} aria-hidden="true" />
          <div className="p-8">
            <h2 className="text-2xl font-bold text-text mb-6">Sobre mí</h2>
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <img
                src="/almudena.jpeg"
                alt="Almudena, creadora de Neuroconecta"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-sec/30 shrink-0"
              />
              <div>
                {/* Pull quote */}
                <blockquote className="text-base leading-relaxed text-muted mb-3 relative">
                  <i className="fa-solid fa-quote-left text-sec/30 text-2xl absolute -top-1 -left-1" aria-hidden="true" />
                  <span className="pl-6">
                    Hola, soy <strong className="text-text font-semibold">Almudena</strong>.
                    Soy autista y creé Neuroconecta porque cuando más lo necesitaba,
                    no encontraba recursos como este. La comunidad neurodivergente existe,
                    es grande y merece más visibilidad. Este proyecto es mi forma de aportar
                    algo concreto: un lugar donde encontrar espacios accesibles y herramientas
                    reales para el día a día.
                  </span>
                </blockquote>
                <div className="flex items-center gap-2 pl-6">
                  <span className="w-6 h-px bg-sec/40" aria-hidden="true" />
                  <span className="text-xs font-semibold text-sec">Almudena · Creadora de Neuroconecta</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeSection>

      {/* ── Contacto ── */}
      <FadeSection id="contacto">
        <div className="rounded-card bg-surface border border-border p-8 md:p-10">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-7">
            <div>
              <h2 className="text-2xl font-bold text-text mb-1.5">Contáctanos</h2>
              <p className="text-sm text-muted leading-relaxed max-w-md">
                ¿Conoces un lugar accesible que no está en el mapa? ¿Quieres sugerir una herramienta o tienes alguna pregunta?
                Escríbeme — leo todos los mensajes.
              </p>
            </div>
            <div className="shrink-0 flex gap-2">
              <div className="w-10 h-10 rounded-xl bg-acc/10 border border-acc/20 flex items-center justify-center">
                <i className="fa-solid fa-envelope text-acc text-sm" aria-hidden="true" />
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </FadeSection>
    </div>
  )
}
