/**
 * Analytics — decoupled event tracking with adapter pattern.
 * Add providers without touching call sites.
 *
 * Usage:
 *   import { track } from '@/lib/analytics'
 *   track('search_performed', { query: 'meltdown', results: 4 })
 *
 * @module analytics
 */

// ─── ADAPTER INTERFACE ───────────────────────────────────────────────────────
// Each adapter must implement: { init(), track(name, props) }

/** @type {import('./adapters/console.js').ConsoleAdapter | null} */
let _adapter = null

/**
 * Register an analytics adapter. Call once at app init.
 * @param {{ init: function(): void, track: function(string, Object=): void }} adapter
 */
export function setAdapter(adapter) {
  _adapter = adapter
  _adapter.init()
}

// ─── TYPED EVENT NAMES ───────────────────────────────────────────────────────

export const EVENTS = /** @type {const} */ ({
  SEARCH_PERFORMED:   'search_performed',
  SEARCH_NO_RESULTS:  'search_no_results',
  RESOURCE_CLICKED:   'resource_clicked',
  TOOL_CLICKED:       'tool_clicked',
  SPACE_CLICKED:      'space_clicked',
  CRISIS_CTA_CLICKED: 'crisis_cta_clicked',
  FAVORITE_ADDED:     'favorite_added',
  FAVORITE_REMOVED:   'favorite_removed',
  PAGE_VIEW:          'page_view',
  ESTADO_EXPANDED:    'estado_expanded',
  TTS_PLAYED:         'tts_played',
})

// ─── TRACK ───────────────────────────────────────────────────────────────────

/**
 * Track an analytics event. No-ops if no adapter registered.
 * @param {string} name  - Event name from EVENTS
 * @param {Object} [props] - Event properties (serialisable, no PII)
 */
export function track(name, props = {}) {
  if (!_adapter) return
  try {
    _adapter.track(name, props)
  } catch (e) {
    if (import.meta.env.DEV) console.warn('[analytics] track error:', e)
  }
}

// ─── CONVENIENCE WRAPPERS ────────────────────────────────────────────────────

/** @param {{ query: string, results: number, type?: string }} props */
export const trackSearch = (props) => track(EVENTS.SEARCH_PERFORMED, props)

/** @param {{ query: string }} props */
export const trackSearchNoResults = (props) => track(EVENTS.SEARCH_NO_RESULTS, props)

/** @param {{ id: string | number, titulo: string, categoria?: string }} props */
export const trackResourceClick = (props) => track(EVENTS.RESOURCE_CLICKED, props)

/** @param {{ nombre: string, categoria: string, tipo: string }} props */
export const trackToolClick = (props) => track(EVENTS.TOOL_CLICKED, props)

/** @param {{ id: string, nombre: string, ciudad: string }} props */
export const trackSpaceClick = (props) => track(EVENTS.SPACE_CLICKED, props)

export const trackCrisisCta = () => track(EVENTS.CRISIS_CTA_CLICKED)
