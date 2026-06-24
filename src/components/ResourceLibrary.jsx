import { useState, useMemo, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { herramientas, categorias, precios, perfiles } from '../data/herramientas'
import { useReducedMotion } from '../hooks/useReducedMotion'

const TIPO_BADGE = {
  APP:   { label: 'App',       color: 'text-pri  bg-pri/10  border-pri/20' },
  WEB:   { label: 'Web',       color: 'text-acc  bg-acc/10  border-acc/20' },
  EXT:   { label: 'Extensión', color: 'text-sec  bg-sec/10  border-sec/20' },
  HARD:  { label: 'Físico',    color: 'text-warm bg-warm/10 border-warm/20' },
  SOFT:  { label: 'Software',  color: 'text-green bg-green/10 border-green/20' },
  COM:   { label: 'Comunidad', color: 'text-sec  bg-sec/10  border-sec/20' },
  TIENDA:{ label: 'Tienda',    color: 'text-warm bg-warm/10 border-warm/20' },
  JUEGO: { label: 'Juego',     color: 'text-green bg-green/10 border-green/20' },
}

const PRECIO_COLOR = {
  Gratis:   { text: 'text-green',  bg: 'bg-green/10',  border: 'border-green/25' },
  Freemium: { text: 'text-warm',   bg: 'bg-warm/10',   border: 'border-warm/25'  },
  Pago:     { text: 'text-faint',  bg: 'bg-surface',   border: 'border-border'   },
}

const STARS = { Excelente: 5, 'Muy bueno': 4, Bueno: 3 }

const CAT_ICON = {
  'Gestión Ejecutiva':     'fa-calendar-check',
  'Regulación Sensorial':  'fa-ear-listen',
  'Salud Emocional':       'fa-heart',
  'Comunicación Social':   'fa-comments',
  'Accesibilidad Cognitiva':'fa-brain',
  'Profesional Laboral':   'fa-briefcase',
  'Educación Infantil':    'fa-child',
  'Hiperfocos':            'fa-magnifying-glass',
  'Mascotas Apoyo':        'fa-paw',
  'Ejercicio Movimiento':  'fa-person-running',
  'Alimentación':          'fa-apple-whole',
  'Vida Independiente':    'fa-house',
}

function StarRating({ label }) {
  const n = STARS[label] ?? 3
  return (
    <span className="flex items-center gap-0.5" aria-label={`Valoración: ${label}`} title={label}>
      {Array.from({ length: 5 }).map((_, i) => (
        <i key={i} className={`fa-solid fa-star text-[9px] ${i < n ? 'text-warm' : 'text-border'}`} aria-hidden="true" />
      ))}
    </span>
  )
}

// The entire card is an <a> — click anywhere to open the tool
function ToolCard({ h, index, prefersReduced }) {
  const tipo  = TIPO_BADGE[h.tipo] ?? { label: h.tipo, color: 'text-muted bg-surface border-border' }
  const precio = PRECIO_COLOR[h.precio] ?? PRECIO_COLOR.Pago
  const icon  = CAT_ICON[h.categoria] ?? 'fa-toolbox'

  return (
    <motion.a
      href={h.enlace}
      target="_blank"
      rel="noopener noreferrer"
      initial={prefersReduced ? {} : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: prefersReduced ? 0 : 0.32, delay: prefersReduced ? 0 : (index % 6) * 0.035 }}
      className="group relative flex flex-col gap-3 p-5 rounded-card bg-surface border border-border
                 hover:border-sec/40 hover:bg-surfaceH hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20
                 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2
                 focus-visible:ring-pri focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      aria-label={`${h.nombre} — ${h.notas} (se abre en nueva pestaña)`}
    >
      {/* Top row: icon + name + type badge */}
      <div className="flex items-start gap-3">
        <div className="shrink-0 w-9 h-9 rounded-xl bg-sec/10 border border-sec/15 flex items-center justify-center">
          <i className={`fa-solid ${icon} text-sec text-sm`} aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-text text-sm leading-snug group-hover:text-pri transition-colors duration-200">
              {h.nombre}
            </h3>
            <span className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-md border ${tipo.color}`}>
              {tipo.label}
            </span>
          </div>
          <p className="text-[11px] text-faint font-medium mt-0.5">{h.categoria} · {h.subcategoria}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs leading-relaxed text-muted flex-1">{h.notas}</p>

      {/* ND profiles */}
      <div className="flex flex-wrap gap-1">
        {h.perfiles.split(',').map(p => p.trim()).filter(Boolean).map(p => (
          <span key={p} className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-sec/8 text-sec border border-sec/12">
            {p}
          </span>
        ))}
      </div>

      {/* Footer: price + stars + "Abrir" arrow */}
      <div className="flex items-center justify-between pt-2 border-t border-border/40">
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${precio.text} ${precio.bg} ${precio.border}`}>
            {h.precio}
          </span>
          <StarRating label={h.valoracion} />
        </div>
        {/* Visual "open" cue — reinforces that the whole card is clickable */}
        <span className="flex items-center gap-1 text-[11px] font-semibold text-pri opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200">
          Abrir
          <i className="fa-solid fa-arrow-up-right-from-square text-[9px]" aria-hidden="true" />
        </span>
      </div>
    </motion.a>
  )
}

// ── Perfil dropdown ───────────────────────────────────────────────────────────

function PerfilDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const triggerRef = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Focus first option when dropdown opens
  useEffect(() => {
    if (open) {
      const first = ref.current?.querySelector('[role="option"]')
      first?.focus()
    }
  }, [open])

  const handleKeyDown = (e) => {
    if (!open) return
    const options = [...(ref.current?.querySelectorAll('[role="option"]') ?? [])]
    const idx = options.indexOf(document.activeElement)
    if (e.key === 'Escape') {
      setOpen(false)
      triggerRef.current?.focus()
      e.preventDefault()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      options[idx < options.length - 1 ? idx + 1 : 0]?.focus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      options[idx > 0 ? idx - 1 : options.length - 1]?.focus()
    } else if (e.key === 'Home') {
      e.preventDefault()
      options[0]?.focus()
    } else if (e.key === 'End') {
      e.preventDefault()
      options[options.length - 1]?.focus()
    }
  }

  const isFiltered = value !== 'todos'
  const label = isFiltered ? `${value} (${PERFIL_COUNTS[value]})` : 'Todos'

  return (
    <div ref={ref} className="relative" onKeyDown={handleKeyDown}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={`flex items-center gap-1.5 pl-3 pr-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors duration-200 ${
          isFiltered
            ? 'bg-acc/15 text-acc border-acc/30'
            : 'bg-surface text-muted border-border hover:text-text'
        }`}
      >
        {label}
        <i className={`fa-solid fa-chevron-down text-[11px] transition-transform duration-150 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.13 }}
            className="absolute top-full left-0 mt-1.5 w-48 rounded-xl border border-border bg-[#0C0E1E] shadow-xl shadow-black/40 overflow-hidden z-50 py-1"
            role="listbox"
            aria-label="Filtrar por perfil neurodivergente"
          >
            <button
              role="option"
              aria-selected={!isFiltered}
              onClick={() => { onChange('todos'); setOpen(false) }}
              className={`w-full flex items-center justify-between px-4 py-2 text-xs transition-colors duration-150 hover:bg-white/5 ${
                !isFiltered ? 'text-text font-semibold' : 'text-muted'
              }`}
            >
              Todos los perfiles
              <span className="text-faint tabular-nums">{herramientas.length}</span>
            </button>
            <div className="h-px bg-border/50 mx-3 my-0.5" aria-hidden="true" />
            {perfiles.map(p => (
              <button
                key={p}
                role="option"
                aria-selected={value === p}
                onClick={() => { onChange(p); setOpen(false) }}
                className={`w-full flex items-center justify-between px-4 py-2 text-xs transition-colors duration-150 hover:bg-white/5 ${
                  value === p ? 'text-acc font-semibold' : 'text-muted'
                }`}
              >
                {p}
                <span className="text-faint tabular-nums">{PERFIL_COUNTS[p]}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Category chips with counts ──────────────────────────────────────────────
const CAT_COUNTS = categorias.reduce((acc, c) => {
  acc[c] = herramientas.filter(h => h.categoria === c).length
  return acc
}, {})

const PERFIL_COUNTS = perfiles.reduce((acc, p) => {
  acc[p] = herramientas.filter(h => h.perfiles.split(',').map(s => s.trim()).includes(p)).length
  return acc
}, {})

export default function ResourceLibrary() {
  const prefersReduced = useReducedMotion()
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(() => searchParams.get('q') ?? '')
  const catFilter    = searchParams.get('categoria') ?? 'todas'
  const precioFilter = searchParams.get('precio')    ?? 'todos'
  const perfilFilter = searchParams.get('perfil')    ?? 'todos'

  const results = useMemo(() => {
    const q = search.toLowerCase().trim()
    return herramientas.filter(h => {
      const matchSearch = !q ||
        h.nombre.toLowerCase().includes(q) ||
        h.notas.toLowerCase().includes(q) ||
        h.subcategoria.toLowerCase().includes(q) ||
        h.perfiles.toLowerCase().includes(q) ||
        h.categoria.toLowerCase().includes(q)
      const matchCat    = catFilter === 'todas'  || h.categoria === catFilter
      const matchPrecio = precioFilter === 'todos' || h.precio  === precioFilter
      const matchPerfil = perfilFilter === 'todos' || h.perfiles.split(',').map(p => p.trim()).includes(perfilFilter)
      return matchSearch && matchCat && matchPrecio && matchPerfil
    })
  }, [search, catFilter, precioFilter, perfilFilter])

  const resetFilters = () => { setSearch(''); setSearchParams({}, { replace: true }) }

  return (
    <div className="flex flex-col gap-6">

      {/* ── Search bar ── */}
      <div className="relative">
        <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-faint text-sm pointer-events-none" aria-hidden="true" />
        <input
          type="text"
          value={search}
          onChange={e => {
            const val = e.target.value
            setSearch(val)
            const next = new URLSearchParams(searchParams)
            if (val) next.set('q', val); else next.delete('q')
            setSearchParams(next, { replace: true })
          }}
          placeholder="Buscar herramienta, perfil neurodivergente o necesidad..."
          className="w-full pl-10 pr-10 py-3 rounded-xl bg-surface border border-border text-text text-sm placeholder:text-faint outline-none focus:border-pri/50 focus:ring-1 focus:ring-pri/30 transition-colors duration-200"
          aria-label="Buscar herramientas"
        />
        {search && (
          <button
            onClick={() => {
              setSearch('')
              const next = new URLSearchParams(searchParams)
              next.delete('q')
              setSearchParams(next, { replace: true })
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-faint hover:text-text transition-colors"
            aria-label="Borrar búsqueda"
          >
            <i className="fa-solid fa-xmark text-sm" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* ── Category chips ── */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
        <button
          onClick={() => {
            const next = new URLSearchParams(searchParams)
            next.delete('categoria')
            setSearchParams(next, { replace: true })
          }}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors duration-200 ${
            catFilter === 'todas'
              ? 'bg-sec/15 text-sec border-sec/30'
              : 'bg-surface text-muted border-border hover:text-text hover:border-border/80'
          }`}
          aria-pressed={catFilter === 'todas'}
        >
          Todas ({herramientas.length})
        </button>
        {categorias.map(cat => (
          <button
            key={cat}
            onClick={() => {
              const next = new URLSearchParams(searchParams)
              if (searchParams.get('categoria') === cat) next.delete('categoria')
              else next.set('categoria', cat)
              setSearchParams(next, { replace: true })
            }}
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors duration-200 ${
              catFilter === cat
                ? 'bg-sec/15 text-sec border-sec/30 ring-1 ring-sec/40 ring-inset'
                : 'bg-surface text-muted border-border hover:text-text hover:border-border/80'
            }`}
            aria-pressed={catFilter === cat}
          >
            {cat} ({CAT_COUNTS[cat]})
          </button>
        ))}
      </div>

      {/* ── Perfil dropdown + Price filter + result count ── */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p className="text-xs text-faint" aria-live="polite" aria-atomic="true">
          {results.length === herramientas.length
            ? <><strong className="text-muted">{results.length}</strong> herramientas en la biblioteca</>
            : <><strong className="text-text">{results.length}</strong> resultado{results.length !== 1 ? 's' : ''}</>
          }
        </p>
        <div className="flex items-center gap-3 flex-wrap justify-end">
          <div className="flex items-center gap-2">
            <span className="text-xs text-faint">Perfil:</span>
            <PerfilDropdown value={perfilFilter} onChange={p => {
              const next = new URLSearchParams(searchParams)
              if (p === 'todos') next.delete('perfil'); else next.set('perfil', p)
              setSearchParams(next, { replace: true })
            }} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-faint">Precio:</span>
            {['todos', 'Gratis', 'Freemium', 'Pago'].map(p => (
              <button
                key={p}
                onClick={() => {
                  const next = new URLSearchParams(searchParams)
                  if (p === 'todos') next.delete('precio'); else next.set('precio', p)
                  setSearchParams(next, { replace: true })
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors duration-200 ${
                  precioFilter === p
                    ? 'bg-pri/12 text-pri border-pri/30'
                    : 'bg-surface text-muted border-border hover:text-text'
                }`}
                aria-pressed={precioFilter === p}
              >
                {p === 'todos' ? 'Todos' : p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      {results.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((h, i) => (
            <ToolCard key={`${h.nombre}-${i}`} h={h} index={i} prefersReduced={prefersReduced} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 rounded-card border border-border bg-surface">
          <i className="fa-solid fa-magnifying-glass text-3xl text-faint mb-4 block" aria-hidden="true" />
          <p className="text-muted text-sm font-medium mb-1">Sin resultados</p>
          <p className="text-faint text-xs mb-5">Prueba con otras palabras o quita algún filtro.</p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-lg bg-pri/10 text-pri text-xs font-semibold border border-pri/25 hover:bg-pri/18 transition-colors duration-200"
          >
            Ver todas las herramientas
          </button>
        </div>
      )}
    </div>
  )
}
