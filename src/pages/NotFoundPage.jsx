import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { usePageMeta } from '../hooks/usePageMeta'

export default function NotFoundPage() {
  const reduced = useReducedMotion()

  usePageMeta({
    title: 'Página no encontrada — Refugio Sensorial',
    description: 'Esta página no existe. Visita Refugio Sensorial para encontrar recursos para personas neurodivergentes en España.',
    noIndex: true,
  })

  return (
    <div className="min-h-[80dvh] flex flex-col items-center justify-center px-6 py-10">

      {/* GIF */}
      <motion.img
        src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjZ5aG5wdTlyMmR1azU5eGhoejZmZHVqbXBnc3lqeWs5ZW9qZDRtNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/14uQ3cOFteDaU/giphy.gif"
        alt="Animación de página no encontrada"
        className="w-full max-w-lg h-auto"
        style={{ mixBlendMode: 'screen' }}
        initial={reduced ? {} : { opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduced ? 0 : 0.5, ease: 'easeOut' }}
        loading="eager"
      />

      {/* Button */}
      <motion.div
        initial={reduced ? {} : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.35, delay: reduced ? 0 : 0.2, ease: 'easeOut' }}
        className="-mt-4"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2.5 px-7 py-3 rounded-xl bg-pri text-white font-semibold text-sm
                     shadow-lg shadow-pri/20 hover:bg-pri/90 active:scale-95
                     transition-all duration-200 focus-visible:outline-2 focus-visible:outline-pri focus-visible:outline-offset-2"
        >
          <i className="fa-solid fa-house text-sm" aria-hidden="true" />
          Volver al inicio
        </Link>
      </motion.div>

    </div>
  )
}
