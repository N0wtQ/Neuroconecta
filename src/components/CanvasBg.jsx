import { useRef, useMemo, Component } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useReducedMotion } from '../hooks/useReducedMotion'

const STATIC_BG = {
  background: 'radial-gradient(ellipse at 70% 10%, rgba(129,106,183,0.07) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(72,176,161,0.05) 0%, transparent 55%)',
}

// Pre-check WebGL support before ever creating a Canvas
const WEBGL_OK = (() => {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl') || c.getContext('experimental-webgl'))
  } catch {
    return false
  }
})()

class CanvasErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { failed: false } }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    if (this.state.failed) {
      return <div className="fixed inset-0 -z-10" style={STATIC_BG} aria-hidden="true" />
    }
    return this.props.children
  }
}

function createSoftCircleTexture() {
  try {
    const size = 64
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    if (!ctx) return null
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    gradient.addColorStop(0, 'rgba(255,255,255,0.9)')
    gradient.addColorStop(0.4, 'rgba(255,255,255,0.4)')
    gradient.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)
    return new THREE.CanvasTexture(canvas)
  } catch {
    return null
  }
}

const COUNT = 180

function ParticleField() {
  const ref = useRef()

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const colors    = new Float32Array(COUNT * 3)
    const palette = [
      new THREE.Color('#3A82CA'),
      new THREE.Color('#816AB7'),
      new THREE.Color('#48B0A1'),
      new THREE.Color('#9CC156'),
      new THREE.Color('#FBB027'),
    ]
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 14
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6
      const c = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3]     = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    return { positions, colors }
  }, [])

  const texture = useMemo(() => createSoftCircleTexture(), [])

  useFrame((state) => {
    try {
      if (!ref.current) return
      const t = state.clock.elapsedTime
      ref.current.rotation.y = t * 0.018
      ref.current.rotation.x = Math.sin(t * 0.009) * 0.12
      ref.current.position.y = Math.sin(t * 0.07) * 0.15
    } catch {
      // Silently absorb any animation frame errors
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={COUNT}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        map={texture}
        vertexColors
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function CanvasBg() {
  const prefersReduced = useReducedMotion()

  if (prefersReduced || !WEBGL_OK) {
    return <div className="fixed inset-0 -z-10" style={STATIC_BG} aria-hidden="true" />
  }

  return (
    <CanvasErrorBoundary>
      <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
        <Canvas
          camera={{ position: [0, 0, 7], fov: 55 }}
          gl={{ antialias: false, alpha: true, powerPreference: 'low-power', failIfMajorPerformanceCaveat: false }}
          dpr={Math.max(1, Math.min(window.devicePixelRatio || 1, 1.5))}
          frameloop="always"
        >
          <ParticleField />
        </Canvas>
      </div>
    </CanvasErrorBoundary>
  )
}
