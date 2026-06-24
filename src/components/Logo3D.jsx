import { useRef, useMemo, Component } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const WEBGL_OK = (() => {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl') || c.getContext('experimental-webgl'))
  } catch { return false }
})()

const PALETTE = [
  new THREE.Color('#9C27B0'),
  new THREE.Color('#3F51B5'),
  new THREE.Color('#2196F3'),
  new THREE.Color('#00BCD4'),
  new THREE.Color('#4CAF50'),
  new THREE.Color('#FF9800'),
  new THREE.Color('#F44336'),
]

function colorAt(u) {
  const t = ((u % 1) + 1) % 1
  const x = t * (PALETTE.length - 1)
  const i = Math.floor(x)
  return PALETTE[i].clone().lerp(PALETTE[Math.min(i + 1, PALETTE.length - 1)], x - i)
}

class LemniscateCurve extends THREE.Curve {
  getPoint(t) {
    const a = t * Math.PI * 2
    const d = 1 + Math.sin(a) ** 2
    return new THREE.Vector3(
      (2.1 * Math.cos(a)) / d,
      (2.1 * Math.sin(a) * Math.cos(a)) / d,
      0.38 * Math.sin(a * 2)   // slight 3-D twist so it reads as a real tube
    )
  }
}

function buildTube(tubularSegs, radius, radialSegs) {
  const geo = new THREE.TubeGeometry(new LemniscateCurve(), tubularSegs, radius, radialSegs, true)
  const uv    = geo.attributes.uv.array
  const count = geo.attributes.position.count
  const cols  = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const c = colorAt(uv[i * 2])
    cols[i * 3] = c.r; cols[i * 3 + 1] = c.g; cols[i * 3 + 2] = c.b
  }
  geo.setAttribute('color', new THREE.BufferAttribute(cols, 3))
  return geo
}

function InfinityLoop({ paused }) {
  const group = useRef()
  const main  = useMemo(() => buildTube(300, 0.13, 12), [])
  const glow  = useMemo(() => buildTube(150, 0.36, 8),  [])

  useFrame(({ clock }) => {
    if (!group.current || paused) return
    const t = clock.elapsedTime
    group.current.rotation.y = t * 0.38
    group.current.rotation.x = Math.sin(t * 0.22) * 0.18
  })

  return (
    <group ref={group}>
      <mesh geometry={glow}>
        <meshBasicMaterial vertexColors transparent opacity={0.16}
          blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh geometry={main}>
        <meshBasicMaterial vertexColors
          blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

class SafeBoundary extends Component {
  constructor(p) { super(p); this.state = { err: false } }
  static getDerivedStateFromError() { return { err: true } }
  render() { return this.state.err ? null : this.props.children }
}

function LogoFallback({ style }) {
  return (
    <div
      role="img"
      aria-label="Refugio Sensorial — símbolo del infinito"
      style={style}
      className="flex items-center justify-center"
    >
      <svg viewBox="0 0 120 60" width="100%" height="100%" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="lgfallback" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3A82CA" />
            <stop offset="50%" stopColor="#816AB7" />
            <stop offset="100%" stopColor="#48B0A1" />
          </linearGradient>
        </defs>
        <path
          d="M60 30 C60 18 48 10 36 10 C24 10 12 18 12 30 C12 42 24 50 36 50 C48 50 60 42 60 30 C60 18 72 10 84 10 C96 10 108 18 108 30 C108 42 96 50 84 50 C72 50 60 42 60 30 Z"
          fill="none"
          stroke="url(#lgfallback)"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

export default function Logo3D({ paused = false, style }) {
  if (!WEBGL_OK) return <LogoFallback style={style} />

  return (
    <SafeBoundary>
      <Canvas
        style={style}
        camera={{ position: [0, 0, 4.4], fov: 46 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power', failIfMajorPerformanceCaveat: false }}
        dpr={[1, 1.5]}
      >
        <InfinityLoop paused={paused} />
      </Canvas>
    </SafeBoundary>
  )
}
