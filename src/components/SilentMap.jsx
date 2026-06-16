import { useEffect, useState, useCallback } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

// Inline GeoJSON-like data for key verified silent spaces across Spain
const LUGARES = [
  { id:'R001', lat:40.4015, lng:-3.6826, nombre:'Carrefour España — Hora silenciosa', tipo:'supermercado', ciudad:'España (red nacional)', horario:'Todos los días: 14:30–16:30', descripcion:'Primera cadena en implantar la Hora Silenciosa (julio 2021). Sin música, sin megafonía, reducción lumínica.', url:'https://autismo.org.es/actualidad/noticias/carrefour-espana-extiende-la-hora-silenciosa-a-favor-de-las-personas-con-autismo-e-hipersensibilidad-sensorial-a-sus-centros-carrefour-market/' },
  { id:'R002', lat:42.1401, lng:-0.4133, nombre:'Altoaragón — Huesca', tipo:'supermercado', ciudad:'Huesca', horario:'Todos los días: 14:30–16:30', descripcion:'14 establecimientos con hora silenciosa verificada. Sin música, sin megafonía, reducción lumínica.', url:'https://www.igastroaragon.com/2024/04/supermercados-altoaragon-activa-la-hora-silenciosa-en-apoyo-a-las-personas-con-autismo-e-hipersensibilidad-sensorial.html' },
  { id:'R003', lat:40.4168, lng:-3.7038, nombre:'Leroy Merlin Madrid', tipo:'supermercado', ciudad:'Madrid', horario:'Sábados: 08:30–10:00', descripcion:'Hora tranquila en sus centros: sin megafonía, sin demostraciones ruidosas, luz reducida.', url:'https://www.leroymerlin.es/noticias/hora-tranquila.html' },
  { id:'R004', lat:41.3825, lng:2.1769, nombre:'IKEA Barcelona — Hora silenciosa', tipo:'supermercado', ciudad:'Barcelona', horario:'Martes: 09:00–11:00', descripcion:'Programa Hora Tranquila: luz reducida, música apagada, menos actividad en tienda.', url:'https://www.ikea.com/es/es/stores/barcelona/' },
  { id:'R005', lat:40.4168, lng:-3.7038, nombre:'Biblioteca Nacional de España', tipo:'biblioteca', ciudad:'Madrid', horario:'Mar–Sáb: 09:00–21:00', descripcion:'Salas de lectura silenciosas con acceso a colecciones. Ambiente tranquilo y controlado.', url:'https://www.bne.es' },
  { id:'R006', lat:41.3888, lng:2.1590, nombre:'Biblioteca de Catalunya', tipo:'biblioteca', ciudad:'Barcelona', horario:'Lun–Vie: 09:00–20:00 / Sáb: 09:00–14:30', descripcion:'Gran sala de lectura silenciosa en el centro histórico. Espacio controlado y predecible.', url:'https://www.bnc.cat' },
  { id:'R007', lat:37.9922, lng:-1.1307, nombre:'Murcia — Centro Comercial Nueva Condomina', tipo:'centro_comercial', ciudad:'Murcia', horario:'1er dom de mes: 10:00–12:00', descripcion:'Hora Tranquila mensual: sin música ambiental, megafonía mínima.', url:'#' },
  { id:'R008', lat:43.2627, lng:-2.9253, nombre:'Aeropuerto de Bilbao — Sala sensorial', tipo:'aeropuerto', ciudad:'Bilbao', horario:'Disponible 24h para pasajeros', descripcion:'Sala de descanso sensorial para pasajeros con necesidades especiales. Ambiente controlado y silencioso.', url:'https://www.aena.es/es/bilbao.html' },
  { id:'R009', lat:40.4945, lng:-3.5670, nombre:'Aeropuerto Adolfo Suárez Madrid-Barajas — T4', tipo:'aeropuerto', ciudad:'Madrid', horario:'Disponible 24h', descripcion:'Zonas de descanso tranquilas en T4. Personal formado en necesidades especiales.', url:'https://www.aena.es' },
  { id:'R010', lat:41.2971, lng:2.0832, nombre:'Aeropuerto Josep Tarradellas Barcelona-El Prat', tipo:'aeropuerto', ciudad:'Barcelona', horario:'Disponible 24h', descripcion:'Salas de espera tranquilas. Sunflower lanyard disponible en mostradores de información.', url:'https://www.aena.es/es/barcelona.html' },
  { id:'R011', lat:40.4153, lng:-3.6924, nombre:'Museo Reina Sofía', tipo:'cultura', ciudad:'Madrid', horario:'Lun, Mié–Sáb: 10:00–21:00 / Dom: 10:00–19:00', descripcion:'Guías sensoriales disponibles. Entrada gratuita lunes y sábados tarde. Espacio amplio y con zonas tranquilas.', url:'https://www.museoreinasofia.es' },
  { id:'R012', lat:41.3695, lng:2.1530, nombre:'Fundació Joan Miró', tipo:'cultura', ciudad:'Barcelona', horario:'Mar–Dom: 10:00–19:00', descripcion:'Programa de visitas adaptadas para personas neurodivergentes. Entornos con baja estimulación sensorial disponibles.', url:'https://www.fmirobcn.org' },
  { id:'R013', lat:40.4532, lng:-3.6884, nombre:'Parque El Capricho', tipo:'espacio_natural', ciudad:'Madrid', horario:'Sáb–Dom y festivos: 09:00–21:00', descripcion:'Jardín histórico tranquilo con aforo limitado. Ideal para descanso sensorial al aire libre.', url:'#' },
  { id:'R014', lat:41.4036, lng:2.1744, nombre:'Parc de la Ciutadella', tipo:'espacio_natural', ciudad:'Barcelona', horario:'Todos los días: 10:00–22:30', descripcion:'Parque urbano amplio con zonas de baja estimulación. Bancos aislados y espacios verdes tranquilos.', url:'#' },
  { id:'R015', lat:37.3826, lng:-5.9962, nombre:'Parque María Luisa', tipo:'espacio_natural', ciudad:'Sevilla', horario:'Todos los días', descripcion:'Parque histórico con amplias zonas verdes y zonas tranquilas alejadas del tráfico.', url:'#' },
  { id:'R016', lat:36.7213, lng:-4.4216, nombre:'Jardín Botánico de Málaga', tipo:'espacio_natural', ciudad:'Málaga', horario:'Lun–Dom: 09:30–19:30', descripcion:'Espacio verde controlado con aforo limitado. Bajo nivel de ruido.', url:'#' },
  { id:'R017', lat:43.3619, lng:-5.8494, nombre:'Centro Comercial Los Prados — Hora Tranquila', tipo:'centro_comercial', ciudad:'Oviedo', horario:'1er sáb de mes: 10:00–12:00', descripcion:'Hora sin música ambiental, megafonía desactivada y mejor iluminación natural.', url:'#' },
  { id:'R018', lat:39.4699, lng:-0.3763, nombre:'City of Arts and Sciences — Sala de calma', tipo:'cultura', ciudad:'Valencia', horario:'Consultar en taquilla', descripcion:'Sala de descanso sensorial disponible para visitantes con necesidades especiales. Solicitarla en taquilla.', url:'https://www.cac.es' },
  { id:'R019', lat:43.3623, lng:-8.4115, nombre:'Kindo Espacio Sensorial A Coruña', tipo:'sala_estudio', ciudad:'A Coruña', horario:'Lun–Vie: 10:00–20:00', descripcion:'Espacio de coworking y estudio con diseño sensorial adaptado. Salas silenciosas disponibles.', url:'#' },
  { id:'R020', lat:43.2630, lng:-2.9350, nombre:'Autismo Bizkaia — Sala de calma', tipo:'sala_estudio', ciudad:'Bilbao', horario:'Lun–Vie: 09:00–18:00', descripcion:'Centro con sala de descompresión sensorial abierta a personas del espectro. Previa cita.', url:'https://www.autismobizkaia.org' },
]

const TYPE_CONFIG = {
  supermercado:    { color: '#3A82CA', label: 'Supermercado / Hora silenciosa' },
  biblioteca:      { color: '#816AB7', label: 'Biblioteca' },
  sala_estudio:    { color: '#9CC156', label: 'Sala de estudio / Coworking' },
  espacio_natural: { color: '#48B0A1', label: 'Espacio natural' },
  centro_civico:   { color: '#FBB027', label: 'Centro cívico' },
  centro_comercial:{ color: '#6366f1', label: 'Centro comercial' },
  aeropuerto:      { color: '#8b5cf6', label: 'Aeropuerto' },
  cultura:         { color: '#E57B86', label: 'Cultura / Museos' },
}

function getColor(tipo) {
  return TYPE_CONFIG[tipo]?.color ?? '#9CA3AF'
}

function MapController({ center, zoom }) {
  const map = useMap()
  useEffect(() => { map.setView(center, zoom) }, [map, center, zoom])
  return null
}

export default function SilentMap() {
  const [filter, setFilter] = useState('todos')
  const [selected, setSelected] = useState(null)

  const filtered = filter === 'todos' ? LUGARES : LUGARES.filter(l => l.tipo === filter)

  const handleMarkerClick = useCallback((lugar) => setSelected(lugar), [])

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Filter bar */}
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filtrar por tipo de lugar"
      >
        <button
          onClick={() => setFilter('todos')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-200 ${
            filter === 'todos'
              ? 'bg-pri/15 text-pri border border-pri/30'
              : 'bg-surface text-muted border border-border hover:text-text'
          }`}
          aria-pressed={filter === 'todos'}
        >
          Todos ({LUGARES.length})
        </button>
        {Object.entries(TYPE_CONFIG).map(([key, { label, color }]) => {
          const count = LUGARES.filter(l => l.tipo === key).length
          if (!count) return null
          return (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-200 border ${
                filter === key
                  ? 'text-text border-current'
                  : 'bg-surface text-muted border-border hover:text-text'
              }`}
              style={filter === key ? { backgroundColor: `${color}18`, color, borderColor: `${color}40` } : {}}
              aria-pressed={filter === key}
            >
              {label} ({count})
            </button>
          )
        })}
      </div>

      {/* Map */}
      <div className="relative rounded-card overflow-hidden border border-border" style={{ height: '520px' }}>
        <MapContainer
          center={[40.416, -3.703]}
          zoom={5}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
          aria-label="Mapa interactivo de espacios silenciosos en España"
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            maxZoom={18}
          />
          <MapController center={[40.416, -3.703]} zoom={5} />
          {filtered.map((lugar) => (
            <CircleMarker
              key={lugar.id}
              center={[lugar.lat, lugar.lng]}
              radius={8}
              pathOptions={{
                color: getColor(lugar.tipo),
                fillColor: getColor(lugar.tipo),
                fillOpacity: 0.75,
                weight: 2,
              }}
              eventHandlers={{ click: () => handleMarkerClick(lugar) }}
              aria-label={`${lugar.nombre}, ${lugar.ciudad}`}
            >
              <Popup>
                <div className="text-sm min-w-[220px]">
                  <p
                    className="text-xs font-semibold uppercase tracking-wider mb-1"
                    style={{ color: getColor(lugar.tipo) }}
                  >
                    {TYPE_CONFIG[lugar.tipo]?.label ?? lugar.tipo}
                  </p>
                  <h3 className="font-semibold text-text text-base mb-1">{lugar.nombre}</h3>
                  <p className="text-muted text-xs mb-1">{lugar.ciudad}</p>
                  {lugar.horario && (
                    <p className="text-muted text-xs mb-2">
                      <i className="fa-regular fa-clock mr-1" aria-hidden="true" />
                      {lugar.horario}
                    </p>
                  )}
                  <p className="text-muted text-xs leading-relaxed mb-3">{lugar.descripcion}</p>
                  {lugar.url && lugar.url !== '#' && (
                    <a
                      href={lugar.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-pri hover:underline"
                    >
                      Ver fuente <i className="fa-solid fa-arrow-up-right-from-square text-[10px]" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      {/* Results count */}
      <p className="text-xs text-faint" aria-live="polite">
        Mostrando {filtered.length} de {LUGARES.length} espacios verificados en España
      </p>
    </div>
  )
}
