import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { herramientas, categorias, precios } from '../data/herramientas'
import { useReducedMotion } from '../hooks/useReducedMotion'

const TIPO_BADGE = {
  APP:   { label: 'App',      color: 'text-pri   bg-pri/10   border-pri/20' },
  WEB:   { label: 'Web',      color: 'text-acc   bg-acc/10   border-acc/20' },
  EXT:   { label: 'Extensión',color: 'text-sec   bg-sec/10   border-sec/20' },
  HARD:  { label: 'Físico',   color: 'text-warm  bg-warm/10  border-warm/20' },
  SOFT:  { label: 'Software', color: 'text-green bg-green/10 border-green/20' },
  COM:   { label: 'Comunidad',color: 'text-sec   bg-sec/10   border-sec/20' },
  TIENDA:{ label: 'Tienda',   color: 'text-warm  bg-warm/10  border-warm/20' },
  JUEGO: { label: 'Juego',    color: 'text-green bg-green/10 border-green/20' },
}

const PRECIO_BADGE = {
  Gratis:   'text-green  bg-green/10  border-green/20',
  Freemium: 'text-warm   bg-warm/10   border-warm/20',
  Pago:     'text-muted  bg-surface   border-border',
}

const STARS = { Excelente: 5, 'Muy bueno': 4, Bueno: 3 }

function StarRating({ label }) {
  const n = STARS[label] ?? 3
  return (
    <span className="flex items-center gap-0.5" aria-label={`Valoración: ${label}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <i
          key={i}
          className={`fa-solid fa-star text-[9px] ${i < n ? 'text-warm' : 'text-faint/30'}`}
          aria-hidden="true"
        />
      ))}
    </span>
  )
}

function ToolCard({ h, index, prefersReduced }) {
  const tipo = TIPO_BADGE[h.tipo] ?? { label: h.tipo, color: 'text-muted bg-surface border-border' }
  return (
    <motion.article
      initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: prefersReduced ? 0 : 0.35, delay: prefersReduced ? 0 : (index % 6) * 0.04 }}
      className="group flex flex-col gap-3 p-5 rounded-card bg-surface border border-border hover:border-sec/30 hover:bg-surfaceH transition-all duration-300"
      aria-label={`${h.nombre}: ${h.notas}`}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-text text-sm leading-snug">{h.nombre}</h3>
        <span className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-md border ${tipo.color}`}>
          {tipo.label}
        </span>
      </div>

      {/* Category + subcategory */}
      <p className="text-[11px] text-faint font-medium uppercase tracking-wider">
        {h.categoria} · {h.subcategoria}
      </p>

      {/* Description */}
      <p className="text-xs leading-relaxed text-muted flex-1">{h.notas}</p>

      {/* Profiles */}
      <div className="flex flex-wrap gap-1" aria-label="Perfiles neurodivergentes compatibles">
        {h.perfiles.split(',').map(p => p.trim()).filter(Boolean).map(p => (
          <span
            key={p}
            className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-sec/8 text-sec border border-sec/15"
          >
            {p}
          </span>
        ))}
      </div>

      {/* Footer: price, stars, link */}
      <div className="flex items-center justify-between pt-1 border-t border-border/50 gap-2">
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${PRECIO_BADGE[h.precio] ?? 'text-muted bg-surface border-border'}`}>
            {h.precio}
          </span>
          <StarRating label={h.valoracion} />
        </div>
        <a
          href={h.enlace}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-pri hover:text-pri/75 transition-colors duration-200 flex items-center gap-1"
          aria-label={`Abrir ${h.nombre} en nueva pestaña`}
        >
          Visitar
          <i className="fa-solid fa-arrow-up-right-from-square text-[9px]" aria-hidden="true" />
        </a>
      </div>
    </motion.article>
  )
}

export default function ResourceLibrary() {
  const prefersReduced = useReducedMotion()
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('todas')
  const [precioFilter, setPrecioFilter] = useState('todos')

  const results = useMemo(() => {
    const q = search.toLowerCase().trim()
    return herramientas.filter(h => {
      const matchSearch = !q ||
        h.nombre.toLowerCase().includes(q) ||
        h.notas.toLowerCase().includes(q) ||
        h.subcategoria.toLowerCase().includes(q) ||
        h.perfiles.toLowerCase().includes(q)
      const matchCat = catFilter === 'todas' || h.categoria === catFilter
      const matchPrecio = precioFilter === 'todos' || h.precio === precioFilter
      return matchSearch && matchCat && matchPrecio
    })
  }, [search, catFilter, precioFilter])

  return (
    <div className="flex flex-col gap-6">
      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <i
            className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-faint text-sm pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar herramienta, perfil o necesidad..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-border text-text text-sm placeholder:text-faint outline-none focus:border-pri/50 focus:ring-1 focus:ring-pri/30 transition-colors duration-200"
            aria-label="Buscar herramientas"
          />
        </div>

        {/* Category filter */}
        <select
          value={catFilter}
          onChange={e => setCatFilter(e.target.value)}
          className="px-3.5 py-2.5 rounded-xl bg-surface border border-border text-sm text-muted outline-none focus:border-pri/50 focus:ring-1 focus:ring-pri/30 transition-colors duration-200 cursor-pointer"
          aria-label="Filtrar por categoría"
        >
          <option value="todas">Todas las categorías</option>
          {categorias.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        {/* Price filter */}
        <select
          value={precioFilter}
          onChange={e => setPrecioFilter(e.target.value)}
          className="px-3.5 py-2.5 rounded-xl bg-surface border border-border text-sm text-muted outline-none focus:border-pri/50 focus:ring-1 focus:ring-pri/30 transition-colors duration-200 cursor-pointer"
          aria-label="Filtrar por precio"
        >
          <option value="todos">Cualquier precio</option>
          {precios.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      {/* Results count */}
      <p className="text-xs text-faint" aria-live="polite" aria-atomic="true">
        {results.length === herramientas.length
          ? `${results.length} herramientas en la biblioteca`
          : `${results.length} resultado${results.length !== 1 ? 's' : ''} encontrado${results.length !== 1 ? 's' : ''}`}
      </p>

      {/* Grid */}
      {results.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((h, i) => (
            <ToolCard key={`${h.nombre}-${i}`} h={h} index={i} prefersReduced={prefersReduced} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <i className="fa-solid fa-magnifying-glass text-3xl text-faint mb-4 block" aria-hidden="true" />
          <p className="text-muted text-sm">No hay resultados para esta búsqueda.</p>
          <p className="text-faint text-xs mt-1">Prueba con otras palabras o elimina algún filtro.</p>
          <button
            onClick={() => { setSearch(''); setCatFilter('todas'); setPrecioFilter('todos') }}
            className="mt-4 text-xs font-semibold text-pri hover:underline"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  )
}
