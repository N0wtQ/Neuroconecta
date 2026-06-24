/**
 * Global search engine using Fuse.js.
 * Indexes all content types into a single flat SearchItem list.
 *
 * @module search
 */

import Fuse from 'fuse.js'
import { ESTADOS, REGULACION } from '../../components/KitSensorial'
import { RECURSOS_PDF } from '../../data/recursos-pdf'
import { herramientas } from '../../data/herramientas'
import { LUGARES } from '../../data/lugares'

/** @typedef {import('../../types/index.js').SearchItem} SearchItem */

// ─── INDEX BUILDERS ──────────────────────────────────────────────────────────

function buildEspaciosItems() {
  const seen = new Set()
  return LUGARES.flatMap(l => {
    const key = l.nombre
    if (seen.has(key)) return []
    seen.add(key)
    return [{
      type: 'espacio',
      id: l.id,
      titulo: l.nombre,
      desc: `${l.ciudad} · ${l.descripcion}`,
      href: '/espacios',
      icon: 'fa-location-dot',
      color: 'text-pri',
      tags: [l.ciudad, l.tipo],
    }]
  })
}

function buildHerramientasItems() {
  return herramientas.map(h => ({
    type: 'herramienta',
    id: h.nombre,
    titulo: h.nombre,
    desc: h.notas,
    href: '/herramientas',
    icon: 'fa-toolbox',
    color: 'text-sec',
    tags: h.perfiles.split(',').map(p => p.trim()).concat([h.categoria, h.subcategoria, h.precio]),
  }))
}

function buildEstadosItems() {
  const slugMap = { meltdown: 'meltdown', shutdown: 'shutdown', burnout: 'burnout-autista' }
  return ESTADOS.map(e => ({
    type: 'estado',
    id: e.id,
    titulo: e.titulo,
    desc: e.que,
    href: `/entender-y-prepararse/estados/${slugMap[e.id]}`,
    icon: e.icon,
    color: `text-${e.color}`,
    tags: [...e.signos, e.subtitulo],
  }))
}

function buildTecnicasItems() {
  return REGULACION.map(t => ({
    type: 'tecnica',
    id: t.titulo,
    titulo: t.titulo,
    desc: t.desc,
    href: '/entender-y-prepararse/tecnicas',
    icon: t.icon,
    color: t.color,
    tags: [],
  }))
}

function buildRecursosItems() {
  return RECURSOS_PDF.map(r => ({
    type: 'recurso',
    id: String(r.id),
    titulo: r.titulo,
    desc: r.descripcion ?? '',
    href: '/entender-y-prepararse/guias',
    icon: r.icono ?? 'fa-file-pdf',
    color: 'text-pri',
    tags: [r.categoria],
  }))
}

// ─── FUSE CONFIG ─────────────────────────────────────────────────────────────

/** @type {import('fuse.js').IFuseOptions<SearchItem>} */
const FUSE_OPTIONS = {
  includeScore: true,
  includeMatches: true,
  threshold: 0.35,       // 0=exact, 1=match anything — 0.35 gives good fuzzy
  minMatchCharLength: 2,
  ignoreLocation: true,  // Search the whole string, not just start
  keys: [
    { name: 'titulo', weight: 0.6 },
    { name: 'desc',   weight: 0.25 },
    { name: 'tags',   weight: 0.15 },
  ],
}

// ─── SINGLETON ───────────────────────────────────────────────────────────────

/** @type {Fuse<SearchItem> | null} */
let _fuse = null

/** @type {SearchItem[]} */
let _index = []

function getIndex() {
  if (_fuse) return _fuse
  _index = [
    ...buildEstadosItems(),
    ...buildTecnicasItems(),
    ...buildRecursosItems(),
    ...buildHerramientasItems(),
    ...buildEspaciosItems(),
  ]
  _fuse = new Fuse(_index, FUSE_OPTIONS)
  return _fuse
}

// ─── PUBLIC API ──────────────────────────────────────────────────────────────

/**
 * Perform a fuzzy search across all content.
 * @param {string} query
 * @param {{ type?: import('../../types/index.js').ContentType, limit?: number }} [opts]
 * @returns {{ item: SearchItem, score: number }[]}
 */
export function search(query, opts = {}) {
  if (!query || query.trim().length < 2) return []
  const fuse = getIndex()
  const results = fuse.search(query.trim(), { limit: opts.limit ?? 30 })
  if (opts.type) return results.filter(r => r.item.type === opts.type)
  return results
}

/**
 * Get all items of a specific type (useful for type-filtered search).
 * @param {import('../../types/index.js').ContentType} type
 * @returns {SearchItem[]}
 */
export function getItemsByType(type) {
  getIndex()
  return _index.filter(i => i.type === type)
}

/** Force index rebuild (call after data updates). */
export function invalidateIndex() {
  _fuse = null
  _index = []
}

export const CONTENT_TYPE_LABELS = {
  espacio:    'Espacios',
  herramienta:'Herramientas',
  estado:     'Estados',
  tecnica:    'Técnicas',
  recurso:    'Guías',
}

export const CONTENT_TYPE_ICONS = {
  espacio:    'fa-location-dot',
  herramienta:'fa-toolbox',
  estado:     'fa-brain',
  tecnica:    'fa-heart-pulse',
  recurso:    'fa-folder-open',
}
