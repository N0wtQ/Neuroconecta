import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

// Fade-in variants — instant when prefers-reduced-motion
const fadeUp = (prefersReduced) => ({
  hidden:  { opacity: 0, y: prefersReduced ? 0 : 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: prefersReduced ? 0 : 0.55,
      ease: 'easeOut',
      delay: prefersReduced ? 0 : delay,
    },
  }),
})

export default function Hero() {
  const prefersReduced = useReducedMotion()
  const wrapRef = useRef()
  const { hidden, visible } = fadeUp(prefersReduced)

  // Subtle parallax on scroll — scrub:1.5 = no abrupt jumps
  useEffect(() => {
    if (prefersReduced || !wrapRef.current) return
    const ctx = gsap.context(() => {
      gsap.to(wrapRef.current, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    }, wrapRef)
    return () => ctx.revert()
  }, [prefersReduced])

  return (
    <section
      ref={wrapRef}
      className="text-center pt-16 pb-20 px-4"
      aria-labelledby="hero-heading"
    >
      {/* Logo */}
      <motion.div
        variants={{ hidden, visible: visible(0) }}
        initial="hidden"
        animate="visible"
      >
        <img
          src="/logo.png"
          alt="Neuroconecta"
          className="mx-auto mb-4"
          style={{ height: 'clamp(120px, 20vw, 200px)', width: 'auto' }}
        />
      </motion.div>

      {/* Badge */}
      <motion.div
        variants={{ hidden, visible: visible(0.1) }}
        initial="hidden"
        animate="visible"
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pri/10 border border-sky-400/15 text-pri text-xs font-semibold uppercase tracking-widest mb-6"
        aria-label="Plataforma de recursos para neurodivergentes"
      >
        <i className="fa-solid fa-infinity text-[10px]" aria-hidden="true" />
        Recursos para Neurodivergentes
      </motion.div>

      {/* Heading */}
      <motion.h1
        id="hero-heading"
        variants={{ hidden, visible: visible(0.2) }}
        initial="hidden"
        animate="visible"
        className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold leading-tight tracking-tight text-text mb-5"
      >
        Conecta con espacios y<br className="hidden sm:block" /> herramientas amigables para ti
      </motion.h1>

      {/* Description */}
      <motion.p
        variants={{ hidden, visible: visible(0.3) }}
        initial="hidden"
        animate="visible"
        className="max-w-xl mx-auto text-lg leading-relaxed text-muted mb-10"
      >
        Explora lugares con hora silenciosa y accesibilidad sensorial. Descubre apps y
        recursos digitales que te ayudan en el día a día.
      </motion.p>

      {/* CTAs */}
      <motion.div
        variants={{ hidden, visible: visible(0.4) }}
        initial="hidden"
        animate="visible"
        className="flex flex-col sm:flex-row items-center justify-center gap-3"
      >
        <Link
          to="/mapa"
          className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-pri text-white font-semibold text-sm tracking-wide hover:bg-pri/85 transition-colors duration-300 min-w-[180px] justify-center"
        >
          <i className="fa-solid fa-location-dot" aria-hidden="true" />
          Ver el mapa
        </Link>
        <Link
          to="/biblioteca"
          className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 text-text font-semibold text-sm tracking-wide hover:bg-white/9 transition-colors duration-300 min-w-[180px] justify-center"
        >
          <i className="fa-solid fa-toolbox" aria-hidden="true" />
          Ver herramientas
        </Link>
      </motion.div>
    </section>
  )
}
