import { useState, useRef, useCallback, useEffect } from 'react'

const BASE = import.meta.env.BASE_URL

const SOUNDS = [
  { id: 'rain',        label: 'Lluvia',    icon: 'fa-cloud-rain',    color: 'text-pri',  desc: 'Lluvia suave' },
  { id: 'waves',       label: 'Mar',       icon: 'fa-water',         color: 'text-acc',  desc: 'Olas del mar' },
  { id: 'thunderstorm',label: 'Tormenta',  icon: 'fa-cloud-bolt',    color: 'text-sec',  desc: 'Lluvia y truenos' },
  { id: 'fireplace',   label: 'Chimenea',  icon: 'fa-fire',          color: 'text-coral',desc: 'Fuego crepitante' },
]

export default function SoundPlayer() {
  const [active, setActive] = useState(null)
  const [volume, setVolume] = useState(0.65)
  const audioRef = useRef(null)

  useEffect(() => () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
  }, [])

  const stopCurrent = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current = null
    }
    setActive(null)
  }, [])

  const play = useCallback((id) => {
    if (active === id) { stopCurrent(); return }
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }

    const audio = new Audio(`${BASE}sounds/${id}.mp3`)
    audio.loop = true
    audio.volume = volume
    audio.play().catch(() => {})
    audioRef.current = audio
    setActive(id)
  }, [active, volume, stopCurrent])

  const handleVolume = (v) => {
    setVolume(v)
    if (audioRef.current) audioRef.current.volume = v
  }

  return (
    <div className="flex flex-col gap-5 p-6 rounded-card bg-surface border border-border">
      <div>
        <h3 className="font-semibold text-text text-sm flex items-center gap-2 mb-1">
          <i className="fa-solid fa-headphones text-sec text-xs" aria-hidden="true" />
          Sonidos ambientales
        </h3>
        <p className="text-xs text-muted leading-relaxed">
          Sonidos de fondo para la concentración y calma. Sin anuncios ni interrupciones.
          Útil durante meltdowns, al estudiar o para conciliar el sueño.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" role="group" aria-label="Elegir sonido">
        {SOUNDS.map(s => {
          const isOn = active === s.id
          return (
            <button
              key={s.id}
              onClick={() => play(s.id)}
              aria-pressed={isOn}
              className={`flex flex-col items-center gap-2 px-3 py-3.5 rounded-xl border text-xs font-semibold
                          transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sec
                          ${isOn
                            ? 'bg-sec/15 border-sec/35 text-sec shadow-inner'
                            : 'bg-bg border-border text-muted hover:text-text hover:border-border/80 hover:bg-surface'
                          }`}
            >
              <i className={`fa-solid ${s.icon} text-base ${isOn ? 'text-sec' : s.color}`} aria-hidden="true" />
              <span>{s.label}</span>
              <span className={`text-[10px] font-normal ${isOn ? 'text-sec/70' : 'text-faint'}`}>
                {isOn ? (
                  <span className="flex items-center gap-1">
                    <i className="fa-solid fa-circle text-[6px] animate-pulse" aria-hidden="true" />
                    Reproduciendo
                  </span>
                ) : s.desc}
              </span>
            </button>
          )
        })}
      </div>

      <div className="flex items-center gap-3">
        <i className="fa-solid fa-volume-low text-faint text-xs shrink-0" aria-hidden="true" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.02"
          value={volume}
          onChange={e => handleVolume(Number(e.target.value))}
          className="flex-1 h-1.5 rounded-full cursor-pointer accent-sec"
          aria-label="Volumen del sonido ambiental"
        />
        <i className="fa-solid fa-volume-high text-faint text-xs shrink-0" aria-hidden="true" />
      </div>

      {active && (
        <button
          onClick={stopCurrent}
          className="self-center flex items-center gap-1.5 text-xs text-faint hover:text-text transition-colors duration-200"
        >
          <i className="fa-solid fa-stop text-[9px]" aria-hidden="true" />
          Detener sonido
        </button>
      )}
    </div>
  )
}
