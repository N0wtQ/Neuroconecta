import { usePictograms } from '../context/PictogramContext'

const BASE = 'https://static.arasaac.org/pictograms'

export default function Picto({ id, alt = '', className = 'h-5 w-5 object-contain' }) {
  const { enabled } = usePictograms()
  if (!enabled || !id) return null

  return (
    <img
      src={`${BASE}/${id}/${id}_500.png`}
      alt={alt}
      className={`inline-block shrink-0 ${className}`}
      onError={e => { e.currentTarget.style.display = 'none' }}
      aria-hidden={!alt || undefined}
    />
  )
}
