import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/refugio-sensorial/',
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          leaflet: ['leaflet', 'react-leaflet'],
          motion: ['framer-motion', 'gsap'],
          router: ['react-router-dom'],
        },
      },
    },
  },
})
