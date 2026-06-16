import { useState, useMemo, useCallback } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet'
import { useEffect } from 'react'
import { LUGARES, TIPOS } from '../data/lugares'

const TYPE_CONFIG = {
  supermercado:          { color: '#3A82CA', label: 'Hora silenciosa', icon: 'fa-cart-shopping' },
  biblioteca:            { color: '#816AB7', label: 'Biblioteca',       icon: 'fa-book' },
  sala_estudio:          { color: '#9CC156', label: 'Sala de estudio',  icon: 'fa-graduation-cap' },
  espacio_natural:       { color: '#48B0A1', label: 'Espacio natural',  icon: 'fa-tree' },
  centro_civico:         { color: '#FBB027', label: 'Centro cívico',    icon: 'fa-building' },
  centro_comercial:      { color: '#6366f1', label: 'Centro comercial', icon: 'fa-bag-shopping' },
  aeropuerto:            { color: '#8b5cf6', label: 'Aeropuerto',       icon: 'fa-plane' },
  cultura:               { color: '#E57B86', label: 'Cultura / Museo',  icon: 'fa-landmark' },
  hotel:                 { color: '#f59e0b', label: 'Hotel',            icon: 'fa-hotel' },
  restaurante_silencioso:{ color: '#10b981', label: 'Restaurante',      icon: 'fa-utensils' },
  sunflower:             { color: '#eab308', label: 'Sunflower',        icon: 'fa-sun' },
  coworking:             { color: '#06b6d4', label: 'Coworking',        icon: 'fa-laptop' },
}

function getColor(tipo) {
  return TYPE_CONFIG[tipo]?.color ?? '#9CA3AF'
}

function MapController({ center, zoom }) {
  const map = useMap()
  useEffect(() => { map.setView(center, zoom) }, [])
  return null
}

// Stats by type
const STATS = TIPOS.reduce((acc, t) => {
  acc[t] = LUGARES.filter(l => l.tipo === t).length
  return acc
}, {})

export default function SilentMap() {
  const [filter, setFilter] = useState('todos')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return LUGARES.filter(l => {
      const matchType = filter === 'todos' || l.tipo === filter
      const matchSearch = !q ||
        l.nombre.toLowerCase().includes(q) ||
        l.ciudad.toLowerCase().includes(q) ||
        l.descripcion.toLowerCase().includes(q)
      return matchType && matchSearch
    })
  }, [filter, search])

  const handleTypeClick = useCallback((tipo) => {
    setFilter(prev => prev === tipo ? 'todos' : tipo)
  }, [])

  return (
    <div className="flex flex-col gap-4">
      {/* Search */}
      <div className="relative">
        <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-faint text-sm pointer-events-none" aria-hidden="true" />
        <input
          type="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por ciudad, nombre o tipo de espacio..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-border text-text text-sm placeholder:text-faint outline-none focus:border-pri/50 focus:ring-1 focus:ring-pri/30 transition-colors duration-200"
          aria-label="Buscar espacios silenciosos"
        />
      </div>

      {/* Type filters */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por tipo de espacio">
        <button
          onClick={() => setFilter('todos')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-200 border ${
            filter === 'todos'
              ? 'bg-white/10 text-text border-white/20'
              : 'bg-surface text-muted border-border hover:text-text'
          }`}
          aria-pressed={filter === 'todos'}
        >
          Todos ({LUGARES.length})
        </button>
        {TIPOS.map(tipo => {
          const cfg = TYPE_CONFIG[tipo]
          const count = STATS[tipo] ?? 0
          if (!count || !cfg) return null
          const active = filter === tipo
          return (
            <button
              key={tipo}
              onClick={() => handleTypeClick(tipo)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-200 border"
              style={active
                ? { backgroundColor: `${cfg.color}20`, color: cfg.color, borderColor: `${cfg.color}50` }
                : { backgroundColor: 'rgba(19,21,43,1)', color: '#9CA3AF', borderColor: 'rgba(129,106,183,0.1)' }
              }
              aria-pressed={active}
            >
              {cfg.label} ({count})
            </button>
          )
        })}
      </div>

      {/* Map */}
      <div className="relative rounded-card overflow-hidden border border-border" style={{ height: '520px' }}>
        <MapContainer
          center={[40.416, -3.703]}
          zoom={6}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
          aria-label="Mapa interactivo de espacios silenciosos en España"
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            maxZoom={18}
          />
          {filtered.map((lugar) => (
            <CircleMarker
              key={lugar.id}
              center={[lugar.lat, lugar.lng]}
              radius={7}
              pathOptions={{
                color: getColor(lugar.tipo),
                fillColor: getColor(lugar.tipo),
                fillOpacity: 0.8,
                weight: 1.5,
              }}
              aria-label={`${lugar.nombre}, ${lugar.ciudad}`}
            >
              <Popup maxWidth={280}>
                <div className="text-sm" style={{ minWidth: '220px', fontFamily: 'Inter, system-ui, sans-serif' }}>
                  <p
                    className="text-xs font-bold uppercase tracking-wider mb-1.5"
                    style={{ color: getColor(lugar.tipo) }}
                  >
                    <i className={`fa-solid ${TYPE_CONFIG[lugar.tipo]?.icon ?? 'fa-location-dot'} mr-1.5`} aria-hidden="true" />
                    {TYPE_CONFIG[lugar.tipo]?.label ?? lugar.tipo}
                  </p>
                  <h3 style={{ fontWeight: 600, color: '#E5E7EB', fontSize: '15px', marginBottom: '4px', lineHeight: '1.3' }}>
                    {lugar.nombre}
                  </h3>
                  <p style={{ color: '#9CA3AF', fontSize: '12px', marginBottom: '6px' }}>
                    <i className="fa-solid fa-location-dot mr-1" style={{ color: '#6B7280' }} aria-hidden="true" />
                    {lugar.ciudad}
                  </p>
                  {lugar.horario && (
                    <p style={{ color: '#9CA3AF', fontSize: '12px', marginBottom: '8px' }}>
                      <i className="fa-regular fa-clock mr-1" style={{ color: '#6B7280' }} aria-hidden="true" />
                      {lugar.horario}
                    </p>
                  )}
                  {lugar.descripcion && (
                    <p style={{ color: '#9CA3AF', fontSize: '12px', lineHeight: '1.55', marginBottom: '10px' }}>
                      {lugar.descripcion}
                    </p>
                  )}
                  {lugar.url && lugar.url !== '#' && (
                    <a
                      href={lugar.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#3A82CA', fontSize: '12px', fontWeight: 600, textDecoration: 'none' }}
                    >
                      Ver fuente <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '10px' }} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>

        {/* Results overlay */}
        <div
          className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg text-xs text-text font-medium pointer-events-none"
          style={{ background: 'rgba(12,14,30,0.85)', backdropFilter: 'blur(8px)', zIndex: 1000 }}
          aria-live="polite"
        >
          {filtered.length} espacio{filtered.length !== 1 ? 's' : ''} visibles
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {TIPOS.map(tipo => {
          const cfg = TYPE_CONFIG[tipo]
          if (!cfg) return null
          return (
            <div key={tipo} className="flex items-center gap-2 text-xs text-muted">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cfg.color }} aria-hidden="true" />
              {cfg.label}
            </div>
          )
        })}
      </div>
    </div>
  )
}
