# Refugio Sensorial

**Plataforma web gratuita y de código abierto para personas neurodivergentes.**

🔗 **https://n0wtq.github.io/refugio-sensorial/**

---

## ¿Qué es?

Refugio Sensorial conecta a personas con TEA, TDAH, PAS, TOC, dislexia y otras formas de neurodivergencia con recursos útiles para el día a día:

- **Mapa de espacios accesibles** — supermercados con hora silenciosa, aeropuertos con distintivo Sunflower, bibliotecas, espacios naturales, hoteles y restaurantes autism-friendly en España
- **Biblioteca de herramientas** — más de 100 apps y recursos digitales clasificados por categoría, perfil neurodivergente y precio
- **Sonidos ambientales** — lluvia, mar, tormenta y chimenea para la concentración y calma, sin anuncios
- **Apoyo en crisis** — guía paso a paso, respiración guiada 4-4-4, técnica grounding 5-4-3-2-1 y checklist de regulación

---

## Páginas

| Ruta | Descripción |
|------|-------------|
| `/` | Inicio con logo 3D, estadísticas y acceso rápido |
| `/mapa` | Mapa interactivo con +100 espacios verificados |
| `/biblioteca` | Catálogo de herramientas con filtros |
| `/ayuda` | Apoyo inmediato para momentos de sobrecarga |

---

## Tecnología

- **React 18** + **Vite 5** — SPA desplegada en GitHub Pages
- **Tailwind CSS** — sistema de diseño oscuro, accesible, alto contraste
- **Three.js** + **@react-three/fiber** — logo 3D animado (lemniscata)
- **Leaflet** + **react-leaflet** — mapa interactivo con tiles oscuros de CARTO
- **Framer Motion** + **GSAP** — animaciones con respeto a `prefers-reduced-motion`
- **Web Audio API** — player de sonidos ambientales con archivos MP3 locales

---

## Estructura

```
src/
├── components/
│   ├── Hero.jsx          # Sección principal con logo 3D
│   ├── Logo3D.jsx        # Lemniscata 3D rainbow con Three.js
│   ├── Navbar.jsx        # Navegación sticky
│   ├── ResourceCards.jsx # Tarjetas de acceso rápido
│   ├── ResourceLibrary.jsx # Catálogo con filtros
│   ├── SilentMap.jsx     # Mapa interactivo
│   ├── SoundPlayer.jsx   # Player de sonidos ambientales
│   └── ContactForm.jsx   # Formulario de contacto
├── pages/
│   ├── Home.jsx
│   ├── MapPage.jsx
│   ├── LibraryPage.jsx
│   └── AyudaPage.jsx
├── data/
│   ├── herramientas.js   # +100 herramientas digitales
│   └── lugares.js        # +100 espacios en España
└── hooks/
    └── useReducedMotion.js

public/
├── sounds/               # MP3 de sonidos ambientales
│   ├── rain.mp3
│   ├── waves.mp3
│   ├── thunderstorm.mp3
│   └── fireplace.mp3
├── logo.svg
├── logo-icon.svg
└── favicon.svg
```

---

## Desarrollo local

```bash
npm install
npm run dev
```

```bash
npm run build   # genera dist/
npm run preview # previsualiza el build
```

El despliegue a GitHub Pages es automático al fusionar a `main` mediante GitHub Actions.

---

## Accesibilidad

- Respeta `prefers-reduced-motion` — todas las animaciones se desactivan
- Roles y atributos ARIA en mapa, controles de audio y navegación
- Contraste WCAG AA en todos los textos
- Navegación completa por teclado
