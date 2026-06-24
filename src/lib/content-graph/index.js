/**
 * Content Graph — static relation layer between all content types.
 * Provides typed helpers for cross-content recommendations.
 *
 * @module content-graph
 */

import { ESTADOS, REGULACION } from '../../components/KitSensorial'
import { RECURSOS_PDF } from '../../data/recursos-pdf'
import { herramientas } from '../../data/herramientas'
import { LUGARES } from '../../data/lugares'

// ─── ESTADO SLUGS ─────────────────────────────────────────────────────────────

export const ESTADO_SLUGS = {
  meltdown: 'meltdown',
  shutdown: 'shutdown',
  burnout: 'burnout-autista',
}

export const SLUG_TO_ESTADO_ID = {
  'meltdown': 'meltdown',
  'shutdown': 'shutdown',
  'burnout-autista': 'burnout',
}

// ─── NORMALISATION HELPERS ────────────────────────────────────────────────────

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
}

// ─── RELATIONS: Estado → related content ─────────────────────────────────────

const ESTADO_RELATIONS = {
  meltdown: {
    tecnicaIds: ['Frío', 'Respiración', 'Movimiento', 'Oscuridad', 'Presión', 'Sonido'],
    recursoIds: [1, 2, 3],
    herramientaCats: ['Regulación Sensorial', 'Salud Emocional'],
    senalIds: ['corporales', 'cognitivas', 'emocionales', 'conductuales'],
  },
  shutdown: {
    tecnicaIds: ['Oscuridad', 'Sonido', 'Presión', 'Grounding 5-4-3'],
    recursoIds: [1, 3],
    herramientaCats: ['Regulación Sensorial', 'Comunicación Social'],
    senalIds: ['corporales', 'cognitivas', 'conductuales'],
  },
  burnout: {
    tecnicaIds: ['Respiración', 'Grounding 5-4-3', 'Salida', 'Movimiento'],
    recursoIds: [6, 3, 5],
    herramientaCats: ['Salud Emocional', 'Gestión Ejecutiva'],
    senalIds: ['emocionales', 'cognitivas', 'conductuales'],
  },
}

// ─── PROFILE / CATEGORY CONFIGS ───────────────────────────────────────────────

/**
 * @type {import('../../types/index.js').ProfileConfig[]}
 */
export const PERFILES_CONFIG = [
  {
    slug: 'autismo',
    label: 'Autismo (TEA)',
    filterKey: 'TEA',
    desc: 'Apps, webs y herramientas especialmente útiles para personas autistas: regulación sensorial, comunicación aumentativa, rutinas y vida independiente.',
    icon: 'fa-infinity',
    color: 'text-coral',
    seo: {
      title: 'Herramientas para personas autistas (TEA) — Refugio Sensorial',
      description: 'Apps y herramientas digitales seleccionadas para personas autistas: regulación sensorial, comunicación aumentativa, rutinas y bienestar.',
    },
  },
  {
    slug: 'tdah',
    label: 'TDAH',
    filterKey: 'TDAH',
    desc: 'Herramientas para gestionar el tiempo, mantener el foco, crear rutinas y reducir la carga cognitiva en el día a día con TDAH.',
    icon: 'fa-bolt',
    color: 'text-pri',
    seo: {
      title: 'Herramientas para personas con TDAH — Refugio Sensorial',
      description: 'Apps y herramientas digitales para personas con TDAH: gestión del tiempo, concentración, rutinas y reducción de la carga cognitiva.',
    },
  },
  {
    slug: 'dislexia',
    label: 'Dislexia',
    filterKey: 'DIS',
    desc: 'Herramientas de accesibilidad lectora: texto a voz, bionic reading, correctores y lectores adaptados para personas con dislexia.',
    icon: 'fa-book-open',
    color: 'text-acc',
    seo: {
      title: 'Herramientas para personas con dislexia — Refugio Sensorial',
      description: 'Apps y extensiones para personas con dislexia: texto a voz, bionic reading, correctores especializados y lectores adaptados.',
    },
  },
  {
    slug: 'toc',
    label: 'TOC / Ansiedad',
    filterKey: 'TOC',
    desc: 'Herramientas de mindfulness, regulación emocional y organización del entorno para personas con TOC o ansiedad.',
    icon: 'fa-circle-half-stroke',
    color: 'text-sec',
    seo: {
      title: 'Herramientas para personas con TOC o ansiedad — Refugio Sensorial',
      description: 'Apps y herramientas para TOC y ansiedad: mindfulness, regulación emocional, automatización del hogar y organización.',
    },
  },
]

/**
 * @type {import('../../types/index.js').CategoryConfig[]}
 */
export const CATEGORIAS_CONFIG = [
  {
    slug: 'concentracion',
    label: 'Concentración y enfoque',
    cats: ['Gestión Ejecutiva', 'Accesibilidad Cognitiva'],
    subcats: ['Tiempo', 'Tareas', 'Memoria', 'Enfoque'],
    desc: 'Temporizadores visuales, bloqueadores de distracciones, técnica Pomodoro y herramientas para mantener el foco con neurodivergencia.',
    icon: 'fa-crosshairs',
    color: 'text-pri',
    seo: {
      title: 'Herramientas de concentración y enfoque para neurodivergentes — Refugio Sensorial',
      description: 'Apps y herramientas de concentración para TDAH y TEA: Pomodoro, bloqueadores de distracciones, temporizadores visuales.',
    },
  },
  {
    slug: 'regulacion',
    label: 'Regulación sensorial',
    cats: ['Regulación Sensorial'],
    desc: 'Tapones, modo oscuro, paisajes sonoros y herramientas para reducir la sobrecarga sensorial y crear entornos manejables.',
    icon: 'fa-ear-listen',
    color: 'text-acc',
    seo: {
      title: 'Herramientas de regulación sensorial — Refugio Sensorial',
      description: 'Apps y herramientas de regulación sensorial: cancelación de ruido, modo oscuro, paisajes sonoros y más.',
    },
  },
  {
    slug: 'comunicacion',
    label: 'Comunicación',
    cats: ['Comunicación Social'],
    desc: 'Comunicación aumentativa y alternativa (CAA), pictogramas, texto a voz y herramientas para apoyar la comunicación en momentos difíciles.',
    icon: 'fa-comments',
    color: 'text-sec',
    seo: {
      title: 'Herramientas de comunicación para autismo (CAA) — Refugio Sensorial',
      description: 'Apps de comunicación aumentativa, pictogramas y texto a voz para personas autistas con dificultades de comunicación.',
    },
  },
  {
    slug: 'accesibilidad',
    label: 'Accesibilidad cognitiva',
    cats: ['Accesibilidad Cognitiva'],
    desc: 'Lectores adaptados, correctores, bionic reading y herramientas para mejorar la accesibilidad cognitiva en la vida diaria.',
    icon: 'fa-brain',
    color: 'text-coral',
    seo: {
      title: 'Herramientas de accesibilidad cognitiva — Refugio Sensorial',
      description: 'Herramientas de accesibilidad cognitiva: lectura fácil, texto a voz, correctores y extensiones para dislexia y TDAH.',
    },
  },
  {
    slug: 'aprendizaje',
    label: 'Aprendizaje',
    cats: ['Educación Infantil', 'Accesibilidad Cognitiva'],
    subcats: ['Lectura', 'Escritura', 'Enfoque'],
    desc: 'Apps educativas y herramientas de aprendizaje adaptadas para niños y adultos con necesidades neurodivergentes.',
    icon: 'fa-graduation-cap',
    color: 'text-pri',
    seo: {
      title: 'Herramientas de aprendizaje para neurodivergentes — Refugio Sensorial',
      description: 'Apps y herramientas de aprendizaje para TEA y dislexia: lectura, escritura y herramientas educativas adaptadas.',
    },
  },
  {
    slug: 'productividad',
    label: 'Productividad',
    cats: ['Gestión Ejecutiva'],
    desc: 'Planificadores visuales, recordatorios, gestión de tareas y herramientas para superar las dificultades ejecutivas del TDAH y el autismo.',
    icon: 'fa-list-check',
    color: 'text-warm',
    seo: {
      title: 'Herramientas de productividad para TDAH y autismo — Refugio Sensorial',
      description: 'Apps de productividad adaptadas para TDAH y autismo: planificadores visuales, tareas, recordatorios y gestión del tiempo.',
    },
  },
  {
    slug: 'autonomia',
    label: 'Autonomía y vida independiente',
    cats: ['Vida Independiente'],
    desc: 'Herramientas para la vida cotidiana: organización del hogar, rutinas de limpieza, alimentación y hábitos independientes.',
    icon: 'fa-house',
    color: 'text-acc',
    seo: {
      title: 'Herramientas para vida independiente con autismo — Refugio Sensorial',
      description: 'Apps para la vida independiente con autismo: hogar, rutinas, alimentación y autonomía en el día a día.',
    },
  },
  {
    slug: 'bienestar',
    label: 'Bienestar emocional',
    cats: ['Salud Emocional'],
    desc: 'Diarios emocionales, meditación guiada, seguimiento del estado de ánimo y herramientas de autocuidado para neurodivergentes.',
    icon: 'fa-heart',
    color: 'text-coral',
    seo: {
      title: 'Herramientas de bienestar emocional para neurodivergentes — Refugio Sensorial',
      description: 'Apps de bienestar emocional para TEA y TDAH: meditación, diario emocional, mindfulness y autocuidado.',
    },
  },
]

// ─── CITY CONFIG ──────────────────────────────────────────────────────────────

/**
 * Build unique city list from LUGARES, normalised to slugs.
 * @returns {Map<string, string>} slug → display label
 */
export function getCiudadesMap() {
  const map = new Map()
  for (const l of LUGARES) {
    const slug = slugify(l.ciudad)
    if (!map.has(slug)) map.set(slug, l.ciudad)
  }
  return map
}

// ─── GRAPH HELPERS ────────────────────────────────────────────────────────────

/**
 * @param {string} estadoId - 'meltdown' | 'shutdown' | 'burnout'
 * @returns {import('../../types/index.js').Tecnica[]}
 */
export function getRelatedTechniques(estadoId) {
  const rel = ESTADO_RELATIONS[estadoId]
  if (!rel) return []
  const ids = new Set(rel.tecnicaIds)
  return REGULACION.filter(t => ids.has(t.titulo))
}

/**
 * @param {string} estadoId
 * @returns {import('../../types/index.js').Recurso[]}
 */
export function getRelatedResources(estadoId) {
  const rel = ESTADO_RELATIONS[estadoId]
  if (!rel) return []
  const ids = new Set(rel.recursoIds)
  return RECURSOS_PDF.filter(r => ids.has(r.id))
}

/**
 * @param {string} estadoId
 * @returns {import('../../types/index.js').Herramienta[]}
 */
export function getRelatedTools(estadoId) {
  const rel = ESTADO_RELATIONS[estadoId]
  if (!rel) return []
  const cats = new Set(rel.herramientaCats)
  return herramientas.filter(h => cats.has(h.categoria)).slice(0, 6)
}

/**
 * Get spaces for a city slug.
 * @param {string} ciudadSlug
 * @returns {import('../../types/index.js').Espacio[]}
 */
export function getRelatedSpaces(ciudadSlug) {
  return LUGARES.filter(l => slugify(l.ciudad) === ciudadSlug)
}

/**
 * Get herramientas for a profile slug.
 * @param {string} profileSlug
 * @returns {import('../../types/index.js').Herramienta[]}
 */
export function getToolsByProfile(profileSlug) {
  const cfg = PERFILES_CONFIG.find(p => p.slug === profileSlug)
  if (!cfg) return []
  return herramientas.filter(h =>
    h.perfiles.split(',').map(p => p.trim()).includes(cfg.filterKey)
  )
}

/**
 * Get herramientas for a category slug.
 * @param {string} categorySlug
 * @returns {import('../../types/index.js').Herramienta[]}
 */
export function getToolsByCategory(categorySlug) {
  const cfg = CATEGORIAS_CONFIG.find(c => c.slug === categorySlug)
  if (!cfg) return []
  return herramientas.filter(h => {
    const matchCat = cfg.cats.includes(h.categoria)
    if (!cfg.subcats) return matchCat
    return matchCat && cfg.subcats.includes(h.subcategoria)
  })
}

/**
 * Generic related-content helper — returns up to `limit` RelatedItems
 * for a given estado, useful for the RelatedContent component.
 * @param {string} estadoId
 * @param {number} [limit=6]
 * @returns {import('../../types/index.js').RelatedItem[]}
 */
export function getRelatedForEstado(estadoId, limit = 6) {
  const tecnicas = getRelatedTechniques(estadoId).slice(0, 2).map(t => ({
    type: 'tecnica',
    id: t.titulo,
    titulo: t.titulo,
    desc: t.desc,
    href: '/entender-y-prepararse/tecnicas',
    icon: t.icon,
    color: t.color,
  }))

  const recursos = getRelatedResources(estadoId).slice(0, 2).map(r => ({
    type: 'recurso',
    id: String(r.id),
    titulo: r.titulo,
    desc: r.descripcion ?? '',
    href: '/entender-y-prepararse/guias',
    icon: r.icono ?? 'fa-file-pdf',
    color: 'text-pri',
  }))

  const tools = getRelatedTools(estadoId).slice(0, 2).map(h => ({
    type: 'herramienta',
    id: h.nombre,
    titulo: h.nombre,
    desc: h.notas,
    href: '/herramientas',
    icon: 'fa-toolbox',
    color: 'text-sec',
  }))

  return [...tecnicas, ...recursos, ...tools].slice(0, limit)
}
