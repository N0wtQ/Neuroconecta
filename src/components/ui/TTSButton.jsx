import { useTTS } from '../../hooks/useTTS'

export default function TTSButton({ text, className = '' }) {
  const { speak, stop, speaking, supported } = useTTS()
  if (!supported) return null

  return (
    <button
      type="button"
      onClick={() => speaking ? stop() : speak(text)}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all duration-200 border ${
        speaking
          ? 'bg-acc/15 text-acc border-acc/35'
          : 'bg-transparent text-faint border-border/60 hover:text-muted hover:border-border'
      } ${className}`}
      aria-label={speaking ? 'Detener lectura en voz alta' : 'Escuchar en voz alta'}
    >
      <i className={`fa-solid ${speaking ? 'fa-stop' : 'fa-volume-high'} text-[9px]`} aria-hidden="true" />
      {speaking ? 'Detener' : 'Escuchar'}
    </button>
  )
}
