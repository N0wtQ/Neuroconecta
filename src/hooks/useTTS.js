import { useState, useCallback, useRef, useEffect } from 'react'

export function useTTS() {
  const [speaking, setSpeaking] = useState(false)
  const utterRef = useRef(null)

  const speak = useCallback((text) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang  = 'es-ES'
    u.rate  = 0.88
    u.pitch = 1
    u.onstart = () => setSpeaking(true)
    u.onend   = () => setSpeaking(false)
    u.onerror = () => setSpeaking(false)
    utterRef.current = u
    window.speechSynthesis.speak(u)
  }, [])

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel()
    setSpeaking(false)
  }, [])

  useEffect(() => () => { window.speechSynthesis?.cancel() }, [])

  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window

  return { speak, stop, speaking, supported }
}
