/**
 * Console adapter — logs events to the browser console in DEV mode.
 * Replace with Plausible, Umami, PostHog, etc. at init time.
 *
 * @module analytics/adapters/console
 */

/** @typedef {{ init: function(): void, track: function(string, Object=): void }} ConsoleAdapter */

/** @type {ConsoleAdapter} */
export const consoleAdapter = {
  init() {
    if (import.meta.env.DEV) {
      console.info('%c[analytics] Console adapter active', 'color:#816AB7;font-weight:bold')
    }
  },
  track(name, props = {}) {
    if (import.meta.env.DEV) {
      console.log('%c[analytics]', 'color:#48B0A1;font-weight:bold', name, props)
    }
  },
}

/**
 * Plausible adapter stub — swap in when Plausible is available on window.
 * @type {ConsoleAdapter}
 */
export const plausibleAdapter = {
  init() {},
  track(name, props = {}) {
    if (typeof window !== 'undefined' && typeof window.plausible === 'function') {
      window.plausible(name, { props })
    }
  },
}
