import { useEffect } from 'react'

const SCRIPT_ID = 'jsonld-page'

/**
 * Injects a JSON-LD <script> into <head> for the current page.
 * Cleans up on unmount so scripts don't stack across navigations.
 *
 * @param {object|null} data — Schema.org object (e.g. BreadcrumbList, Article)
 */
export function useJsonLd(data) {
  const json = data ? JSON.stringify(data) : null

  useEffect(() => {
    if (!json) {
      document.getElementById(SCRIPT_ID)?.remove()
      return
    }
    let el = document.getElementById(SCRIPT_ID)
    if (!el) {
      el = document.createElement('script')
      el.setAttribute('type', 'application/ld+json')
      el.setAttribute('id', SCRIPT_ID)
      document.head.appendChild(el)
    }
    el.textContent = json
    return () => {
      document.getElementById(SCRIPT_ID)?.remove()
    }
  }, [json])
}
