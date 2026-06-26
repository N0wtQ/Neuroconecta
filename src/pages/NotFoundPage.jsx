import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { usePageMeta } from '../hooks/usePageMeta'

// ── Deterministic data (no Math.random — stable across renders) ──────────────
// Particles: small floating dots scattered across the background
const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  x: (i * 37.3 + 8)  % 92,   // % of container width
  y: (i * 53.7 + 6)  % 88,   // % of container height
  r: 1.2 + (i * 0.7) % 2,    // radius px
  dur: 10 + (i * 2.9) % 12,  // oscillation period s
  delay: (i * 1.7)   % 7,    // phase offset s
  alpha: 0.12 + (i * 0.05) % 0.28,
  dy: 10 + (i * 3.3) % 18,   // amplitude px
}))

// Aurora blobs: large, blurry, slow-drifting colour pools
const BLOBS = [
  {
    x: 18, y: 28, size: 580,
    color: 'radial-gradient(circle, rgba(58,130,202,0.42) 0%, transparent 68%)',
    dur: 20, delay: 0, dx: [0, 55], dy: [0, -38], scale: [1, 1.1],
  },
  {
    x: 78, y: 18, size: 500,
    color: 'radial-gradient(circle, rgba(129,106,183,0.38) 0%, transparent 68%)',
    dur: 25, delay: 4, dx: [0, -48], dy: [0, 32], scale: [1, 1.08],
  },
  {
    x: 55, y: 72, size: 460,
    color: 'radial-gradient(circle, rgba(72,176,161,0.32) 0%, transparent 68%)',
    dur: 18, delay: 8, dx: [0, 38], dy: [0, -28], scale: [1, 1.12],
  },
  {
    x: 12, y: 78, size: 420,
    color: 'radial-gradient(circle, rgba(129,106,183,0.28) 0%, transparent 68%)',
    dur: 28, delay: 12, dx: [0, -32], dy: [0, 44], scale: [1, 1.07],
  },
]

// ── Shared transition factory ─────────────────────────────────────────────
const mirror = (dur, delay = 0) => ({
  duration: dur,
  delay,
  repeat: Infinity,
  repeatType: 'mirror',
  ease: 'easeInOut',
})

export default function NotFoundPage() {
  const reduced = useReducedMotion()

  usePageMeta({
    title: 'Página no encontrada — Refugio Sensorial',
    description: 'Esta página no existe. Visita Refugio Sensorial para encontrar recursos para personas neurodivergentes en España.',
    noIndex: true,
  })

  return (
    <div className="relative min-h-[90dvh] flex flex-col items-center justify-center overflow-hidden px-4 py-12">

      {/* ── Aurora + particles layer ───────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">

        {/* Blobs */}
        {BLOBS.map((b, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: b.size,
              height: b.size,
              marginLeft: -b.size / 2,
              marginTop: -b.size / 2,
              background: b.color,
              filter: 'blur(72px)',
            }}
            animate={reduced ? {} : { x: b.dx, y: b.dy, scale: b.scale }}
            transition={mirror(b.dur, b.delay)}
          />
        ))}

        {/* Particles — hidden when prefers-reduced-motion */}
        {!reduced && PARTICLES.map(p => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width:  p.r * 2,
              height: p.r * 2,
              background: `rgba(129,106,183,${p.alpha})`,
            }}
            animate={{ y: [-p.dy / 2, p.dy / 2] }}
            transition={mirror(p.dur, p.delay)}
          />
        ))}

        {/* Subtle radial vignette to ground the composition */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(12,14,30,0.7) 100%)',
          }}
        />
      </div>

      {/* ── 404 number with chromatic aberration ───────────────────────── */}
      <div
        className="relative z-10 select-none mb-6 leading-none"
        style={{ fontSize: 'clamp(6rem,18vw,12rem)', fontWeight: 900, lineHeight: 1 }}
        aria-hidden="true"
      >
        {/* Coral channel */}
        {!reduced && (
          <motion.span
            className="absolute inset-0 flex items-center justify-center"
            style={{ color: 'rgba(229,123,134,0.55)', mixBlendMode: 'screen' }}
            animate={{ x: [-1.5, 1.5] }}
            transition={mirror(5)}
          >
            404
          </motion.span>
        )}

        {/* Blue channel */}
        {!reduced && (
          <motion.span
            className="absolute inset-0 flex items-center justify-center"
            style={{ color: 'rgba(58,130,202,0.5)', mixBlendMode: 'screen' }}
            animate={{ x: [1.5, -1.5] }}
            transition={mirror(6.5, 0.8)}
          >
            404
          </motion.span>
        )}

        {/* Master white layer — sets the actual box size, floats gently */}
        <motion.span
          className="relative flex items-center justify-center"
          style={{
            color: 'transparent',
            backgroundImage: 'linear-gradient(160deg, #F3F4F6 20%, #9CA3AF 60%, #E5E7EB 90%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            textShadow: reduced
              ? 'none'
              : '0 0 80px rgba(58,130,202,0.25), 0 0 160px rgba(129,106,183,0.15)',
          }}
          animate={reduced ? {} : { y: [0, -7, 0] }}
          transition={mirror(9)}
        >
          404
        </motion.span>
      </div>

      {/* ── Glassmorphism card ────────────────────────────────────────── */}
      <motion.div
        role="main"
        className="relative z-10 w-full max-w-md rounded-2xl border text-center"
        style={{
          background: 'rgba(19,21,43,0.55)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderColor: 'rgba(129,106,183,0.18)',
          boxShadow: '0 8px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)',
        }}
        initial={reduced ? {} : { opacity: 0, y: 18, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut', delay: 0.08 }}
      >
        {/* Inner ambient top-glow */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div
            style={{
              position: 'absolute',
              top: 0, left: '50%',
              transform: 'translateX(-50%)',
              width: '70%', height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(58,130,202,0.4), transparent)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: '60%',
              background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(58,130,202,0.07) 0%, transparent 100%)',
            }}
          />
        </div>

        <div className="relative px-8 py-10">
          {/* Icon with breathing opacity */}
          <motion.div
            className="rounded-full flex items-center justify-center mx-auto mb-6"
            style={{
              width: 52, height: 52,
              background: 'rgba(58,130,202,0.12)',
              border: '1px solid rgba(58,130,202,0.22)',
            }}
            animate={reduced ? {} : { opacity: [0.55, 1, 0.55] }}
            transition={mirror(3.5, 1)}
          >
            <i className="fa-solid fa-compass text-pri text-lg" aria-hidden="true" />
          </motion.div>

          <h1 className="text-xl font-bold text-text mb-3 leading-snug">
            Página no encontrada
          </h1>
          <p className="text-sm text-muted leading-relaxed mb-8">
            Esta página no existe o ha sido movida.<br />
            Vuelve al inicio para encontrar los recursos.
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2.5 px-7 py-3 rounded-xl bg-pri text-white font-semibold text-sm
                       shadow-lg shadow-pri/20 hover:bg-pri/90 active:scale-95
                       transition-all duration-200
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pri focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            <i className="fa-solid fa-house text-sm" aria-hidden="true" />
            Volver al inicio
          </Link>
        </div>
      </motion.div>

    </div>
  )
}
