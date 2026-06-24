/**
 * FavoriteButton — accessible toggle button that persists items to localStorage.
 *
 * @param {{ type: string, id: string, titulo: string, href: string, className?: string }} props
 */

import { useFavorites } from '../../hooks/useFavorites'
import { track, EVENTS } from '../../lib/analytics/index'

export default function FavoriteButton({ type, id, titulo, href, className = '' }) {
  const { has, add, remove } = useFavorites()
  const active = has(type, id)

  function toggle(e) {
    e.preventDefault()
    e.stopPropagation()
    if (active) {
      remove(type, id)
      track(EVENTS.FAVORITE_REMOVED, { type, id, titulo })
    } else {
      add({ type, id, titulo, href })
      track(EVENTS.FAVORITE_ADDED, { type, id, titulo })
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={active}
      aria-label={active ? `Quitar ${titulo} de favoritos` : `Guardar ${titulo} en favoritos`}
      title={active ? 'Quitar de favoritos' : 'Guardar en favoritos'}
      className={`inline-flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pri focus-visible:ring-offset-2 focus-visible:ring-offset-bg
        ${active
          ? 'text-coral bg-coral/10 border border-coral/25 hover:bg-coral/20'
          : 'text-faint bg-surface border border-border hover:text-coral hover:border-coral/25 hover:bg-coral/8'
        } ${className}`}
    >
      <i
        className={`text-xs ${active ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}`}
        aria-hidden="true"
      />
    </button>
  )
}
