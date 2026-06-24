import { Link } from 'react-router-dom'

export default function CrisisBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <Link
        to="/ayuda"
        className="flex items-center justify-center gap-2.5 w-full py-3.5 bg-coral text-white text-sm font-bold tracking-wide shadow-2xl shadow-coral/30"
        aria-label="Necesito ayuda ahora — acceder a recursos de apoyo en crisis"
      >
        <i className="fa-solid fa-heart-pulse text-sm" aria-hidden="true" />
        Necesito ayuda ahora
        <i className="fa-solid fa-arrow-right text-xs" aria-hidden="true" />
      </Link>
    </div>
  )
}
