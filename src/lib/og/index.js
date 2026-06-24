/**
 * OG Image helpers — infrastructure for section-specific Open Graph images.
 * Static files live in /public/og/. Dynamic generation can be added via
 * Vercel OG, Cloudflare Workers, or similar at a later stage.
 *
 * Naming convention: /public/og/<section>-<slug>.png
 *
 * @module og
 */

const BASE = import.meta.env.BASE_URL
const OG_PATH = `${BASE}og/`
const DEFAULT_OG = `${OG_PATH}default.png`

/**
 * Section → filename map. Add a PNG to /public/og/ to activate.
 * @type {Record<string, string>}
 */
const SECTION_IMAGES = {
  default:                    'default.png',
  inicio:                     'inicio.png',
  espacios:                   'espacios.png',
  herramientas:               'herramientas.png',
  'entender-y-prepararse':    'entender.png',
  estados:                    'estados.png',
  ayuda:                      'ayuda.png',
  meltdown:                   'estado-meltdown.png',
  shutdown:                   'estado-shutdown.png',
  'burnout-autista':          'estado-burnout.png',
  autismo:                    'perfil-autismo.png',
  tdah:                       'perfil-tdah.png',
  dislexia:                   'perfil-dislexia.png',
  toc:                        'perfil-toc.png',
}

/**
 * Return the OG image URL for a given section or slug.
 * Falls back to the default OG image if no specific one exists.
 *
 * @param {string} [section] - Section key (e.g. 'herramientas', 'meltdown')
 * @returns {string} Absolute-path image URL
 */
export function getOgImage(section) {
  const file = section ? SECTION_IMAGES[section] ?? SECTION_IMAGES.default : SECTION_IMAGES.default
  return `${OG_PATH}${file}`
}

/**
 * Build a full Open Graph meta object for a page.
 * @param {{ title: string, description: string, section?: string, canonical?: string }} opts
 * @returns {{ title: string, description: string, image: string, url: string, type: string }}
 */
export function buildOgMeta({ title, description, section, canonical }) {
  return {
    title,
    description,
    image: getOgImage(section),
    url: canonical ?? (typeof window !== 'undefined' ? window.location.href : ''),
    type: 'website',
  }
}
