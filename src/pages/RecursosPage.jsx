import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link, useSearchParams } from 'react-router-dom'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { RECURSOS_PDF } from '../data/recursos-pdf'
import TTSButton from '../components/ui/TTSButton'
import { usePageMeta } from '../hooks/usePageMeta'

const BASE_URL = import.meta.env.BASE_URL

const TTS_POR_PDF = {
  1: 'Este artículo del doctor Guillermo Zurita explica desde un enfoque de neurodiversidad qué son el meltdown, el shutdown y el burnout autista, por qué ocurren y cómo diferenciarlos entre sí. Está en formato de artículo web y puedes leerlo directamente online.',
  2: 'Esta tarjeta de crisis de Pempox es para llevar siempre encima. Si en algún momento no puedes hablar, puedes mostrarla para que la otra persona sepa qué te pasa y cómo ayudarte. Hay que imprimirla, cortarla y plastificarla para que dure.',
  3: 'Esta guía de Autismo Madrid tiene setenta páginas sobre regulación emocional en el autismo. Explica las causas de las conductas desafiantes, cómo identificarlas y qué estrategias de intervención usar. Es útil tanto para la propia persona autista como para quien la acompaña.',
  4: 'Esta guía de la Universidad Autónoma de Chile está pensada para la comunidad universitaria. Responde al qué hago cuando pasa esto en situaciones académicas y de convivencia con estudiantes autistas. Tiene un enfoque práctico e interdisciplinario.',
  5: 'Este documento de doscientas diez páginas cubre la educación de personas adultas con autismo. Incluye modelos teóricos, orientaciones pedagógicas y estrategias para la transición a la vida adulta. Es una guía completa para familias, profesores y terapeutas.',
  6: 'Este artículo de Mujeres y Autismo da estrategias prácticas para recuperarse del burnout siendo autista: cómo descansar de verdad, reducir el enmascaramiento, encontrar apoyos y crear ritmos sostenibles.',
}

// Unique categories preserving first-seen order
const CATEGORIAS = [...new Set(RECURSOS_PDF.map(p => p.categoria))]
// Color per category (from first document in that category)
const CAT_COLOR = Object.fromEntries(RECURSOS_PDF.map(p => [p.categoria, p.color]))

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
  usePageMeta({
    title: 'Guías y recursos sobre autismo y neurodivergencia — Refugio Sensorial',
    description: 'Documentos PDF y artículos sobre meltdown, burnout autista, regulación emocional y educación. Recursos descargables para personas TEA, TDAH y sus familias.',
  })
  const prefersReduced = useReducedMotion()
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(() => searchParams.get('q') ?? '')
  const catFilter = searchParams.get('cat') ?? 'todas'

  const results = useMemo(() => {
    const q = search.toLowerCase().trim()
    return RECURSOS_PDF.filter(pdf => {
      const matchCat = catFilter === 'todas' || pdf.categoria === catFilter
      const matchSearch = !q ||
        pdf.titulo.toLowerCase().includes(q) ||
        pdf.descripcion?.toLowerCase().includes(q) ||
        pdf.categoria.toLowerCase().includes(q)
      return matchCat && matchSearch
    })
  }, [search, catFilter])

  function updateSearch(val) {
    setSearch(val)
    const next = new URLSearchParams(searchParams)
    if (val) next.set('q', val); else next.delete('q')
    setSearchParams(next, { replace: true })
  }

  function updateCat(cat) {
    const next = new URLSearchParams(searchParams)
    if (cat === 'todas') next.delete('cat'); else next.set('cat', cat)
    setSearchParams(next, { replace: true })
  }

  return (
    <div className="max-w-3xl mx-auto px-4 pb-20 pt-8">
      <nav aria-label="Ruta de navegación" className="mb-6 text-sm text-faint">
        <ol className="flex items-center gap-2 list-none p-0 m-0">
          <li><Link to="/" className="hover:text-text transition-colors duration-200">Inicio</Link></li>
          <li aria-hidden="true"><i className="fa-solid fa-chevron-right text-[10px]" /></li>
          <li><Link to="/kit" className="hover:text-text transition-colors duration-200">Kit Sensorial</Link></li>
          <li aria-hidden="true"><i className="fa-solid fa-chevron-right text-[10px]" /></li>
          <li><span className="text-muted" aria-current="page">Recursos</span></li>
        </ol>
      </nav>

      <motion.div
        initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReduced ? 0 : 0.4 }}
        className="mb-6"
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

      {/* Search */}
      <div className="relative mb-4">
        <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-faint text-sm pointer-events-none" aria-hidden="true" />
        <input
          type="search"
          value={search}
          onChange={e => updateSearch(e.target.value)}
          placeholder="Buscar por título, descripción o categoría..."
          className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-surface border border-border text-text text-sm placeholder:text-faint outline-none focus:border-pri/50 focus:ring-1 focus:ring-pri/30 transition-colors duration-200"
          aria-label="Buscar recursos"
        />
        {search && (
          <button
            onClick={() => updateSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-faint hover:text-text transition-colors"
            aria-label="Borrar búsqueda"
          >
            <i className="fa-solid fa-xmark text-sm" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Filtrar por categoría">
        <button
          onClick={() => updateCat('todas')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors duration-200 ${
            catFilter === 'todas'
              ? 'bg-white/10 text-text border-white/20'
              : 'bg-surface text-muted border-border hover:text-text'
          }`}
          aria-pressed={catFilter === 'todas'}
        >
          Todas ({RECURSOS_PDF.length})
        </button>
        {CATEGORIAS.map(cat => {
          const active = catFilter === cat
          const color = CAT_COLOR[cat]
          return (
            <button
              key={cat}
              onClick={() => updateCat(active ? 'todas' : cat)}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors duration-200 ${active ? 'ring-1 ring-inset ring-current/40' : ''}`}
              style={active
                ? { background: `${color}18`, color, borderColor: `${color}45` }
                : { background: 'rgba(19,21,43,1)', color: '#9CA3AF', borderColor: 'rgba(129,106,183,0.1)' }
              }
              aria-pressed={active}
            >
              {cat}
            </button>
          )
        })}
      </div>

      {/* Result count */}
      <p className="text-xs text-faint mb-4" aria-live="polite" aria-atomic="true">
        {results.length === RECURSOS_PDF.length
          ? <><strong className="text-muted">{results.length}</strong> documentos</>
          : <><strong className="text-text">{results.length}</strong> resultado{results.length !== 1 ? 's' : ''}</>
        }
      </p>

      {results.length > 0 ? (
        <div className="space-y-3">
          {results.map((pdf, i) => (
            <PDFCard key={pdf.id} pdf={pdf} prefersReduced={prefersReduced} index={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-14 rounded-card border border-border bg-surface">
          <i className="fa-solid fa-magnifying-glass text-3xl text-faint mb-4 block" aria-hidden="true" />
          <p className="text-muted text-sm font-medium mb-1">Sin resultados</p>
          <p className="text-faint text-xs mb-5">Prueba con otras palabras o quita el filtro de categoría.</p>
          <button
            onClick={() => { updateSearch(''); updateCat('todas') }}
            className="px-4 py-2 rounded-lg bg-pri/10 text-pri text-xs font-semibold border border-pri/25 hover:bg-pri/18 transition-colors duration-200"
          >
            Ver todos los recursos
          </button>
        </div>
      )}
    </div>
  )
}
