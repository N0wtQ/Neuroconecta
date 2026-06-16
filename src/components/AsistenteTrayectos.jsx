import { useState, useId, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { LUGARES } from '../data/lugares'

const TIPO_CONFIG = {
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

// Velocidad urbana media estimada para convertir distancia de desvío en minutos
const SPEED_KMH = 28
const MAX_DESVIO_MIN = 5

const norm = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim()

// Haversine — distancia en km entre dos coordenadas
function distKm(a, b) {
  const R = 6371
  const dLat = (b.lat - a.lat) * Math.PI / 180
  const dLng = (b.lng - a.lng) * Math.PI / 180
  const lat1 = a.lat * Math.PI / 180
  const lat2 = b.lat * Math.PI / 180
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}

export default function AsistenteTrayectos() {
  const [origen, setOrigen] = useState('')
  const [destino, setDestino] = useState('')
  const [estado, setEstado] = useState('idle') // idle | buscando | resultados | vacio | sinciudad
  const [resultados, setResultados] = useState([])
  const [rutaInfo, setRutaInfo] = useState(null)

  const idOrigen  = useId()
  const idDestino = useId()

  // Centroides reales de cada ciudad, derivados de los lugares verificados
  const ciudades = useMemo(() => {
    const acc = new Map()
    for (const l of LUGARES) {
      if (typeof l.lat !== 'number' || typeof l.lng !== 'number') continue
      const key = norm(l.ciudad)
      if (!key) continue
      if (!acc.has(key)) acc.set(key, { nombre: l.ciudad, latSum: 0, lngSum: 0, n: 0 })
      const c = acc.get(key)
      c.latSum += l.lat; c.lngSum += l.lng; c.n += 1
    }
    const list = []
    for (const [key, c] of acc) {
      list.push({ key, nombre: c.nombre, lat: c.latSum / c.n, lng: c.lngSum / c.n })
    }
    return list.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
  }, [])

  // Busca el centroide de ciudad que mejor encaja con el texto escrito
  const matchCiudad = (texto) => {
    const q = norm(texto)
    if (!q) return null
    return (
      ciudades.find(c => c.key === q) ||
      ciudades.find(c => q.includes(c.key) || c.key.includes(q)) ||
      null
    )
  }

  const handleBuscar = (e) => {
    e.preventDefault()
    if (!origen.trim() || !destino.trim()) return

    setEstado('buscando')
    setTimeout(() => {
      const cO = matchCiudad(origen)
      const cD = matchCiudad(destino)

      if (!cO || !cD) {
        setResultados([])
        setRutaInfo(null)
        setEstado('sinciudad')
        return
      }

      const directo = distKm(cO, cD)

      const found = LUGARES
        .filter(l => typeof l.lat === 'number' && typeof l.lng === 'number')
        .map(l => {
          // Desvío real = (origen→refugio + refugio→destino) − ruta directa
          const desvioKm = distKm(cO, l) + distKm(l, cD) - directo
          const desvioMin = Math.max(0, Math.round((desvioKm / SPEED_KMH) * 60))
          return { ...l, desvioKm, desvioMin }
        })
        .filter(l => l.desvioMin <= MAX_DESVIO_MIN)
        .sort((a, b) => a.desvioMin - b.desvioMin || a.desvioKm - b.desvioKm)
        .slice(0, 12)

      setResultados(found)
      setRutaInfo({ origen: cO.nombre, destino: cD.nombre })
      setEstado(found.length > 0 ? 'resultados' : 'vacio')
    }, 500)
  }

  const handleReset = () => {
    setEstado('idle')
    setResultados([])
    setRutaInfo(null)
    setOrigen('')
    setDestino('')
  }

  const inputCls = 'w-full px-4 py-3 rounded-xl bg-bg border border-border text-text text-sm placeholder:text-faint outline-none transition-colors duration-200 focus:border-acc/50 focus:ring-1 focus:ring-acc/25'
  const dotCls = 'inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold border'
  const dotStyle = { backgroundColor: 'rgba(72,176,161,0.12)', borderColor: 'rgba(72,176,161,0.3)', color: '#48B0A1' }

  return (
    <section aria-labelledby="trayectos-heading" className="max-w-2xl mx-auto px-4 py-10">

      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-acc/10 border border-acc/20 text-acc text-xs font-semibold uppercase tracking-widest mb-4">
          <i className="fa-solid fa-route text-[10px]" aria-hidden="true" />
          Trayectos sensoriales
        </div>
        <h1 id="trayectos-heading" className="text-3xl font-bold text-text leading-snug mb-3">
          Asistente de Trayectos<br />
          <span className="text-acc">Sensoriales</span>
        </h1>
        <p className="text-muted text-sm leading-relaxed max-w-prose">
          Dinos de qué ciudad sales y a cuál vas. Calculamos qué refugios sensoriales
          verificados puedes visitar en el camino con un desvío de hasta {MAX_DESVIO_MIN} minutos.
        </p>
        <p className="text-faint text-xs mt-2">
          Basado en {LUGARES.length} espacios reales repartidos por {ciudades.length} localidades de España.
        </p>
      </div>

      {/* Lista de ciudades disponibles para autocompletar */}
      <datalist id="lista-ciudades">
        {ciudades.map(c => <option key={c.key} value={c.nombre} />)}
      </datalist>

      {/* Form */}
      <form
        onSubmit={handleBuscar}
        className="rounded-card bg-surface border border-border p-6 flex flex-col gap-5 mb-6"
        aria-label="Formulario de búsqueda de trayecto"
      >
        {/* Origen */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor={idOrigen} className="text-sm font-semibold text-text flex items-center gap-2">
            <span className={dotCls} style={dotStyle} aria-hidden="true">A</span>
            Punto de origen
          </label>
          <input
            id={idOrigen}
            type="text"
            list="lista-ciudades"
            value={origen}
            onChange={e => setOrigen(e.target.value)}
            placeholder="p. ej. Madrid"
            autoComplete="off"
            className={inputCls}
            aria-required="true"
            disabled={estado === 'buscando'}
          />
        </div>

        {/* Flecha separadora */}
        <div className="flex items-center gap-3 -my-1" aria-hidden="true">
          <div className="flex-1 border-t border-border" />
          <i className="fa-solid fa-arrow-down text-faint text-xs" />
          <div className="flex-1 border-t border-border" />
        </div>

        {/* Destino */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor={idDestino} className="text-sm font-semibold text-text flex items-center gap-2">
            <span className={dotCls} style={dotStyle} aria-hidden="true">B</span>
            Destino final
          </label>
          <input
            id={idDestino}
            type="text"
            list="lista-ciudades"
            value={destino}
            onChange={e => setDestino(e.target.value)}
            placeholder="p. ej. Barcelona"
            autoComplete="off"
            className={inputCls}
            aria-required="true"
            disabled={estado === 'buscando'}
          />
        </div>

        {/* Botón */}
        <button
          type="submit"
          disabled={!origen.trim() || !destino.trim() || estado === 'buscando'}
          className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            backgroundColor: (!origen.trim() || !destino.trim() || estado === 'buscando') ? 'rgba(72,176,161,0.15)' : '#48B0A1',
            color: (!origen.trim() || !destino.trim() || estado === 'buscando') ? '#48B0A1' : '#0C0E1E',
          }}
        >
          {estado === 'buscando' ? (
            <>
              <i className="fa-solid fa-circle-notch fa-spin text-xs" aria-hidden="true" />
              Buscando refugios…
            </>
          ) : (
            <>
              <i className="fa-solid fa-magnifying-glass text-xs" aria-hidden="true" />
              Buscar refugios en el camino
            </>
          )}
        </button>
      </form>

      {/* Estado: ciudad no reconocida */}
      {estado === 'sinciudad' && (
        <div className="rounded-card bg-surface border border-border p-8 text-center" role="status">
          <i className="fa-solid fa-location-crosshairs text-faint text-2xl mb-4 block" aria-hidden="true" />
          <p className="text-text font-semibold mb-1">No reconocemos esa localidad</p>
          <p className="text-muted text-sm leading-relaxed mb-5">
            Escribe una localidad que tenga espacios verificados.<br />
            Empieza a teclear y elige una de las sugerencias.
          </p>
          <button
            onClick={handleReset}
            className="text-xs text-acc font-semibold hover:text-acc/75 transition-colors duration-200"
          >
            Probar de nuevo
          </button>
        </div>
      )}

      {/* Estado: vacío */}
      {estado === 'vacio' && (
        <div className="rounded-card bg-surface border border-border p-8 text-center" role="status">
          <i className="fa-solid fa-map-pin text-faint text-2xl mb-4 block" aria-hidden="true" />
          <p className="text-text font-semibold mb-1">Sin refugios en este trayecto</p>
          <p className="text-muted text-sm leading-relaxed mb-5">
            No hay refugios sensoriales a menos de {MAX_DESVIO_MIN} minutos de esta ruta.<br />
            Prueba con un origen y destino más cercanos entre sí.
          </p>
          <button
            onClick={handleReset}
            className="text-xs text-acc font-semibold hover:text-acc/75 transition-colors duration-200"
          >
            Hacer otra búsqueda
          </button>
        </div>
      )}

      {/* Estado: resultados */}
      {estado === 'resultados' && rutaInfo && (
        <div role="region" aria-label="Refugios encontrados en el trayecto">
          {/* Cabecera resultados */}
          <div className="flex items-center justify-between mb-4 gap-3">
            <p className="text-sm text-muted" aria-live="polite">
              <span className="text-text font-semibold">{resultados.length}</span>
              {' '}refugio{resultados.length !== 1 ? 's' : ''} entre{' '}
              <span className="text-acc font-medium">{rutaInfo.origen}</span>
              {' '}y{' '}
              <span className="text-acc font-medium">{rutaInfo.destino}</span>
            </p>
            <button
              onClick={handleReset}
              className="shrink-0 text-xs text-faint hover:text-muted transition-colors duration-200 flex items-center gap-1.5"
              aria-label="Nueva búsqueda"
            >
              <i className="fa-solid fa-xmark text-[10px]" aria-hidden="true" />
              Nueva búsqueda
            </button>
          </div>

          {/* Lista de refugios */}
          <ol className="flex flex-col gap-3" aria-label="Lista de refugios sensoriales">
            {resultados.map((r, i) => {
              const cfg = TIPO_CONFIG[r.tipo] ?? { color: '#9CA3AF', label: r.tipo, icon: 'fa-location-dot' }
              return (
                <li key={r.id}>
                  <article
                    className="rounded-card bg-surface border border-border p-5 flex flex-col gap-3 transition-colors duration-200 hover:border-borderH"
                    aria-label={`${r.nombre}, desvío ${r.desvioMin} minutos`}
                  >
                    {/* Cabecera tarjeta */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span
                          className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs mt-0.5"
                          style={{ backgroundColor: `${cfg.color}18`, color: cfg.color }}
                          aria-hidden="true"
                        >
                          <i className={`fa-solid ${cfg.icon}`} />
                        </span>
                        <div>
                          <h2 className="text-sm font-bold text-text leading-snug">{r.nombre}</h2>
                          <p className="text-xs text-faint mt-0.5 flex items-center gap-1.5">
                            <i className="fa-solid fa-location-dot" aria-hidden="true" />
                            {r.ciudad}
                            <span aria-hidden="true">·</span>
                            <span style={{ color: cfg.color }}>{cfg.label}</span>
                          </p>
                        </div>
                      </div>

                      {/* Badge desvío */}
                      <div className="shrink-0 flex flex-col items-end gap-1">
                        <span
                          className="text-xs font-bold px-2.5 py-1 rounded-lg whitespace-nowrap"
                          style={{ backgroundColor: `${cfg.color}15`, color: cfg.color }}
                        >
                          {r.desvioMin === 0 ? 'En la ruta' : `+${r.desvioMin} min`}
                        </span>
                      </div>
                    </div>

                    {/* Descripción */}
                    {r.descripcion && (
                      <p className="text-xs text-muted leading-relaxed pl-10">{r.descripcion}</p>
                    )}

                    {/* Horario */}
                    {r.horario && (
                      <p className="pl-10 text-[11px] text-faint flex items-center gap-1.5">
                        <i className="fa-regular fa-clock" aria-hidden="true" />
                        {r.horario}
                      </p>
                    )}

                    {/* Enlace a la fuente */}
                    {r.url && r.url !== '#' && (
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pl-10 text-[11px] font-semibold flex items-center gap-1.5 w-fit transition-colors duration-200"
                        style={{ color: cfg.color }}
                      >
                        Ver fuente
                        <i className="fa-solid fa-arrow-up-right-from-square text-[9px]" aria-hidden="true" />
                      </a>
                    )}
                  </article>
                </li>
              )
            })}
          </ol>

          {/* Nota al pie */}
          <p className="mt-5 text-center text-xs text-faint leading-relaxed">
            El desvío es una estimación en línea recta a velocidad urbana media.{' '}
            <Link to="/mapa" className="text-acc hover:text-acc/75 transition-colors duration-200 font-medium">
              Ver todos en el mapa
            </Link>
          </p>
        </div>
      )}
    </section>
  )
}
