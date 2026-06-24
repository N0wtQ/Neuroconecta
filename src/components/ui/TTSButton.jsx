import { useTTS } from '../../hooks/useTTS'

// iconOnly → pequeño botón icono para headers con espacio limitado
// ariaLabel → texto adicional de contexto: "Escuchar en voz alta: [ariaLabel]"
export default function TTSButton({ text, className = '', iconOnly = false, ariaLabel = '' }) {
  const { speak, stop, speaking, supported } = useTTS()
  if (!supported) return null

  const activeClass = speaking
    ? 'bg-acc/15 text-acc border-acc/35'
    : 'bg-transparent text-faint border-border/60 hover:text-muted hover:border-border'

  const baseLabel = speaking ? 'Detener lectura en voz alta' : 'Escuchar en voz alta'
  const fullLabel = ariaLabel ? `${baseLabel}: ${ariaLabel}` : baseLabel

  if (iconOnly) {
    return (
      <button
        type="button"
        onClick={() => speaking ? stop() : speak(text)}
        className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 border ${activeClass} ${className}`}
        aria-label={fullLabel}
        aria-pressed={speaking}
        title={speaking ? 'Detener' : 'Escuchar'}
      >
        <i className={`fa-solid ${speaking ? 'fa-stop' : 'fa-volume-high'} text-[10px]`} aria-hidden="true" />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={() => speaking ? stop() : speak(text)}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all duration-200 border ${activeClass} ${className}`}
      aria-label={fullLabel}
      aria-pressed={speaking}
    >
      <i className={`fa-solid ${speaking ? 'fa-stop' : 'fa-volume-high'} text-[9px]`} aria-hidden="true" />
      {speaking ? 'Detener' : 'Escuchar'}
    </button>
  )
}
