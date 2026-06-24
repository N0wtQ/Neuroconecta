/**
 * GlobalSearch — full-screen fuzzy search dialog.
 * ARIA combobox pattern, keyboard navigation, type filters.
 * Triggered by Navbar button or Ctrl+K / Cmd+K.
 *
 * @module components/search/GlobalSearch
 */

import { useState, useEffect, useRef, useCallback, useId } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { search, CONTENT_TYPE_LABELS, CONTENT_TYPE_ICONS } from '../../lib/search/index'
import { trackSearch, trackSearchNoResults } from '../../lib/analytics/index'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const ALL_TYPES = ['espacio', 'herramienta', 'estado', 'tecnica', 'recurso']

const TYPE_COLOR = {
  espacio:     'text-pri   bg-pri/10   border-pri/20',
  herramienta: 'text-sec   bg-sec/10   border-sec/20',
  estado:      'text-coral bg-coral/10 border-coral/20',
  tecnica:     'text-acc   bg-acc/10   border-acc/20',
  recurso:     'text-pri   bg-pri/10   border-pri/20',
}

export default function GlobalSearch({ open, onClose }) {
  const prefersReduced = useReducedMotion()
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const listRef = useRef(null)

  const [query, setQuery] = useState('')
  const [activeType, setActiveType] = useState(null)
  const [results, setResults] = useState([])
  const [activeIdx, setActiveIdx] = useState(-1)
  const [hasSearched, setHasSearched] = useState(false)

  const listboxId = useId()
  const inputId = useId()

  // ── Focus input on open ─────────────────────────────────────────────────────
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus())
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setQuery('')
      setResults([])
      setActiveIdx(-1)
      setHasSearched(false)
      setActiveType(null)
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  // ── Global Ctrl/Cmd+K shortcut ──────────────────────────────────────────────
  useEffect(() => {
    function handler(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        if (open) onClose()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  // ── Search ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setActiveIdx(-1)
      setHasSearched(false)
      return
    }
    const raw = search(query, { type: activeType ?? undefined, limit: 24 })
    const items = raw.map(r => r.item)
    setResults(items)
    setActiveIdx(-1)
    setHasSearched(true)

    if (items.length === 0) {
      trackSearchNoResults(query)
    } else {
      trackSearch(query, items.length)
    }
  }, [query, activeType])

  // ── Navigation ──────────────────────────────────────────────────────────────
  const navigate_ = useCallback((item) => {
    navigate(item.href)
    onClose()
  }, [navigate, onClose])

  function handleKeyDown(e) {
    if (!results.length) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIdx(i => (i + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIdx(i => (i - 1 + results.length) % results.length)
    } else if (e.key === 'Enter' && activeIdx >= 0) {
      e.preventDefault()
      navigate_(results[activeIdx])
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  // Keep active item in view
  useEffect(() => {
    if (activeIdx < 0 || !listRef.current) return
    const el = listRef.current.children[activeIdx]
    el?.scrollIntoView({ block: 'nearest' })
  }, [activeIdx])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.15 }}
            className="fixed inset-0 z-[900] bg-bg/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.div
            key="dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Búsqueda global"
            initial={prefersReduced ? {} : { opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReduced ? {} : { opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: prefersReduced ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 top-[5vh] z-[901] mx-auto max-w-2xl rounded-2xl border border-border bg-surface shadow-2xl shadow-black/50 overflow-hidden"
          >
            {/* Input row */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <i className="fa-solid fa-magnifying-glass text-muted text-sm shrink-0" aria-hidden="true" />
              <input
                ref={inputRef}
                id={inputId}
                type="search"
                role="combobox"
                aria-autocomplete="list"
                aria-controls={listboxId}
                aria-expanded={results.length > 0}
                aria-activedescendant={activeIdx >= 0 ? `result-${activeIdx}` : undefined}
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Busca herramientas, técnicas, estados, guías…"
                className="flex-1 bg-transparent text-text placeholder:text-faint text-sm outline-none"
                autoComplete="off"
                spellCheck="false"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Limpiar búsqueda"
                  className="text-faint hover:text-text transition-colors duration-150 shrink-0"
                >
                  <i className="fa-solid fa-xmark text-xs" aria-hidden="true" />
                </button>
              )}
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md border border-border bg-bg text-[10px] text-faint font-mono shrink-0">
                Esc
              </kbd>
            </div>

            {/* Type filters */}
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border overflow-x-auto scrollbar-none">
              <span className="text-[10px] text-faint shrink-0">Filtrar:</span>
              <button
                type="button"
                onClick={() => setActiveType(null)}
                className={`shrink-0 px-2.5 py-1 rounded-lg text-[10px] font-semibold border transition-all duration-150
                  ${!activeType
                    ? 'bg-pri/15 text-pri border-pri/25'
                    : 'bg-surface text-faint border-border hover:border-muted'
                  }`}
              >
                Todo
              </button>
              {ALL_TYPES.map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setActiveType(v => v === t ? null : t)}
                  className={`shrink-0 px-2.5 py-1 rounded-lg text-[10px] font-semibold border transition-all duration-150
                    ${activeType === t
                      ? TYPE_COLOR[t]
                      : 'bg-surface text-faint border-border hover:border-muted'
                    }`}
                >
                  <i className={`fa-solid ${CONTENT_TYPE_ICONS[t]} mr-1`} aria-hidden="true" />
                  {CONTENT_TYPE_LABELS[t]}
                </button>
              ))}
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto overscroll-contain">
              {!query && (
                <div className="px-4 py-8 text-center text-sm text-faint">
                  Escribe para buscar en toda la plataforma
                </div>
              )}

              {hasSearched && results.length === 0 && (
                <div className="px-4 py-8 text-center">
                  <p className="text-sm text-muted mb-1">Sin resultados para <strong className="text-text">"{query}"</strong></p>
                  <p className="text-xs text-faint">Intenta con otras palabras o quita el filtro de tipo</p>
                </div>
              )}

              {results.length > 0 && (
                <ul
                  ref={listRef}
                  id={listboxId}
                  role="listbox"
                  aria-label="Resultados de búsqueda"
                  className="py-1.5"
                >
                  {results.map((item, i) => (
                    <li
                      key={`${item.type}-${item.id}`}
                      id={`result-${i}`}
                      role="option"
                      aria-selected={i === activeIdx}
                    >
                      <button
                        type="button"
                        onClick={() => navigate_(item)}
                        onMouseEnter={() => setActiveIdx(i)}
                        className={`w-full flex items-start gap-3 px-4 py-2.5 text-left transition-colors duration-100
                          ${i === activeIdx ? 'bg-surfaceH' : 'hover:bg-surfaceH'}`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.color} bg-current/10 mt-0.5`}>
                          <i className={`fa-solid ${item.icon} text-xs ${item.color}`} aria-hidden="true" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${TYPE_COLOR[item.type] ?? 'text-faint bg-surface border-border'}`}>
                              {CONTENT_TYPE_LABELS[item.type] ?? item.type}
                            </span>
                          </div>
                          <p className="text-sm font-semibold text-text leading-snug truncate">{item.titulo}</p>
                          <p className="text-xs text-muted leading-relaxed line-clamp-1 mt-0.5">{item.desc}</p>
                        </div>
                        <i className="fa-solid fa-arrow-right text-[10px] text-faint mt-2 shrink-0 opacity-0 group-hover:opacity-100" aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer hint */}
            <div className="flex items-center justify-between gap-4 px-4 py-2 border-t border-border bg-bg/50">
              <div className="flex items-center gap-3 text-[10px] text-faint">
                <span><kbd className="font-mono">↑↓</kbd> navegar</span>
                <span><kbd className="font-mono">↵</kbd> ir</span>
                <span><kbd className="font-mono">Esc</kbd> cerrar</span>
              </div>
              {results.length > 0 && (
                <span className="text-[10px] text-faint">{results.length} resultado{results.length !== 1 ? 's' : ''}</span>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
