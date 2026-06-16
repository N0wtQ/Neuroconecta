import { Link } from 'react-router-dom'
import ResourceLibrary from '../components/ResourceLibrary'

export default function LibraryPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 pb-20 pt-8">
      {/* Breadcrumb */}
      <nav aria-label="Ruta de navegación" className="mb-6 text-sm text-faint flex items-center gap-2">
        <Link to="/" className="hover:text-text transition-colors duration-200">Inicio</Link>
        <i className="fa-solid fa-chevron-right text-[10px]" aria-hidden="true" />
        <span className="text-muted" aria-current="page">Herramientas</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sec/10 border border-sec/20 text-sec text-xs font-semibold uppercase tracking-wider mb-4">
          <i className="fa-solid fa-toolbox text-[10px]" aria-hidden="true" />
          Biblioteca digital
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-text leading-tight mb-3">
          Herramientas para el día a día
        </h1>
        <p className="text-muted text-base leading-relaxed max-w-2xl">
          Apps, webs y recursos digitales clasificados por categoría y perfil neurodivergente.
          Cada herramienta ha sido seleccionada y valorada por la comunidad.
        </p>
      </header>

      <ResourceLibrary />
    </div>
  )
}
