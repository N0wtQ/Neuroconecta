import { Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'

const SilentMap = lazy(() => import('../components/SilentMap'))

export default function MapPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pb-20 pt-8">
      {/* Breadcrumb */}
      <nav aria-label="Ruta de navegación" className="mb-6 text-sm text-faint flex items-center gap-2">
        <Link to="/" className="hover:text-text transition-colors duration-200">Inicio</Link>
        <i className="fa-solid fa-chevron-right text-[10px]" aria-hidden="true" />
        <span className="text-muted" aria-current="page">Mapa silencioso</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pri/10 border border-pri/20 text-pri text-xs font-semibold uppercase tracking-wider mb-4">
          <i className="fa-solid fa-location-dot text-[10px]" aria-hidden="true" />
          Mapa interactivo
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-text leading-tight mb-3">
          Espacios silenciosos en España
        </h1>
        <p className="text-muted text-base leading-relaxed max-w-2xl">
          Lugares verificados con hora silenciosa, accesibilidad sensorial y distintivo de
          discapacidad invisible. Haz clic en cualquier marcador para ver los detalles.
        </p>
      </header>

      {/* Info notice */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-warm/5 border border-warm/15 mb-8" role="note">
        <i className="fa-solid fa-circle-info text-warm mt-0.5 shrink-0" aria-hidden="true" />
        <div className="text-sm text-muted leading-relaxed">
          <strong className="text-text font-semibold">¿Conoces un espacio que falta?</strong>{' '}
          Puedes sugerirlo en la sección{' '}
          <Link to="/#contacto" className="text-pri hover:underline">Contáctanos</Link>.
          Verificamos cada sugerencia antes de añadirla al mapa.
        </div>
      </div>

      {/* Map */}
      <Suspense
        fallback={
          <div
            className="flex items-center justify-center rounded-card border border-border bg-surface"
            style={{ height: '520px' }}
            aria-label="Cargando mapa..."
          >
            <div className="text-center">
              <i className="fa-solid fa-spinner fa-spin text-2xl text-muted mb-3 block" aria-hidden="true" />
              <p className="text-muted text-sm">Cargando el mapa...</p>
            </div>
          </div>
        }
      >
        <SilentMap />
      </Suspense>
    </div>
  )
}
