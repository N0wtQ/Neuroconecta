import { BrowserRouter, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom'
import { useEffect, Component, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import CrisisBar from './components/CrisisBar'

const CanvasBg = lazy(() =>
  import('./components/CanvasBg').catch(() => ({ default: () => null }))
)
import Home from './pages/Home'
import MapPage from './pages/MapPage'
import LibraryPage from './pages/LibraryPage'
import AyudaPage from './pages/AyudaPage'
import RecursosPage from './pages/RecursosPage'
import SenalesPage from './pages/SenalesPage'
import AccesibilidadPage from './pages/AccesibilidadPage'
import NotFoundPage from './pages/NotFoundPage'
import EntenderPrepararsePage from './pages/EntenderPrepararsePage'
import EstadosPage from './pages/EstadosPage'
import TecnicasPage from './pages/TecnicasPage'
import KitBolsoPage from './pages/KitBolsoPage'
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

// Routes
function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Main routes */}
        <Route path="/"           element={<PageTransition><Home /></PageTransition>} />
        <Route path="/espacios"   element={<PageTransition><MapPage /></PageTransition>} />
        <Route path="/herramientas" element={<PageTransition><LibraryPage /></PageTransition>} />
        <Route path="/ayuda"      element={<PageTransition><AyudaPage /></PageTransition>} />
        <Route path="/accesibilidad" element={<PageTransition><AccesibilidadPage /></PageTransition>} />

        {/* Entender y prepararse hub + sub-pages */}
        <Route path="/entender-y-prepararse"              element={<PageTransition><EntenderPrepararsePage /></PageTransition>} />
        <Route path="/entender-y-prepararse/estados"      element={<PageTransition><EstadosPage /></PageTransition>} />
        <Route path="/entender-y-prepararse/senales"      element={<PageTransition><SenalesPage /></PageTransition>} />
        <Route path="/entender-y-prepararse/tecnicas"     element={<PageTransition><TecnicasPage /></PageTransition>} />
        <Route path="/entender-y-prepararse/kit-de-bolso" element={<PageTransition><KitBolsoPage /></PageTransition>} />
        <Route path="/entender-y-prepararse/guias"        element={<PageTransition><RecursosPage /></PageTransition>} />

        {/* Redirects from old URLs */}
        <Route path="/mapa"         element={<Navigate to="/espacios" replace />} />
        <Route path="/biblioteca"   element={<Navigate to="/herramientas" replace />} />
        <Route path="/kit"          element={<Navigate to="/entender-y-prepararse" replace />} />
        <Route path="/kit/senales"  element={<Navigate to="/entender-y-prepararse/senales" replace />} />
        <Route path="/kit/recursos" element={<Navigate to="/entender-y-prepararse/guias" replace />} />

        <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter basename="/refugio-sensorial">
      <CanvasSilentBoundary>
        <Suspense fallback={null}>
          <CanvasBg />
        </Suspense>
      </CanvasSilentBoundary>
      <div className="relative z-10 min-h-dvh flex flex-col">
        {/* Skip-to-content — WCAG 2.4.1 Level A */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#0C0E1E] focus:text-text focus:border-2 focus:border-pri focus:rounded-lg focus:text-sm focus:font-semibold focus:shadow-xl"
        >
          Saltar al contenido principal
        </a>
        <AppErrorBoundary>
          <Navbar />
          <main id="main-content" className="flex-1 pb-16 md:pb-0" tabIndex="-1">
            <AppErrorBoundary>
              <AppRoutes />
            </AppErrorBoundary>
          </main>
          <Footer />
          <CrisisBar />
        </AppErrorBoundary>
      </div>
    </BrowserRouter>
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
            aria-label="Autismo España (se abre en nueva pestaña)"
            className="hover:text-text transition-colors duration-200"
          >
            Autismo España
          </a>
          <span aria-hidden="true">·</span>
          <Link
            to="/accesibilidad"
            className="hover:text-text transition-colors duration-200"
          >
            Accesibilidad
          </Link>
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
