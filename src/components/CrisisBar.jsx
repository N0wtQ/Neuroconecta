import { Link } from 'react-router-dom'

export default function CrisisBar() {
  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <Link
        to="/ayuda"
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-coral text-white text-sm font-bold
                   shadow-lg shadow-coral/40 hover:bg-coral/90 active:scale-95 transition-all duration-150
                   whitespace-nowrap"
        aria-label="Necesito ayuda ahora — acceder a recursos de apoyo en crisis"
      >
        <i className="fa-solid fa-heart-pulse text-xs" aria-hidden="true" />
        Necesito ayuda ahora
      </Link>
    </div>
  )
}
