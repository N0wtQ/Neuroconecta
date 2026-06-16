import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { herramientas } from '../data/herramientas'
import { LUGARES } from '../data/lugares'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: LUGARES.length,      label: 'espacios verificados', icon: 'fa-location-dot',  color: 'text-pri' },
  { value: herramientas.length, label: 'herramientas digitales', icon: 'fa-toolbox',     color: 'text-sec' },
  { value: 10,                  label: 'categorías de necesidad', icon: 'fa-layer-group', color: 'text-acc' },
]

function fadeUp(prefersReduced, delay = 0) {
  return {
    initial:  { opacity: 0, y: prefersReduced ? 0 : 22 },
    animate:  { opacity: 1, y: 0 },
    transition: { duration: prefersReduced ? 0 : 0.55, ease: 'easeOut', delay: prefersReduced ? 0 : delay },
  }
}

export default function Hero() {
  const prefersReduced = useReducedMotion()
  const wrapRef = useRef()

  useEffect(() => {
    if (prefersReduced || !wrapRef.current) return
    const ctx = gsap.context(() => {
      gsap.to(wrapRef.current, {
        y: -36,
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
    <section ref={wrapRef} className="text-center pt-14 pb-16 px-4" aria-labelledby="hero-heading">

      {/* Logo */}
      <motion.img
        src={`${import.meta.env.BASE_URL}logo.svg`}
        alt="Refugio Sensorial"
        className="mx-auto mb-5"
        style={{ height: 'clamp(110px, 18vw, 190px)', width: 'auto' }}
        {...fadeUp(prefersReduced, 0)}
      />

      {/* Badge */}
      <motion.div {...fadeUp(prefersReduced, 0.08)} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pri/10 border border-sky-400/15 text-pri text-xs font-semibold uppercase tracking-widest mb-5">
        <i className="fa-solid fa-infinity text-[10px]" aria-hidden="true" />
        Recursos para Neurodivergentes
      </motion.div>

      {/* Heading */}
      <motion.h1
        id="hero-heading"
        {...fadeUp(prefersReduced, 0.15)}
        className="text-4xl sm:text-5xl lg:text-[3.2rem] font-bold leading-tight tracking-tight text-text mb-4"
      >
        Espacios seguros y herramientas<br className="hidden sm:block" /> reales para ti
      </motion.h1>

      {/* Sub */}
      <motion.p {...fadeUp(prefersReduced, 0.22)} className="max-w-lg mx-auto text-base sm:text-lg leading-relaxed text-muted mb-8">
        Mapa de lugares con hora silenciosa y accesibilidad sensorial en España.
        Biblioteca de apps y recursos para el día a día neurodivergente.
      </motion.p>

      {/* CTAs */}
      <motion.div {...fadeUp(prefersReduced, 0.28)} className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
        <Link
          to="/mapa"
          className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-pri text-white font-semibold text-sm tracking-wide hover:bg-pri/85 active:scale-95 transition-all duration-200 min-w-[190px] justify-center shadow-lg shadow-pri/20"
        >
          <i className="fa-solid fa-location-dot" aria-hidden="true" />
          Ver el mapa
        </Link>
        <Link
          to="/biblioteca"
          className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-white/6 border border-white/12 text-text font-semibold text-sm tracking-wide hover:bg-white/10 active:scale-95 transition-all duration-200 min-w-[190px] justify-center"
        >
          <i className="fa-solid fa-toolbox" aria-hidden="true" />
          Ver herramientas
        </Link>
      </motion.div>

      {/* Stats strip */}
      <motion.div
        {...fadeUp(prefersReduced, 0.35)}
        className="inline-flex flex-col sm:flex-row items-center gap-px rounded-2xl bg-surface border border-border overflow-hidden shadow-xl shadow-black/20"
      >
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`flex items-center gap-3 px-6 py-4 ${i < STATS.length - 1 ? 'sm:border-r border-b sm:border-b-0 border-border w-full sm:w-auto' : 'w-full sm:w-auto'}`}
          >
            <i className={`fa-solid ${s.icon} ${s.color} text-base`} aria-hidden="true" />
            <div className="text-left">
              <p className="text-xl font-bold text-text leading-none">{s.value}+</p>
              <p className="text-[11px] text-muted mt-0.5 leading-none">{s.label}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
