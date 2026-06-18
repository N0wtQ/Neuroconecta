import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useReducedMotion } from '../hooks/useReducedMotion'
import TTSButton from '../components/ui/TTSButton'

const SENALES = [
  {
    id: 'corporales',
    titulo: 'Señales corporales',
    subtitulo: 'Tu cuerpo avisa primero',
    icon: 'fa-person',
    color: 'text-coral',
    bg: 'bg-coral/10',
    borderColor: 'border-coral/30',
    bgCard: 'bg-coral/5',
    glowColor: 'rgba(229,123,134,0.07)',
    tts: 'Tu cuerpo empieza a avisarte antes de que llegues al límite. Presta atención a la tensión muscular en hombros, mandíbula o manos. A la sensación de presión en la cabeza. A si el estómago se revuelve o el corazón se acelera. Al aumento de la sensibilidad: cuando las cosas que normalmente toleras de repente te molestan mucho más. Son señales de que el sistema nervioso está cargando, y cuanto antes las detectes, más fácil es parar a tiempo.',
    items: [
      'Tensión muscular en hombros, mandíbula o manos',
      'Dolor de cabeza o sensación de presión',
      'Malestar estomacal o náuseas',
      'Aumento de la sensibilidad a la luz, el sonido o el tacto',
      'Calor o frío repentino sin causa aparente',
      'Corazón acelerado o pecho tenso',
    ],
  },
  {
    id: 'cognitivas',
    titulo: 'Señales cognitivas',
    subtitulo: 'El cerebro llega a su límite',
    icon: 'fa-brain',
    color: 'text-pri',
    bg: 'bg-pri/10',
    borderColor: 'border-pri/30',
    bgCard: 'bg-pri/5',
    glowColor: 'rgba(58,130,202,0.07)',
    tts: 'El cerebro también emite señales de alarma antes de saturarse. Si de repente te cuesta concentrarte, procesas más despacio de lo normal, no puedes tomar decisiones simples o notas que los pensamientos se repiten en bucle... eso no es que estés fallando. Es que el sistema cognitivo está llegando a su capacidad máxima. Detectarlo y parar antes es mucho más fácil que recuperarse después de una crisis.',
    items: [
      'Dificultad para concentrarse o mantener el hilo',
      'Procesamiento más lento de lo habitual',
      'Dificultad para tomar decisiones pequeñas',
      'Pensamientos que se repiten en bucle',
      'Sensación de niebla mental',
      'Dificultad para hablar o expresarse con fluidez',
    ],
  },
  {
    id: 'emocionales',
    titulo: 'Señales emocionales',
    subtitulo: 'Las emociones se desregulan',
    icon: 'fa-heart-crack',
    color: 'text-sec',
    bg: 'bg-sec/10',
    borderColor: 'border-sec/30',
    bgCard: 'bg-sec/5',
    glowColor: 'rgba(129,106,183,0.07)',
    tts: 'Cuando las emociones empiezan a desregularse antes de una crisis, suele notarse como irritabilidad que no tiene sentido, ansiedad flotante o la sensación de que todo es demasiado. Si cosas que normalmente puedes gestionar te parecen imposibles, o tienes cambios emocionales rápidos que no entiendes, el sistema nervioso probablemente ya está sobrecargado aunque no lo parezca desde fuera.',
    items: [
      'Irritabilidad desproporcionada ante cosas pequeñas',
      'Ansiedad o inquietud sin causa clara',
      'Sensación de agobio o de que todo es demasiado',
      'Cambios emocionales rápidos o difíciles de gestionar',
      'Sensación de que todo cuesta más de lo habitual',
      'Dificultad para regular emociones con las estrategias habituales',
    ],
  },
  {
    id: 'conductuales',
    titulo: 'Señales conductuales',
    subtitulo: 'El comportamiento cambia',
    icon: 'fa-arrows-spin',
    color: 'text-acc',
    bg: 'bg-acc/10',
    borderColor: 'border-acc/30',
    bgCard: 'bg-acc/5',
    glowColor: 'rgba(72,176,161,0.07)',
    tts: 'El comportamiento también cambia antes de una crisis. Quizá estimulas más de lo habitual porque el cuerpo busca regularse solo. O sientes que necesitas alejarte de la gente. O que hablar se hace difícil. Puede que los cambios pequeños te cuesten más que de costumbre, o que la rutina que normalmente sigues sin pensar ahora se sienta imposible. Estos son indicadores de que la carga está alta y que toca reducirla.',
    items: [
      'Aumento del stimming o necesidad urgente de moverse',
      'Retirada social o necesidad de aislarse',
      'Reducción de la capacidad de hablar o comunicarse',
      'Mayor rigidez o dificultad con los cambios',
      'Dificultad para seguir rutinas habituales',
      'Evitación de actividades que normalmente son manejables',
    ],
  },
]

const ACCIONES = {
  titulo: 'Qué hacer cuando las detectas',
  subtitulo: 'Actúa antes de llegar al límite',
  icon: 'fa-shield-halved',
  tts: 'Si detectas estas señales, no esperes a llegar al límite. El momento de actuar es ahora, cuando todavía tienes recursos para hacerlo. Reduce los estímulos, sal del entorno si puedes, usa una técnica de regulación. Si estás con alguien de confianza, díselo. Cancela o pospón lo que puedas, sin generar más estrés. Y sobre todo: no te exijas seguir funcionando como si nada. Detectar la señal y parar a tiempo no es rendirse, es cuidarte.',
  items: [
    { icon: 'fa-door-open', texto: 'Sal del entorno o reduce los estímulos que puedas' },
    { icon: 'fa-heart-pulse', texto: 'Usa una técnica de regulación ahora, no cuando llegues al límite' },
    { icon: 'fa-user-group', texto: 'Avisa a alguien de confianza si estás acompañado' },
    { icon: 'fa-calendar-xmark', texto: 'Cancela o pospón lo que puedas sin generar más estrés' },
    { icon: 'fa-ban', texto: 'No te exijas seguir funcionando con normalidad' },
    { icon: 'fa-kit-medical', texto: 'Ve al Kit Sensorial para técnicas de regulación rápida' },
  ],
}

function SeccionCard({ seccion, prefersReduced, index }) {
  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: prefersReduced ? 0 : 0.4, delay: prefersReduced ? 0 : index * 0.08 }}
      className={`relative rounded-card border ${seccion.borderColor} ${seccion.bgCard} p-5 overflow-hidden`}
    >
      <div
        className="absolute inset-0 pointer-events-none rounded-card"
        style={{ background: `radial-gradient(ellipse at 10% 10%, ${seccion.glowColor}, transparent 60%)` }}
        aria-hidden="true"
      />
      <div className="relative">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${seccion.bg} ${seccion.color}`}>
              <i className={`fa-solid ${seccion.icon} text-sm`} aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-base font-bold text-text leading-tight">{seccion.titulo}</h2>
              <p className="text-xs text-muted">{seccion.subtitulo}</p>
            </div>
          </div>
          <TTSButton text={seccion.tts} />
        </div>
        <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1.5 mt-1">
          {seccion.items.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-muted">
              <i className={`fa-solid fa-circle text-[5px] mt-2 shrink-0 ${seccion.color}`} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export default function SenalesPage() {
  const prefersReduced = useReducedMotion()

  return (
    <div className="max-w-3xl mx-auto px-4 pb-20 pt-8">
      <nav aria-label="Ruta de navegación" className="mb-6 text-sm text-faint flex items-center gap-2">
        <Link to="/" className="hover:text-text transition-colors duration-200">Inicio</Link>
        <i className="fa-solid fa-chevron-right text-[10px]" aria-hidden="true" />
        <Link to="/kit" className="hover:text-text transition-colors duration-200">Kit Sensorial</Link>
        <i className="fa-solid fa-chevron-right text-[10px]" aria-hidden="true" />
        <span className="text-muted" aria-current="page">Señales previas</span>
      </nav>

      <motion.div
        initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReduced ? 0 : 0.4 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-coral/10 flex items-center justify-center text-coral shrink-0">
            <i className="fa-solid fa-triangle-exclamation" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text leading-tight">Señales previas a la crisis</h1>
            <p className="text-sm text-muted">Cómo reconocer que se acerca una crisis antes de llegar al límite</p>
          </div>
        </div>
      </motion.div>

      <div className="space-y-4 mb-6">
        {SENALES.map((seccion, i) => (
          <SeccionCard key={seccion.id} seccion={seccion} prefersReduced={prefersReduced} index={i} />
        ))}
      </div>

      {/* Qué hacer */}
      <motion.div
        initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{ duration: prefersReduced ? 0 : 0.4, delay: prefersReduced ? 0 : 0.32 }}
        className="relative rounded-card border border-acc/30 bg-acc/5 p-5 overflow-hidden"
      >
        <div
          className="absolute inset-0 pointer-events-none rounded-card"
          style={{ background: 'radial-gradient(ellipse at 10% 10%, rgba(72,176,161,0.07), transparent 60%)' }}
          aria-hidden="true"
        />
        <div className="relative">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-acc/10 text-acc">
                <i className={`fa-solid ${ACCIONES.icon} text-sm`} aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-base font-bold text-text leading-tight">{ACCIONES.titulo}</h2>
                <p className="text-xs text-muted">{ACCIONES.subtitulo}</p>
              </div>
            </div>
            <TTSButton text={ACCIONES.tts} />
          </div>
          <ul className="grid sm:grid-cols-2 gap-2.5">
            {ACCIONES.items.map((item) => (
              <li key={item.texto} className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0 bg-acc/10 text-acc border border-acc/20">
                  <i className={`fa-solid ${item.icon}`} aria-hidden="true" />
                </div>
                <p className="text-sm text-muted leading-snug mt-0.5">{item.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  )
}
