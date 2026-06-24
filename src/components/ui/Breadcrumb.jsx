import { Link } from 'react-router-dom'

export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Ruta de navegación" className="mb-6 text-sm text-faint">
      <ol className="flex items-center gap-2 list-none p-0 m-0 flex-wrap">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-2">
            {idx > 0 && (
              <i className="fa-solid fa-chevron-right text-[10px]" aria-hidden="true" />
            )}
            {item.href ? (
              <Link to={item.href} className="hover:text-text transition-colors duration-200">
                {item.label}
              </Link>
            ) : (
              <span className="text-muted" aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
