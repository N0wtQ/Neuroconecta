import { Link } from 'react-router-dom'
import ResourceLibrary from '../components/ResourceLibrary'
import { usePageMeta } from '../hooks/usePageMeta'

export default function LibraryPage() {
  usePageMeta({
    title: 'Herramientas digitales para TEA y TDAH — Biblioteca Neurodivergente | Refugio Sensorial',
    description: 'Más de 80 apps, extensiones y recursos digitales clasificados por perfil neurodivergente: TEA, TDAH, dislexia, TOC y más. Filtra por categoría y precio.',
  })
  return (
    <div className="max-w-5xl mx-auto px-4 pb-20 pt-8">
      {/* Breadcrumb */}
      <nav aria-label="Ruta de navegación" className="mb-6 text-sm text-faint">
        <ol className="flex items-center gap-2 list-none p-0 m-0">
          <li><Link to="/" className="hover:text-text transition-colors duration-200">Inicio</Link></li>
          <li aria-hidden="true"><i className="fa-solid fa-chevron-right text-[10px]" /></li>
          <li><span className="text-muted" aria-current="page">Herramientas</span></li>
        </ol>
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
