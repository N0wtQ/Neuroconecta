/**
 * RelatedContent — "También te puede interesar" section.
 * Accepts an array of RelatedItem and renders a responsive grid.
 * Compatible with all content types.
 *
 * @param {{ items: import('../../types/index.js').RelatedItem[], title?: string, className?: string }} props
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { CONTENT_TYPE_LABELS } from '../../lib/search/index'

const TYPE_BADGE_COLOR = {
  espacio:     'text-pri bg-pri/8 border-pri/20',
  herramienta: 'text-sec bg-sec/8 border-sec/20',
  estado:      'text-coral bg-coral/8 border-coral/20',
  tecnica:     'text-acc bg-acc/8 border-acc/20',
  recurso:     'text-pri bg-pri/8 border-pri/20',
}

/**
 * @param {{ items: import('../../types/index.js').RelatedItem[], title?: string, className?: string }} props
 */
export default function RelatedContent({
  items,
  title = 'También te puede interesar',
  className = '',
}) {
  const prefersReduced = useReducedMotion()

  if (!items || items.length === 0) return null

  return (
    <section
      aria-labelledby="related-content-heading"
      className={`mt-10 ${className}`}
    >
      <h2
        id="related-content-heading"
        className="text-sm font-semibold text-muted uppercase tracking-wider mb-4"
      >
        {title}
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((item, i) => (
          <motion.div
            key={`${item.type}-${item.id}`}
            initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: prefersReduced ? 0 : 0.35, delay: prefersReduced ? 0 : i * 0.05 }}
          >
            <Link
              to={item.href}
              className="group flex items-start gap-3 p-4 rounded-card border border-border bg-surface
                         hover:border-sec/30 hover:bg-surfaceH hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/20
                         transition-all duration-200 focus-visible:outline-none focus-visible:ring-2
                         focus-visible:ring-pri focus-visible:ring-offset-2 focus-visible:ring-offset-bg block"
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.color} bg-current/10`}>
                <i className={`fa-solid ${item.icon} text-sm ${item.color}`} aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-1.5 mb-0.5">
                  <span className={`shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded border ${TYPE_BADGE_COLOR[item.type] ?? 'text-muted bg-surface border-border'}`}>
                    {CONTENT_TYPE_LABELS[item.type] ?? item.type}
                  </span>
                </div>
                <p className="text-sm font-semibold text-text leading-snug mb-0.5 group-hover:text-pri transition-colors duration-200">
                  {item.titulo}
                </p>
                <p className="text-xs text-muted leading-relaxed line-clamp-2">{item.desc}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
