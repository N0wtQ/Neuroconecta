import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import ResourceCards from '../components/ResourceCards'
import ContactForm from '../components/ContactForm'
import { useReducedMotion } from '../hooks/useReducedMotion'

function FadeSection({ id, children, className = '' }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.section
      id={id}
      initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: prefersReduced ? 0 : 0.5, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 pb-20">
      <Hero />
      <ResourceCards />

      {/* ── Sobre mí ── */}
      <FadeSection id="sobre-mi" className="mb-10">
        <div className="rounded-card bg-surface border border-border overflow-hidden">
          <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #3A82CA, #816AB7, #48B0A1)' }} aria-hidden="true" />
          <div className="p-8">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <img
                src={`${import.meta.env.BASE_URL}almudena.jpeg`}
                alt="Almudena, creadora de Refugio Sensorial"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-sec/30 shrink-0"
              />
              <div>
                <blockquote className="text-base leading-relaxed text-muted mb-3 relative">
                  <i className="fa-solid fa-quote-left text-sec/30 text-2xl absolute -top-1 -left-1" aria-hidden="true" />
                  <span className="pl-6">
                    Hola, soy <strong className="text-text font-semibold">Almudena</strong>.
                    Soy autista y creé Refugio Sensorial porque cuando más lo necesitaba,
                    no encontraba recursos como este.
                  </span>
                </blockquote>
                <div className="flex items-center gap-2 pl-6">
                  <span className="w-6 h-px bg-sec/40" aria-hidden="true" />
                  <span className="text-xs font-semibold text-sec">Almudena · Creadora de Refugio Sensorial</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeSection>

      {/* ── Contacto ── */}
      <FadeSection id="contacto">
        <div className="rounded-card bg-surface border border-border p-8 md:p-10">
          <h2 className="text-2xl font-bold text-text mb-7">Contáctanos</h2>
          <ContactForm />
        </div>
      </FadeSection>
    </div>
  )
}
