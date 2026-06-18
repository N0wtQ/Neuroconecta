import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { RECURSOS_PDF } from '../data/recursos-pdf'
import { GlowCard } from '@/components/ui/spotlight-card'
import TTSButton from '@/components/ui/TTSButton'

// ── MELTDOWN / SHUTDOWN / BURNOUT ─────────────────────────────────────────────

const ESTADOS = [
  {
    id: 'meltdown',
    titulo: 'Meltdown',
    subtitulo: 'Crisis de sobrecarga',
    color: 'coral',
    borderColor: 'border-coral/30',
    bgColor: 'bg-coral/5',
    iconColor: 'text-coral',
    iconBg: 'bg-coral/10',
    badgeBg: 'bg-coral/10 text-coral border-coral/20',
    glowColor: 'rgba(229,123,134,0.07)',
    icon: 'fa-volcano',
    que: 'Una respuesta involuntaria ante una sobrecarga sensorial, emocional o cognitiva que supera el límite del sistema nervioso. No es un berrinche ni un acto voluntario: el cerebro literalmente se desborda.',
    signos: ['Llanto o gritos incontrolables', 'Golpear, morder o auto-lesionarse levemente (estimulación de urgencia)', 'Huir del lugar', 'Incapacidad para hablar o responder', 'Rigidez o temblores en el cuerpo'],
    ayuda: ['Reducir estímulos: luces, sonido, personas', 'No hablar ni tocar salvo que la persona lo pida', 'Ofrecer un espacio seguro y tranquilo', 'Esperar sin juzgar hasta que el sistema nervioso se regule', 'Después, no pedir explicaciones inmediatas'],
    tts: 'Meltdown. Crisis de sobrecarga. Es una respuesta involuntaria ante una sobrecarga sensorial, emocional o cognitiva que supera el límite del sistema nervioso. No es un berrinche ni un acto voluntario: el cerebro literalmente se desborda. Señales: llanto o gritos incontrolables, golpear, morder o autolesionarse levemente, huir del lugar, incapacidad para hablar o responder, rigidez o temblores en el cuerpo. Qué ayuda: reducir estímulos como luces, sonido y personas; no hablar ni tocar salvo que la persona lo pida; ofrecer un espacio seguro y tranquilo; esperar sin juzgar hasta que el sistema nervioso se regule; y después no pedir explicaciones inmediatas.',
    infografia: 'Meltdown.png',
  },
  {
    id: 'shutdown',
    titulo: 'Shutdown',
    subtitulo: 'Apagado interno',
    color: 'pri',
    borderColor: 'border-pri/30',
    bgColor: 'bg-pri/5',
    iconColor: 'text-pri',
    iconBg: 'bg-pri/10',
    badgeBg: 'bg-pri/10 text-pri border-pri/20',
    glowColor: 'rgba(58,130,202,0.07)',
    icon: 'fa-moon',
    que: 'Una respuesta de cierre ante la sobrecarga: el sistema nervioso "se apaga" para protegerse. A diferencia del meltdown, el shutdown es hacia adentro — silencio, inmovilidad, desconexión.',
    signos: ['Silencio repentino y retirada social', 'Mirada fija o perdida', 'Movimientos lentos o "congelados"', 'Incapacidad para hablar (mutismo temporal)', 'Sensación de estar "dentro de un cristal"'],
    ayuda: ['Presencia calmada sin exigir respuesta', 'No interpretar el silencio como indiferencia', 'Ofrecer mantas, auriculares u objetos de confort', 'Permitir tiempo sin estimulación', 'Cuando pase, preguntar con amabilidad qué necesita'],
    tts: 'Shutdown. Apagado interno. Es una respuesta de cierre ante la sobrecarga: el sistema nervioso se apaga para protegerse. A diferencia del meltdown, el shutdown es hacia adentro: silencio, inmovilidad, desconexión. Señales: silencio repentino y retirada social, mirada fija o perdida, movimientos lentos o congelados, incapacidad para hablar, sensación de estar dentro de un cristal. Qué ayuda: presencia calmada sin exigir respuesta; no interpretar el silencio como indiferencia; ofrecer mantas, auriculares u objetos de confort; permitir tiempo sin estimulación; y cuando pase, preguntar con amabilidad qué necesita.',
    infografia: 'Shutdown.png',
  },
  {
    id: 'burnout',
    titulo: 'Burnout autista',
    subtitulo: 'Agotamiento acumulado',
    color: 'sec',
    borderColor: 'border-sec/30',
    bgColor: 'bg-sec/5',
    iconColor: 'text-sec',
    iconBg: 'bg-sec/10',
    badgeBg: 'bg-sec/10 text-sec border-sec/20',
    glowColor: 'rgba(129,106,183,0.07)',
    icon: 'fa-battery-empty',
    que: 'Un estado de agotamiento profundo causado por el esfuerzo sostenido de enmascarar, adaptarse a un mundo neurotípico y manejar una carga sensorial y social que supera los recursos disponibles. Puede durar semanas o meses.',
    signos: ['Pérdida de habilidades que antes eran automáticas', 'Aumento de la sensibilidad sensorial', 'Dificultad extrema para procesar y comunicarse', 'Aislamiento y retirada de actividades', 'Agotamiento que no mejora con el descanso habitual'],
    ayuda: ['Reducir drásticamente las demandas y el masking', 'Priorizar el descanso verdadero (no solo físico)', 'Revisar y eliminar compromisos no esenciales', 'Buscar apoyo profesional especializado en autismo', 'Permitirse funcionar a un ritmo más lento sin culpa'],
    tts: 'Burnout autista. Agotamiento acumulado. Es un estado de agotamiento profundo causado por el esfuerzo sostenido de enmascarar, adaptarse a un mundo neurotípico y manejar una carga sensorial y social que supera los recursos disponibles. Puede durar semanas o meses. Señales: pérdida de habilidades que antes eran automáticas, aumento de la sensibilidad sensorial, dificultad extrema para procesar y comunicarse, aislamiento y retirada de actividades, agotamiento que no mejora con el descanso habitual. Qué ayuda: reducir drásticamente las demandas y el enmascaramiento; priorizar el descanso verdadero; revisar y eliminar compromisos no esenciales; buscar apoyo profesional especializado en autismo; y permitirse funcionar a un ritmo más lento sin culpa.',
    infografia: 'Burnout.png',
  },
]

function EstadoCard({ estado, prefersReduced, index }) {
  const [open, setOpen] = useState(false)
  const BASE = import.meta.env.BASE_URL

  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: prefersReduced ? 0 : 0.45, delay: prefersReduced ? 0 : index * 0.1 }}
      className={`relative rounded-card border ${estado.borderColor} ${estado.bgColor} overflow-hidden`}
    >
      <div
        className="absolute inset-0 pointer-events-none rounded-card"
        style={{ background: `radial-gradient(ellipse at 10% 10%, ${estado.glowColor}, transparent 60%)` }}
        aria-hidden="true"
      />

      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="relative w-full flex items-center gap-4 px-6 pt-6 pb-3 text-left"
      >
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg shrink-0 ${estado.iconBg} ${estado.iconColor}`}>
          <i className={`fa-solid ${estado.icon}`} aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <h3 className="text-lg font-bold text-text">{estado.titulo}</h3>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-lg border ${estado.badgeBg}`}>
              {estado.subtitulo}
            </span>
          </div>
          <p className={`text-sm text-muted pr-6 ${open ? '' : 'line-clamp-2'}`}>{estado.que}</p>
        </div>
        <i
          className={`fa-solid fa-chevron-down text-xs text-muted transition-transform duration-200 shrink-0 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      <div className="px-6 pb-4 flex items-center justify-between gap-3">
        <a
          href={`${BASE}infografias/${estado.infografia}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-semibold border transition-colors duration-200 ${estado.badgeBg} hover:opacity-80`}
          aria-label={`Ver infografía de ${estado.titulo} (se abre en nueva pestaña)`}
        >
          <i className="fa-solid fa-image text-[9px]" aria-hidden="true" />
          Ver infografía
        </a>
        <TTSButton text={estado.tts} />
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="relative px-6 pb-6 grid sm:grid-cols-2 gap-5 pt-2 border-t border-border/50">
              <div>
                <p className={`text-xs font-semibold uppercase tracking-wider ${estado.iconColor} mb-2.5`}>
                  <i className="fa-solid fa-triangle-exclamation mr-1.5" aria-hidden="true" />
                  Señales
                </p>
                <ul className="space-y-1.5">
                  {estado.signos.map(s => (
                    <li key={s} className="flex items-start gap-2 text-sm text-muted">
                      <i className={`fa-solid fa-circle text-[5px] mt-2 shrink-0 ${estado.iconColor}`} aria-hidden="true" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className={`text-xs font-semibold uppercase tracking-wider ${estado.iconColor} mb-2.5`}>
                  <i className="fa-solid fa-hands-holding-heart mr-1.5" aria-hidden="true" />
                  Qué ayuda
                </p>
                <ul className="space-y-1.5">
                  {estado.ayuda.map(a => (
                    <li key={a} className="flex items-start gap-2 text-sm text-muted">
                      <i className={`fa-solid fa-check text-[10px] mt-1 shrink-0 ${estado.iconColor}`} aria-hidden="true" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── REGULACIÓN ────────────────────────────────────────────────────────────────

const REGULACION = [
  {
    icon: 'fa-snowflake', color: 'text-pri', bg: 'bg-pri/8',
    titulo: 'Frío',
    desc: 'Agua fría en muñecas y cara, hielo en manos o frente. Activa el reflejo de buceo y desacelera el sistema nervioso.',
    tts: 'Si te sientes desbordado, el frío puede ayudarte a regularte muy rápido. Pon agua fría en las muñecas y la cara, o sostén un cubito de hielo en la mano. Notarás el efecto en pocos segundos: el frío activa el reflejo de buceo y le dice al sistema nervioso que frene.',
  },
  {
    icon: 'fa-wind', color: 'text-acc', bg: 'bg-acc/8',
    titulo: 'Respiración',
    desc: 'Exhala el doble de lo que inhales. 4 seg. entrar, 8 salir. Activa el nervio vago y regula el ritmo cardíaco.',
    tts: 'Exhala el doble de lo que inhalas. Cuatro segundos metiendo el aire, ocho soltándolo. Esa exhalación larga activa el nervio vago y regula el ritmo cardíaco. Si cuatro y ocho te parece mucho, empieza con dos y cuatro. Lo importante es que la salida sea lenta.',
  },
  {
    icon: 'fa-person-running', color: 'text-coral', bg: 'bg-coral/8',
    titulo: 'Movimiento',
    desc: 'Saltar, apretar una pelota, apretar los puños, estirarse. El movimiento propioceptivo calma el sistema nervioso.',
    tts: 'Cuando el cuerpo está saturado, moverse ayuda a liberar tensión. Salta, aprieta una pelota, aprieta los puños o estírate. Este tipo de movimiento manda señales al sistema nervioso de que todo está bajo control y lo ayuda a calmarse.',
  },
  {
    icon: 'fa-headphones', color: 'text-sec', bg: 'bg-sec/8',
    titulo: 'Sonido',
    desc: 'Tapones, auriculares con cancelación de ruido o sonidos de fondo (lluvia, blanco). Reduce carga sensorial auditiva.',
    tts: 'Si el entorno es demasiado ruidoso, cúbrete los oídos. Usa tapones o auriculares con cancelación de ruido. También puedes poner sonidos de fondo como lluvia o ruido blanco. Reducir la carga auditiva libera recursos que tu sistema nervioso puede usar para regularse.',
  },
  {
    icon: 'fa-eye-slash', color: 'text-pri', bg: 'bg-pri/8',
    titulo: 'Oscuridad',
    desc: 'Cubrirse los ojos, gafas de sol o un cuarto oscuro. Elimina la sobrecarga visual y da sensación de refugio.',
    tts: 'La oscuridad puede ser un refugio cuando la sobrecarga es visual. Cúbrete los ojos, ponte las gafas de sol o busca un cuarto oscuro. Eliminar la estimulación visual le da al cerebro el respiro que necesita.',
  },
  {
    icon: 'fa-dumbbell', color: 'text-acc', bg: 'bg-acc/8',
    titulo: 'Presión',
    desc: 'Manta con peso, chaqueta apretada o simplemente abrazar las rodillas. La presión profunda regula el sistema nervioso.',
    tts: 'La presión profunda es muy calmante para el sistema nervioso. Usa una manta con peso, ponte una chaqueta apretada o simplemente abraza tus propias rodillas. Notarás que la activación baja y el cuerpo empieza a relajarse.',
  },
  {
    icon: 'fa-lemon', color: 'text-coral', bg: 'bg-coral/8',
    titulo: 'Sabor intenso',
    desc: 'Caramelo ácido, chicle, hielo. La estimulación oral fuerte atrae la atención del sistema nervioso a una sola cosa.',
    tts: 'Un sabor muy intenso puede anclar la atención del sistema nervioso en una sola cosa y cortar el bucle de saturación. Come un caramelo ácido, mastica chicle o sostén hielo en la boca. Cuanto más intenso el sabor, más efectivo el anclaje.',
  },
  {
    icon: 'fa-layer-group', color: 'text-sec', bg: 'bg-sec/8',
    titulo: 'Grounding 5-4-3',
    desc: 'Nombra 5 cosas que ves, 4 que tocas, 3 que oyes, 2 que hueles, 1 que saboreas. Ancla en el presente.',
    tts: 'Si estás en tu cabeza y necesitas volver al presente, nombra cinco cosas que ves ahora mismo, cuatro que puedes tocar, tres que oyes, dos que hueles y una que saboreas. No tienes que decirlo en voz alta, basta con notarlas. Cada sentido que activas reduce la activación del sistema nervioso.',
  },
  {
    icon: 'fa-person-walking', color: 'text-pri', bg: 'bg-pri/8',
    titulo: 'Salida',
    desc: 'Cambiar de entorno — salir a un pasillo, baño o al aire libre. A veces el único regulador es romper el estímulo.',
    tts: 'A veces el único regulador posible es cambiar de entorno. Si puedes, sal del espacio donde estás: un pasillo, el baño, el exterior. Alejarse del estímulo rompe el ciclo de sobrecarga y le da al sistema nervioso un punto de partida más limpio.',
  },
]

// ── KIT DE BOLSO ─────────────────────────────────────────────────────────────

const KITS = [
  {
    id: 'pequeno',
    label: 'Bolso pequeño',
    shortLabel: 'Pequeño',
    sublabel: 'Lo esencial de emergencia',
    icon: 'fa-bag-shopping',
    iconSize: 'text-2xl',
    color: 'text-acc',
    dotClass: 'bg-acc',
    borderColor: 'border-acc/30',
    bgColor: 'bg-acc/5',
    badgeBg: 'bg-acc/10 text-acc border-acc/20',
    glowColor: 'rgba(72,176,161,0.08)',
    spotlightColor: 'green',
    tts: 'Bolso pequeño para emergencias. Lo que necesitas llevar: auriculares o tapones para bloquear el ruido, gafas de sol para la luz intensa, caramelos ácidos para regulación oral, un objeto textural para las manos, tu tarjeta de crisis con tu información y necesidades, y el móvil cargado.',
    items: [
      { icon: 'fa-headphones',  label: 'Auriculares o tapones', nota: 'Bloqueadores de ruido' },
      { icon: 'fa-sun',         label: 'Gafas de sol',          nota: 'Para luz intensa' },
      { icon: 'fa-candy-cane',  label: 'Caramelos ácidos',      nota: 'Regulación oral' },
      { icon: 'fa-hand-dots',   label: 'Objeto textural',       nota: 'Stim para las manos' },
      { icon: 'fa-id-card',     label: 'Tarjeta de crisis',     nota: 'Con tu info y necesidades' },
      { icon: 'fa-mobile',      label: 'Móvil cargado',         nota: 'Con apps de apoyo' },
    ],
  },
  {
    id: 'grande',
    label: 'Bolso grande',
    shortLabel: 'Grande',
    sublabel: 'Para salidas largas',
    icon: 'fa-briefcase',
    iconSize: 'text-3xl',
    color: 'text-sec',
    dotClass: 'bg-sec',
    borderColor: 'border-sec/30',
    bgColor: 'bg-sec/5',
    badgeBg: 'bg-sec/10 text-sec border-sec/20',
    glowColor: 'rgba(129,106,183,0.08)',
    spotlightColor: 'purple',
    tts: 'Bolso grande para salidas largas. Lleva auriculares con cancelación activa de ruido, gafas de sol, snacks sensoriales como caramelos o chicle, un fidget toy para las manos, tu tarjeta de crisis, el móvil con cargador portátil, agua fría para regulación por frío, una máscara de ojos por si necesitas oscuridad de emergencia, tu medicación si la tomas habitualmente, y algo de distracción como un libro o dispositivo.',
    items: [
      { icon: 'fa-headphones',     label: 'Auriculares NC',        nota: 'Cancelación activa de ruido' },
      { icon: 'fa-sun',            label: 'Gafas de sol',          nota: 'Filtro de luz' },
      { icon: 'fa-candy-cane',     label: 'Snacks sensoriales',    nota: 'Caramelos, chicle, crujientes' },
      { icon: 'fa-hand-dots',      label: 'Fidget toy',            nota: 'Spinner, cubo antiestrés' },
      { icon: 'fa-id-card',        label: 'Tarjeta de crisis',     nota: 'AAC o texto simple' },
      { icon: 'fa-mobile',         label: 'Móvil + powerbank',     nota: 'Apps de apoyo y carga extra' },
      { icon: 'fa-bottle-water',   label: 'Agua fría',             nota: 'Regulación por frío' },
      { icon: 'fa-mask-face',      label: 'Máscara de ojos',       nota: 'Para oscuridad de emergencia' },
      { icon: 'fa-notes-medical',  label: 'Medicación',            nota: 'Si la tomas habitualmente' },
      { icon: 'fa-gamepad',        label: 'Distracción',           nota: 'Libro, puzzle, dispositivo' },
    ],
  },
  {
    id: 'enorme',
    label: 'Mochila grande',
    shortLabel: 'Mochila',
    sublabel: 'Días difíciles o viajes',
    icon: 'fa-person-hiking',
    iconSize: 'text-4xl',
    color: 'text-coral',
    dotClass: 'bg-coral',
    borderColor: 'border-coral/30',
    bgColor: 'bg-coral/5',
    badgeBg: 'bg-coral/10 text-coral border-coral/20',
    glowColor: 'rgba(229,123,134,0.08)',
    spotlightColor: 'red',
    tts: 'Mochila grande para días difíciles o viajes. Lleva los mejores auriculares con cancelación de ruido que tengas, gafas de sol polarizadas, un surtido sensorial con distintos sabores y texturas, varios fidgets de diferentes tipos y pesos, tus tarjetas de apoyo para crisis o comunicación, el móvil con un powerbank de alta capacidad, agua fría y snacks para hidratación y regulación, una mantita pequeña para peso o confort táctil, máscara de ojos para oscuridad de emergencia, tu medicación con dosis extra si el médico lo aprueba, algo de entretenimiento como una consola, libro o tablet, tu perfume o aroma favorito para estimulación olfativa, tapones de repuesto por si fallan los auriculares, y ropa cómoda de recambio por si el tejido actual se vuelve intolerable.',
    items: [
      { icon: 'fa-headphones',     label: 'Auriculares NC premium', nota: 'La herramienta más importante' },
      { icon: 'fa-sun',            label: 'Gafas de sol oscuras',   nota: 'Polarizadas si es posible' },
      { icon: 'fa-candy-cane',     label: 'Surtido sensorial',      nota: 'Varios sabores y texturas' },
      { icon: 'fa-hand-dots',      label: 'Set de fidgets',         nota: 'Diferentes texturas y pesos' },
      { icon: 'fa-id-card',        label: 'Tarjetas de apoyo',      nota: 'Crisis, necesidades, AAC' },
      { icon: 'fa-mobile',         label: 'Móvil + powerbank',      nota: 'Powerbank de alta capacidad' },
      { icon: 'fa-bottle-water',   label: 'Agua fría + snacks',     nota: 'Hidratación y regulación oral' },
      { icon: 'fa-layer-group',    label: 'Mantita pequeña',        nota: 'Peso o confort táctil' },
      { icon: 'fa-mask-face',      label: 'Máscara de ojos',        nota: 'Oscuridad de emergencia' },
      { icon: 'fa-notes-medical',  label: 'Medicación',             nota: 'Con dosis extra si el médico aprueba' },
      { icon: 'fa-gamepad',        label: 'Distracción',            nota: 'Nintendo Switch, libro, tablet' },
      { icon: 'fa-spray-can',      label: 'Estimulación olfativa',  nota: 'Perfume favorito, lavanda' },
      { icon: 'fa-ear-deaf',       label: 'Tapones extra',          nota: 'Por si fallan los auriculares' },
      { icon: 'fa-shirt',          label: 'Ropa cómoda extra',      nota: 'Por si el tejido se vuelve intolerable' },
    ],
  },
]

function KitSelectorCard({ kit, selected, onClick }) {
  const dotCount = kit.id === 'pequeno' ? 1 : kit.id === 'grande' ? 2 : 3

  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pri focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-2xl"
    >
      <GlowCard
        glowColor={kit.spotlightColor}
        customSize
        className={`w-28 h-36 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-200 !grid-rows-none
          ${selected ? `opacity-100 scale-105` : 'opacity-60 hover:opacity-80'}`}
      >
        <i
          className={`fa-solid ${kit.icon} ${kit.iconSize} transition-colors duration-200 ${selected ? kit.color : 'text-muted'}`}
          aria-hidden="true"
        />
        <div className="flex gap-0.5 mt-1">
          {Array.from({ length: dotCount }).map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${selected ? kit.dotClass : 'bg-muted/40'}`}
            />
          ))}
        </div>
        <span className={`text-xs font-semibold transition-colors duration-200 ${selected ? kit.color : 'text-muted'}`}>
          {kit.shortLabel}
        </span>
      </GlowCard>
    </button>
  )
}

// ── PDF RECURSOS ──────────────────────────────────────────────────────────────

function PDFCard({ pdf, prefersReduced, index }) {
  const BASE = import.meta.env.BASE_URL
  const href = pdf.url ?? `${BASE}docs/${pdf.archivo}`
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: prefersReduced ? 0 : 0.4, delay: prefersReduced ? 0 : index * 0.08 }}
      className="group flex items-start gap-4 p-5 rounded-card border border-border bg-surface hover:border-pri/25 hover:bg-surface/80 transition-all duration-200"
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-sm shrink-0"
        style={{ background: `${pdf.color}18`, color: pdf.color }}
      >
        <i className={`fa-solid ${pdf.icono ?? 'fa-file-pdf'} text-base`} aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold text-text leading-snug group-hover:text-pri transition-colors duration-200">
            {pdf.titulo}
          </p>
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-md border shrink-0"
            style={{ background: `${pdf.color}12`, color: pdf.color, borderColor: `${pdf.color}30` }}
          >
            {pdf.categoria}
          </span>
        </div>
        {pdf.descripcion && (
          <p className="text-xs text-muted mt-1 leading-relaxed">{pdf.descripcion}</p>
        )}
      </div>
      <i className={`fa-solid ${pdf.url ? 'fa-arrow-up-right-from-square' : 'fa-arrow-down-to-line'} text-xs text-muted group-hover:text-pri transition-colors duration-200 mt-0.5 shrink-0`} aria-hidden="true" />
    </motion.a>
  )
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function KitSensorial() {
  const prefersReduced = useReducedMotion()
  const [selectedKit, setSelectedKit] = useState('grande')
  const [estadoAbierto, setEstadoAbierto] = useState(null)

  const activeKit = KITS.find(k => k.id === selectedKit)

  return (
    <div className="max-w-3xl mx-auto px-4 pb-20 pt-8 space-y-14">

      {/* ── Qué me está pasando ──────────────────────────────────────────── */}
      <section aria-labelledby="estados-heading">
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReduced ? 0 : 0.4 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-coral/10 flex items-center justify-center text-coral shrink-0">
              <i className="fa-solid fa-brain" aria-hidden="true" />
            </div>
            <div>
              <h2 id="estados-heading" className="text-xl font-bold text-text leading-tight">¿Qué me está pasando?</h2>
              <p className="text-sm text-muted">Meltdown, Shutdown y Burnout — qué son y cómo diferenciarlos</p>
            </div>
          </div>
        </motion.div>

        <div className="space-y-3">
          {ESTADOS.map((estado, i) => (
            <EstadoCard
              key={estado.id}
              estado={estado}
              prefersReduced={prefersReduced}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* ── Cómo regularme ───────────────────────────────────────────────── */}
      <section aria-labelledby="regulacion-heading">
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: prefersReduced ? 0 : 0.4 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-acc/10 flex items-center justify-center text-acc shrink-0">
              <i className="fa-solid fa-heart-pulse" aria-hidden="true" />
            </div>
            <div>
              <h2 id="regulacion-heading" className="text-xl font-bold text-text leading-tight">Cómo regularme</h2>
              <p className="text-sm text-muted">Técnicas de regulación sensorial y emocional</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {REGULACION.map((item, i) => (
            <motion.div
              key={item.titulo}
              initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: prefersReduced ? 0 : 0.4, delay: prefersReduced ? 0 : i * 0.06 }}
              className="flex flex-col p-4 rounded-card border border-border bg-surface gap-3"
            >
              <div className="flex items-start gap-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg shrink-0 ${item.bg} ${item.color}`}>
                  <i className={`fa-solid ${item.icon}`} aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-text mb-0.5">{item.titulo}</p>
                  <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
                </div>
              </div>
              <TTSButton text={item.tts} className="self-end" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Kit de bolso ────────────────────────────────────────────────── */}
      <section aria-labelledby="kit-heading">
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: prefersReduced ? 0 : 0.4 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-sec/10 flex items-center justify-center text-sec shrink-0">
              <i className="fa-solid fa-kit-medical" aria-hidden="true" />
            </div>
            <div>
              <h2 id="kit-heading" className="text-xl font-bold text-text leading-tight">Mi kit de bolso</h2>
              <p className="text-sm text-muted">Elige el tamaño y ve qué meter</p>
            </div>
          </div>
        </motion.div>

        {/* Size selector — GlowCards */}
        <div className="flex justify-center gap-6 mb-8" role="group" aria-label="Tamaño del bolso">
          {KITS.map(kit => (
            <KitSelectorCard
              key={kit.id}
              kit={kit}
              selected={selectedKit === kit.id}
              onClick={() => setSelectedKit(kit.id)}
            />
          ))}
        </div>

        {/* Active kit */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedKit}
            initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? {} : { opacity: 0, y: -8 }}
            transition={{ duration: prefersReduced ? 0 : 0.25 }}
            className={`relative rounded-card border ${activeKit.borderColor} ${activeKit.bgColor} p-6 overflow-hidden`}
          >
            <div
              className="absolute inset-0 pointer-events-none rounded-card"
              style={{ background: `radial-gradient(ellipse at 5% 5%, ${activeKit.glowColor}, transparent 55%)` }}
              aria-hidden="true"
            />
            <div className="relative">
              <div className="flex items-center justify-between gap-3 mb-5">
                <div>
                  <h3 className={`text-base font-bold ${activeKit.color}`}>{activeKit.label}</h3>
                  <p className="text-xs text-muted mt-0.5">{activeKit.sublabel}</p>
                </div>
                <div className="flex items-center gap-2">
                  <TTSButton
                    iconOnly
                    text={activeKit.tts}
                  />
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border ${activeKit.badgeBg}`}>
                    {activeKit.items.length} objetos
                  </span>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-2.5">
                {activeKit.items.map(item => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0 ${activeKit.bgColor} ${activeKit.color} border ${activeKit.borderColor}`}>
                      <i className={`fa-solid ${item.icon}`} aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-text leading-snug">{item.label}</p>
                      <p className="text-xs text-muted">{item.nota}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── PDF Recursos ────────────────────────────────────────────────── */}
      <section aria-labelledby="pdf-heading">
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: prefersReduced ? 0 : 0.4 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-pri/10 flex items-center justify-center text-pri shrink-0">
              <i className="fa-solid fa-folder-open" aria-hidden="true" />
            </div>
            <div>
              <h2 id="pdf-heading" className="text-xl font-bold text-text leading-tight">Mis recursos</h2>
              <p className="text-sm text-muted">Guías y documentos en PDF para descargar</p>
            </div>
          </div>
        </motion.div>

        {RECURSOS_PDF.length === 0 ? (
          <div className="rounded-card border border-border border-dashed bg-surface/40 p-10 text-center">
            <div className="w-12 h-12 rounded-xl bg-pri/8 flex items-center justify-center text-pri mx-auto mb-4">
              <i className="fa-solid fa-file-circle-plus text-xl" aria-hidden="true" />
            </div>
            <p className="text-sm font-semibold text-text mb-1">Aún no hay PDFs</p>
          </div>
        ) : (
          <div className="space-y-3">
            {RECURSOS_PDF.map((pdf, i) => (
              <PDFCard key={pdf.id} pdf={pdf} prefersReduced={prefersReduced} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
