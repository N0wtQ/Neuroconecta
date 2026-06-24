/**
 * useFavorites — persist user favorites via localStorage.
 *
 * @module hooks/useFavorites
 */

import { useState, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'refugio:favorites'

/**
 * @typedef {Object} FavoriteEntry
 * @property {string} type   - Content type: 'herramienta' | 'tecnica' | 'recurso'
 * @property {string} id     - Unique identifier
 * @property {string} titulo - Display title
 * @property {string} href   - Internal route
 */

/** @returns {FavoriteEntry[]} */
function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/** @param {FavoriteEntry[]} items */
function saveToStorage(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {}
}

/**
 * @returns {{
 *   favorites: FavoriteEntry[],
 *   add: function(FavoriteEntry): void,
 *   remove: function(string, string): void,
 *   has: function(string, string): boolean,
 *   clear: function(): void,
 *   count: number
 * }}
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState(loadFromStorage)

  useEffect(() => {
    saveToStorage(favorites)
  }, [favorites])

  const add = useCallback((/** @type {FavoriteEntry} */ entry) => {
    setFavorites(prev => {
      if (prev.some(f => f.type === entry.type && f.id === entry.id)) return prev
      return [...prev, entry]
    })
  }, [])

  const remove = useCallback((/** @type {string} */ type, /** @type {string} */ id) => {
    setFavorites(prev => prev.filter(f => !(f.type === type && f.id === id)))
  }, [])

  const has = useCallback((/** @type {string} */ type, /** @type {string} */ id) => {
    return favorites.some(f => f.type === type && f.id === id)
  }, [favorites])

  const clear = useCallback(() => {
    setFavorites([])
  }, [])

  return { favorites, add, remove, has, clear, count: favorites.length }
}
