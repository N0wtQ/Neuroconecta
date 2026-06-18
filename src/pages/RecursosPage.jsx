import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { RECURSOS_PDF } from '../data/recursos-pdf'
import TTSButton from '../components/ui/TTSButton'

const BASE_URL = import.meta.env.BASE_URL

const TTS_POR_PDF = {
  1: 'Este artículo del doctor Guillermo Zurita explica desde un enfoque de neurodiversidad qué son el meltdown, el shutdown y el burnout autista, por qué ocurren y cómo diferenciarlos entre sí. Está en formato de artículo web y puedes leerlo directamente online.',
  2: 'Esta tarjeta de crisis de Pempox es para llevar siempre encima. Si en algún momento no puedes hablar, puedes mostrarla para que la otra persona sepa qué te pasa y cómo ayudarte. Hay que imprimirla, cortarla y plastificarla para que dure.',
  3: 'Esta guía de Autismo Madrid tiene setenta páginas sobre regulación emocional en el autismo. Explica las causas de las conductas desafiantes, cómo identificarlas y qué estrategias de intervención usar. Es útil tanto para la propia persona autista como para quien la acompaña.',
  4: 'Esta guía de la Universidad Autónoma de Chile está pensada para la comunidad universitaria. Responde al qué hago cuando pasa esto en situaciones académicas y de convivencia con estudiantes autistas. Tiene un enfoque práctico e interdisciplinario.',
  5: 'Este documento de doscientas diez páginas cubre la educación de personas adultas con autismo. Incluye modelos teóricos, orientaciones pedagógicas y estrategias para la transición a la vida adulta. Es una guía completa para familias, profesores y terapeutas.',
  6: 'Este artículo de Mujeres y Autismo da estrategias prácticas para recuperarse del burnout siendo autista: cómo descansar de verdad, reducir el enmascaramiento, encontrar apoyos y crear ritmos sostenibles.',
}

function PDFCard({ pdf, prefersReduced, index }) {
  const href = pdf.url ?? `${BASE_URL}docs/${pdf.archivo}`
  const tts = TTS_POR_PDF[pdf.id]
  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: prefersReduced ? 0 : 0.4, delay: prefersReduced ? 0 : index * 0.08 }}
      className="flex items-start gap-4 p-5 rounded-card border border-border bg-surface"
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-sm shrink-0 mt-0.5"
        style={{ background: `${pdf.color}18`, color: pdf.color }}
      >
        <i className={`fa-solid ${pdf.icono ?? 'fa-file-pdf'} text-base`} aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-text leading-snug hover:text-pri transition-colors duration-200 group"
          >
            {pdf.titulo}
            <i
              className={`fa-solid ${pdf.url ? 'fa-arrow-up-right-from-square' : 'fa-arrow-down-to-line'} text-[10px] ml-1.5 text-muted group-hover:text-pri transition-colors duration-200`}
              aria-hidden="true"
            />
          </a>
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-md border shrink-0"
            style={{ background: `${pdf.color}12`, color: pdf.color, borderColor: `${pdf.color}30` }}
          >
            {pdf.categoria}
          </span>
        </div>
        {pdf.descripcion && (
          <p className="text-xs text-muted leading-relaxed mb-3">{pdf.descripcion}</p>
        )}
        {tts && <TTSButton text={tts} />}
      </div>
    </motion.div>
  )
}

export default function RecursosPage() {
  const prefersReduced = useReducedMotion()

  return (
    <div className="max-w-3xl mx-auto px-4 pb-20 pt-8">
      <nav aria-label="Ruta de navegación" className="mb-6 text-sm text-faint flex items-center gap-2">
        <Link to="/" className="hover:text-text transition-colors duration-200">Inicio</Link>
        <i className="fa-solid fa-chevron-right text-[10px]" aria-hidden="true" />
        <Link to="/kit" className="hover:text-text transition-colors duration-200">Kit Sensorial</Link>
        <i className="fa-solid fa-chevron-right text-[10px]" aria-hidden="true" />
        <span className="text-muted" aria-current="page">Recursos</span>
      </nav>

      <motion.div
        initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReduced ? 0 : 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-pri/10 flex items-center justify-center text-pri shrink-0">
            <i className="fa-solid fa-folder-open" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text leading-tight">Recursos y documentos</h1>
            <p className="text-sm text-muted">Guías, PDFs y artículos sobre autismo y neurodiversidad</p>
          </div>
        </div>
      </motion.div>

      <div className="space-y-3">
        {RECURSOS_PDF.map((pdf, i) => (
          <PDFCard key={pdf.id} pdf={pdf} prefersReduced={prefersReduced} index={i} />
        ))}
      </div>
    </div>
  )
}
