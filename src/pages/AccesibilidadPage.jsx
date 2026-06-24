import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'

const CRITERIA = [
  { id: '1.1.1', level: 'A',   label: 'Contenido no textual',          status: 'pass' },
  { id: '1.3.1', level: 'A',   label: 'Información y relaciones',       status: 'pass' },
  { id: '1.3.2', level: 'A',   label: 'Secuencia significativa',        status: 'pass' },
  { id: '1.4.1', level: 'A',   label: 'Uso del color',                  status: 'pass' },
  { id: '1.4.3', level: 'AA',  label: 'Contraste mínimo',               status: 'partial' },
  { id: '1.4.4', level: 'AA',  label: 'Cambio de tamaño de texto',      status: 'pass' },
  { id: '1.4.10', level: 'AA', label: 'Reajuste (Reflow)',              status: 'pass' },
  { id: '1.4.11', level: 'AA', label: 'Contraste de componentes',       status: 'pass' },
  { id: '2.1.1', level: 'A',   label: 'Teclado',                        status: 'pass' },
  { id: '2.1.2', level: 'A',   label: 'Sin trampa de teclado',          status: 'pass' },
  { id: '2.3.3', level: 'AAA', label: 'Animación por interacción',      status: 'pass' },
  { id: '2.4.1', level: 'A',   label: 'Saltar bloques',                 status: 'pass' },
  { id: '2.4.3', level: 'A',   label: 'Orden de foco',                  status: 'pass' },
  { id: '2.4.4', level: 'A',   label: 'Propósito de los enlaces',       status: 'pass' },
  { id: '2.4.7', level: 'AA',  label: 'Foco visible',                   status: 'pass' },
  { id: '2.5.3', level: 'A',   label: 'Etiqueta en nombre',             status: 'pass' },
  { id: '3.1.1', level: 'A',   label: 'Idioma de la página',            status: 'pass' },
  { id: '3.3.1', level: 'A',   label: 'Identificación de errores',      status: 'pass' },
  { id: '3.3.2', level: 'A',   label: 'Etiquetas o instrucciones',      status: 'pass' },
  { id: '3.3.4', level: 'AA',  label: 'Prevención de errores',          status: 'pass' },
  { id: '4.1.1', level: 'A',   label: 'Análisis sintáctico',            status: 'pass' },
  { id: '4.1.2', level: 'A',   label: 'Nombre, función, valor',         status: 'pass' },
  { id: '4.1.3', level: 'AA',  label: 'Mensajes de estado',             status: 'pass' },
]

const STATUS_LABEL  = { pass: 'Cumple', partial: 'Parcial', fail: 'No cumple', na: 'N/A' }
const STATUS_COLOR  = {
  pass:    'bg-acc/10 text-acc border-acc/25',
  partial: 'bg-warm/10 text-warm border-warm/25',
  fail:    'bg-coral/10 text-coral border-coral/25',
  na:      'bg-surface text-muted border-border',
}
const LEVEL_COLOR = {
  A:   'bg-pri/10 text-pri border-pri/25',
  AA:  'bg-sec/10 text-sec border-sec/25',
  AAA: 'bg-acc/10 text-acc border-acc/25',
}

export default function AccesibilidadPage() {
  usePageMeta({
    title: 'Declaración de accesibilidad — Refugio Sensorial',
    description: 'Declaración de conformidad con WCAG 2.2 AA de Refugio Sensorial. Compromisos, criterios evaluados y canales de contacto para informar problemas de accesibilidad.',
  })

  const pass    = CRITERIA.filter(c => c.status === 'pass').length
  const total   = CRITERIA.length
  const pct     = Math.round((pass / total) * 100)

  return (
    <div className="max-w-3xl mx-auto px-4 pb-20 pt-8">
      <nav aria-label="Ruta de navegación" className="mb-6 text-sm text-faint">
        <ol className="flex items-center gap-2 list-none p-0 m-0">
          <li><Link to="/" className="hover:text-text transition-colors duration-200">Inicio</Link></li>
          <li aria-hidden="true"><i className="fa-solid fa-chevron-right text-[10px]" /></li>
          <li><span className="text-muted" aria-current="page">Accesibilidad</span></li>
        </ol>
      </nav>

      <header className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-acc/10 flex items-center justify-center text-acc shrink-0">
            <i className="fa-solid fa-universal-access" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text leading-tight">Declaración de accesibilidad</h1>
            <p className="text-sm text-muted">Refugio Sensorial · Actualizado junio 2025</p>
          </div>
        </div>
        <p className="text-sm text-muted leading-relaxed">
          Refugio Sensorial está diseñado desde y para personas neurodivergentes.
          Nos comprometemos a cumplir con las pautas WCAG 2.2 nivel AA y a mejorar
          continuamente la experiencia para todos los usuarios, independientemente de
          sus capacidades o tecnologías de apoyo.
        </p>
      </header>

      {/* Score */}
      <div className="flex items-center gap-4 p-5 rounded-card border border-acc/25 bg-acc/5 mb-8">
        <div className="shrink-0 text-center">
          <p className="text-4xl font-black text-acc leading-none">{pct}%</p>
          <p className="text-xs text-muted mt-1">criterios cumplidos</p>
        </div>
        <div className="flex-1">
          <div className="h-2 rounded-full bg-surface border border-border overflow-hidden mb-2">
            <div
              className="h-full rounded-full bg-acc transition-all duration-500"
              style={{ width: `${pct}%` }}
              role="progressbar"
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${pct}% de criterios WCAG 2.2 AA cumplidos`}
            />
          </div>
          <p className="text-xs text-muted">{pass} de {total} criterios evaluados cumplen WCAG 2.2 AA.</p>
        </div>
      </div>

      {/* Commitment */}
      <section aria-labelledby="compromiso-heading" className="mb-8">
        <h2 id="compromiso-heading" className="text-base font-bold text-text mb-3">Compromisos</h2>
        <ul className="space-y-2">
          {[
            'Navegación completa con teclado en todas las páginas',
            'Enlace "Saltar al contenido principal" visible al recibir foco',
            'Textos alternativos en todos los elementos no textuales',
            'Soporte para prefers-reduced-motion: sin animaciones no esenciales',
            'Lectura en voz alta (TTS) disponible en recursos y señales de crisis',
            'Roles ARIA y regiones live para anuncios dinámicos',
            'Indicadores de foco visibles en todos los elementos interactivos',
            'Semántica HTML correcta con landmarks, headings y listas',
            'Formularios con etiquetas, mensajes de error y aria-invalid',
          ].map(item => (
            <li key={item} className="flex items-start gap-2 text-sm text-muted">
              <i className="fa-solid fa-circle-check text-acc text-xs mt-1 shrink-0" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Criteria table */}
      <section aria-labelledby="criterios-heading" className="mb-8">
        <h2 id="criterios-heading" className="text-base font-bold text-text mb-3">Criterios evaluados</h2>
        <div className="rounded-card border border-border overflow-hidden">
          <table className="w-full text-sm" aria-label="Tabla de criterios WCAG 2.2 evaluados">
            <thead>
              <tr className="bg-surface border-b border-border">
                <th scope="col" className="text-left px-4 py-3 text-xs font-semibold text-muted">Criterio</th>
                <th scope="col" className="text-left px-4 py-3 text-xs font-semibold text-muted hidden sm:table-cell">Nivel</th>
                <th scope="col" className="text-left px-4 py-3 text-xs font-semibold text-muted">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {CRITERIA.map(c => (
                <tr key={c.id} className="hover:bg-surface/50 transition-colors">
                  <td className="px-4 py-2.5">
                    <span className="font-mono text-xs text-faint mr-2">{c.id}</span>
                    <span className="text-muted">{c.label}</span>
                  </td>
                  <td className="px-4 py-2.5 hidden sm:table-cell">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${LEVEL_COLOR[c.level]}`}>
                      {c.level}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${STATUS_COLOR[c.status]}`}>
                      {STATUS_LABEL[c.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Known limitations */}
      <section aria-labelledby="limitaciones-heading" className="mb-8">
        <h2 id="limitaciones-heading" className="text-base font-bold text-text mb-3">Limitaciones conocidas</h2>
        <ul className="space-y-2">
          {[
            'El mapa interactivo de Leaflet tiene soporte de teclado limitado para los marcadores individuales. Los datos del mapa están también disponibles en formato de texto.',
            'Algunos valores de contraste de color en elementos dinámicos (insignias de categoría) pueden estar por debajo del 4.5:1 en casos extremos. Estamos revisando la paleta.',
            'Las visualizaciones 3D (logo y fondo) son decorativas y no afectan al contenido; se muestran únicamente si el dispositivo tiene soporte WebGL.',
          ].map(item => (
            <li key={item} className="flex items-start gap-2 text-sm text-muted">
              <i className="fa-solid fa-triangle-exclamation text-warm text-xs mt-1 shrink-0" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Contact */}
      <section
        aria-labelledby="contacto-a11y-heading"
        className="p-5 rounded-card border border-pri/25 bg-pri/5"
      >
        <h2 id="contacto-a11y-heading" className="text-base font-bold text-text mb-2">¿Encontraste un problema de accesibilidad?</h2>
        <p className="text-sm text-muted leading-relaxed mb-4">
          Si encuentras alguna barrera de accesibilidad o algo que no funciona bien con tu
          tecnología de apoyo, cuéntanoslo. Tu feedback es fundamental para mejorar.
        </p>
        <Link
          to="/#contacto"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-pri text-white text-sm font-semibold hover:bg-pri/85 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pri focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          <i className="fa-solid fa-envelope text-xs" aria-hidden="true" />
          Contactar
        </Link>
      </section>
    </div>
  )
}
