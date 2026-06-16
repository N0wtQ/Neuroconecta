import { HashRouter, Routes, Route, useLocation, Link } from 'react-router-dom'
import { useEffect, Component, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'

const CanvasBg = lazy(() =>
  import('./components/CanvasBg').catch(() => ({ default: () => null }))
)
import Home from './pages/Home'
import MapPage from './pages/MapPage'
import LibraryPage from './pages/LibraryPage'
import AyudaPage from './pages/AyudaPage'
import { useReducedMotion } from './hooks/useReducedMotion'
// Global error boundary — catches any React crash and shows a calm fallback
class AppErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { error: null } }
  static getDerivedStateFromError(error) { return { error } }
  render() {
    if (this.state.error) {
      return (
        <div className="min-h-dvh flex items-center justify-center p-8 text-center">
          <div>
            <p className="text-muted text-sm mb-4">Algo salió mal al cargar esta página.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 rounded-xl bg-pri/10 text-pri text-sm font-semibold border border-pri/25"
            >
              Recargar página
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

// Silent error boundary for CanvasBg — on any crash just disappears, app keeps running
class CanvasSilentBoundary extends Component {
  constructor(props) { super(props); this.state = { failed: false } }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    if (this.state.failed) return null
    return this.props.children
  }
}

// Fade-in wrapper — instant when prefers-reduced-motion
function PageTransition({ children }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: prefersReduced ? 0 : 0.25, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

// Routes — no AnimatePresence wrapping Routes (can conflict with HashRouter)
function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/"          element={<PageTransition><Home /></PageTransition>} />
        <Route path="/mapa"      element={<PageTransition><MapPage /></PageTransition>} />
        <Route path="/biblioteca" element={<PageTransition><LibraryPage /></PageTransition>} />
        <Route path="/ayuda"     element={<PageTransition><AyudaPage /></PageTransition>} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <HashRouter>
      <CanvasSilentBoundary>
        <Suspense fallback={null}>
          <CanvasBg />
        </Suspense>
      </CanvasSilentBoundary>
      <div className="relative z-10 min-h-dvh flex flex-col">
        <AppErrorBoundary>
          <Navbar />
          <main className="flex-1">
            <AppErrorBoundary>
              <AppRoutes />
            </AppErrorBoundary>
          </main>
          <Footer />
        </AppErrorBoundary>
      </div>
    </HashRouter>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-faint">
        <p>Refugio Sensorial · Hecho con cuidado para personas neurodivergentes</p>
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
