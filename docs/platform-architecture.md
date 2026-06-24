# Refugio Sensorial — Platform Architecture

## Stack

- **Framework**: React 18 + Vite 5 (SPA)
- **Routing**: React Router v6, `BrowserRouter` with `basename="/refugio-sensorial"`
- **Styling**: Tailwind CSS with custom design tokens
- **Animation**: Framer Motion with `useReducedMotion` throughout
- **Search**: Fuse.js 7 (fuzzy, singleton pattern)
- **Host**: GitHub Pages at `n0wtq.github.io/refugio-sensorial`

## Design Tokens

| Token    | Value     | Usage                         |
|----------|-----------|-------------------------------|
| `pri`    | `#3A82CA` | Primary blue — links, CTAs    |
| `sec`    | `#816AB7` | Secondary purple — tools      |
| `acc`    | `#48B0A1` | Accent teal — techniques      |
| `coral`  | `#E57B86` | Crisis / meltdown states      |
| `bg`     | `#0C0E1E` | Page background               |
| `surface`| `#13152B` | Card / panel background       |
| `text`   | `#E5E7EB` | Primary text                  |
| `muted`  | `#9CA3AF` | Secondary text                |
| `faint`  | `#6B7280`  | Tertiary / disabled           |

## Directory Structure

```
src/
├── components/
│   ├── search/
│   │   └── GlobalSearch.jsx     # Full-screen fuzzy search dialog
│   └── ui/
│       ├── Breadcrumb.jsx       # Shared breadcrumb (items: [{href, label}])
│       ├── FavoriteButton.jsx   # Accessible heart toggle, localStorage
│       └── RelatedContent.jsx  # "También te puede interesar" grid
├── data/
│   ├── herramientas.js          # ~80 tools: nombre, categoria, perfiles, ...
│   ├── lugares.js               # 250 silent spaces with lat/lng
│   └── recursos-pdf.js          # Guides and PDF resources
├── hooks/
│   ├── useFavorites.js          # localStorage favorites store
│   ├── usePageMeta.js           # title, canonical, OG, Twitter Cards
│   └── useReducedMotion.js      # prefers-reduced-motion media query
├── lib/
│   ├── analytics/
│   │   ├── index.js             # Adapter pattern, EVENTS constants
│   │   └── adapters/
│   │       └── console.js       # DEV console + Plausible stub
│   ├── content-graph/
│   │   └── index.js             # Static relation layer, profile/category configs
│   ├── og/
│   │   └── index.js             # OG image path resolver
│   └── search/
│       └── index.js             # Fuse.js engine (singleton, lazy build)
├── pages/
│   ├── EntenderEstadoPage.jsx   # /entender-y-prepararse/estados/:slug
│   ├── espacios/
│   │   └── CiudadPage.jsx       # /espacios/:ciudad
│   └── herramientas/
│       └── LandingPage.jsx      # /herramientas/:slug + /herramientas/categoria/:slug
└── types/
    └── index.js                 # JSDoc type definitions for all content
```

## Routes

| Path | Component | Notes |
|------|-----------|-------|
| `/` | `Home` | |
| `/espacios` | `MapPage` | Leaflet map |
| `/espacios/:ciudad` | `CiudadPage` | Dynamic city landing |
| `/herramientas` | `LibraryPage` | Full tools list with filters |
| `/herramientas/:slug` | `HerramientasLandingPage` | Profile landing (autismo, tdah, …) |
| `/herramientas/categoria/:slug` | `HerramientasLandingPage` | Category landing |
| `/ayuda` | `AyudaPage` | Crisis resources |
| `/entender-y-prepararse` | `EntenderPrepararsePage` | Hub |
| `/entender-y-prepararse/estados` | `EstadosPage` | All three states |
| `/entender-y-prepararse/estados/:slug` | `EntenderEstadoPage` | Individual state |
| `/entender-y-prepararse/senales` | `SenalesPage` | Warning signals |
| `/entender-y-prepararse/tecnicas` | `TecnicasPage` | Regulation techniques |
| `/entender-y-prepararse/kit-de-bolso` | `KitBolsoPage` | Portable kit |
| `/entender-y-prepararse/guias` | `RecursosPage` | PDFs and guides |

Old URLs redirect via `<Navigate replace>`.

## Content Graph

`src/lib/content-graph/index.js` maps:

- `PERFILES_CONFIG[]` — profile slugs → filter keys, SEO, icons
- `CATEGORIAS_CONFIG[]` — category slugs → data categories/subcategories, SEO
- `ESTADO_RELATIONS` — each estado → relevant técnicas, recursos, herramientas
- `getRelatedForEstado(estadoId, limit)` → `RelatedItem[]` for the component
- `getToolsByProfile(profileSlug)` / `getToolsByCategory(categorySlug)` → `Herramienta[]`
- `getRelatedSpaces(ciudadSlug)` → `Espacio[]`
- `getCiudadesMap()` → `Map<slug, displayName>`

## Search

`src/lib/search/index.js` builds a Fuse.js singleton on first call:

- **Threshold**: 0.35 — generous fuzzy matching ("meltdon" finds "meltdown")
- **ignoreLocation**: true — searches entire string, not just start
- **Keys**: `titulo` (0.6), `desc` (0.25), `tags` (0.15)
- **Types indexed**: espacio, herramienta, estado, tecnica, recurso

`GlobalSearch` dialog (triggered by Ctrl/Cmd+K or Navbar button):
- ARIA `role="combobox"` + `role="listbox"` pattern
- Keyboard: ↑↓ navigate, ↵ navigate to result, Esc close
- Type filter chips for all 5 content types
- Tracks analytics on every search

## SEO

### Per-page meta

`usePageMeta({ title, description, canonical?, ogImage?, section? })` sets:
- `document.title`
- `meta[name="description"]`
- `link[rel="canonical"]` → `https://n0wtq.github.io/refugio-sensorial{pathname}`
- Open Graph: `og:title`, `og:description`, `og:type`, `og:url`, `og:image`, `og:locale`, `og:site_name`
- Twitter Cards: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`

All meta is restored to previous values on unmount.

### OG Images

Static files at `public/og/`:

- `default.png` — fallback for all pages
- `estados.png` — crisis states section
- `herramientas.png` — tools section
- `espacios.png` — spaces section
- `guias.png` — guides section

`getOgImage(section?)` returns the correct `/refugio-sensorial/og/<file>.png` path.

### Sitemap

`public/sitemap.xml` covers all static routes + dynamic profile/category/estado pages.
`public/robots.txt` allows all crawlers and points to the sitemap.

## Analytics

Adapter pattern in `src/lib/analytics/index.js`:

```js
import { setAdapter } from './lib/analytics/index'
import { consoleAdapter } from './lib/analytics/adapters/console'

// In main.jsx or App.jsx bootstrap:
if (import.meta.env.DEV) setAdapter(consoleAdapter)
```

Replace `consoleAdapter` with `plausibleAdapter` or any custom adapter for production.

## Favorites

`useFavorites()` hook: `{ favorites, add, remove, has, clear, count }`

- Storage key: `refugio:favorites`
- Persists to localStorage via `useEffect`
- `FavoriteButton` component: accessible `aria-pressed` toggle

## Performance

- Route-based code splitting via `lazy()` + `<Suspense>` for heavy pages
- `GlobalSearch`, `CiudadPage`, `HerramientasLandingPage`, `EntenderEstadoPage` are all lazy-loaded
- `CanvasBg` (Three.js) is lazy-loaded behind a silent error boundary
- Fuse.js index built lazily on first search, then cached as singleton
- `useReducedMotion()` disables all animations when `prefers-reduced-motion: reduce`

## Accessibility

- WCAG 2.2 AA target throughout
- Skip-to-content link (WCAG 2.4.1)
- All interactive elements have `focus-visible` ring styles
- Icons always have `aria-hidden="true"` + adjacent text or `aria-label`
- Search uses full ARIA combobox pattern
- `CrisisBar` is `fixed bottom-0 md:hidden` — visible on mobile only
- All page transitions respect `prefers-reduced-motion`

## Adding Content

### New herramienta profile
Add to `PERFILES_CONFIG` in `src/lib/content-graph/index.js` with `filterKey` matching a value in `herramientas.perfiles`.

### New herramienta category
Add to `CATEGORIAS_CONFIG` with `cats` matching `herramienta.categoria` values.

### New city page
Cities are auto-discovered from `LUGARES` data — no config needed. Add spaces to `src/data/lugares.js`.

### New estado
ESTADOS live in `src/components/KitSensorial.jsx`. Add state to `ESTADOS`, update `ESTADO_RELATIONS` in the content graph, add `EVITAR` and `DURACION` entries in `EntenderEstadoPage.jsx`, and add the slug mapping in `SLUG_TO_ESTADO_ID`.
