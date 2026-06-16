import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import ResourceCards from '../components/ResourceCards'
import ContactForm from '../components/ContactForm'
import { useReducedMotion } from '../hooks/useReducedMotion'

function SectionCard({ id, children, className = '' }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.section
      id={id}
      initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: prefersReduced ? 0 : 0.5, ease: 'easeOut' }}
      className={`rounded-card bg-surface border border-border p-8 md:p-10 ${className}`}
    >
      {children}
    </motion.section>
  )
}

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-4 pb-20">
      <Hero />
      <ResourceCards />

      {/* About section */}
      <div className="px-0 pb-10">
        <SectionCard id="sobre-mi">
          <h2 className="text-2xl font-bold text-text mb-6">Sobre mí</h2>
          <div className="flex flex-col sm:flex-row items-start gap-7">
            <img
              src="/almudena.jpeg"
              alt="Foto de Almudena, creadora de Neuroconecta"
              className="w-28 h-28 rounded-full object-cover border-2 border-sec/40 shrink-0"
            />
            <p className="text-base leading-relaxed text-muted">
              Hola, soy Almudena. Soy autista y creé Neuroconecta porque cuando más lo necesitaba,
              no encontraba recursos como este. La comunidad neurodivergente existe, es grande y
              merece más visibilidad. Este proyecto es mi forma de aportar algo concreto: un lugar
              donde encontrar espacios accesibles y herramientas reales para el día a día.
            </p>
          </div>
        </SectionCard>
      </div>

      {/* Contact section */}
      <div className="px-0">
        <SectionCard id="contacto">
          <h2 className="text-2xl font-bold text-text mb-2">Contáctanos</h2>
          <p className="text-muted text-sm leading-relaxed mb-8">
            ¿Conoces un lugar accesible que no está en el mapa? ¿Quieres sugerir una herramienta
            o tienes alguna pregunta? Escríbeme, leo todos los mensajes.
          </p>
          <ContactForm />
        </SectionCard>
      </div>
    </main>
  )
}
