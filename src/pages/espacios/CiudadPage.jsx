/**
 * CiudadPage — dynamic landing for /espacios/:ciudad.
 * Shows all silent spaces in a given city with map link and details.
 */

import { useMemo } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { usePageMeta } from '../../hooks/usePageMeta'
import Breadcrumb from '../../components/ui/Breadcrumb'
import { getRelatedSpaces, getCiudadesMap } from '../../lib/content-graph/index'

const TIPO_LABEL = {
  supermercado:     'Supermercado',
  centro_comercial: 'Centro comercial',
  aeropuerto:       'Aeropuerto',
  museo:            'Museo',
  cine:             'Cine',
  teatro:           'Teatro',
  biblioteca:       'Biblioteca',
  restaurante:      'Restaurante',
  parque:           'Parque',
  otro:             'Espacio',
}

const TIPO_ICON = {
  supermercado:     'fa-cart-shopping',
  centro_comercial: 'fa-shop',
  aeropuerto:       'fa-plane',
  museo:            'fa-landmark',
  cine:             'fa-film',
  teatro:           'fa-masks-theater',
  biblioteca:       'fa-book',
  restaurante:      'fa-utensils',
  parque:           'fa-tree',
  otro:             'fa-location-dot',
}

function SpaceCard({ space, index }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.article
      initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: prefersReduced ? 0 : 0.35, delay: prefersReduced ? 0 : (index % 6) * 0.06 }}
      className="flex flex-col gap-3 p-4 rounded-card border border-border bg-surface
                 hover:border-pri/30 hover:bg-surfaceH hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/20
                 transition-all duration-200"
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-pri/10">
          <i className={`fa-solid ${TIPO_ICON[space.tipo] ?? 'fa-location-dot'} text-pri text-sm`} aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-text leading-snug">{space.nombre}</p>
          <p className="text-[10px] text-muted mt-0.5">{TIPO_LABEL[space.tipo] ?? space.tipo}</p>
        </div>
      </div>

      {space.horario && (
        <div className="flex items-start gap-2 text-xs text-muted">
          <i className="fa-regular fa-clock text-faint text-[10px] mt-0.5 shrink-0" aria-hidden="true" />
          <span>{space.horario}</span>
        </div>
      )}

      <p className="text-xs text-muted leading-relaxed flex-1">{space.descripcion}</p>

      <div className="flex items-center justify-between gap-2 mt-auto">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${space.lat},${space.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ver ${space.nombre} en Google Maps (se abre en nueva pestaña)`}
          className="text-[10px] text-faint hover:text-pri transition-colors duration-150 flex items-center gap-1"
        >
          <i className="fa-solid fa-map-pin text-[9px]" aria-hidden="true" />
          Ver en mapa
        </a>
        {space.url && (
          <a
            href={space.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Más información sobre ${space.nombre} (se abre en nueva pestaña)`}
            className="text-[10px] text-faint hover:text-text transition-colors duration-150 flex items-center gap-1"
          >
            Más info <i className="fa-solid fa-arrow-up-right-from-square text-[9px]" aria-hidden="true" />
          </a>
        )}
      </div>
    </motion.article>
  )
}

export default function CiudadPage() {
  const { ciudad: ciudadSlug } = useParams()
  const prefersReduced = useReducedMotion()

  const ciudadesMap = useMemo(() => getCiudadesMap(), [])
  const displayName = ciudadesMap.get(ciudadSlug)
  const spaces = useMemo(() => getRelatedSpaces(ciudadSlug), [ciudadSlug])

  usePageMeta({
    title:       displayName
      ? `Espacios silenciosos en ${displayName} — Refugio Sensorial`
      : `Espacios · ${ciudadSlug} — Refugio Sensorial`,
    description: displayName
      ? `${spaces.length} espacios silenciosos y amigables con la neurodiversidad en ${displayName}: supermercados, aeropuertos, museos y más.`
      : 'Explora espacios silenciosos y accesibles para personas neurodivergentes.',
    section: 'espacios',
  })

  if (!displayName && spaces.length === 0) return <Navigate to="/espacios" replace />

  const breadcrumbItems = [
    { href: '/',        label: 'Inicio' },
    { href: '/espacios', label: 'Espacios' },
    {                    label: displayName ?? ciudadSlug },
  ]

  // Group by type
  const byType = useMemo(() => {
    const map = new Map()
    for (const s of spaces) {
      const key = s.tipo ?? 'otro'
      if (!map.has(key)) map.set(key, [])
      map.get(key).push(s)
    }
    return map
  }, [spaces])

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
      <Breadcrumb items={breadcrumbItems} className="mb-8" />

      {/* Hero */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-pri/10">
            <i className="fa-solid fa-location-dot text-pri" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold text-text">{displayName ?? ciudadSlug}</h1>
        </div>
        <p className="text-sm text-muted leading-relaxed max-w-2xl">
          {spaces.length > 0
            ? `${spaces.length} espacio${spaces.length !== 1 ? 's' : ''} silencioso${spaces.length !== 1 ? 's' : ''} y amigables con la neurodiversidad en esta ciudad.`
            : 'Aún no hay espacios registrados para esta ciudad.'
          }
        </p>
      </div>

      {/* Type summary pills */}
      {byType.size > 0 && (
        <div className="flex flex-wrap gap-2 mb-8" aria-label="Tipos de espacios">
          {[...byType.entries()].map(([tipo, items]) => (
            <span
              key={tipo}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border bg-surface text-xs text-muted"
            >
              <i className={`fa-solid ${TIPO_ICON[tipo] ?? 'fa-location-dot'} text-pri text-[10px]`} aria-hidden="true" />
              {TIPO_LABEL[tipo] ?? tipo} ({items.length})
            </span>
          ))}
        </div>
      )}

      {/* Spaces grid */}
      {spaces.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3" role="list" aria-label={`Espacios en ${displayName}`}>
          {spaces.map((space, i) => (
            <SpaceCard key={space.id} space={space} index={i} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-muted text-sm mb-4">Aún no tenemos espacios registrados para esta ciudad.</p>
          <Link to="/espacios" className="text-sm text-pri hover:underline">
            Ver el mapa completo
          </Link>
        </div>
      )}

      {/* CTA */}
      <div className="mt-12 grid sm:grid-cols-2 gap-3">
        <Link
          to="/espacios"
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-surface border border-border
                     text-sm font-semibold text-muted hover:border-pri/30 hover:text-text transition-all duration-200"
        >
          <i className="fa-solid fa-map text-pri text-xs" aria-hidden="true" />
          Abrir mapa completo
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
  )
}
