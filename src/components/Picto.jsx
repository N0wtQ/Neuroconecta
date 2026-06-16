import { useState } from 'react'
import { usePictograms } from '../context/PictogramContext'

const BASE = 'https://static.arasaac.org/pictograms'

// attempt 0 → _500.png  |  attempt 1 → _2500.png  |  attempt 2 → hidden
function src(id, attempt) {
  if (attempt === 0) return `${BASE}/${id}/${id}_500.png`
  return `${BASE}/${id}/${id}_2500.png`
}

export default function Picto({ id, alt = '', size = 'sm' }) {
  const { enabled } = usePictograms()
  const [attempt, setAttempt] = useState(0)

  if (!enabled || !id || attempt >= 2) return null

  const px = size === 'lg' ? 'h-8 w-8' : 'h-6 w-6'

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 bg-white rounded-md overflow-hidden ${px}`}
      aria-hidden={!alt || undefined}
    >
      <img
        src={src(id, attempt)}
        alt={alt}
        className="w-full h-full object-contain"
        onError={() => setAttempt(a => a + 1)}
      />
    </span>
  )
}
