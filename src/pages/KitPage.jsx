import { Link } from 'react-router-dom'
import KitSensorial from '../components/KitSensorial'

export default function KitPage() {
  return (
    <div className="min-h-dvh">
      {/* Header with open background so canvas particles are visible */}
      <div className="relative max-w-3xl mx-auto px-4 pt-14 pb-8">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 60% 40%, rgba(129,106,183,0.08) 0%, transparent 65%), radial-gradient(ellipse at 20% 80%, rgba(72,176,161,0.06) 0%, transparent 55%)',
          }}
          aria-hidden="true"
        />
        <nav aria-label="Ruta de navegación" className="relative mb-4 text-sm text-faint flex items-center gap-2">
          <Link to="/" className="hover:text-text transition-colors duration-200">Inicio</Link>
          <i className="fa-solid fa-chevron-right text-[10px]" aria-hidden="true" />
          <span className="text-muted" aria-current="page">Kit Sensorial</span>
        </nav>
        <h1 className="relative text-2xl font-bold text-text mb-1">Kit Sensorial</h1>
        <p className="relative text-sm text-muted">
          Entiende lo que te pasa, regúlate y prepara tu kit para salir al mundo.
        </p>
      </div>
      <KitSensorial />
    </div>
  )
}
