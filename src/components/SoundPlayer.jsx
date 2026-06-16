import { useState, useRef, useCallback, useEffect } from 'react'

const SOUNDS = [
  { id: 'white', label: 'Ruido blanco', icon: 'fa-wave-square',       color: 'text-text',  desc: 'Cobertura uniforme' },
  { id: 'pink',  label: 'Ruido rosa',   icon: 'fa-signal',             color: 'text-coral', desc: 'Más suave y cálido' },
  { id: 'brown', label: 'Ruido marrón', icon: 'fa-bars-staggered',     color: 'text-warm',  desc: 'Profundo y envolvente' },
  { id: 'rain',  label: 'Lluvia',       icon: 'fa-cloud-rain',         color: 'text-pri',   desc: 'Lluvia suave' },
  { id: 'ocean', label: 'Mar',          icon: 'fa-water',              color: 'text-acc',   desc: 'Olas del mar' },
]

function fillWhite(data, len) {
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1
}

function fillPink(data, len) {
  let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0
  for (let i = 0; i < len; i++) {
    const w = Math.random() * 2 - 1
    b0 = 0.99886*b0 + w*0.0555179; b1 = 0.99332*b1 + w*0.0750759
    b2 = 0.96900*b2 + w*0.1538520; b3 = 0.86650*b3 + w*0.3104856
    b4 = 0.55000*b4 + w*0.5329522; b5 = -0.7616*b5  - w*0.0168980
    data[i] = (b0+b1+b2+b3+b4+b5+b6+w*0.5362) * 0.11
    b6 = w * 0.115926
  }
}

function fillBrown(data, len) {
  let last = 0
  for (let i = 0; i < len; i++) {
    const w = Math.random() * 2 - 1
    last = (last + 0.02 * w) / 1.02
    data[i] = Math.max(-1, Math.min(1, last * 3.5))
  }
}

function buildBuffer(ctx, type, seconds = 4) {
  const len = ctx.sampleRate * seconds
  const buf = ctx.createBuffer(1, len, ctx.sampleRate)
  const data = buf.getChannelData(0)
  if (type === 'pink') fillPink(data, len)
  else if (type === 'brown' || type === 'rain' || type === 'ocean') fillBrown(data, len)
  else fillWhite(data, len)
  return buf
}

export default function SoundPlayer() {
  const [active, setActive]   = useState(null)
  const [volume, setVolume]   = useState(0.65)
  const ctxRef  = useRef(null)
  const srcRef  = useRef(null)
  const gainRef = useRef(null)
  const lfoRef  = useRef(null)

  useEffect(() => () => {
    try { srcRef.current?.stop() } catch {}
    try { lfoRef.current?.stop() } catch {}
    if (ctxRef.current?.state !== 'closed') ctxRef.current?.close()
  }, [])

  const stopCurrent = useCallback(() => {
    try { srcRef.current?.stop() } catch {}
    try { lfoRef.current?.stop() } catch {}
    srcRef.current = null
    lfoRef.current = null
    setActive(null)
  }, [])

  const play = useCallback((id) => {
    if (active === id) { stopCurrent(); return }
    stopCurrent()

    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    if (!ctxRef.current || ctxRef.current.state === 'closed') {
      ctxRef.current = new AudioCtx()
    }
    const ctx = ctxRef.current
    if (ctx.state === 'suspended') ctx.resume()

    const masterGain = ctx.createGain()
    masterGain.gain.value = volume
    masterGain.connect(ctx.destination)
    gainRef.current = masterGain

    const noiseType = ['white','pink','brown'].includes(id) ? id : id
    const buf = buildBuffer(ctx, noiseType)
    const src = ctx.createBufferSource()
    src.buffer = buf
    src.loop = true

    if (id === 'rain') {
      const bpf = ctx.createBiquadFilter()
      bpf.type = 'bandpass'
      bpf.frequency.value = 4000
      bpf.Q.value = 0.7
      const lpf = ctx.createBiquadFilter()
      lpf.type = 'lowpass'
      lpf.frequency.value = 8000
      src.connect(bpf)
      bpf.connect(lpf)
      lpf.connect(masterGain)
    } else if (id === 'ocean') {
      const lpf = ctx.createBiquadFilter()
      lpf.type = 'lowpass'
      lpf.frequency.value = 600
      src.connect(lpf)

      const waveGain = ctx.createGain()
      waveGain.gain.value = 0.5
      lpf.connect(waveGain)
      waveGain.connect(masterGain)

      const lfo = ctx.createOscillator()
      lfo.frequency.value = 0.10
      const lfoGain = ctx.createGain()
      lfoGain.gain.value = 0.45
      lfo.connect(lfoGain)
      lfoGain.connect(waveGain.gain)
      lfo.start()
      lfoRef.current = lfo
    } else {
      src.connect(masterGain)
    }

    src.start()
    srcRef.current = src
    setActive(id)
  }, [active, volume, stopCurrent])

  const handleVolume = (v) => {
    setVolume(v)
    if (gainRef.current) gainRef.current.gain.setTargetAtTime(v, gainRef.current.context.currentTime, 0.05)
  }

  return (
    <div className="flex flex-col gap-5 p-6 rounded-card bg-surface border border-border">
      <div>
        <h3 className="font-semibold text-text text-sm flex items-center gap-2 mb-1">
          <i className="fa-solid fa-headphones text-sec text-xs" aria-hidden="true" />
          Sonidos ambientales
        </h3>
        <p className="text-xs text-muted leading-relaxed">
          Ruido de fondo para la concentración y calma. Sin anuncios ni interrupciones.
          Útil durante meltdowns, al estudiar o para conciliar el sueño.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2" role="group" aria-label="Elegir sonido">
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

      {/* Volume */}
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
