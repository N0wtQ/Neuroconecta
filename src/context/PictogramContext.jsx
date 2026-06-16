import { createContext, useContext, useState, useEffect } from 'react'

const PictogramContext = createContext({ enabled: false, toggle: () => {} })

export function PictogramProvider({ children }) {
  const [enabled, setEnabled] = useState(() => {
    try { return localStorage.getItem('picto') === '1' } catch { return false }
  })

  useEffect(() => {
    try { localStorage.setItem('picto', enabled ? '1' : '0') } catch {}
  }, [enabled])

  return (
    <PictogramContext.Provider value={{ enabled, toggle: () => setEnabled(v => !v) }}>
      {children}
    </PictogramContext.Provider>
  )
}

export const usePictograms = () => useContext(PictogramContext)
