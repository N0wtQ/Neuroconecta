import { HashRouter, Routes, Route, useLocation, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CanvasBg from './components/CanvasBg'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import MapPage from './pages/MapPage'
import LibraryPage from './pages/LibraryPage'
import AyudaPage from './pages/AyudaPage'
import { useReducedMotion } from './hooks/useReducedMotion'

// Page transition wrapper — instant when prefers-reduced-motion
function PageTransition({ children }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={prefersReduced ? {} : { opacity: 0 }}
      transition={{ duration: prefersReduced ? 0 : 0.2 }}
    >
      {children}
    </motion.div>
  )
}

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

function AppRoutes() {
  const { pathname } = useLocation()
  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={{ pathname }} key={pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/mapa" element={<PageTransition><MapPage /></PageTransition>} />
          <Route path="/biblioteca" element={<PageTransition><LibraryPage /></PageTransition>} />
          <Route path="/ayuda" element={<PageTransition><AyudaPage /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default function App() {
  return (
    // HashRouter: URLs como /#/mapa — funciona sin configuración de servidor
    <HashRouter>
      {/* 3D particle background — pointer-events-none, dismounts on reduced-motion */}
      <CanvasBg />

      <div className="relative z-10 min-h-dvh flex flex-col">
        <Navbar />
        <div className="flex-1">
          <AppRoutes />
        </div>
        <Footer />
      </div>
    </HashRouter>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border mt-8">
      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-faint">
        <p>Neuroconecta · Hecho con cuidado para personas neurodivergentes</p>
        <div className="flex items-center gap-4">
          <a
            href="https://autismo.org.es"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text transition-colors duration-200"
          >
            Autismo España
          </a>
          <span aria-hidden="true">·</span>
          <Link
            to="/ayuda"
            className="text-coral hover:text-coral/75 transition-colors duration-200 font-medium"
          >
            Necesito ayuda
          </Link>
        </div>
      </div>
    </footer>
  )
}
