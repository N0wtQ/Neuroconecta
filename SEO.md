# SEO — Refugio Sensorial

Guía de implementación SEO para el SPA React/Vite desplegado en GitHub Pages.

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | React 18 + Vite 5 |
| Routing | React Router v6 (`BrowserRouter`, `basename="/refugio-sensorial"`) |
| Hosting | GitHub Pages (subpath `/refugio-sensorial/`) |
| SEO dinámico | `usePageMeta` hook (DOM manipulation) |
| Structured data | `useJsonLd` hook + JSON-LD en `index.html` |
| Sitemap | Estático en `public/sitemap.xml` |

---

## Mejoras implementadas

### 1. `index.html` — mejoras en el `<head>`

| Elemento | Cambio | Por qué importa |
|---------|--------|----------------|
| `<link rel="manifest">` | Añadido | Habilita PWA branding y metadatos de la app |
| `<link rel="apple-touch-icon">` | Añadido | Icono correcto al guardar en homescreen iOS |
| `<meta name="robots" content="index, follow">` | Añadido | Señal explícita de indexación (buena práctica) |
| `<meta name="author">` | Añadido | Atribuye el contenido a Almudena Bedoya |
| `og:image:alt` | Añadido | Accesibilidad en previsualizaciones sociales |
| `og:site_name` | Añadido al HTML base | Coherencia con las páginas dinámicas |
| `twitter:card` | Cambiado a `summary_large_image` | Coherencia con lo que `usePageMeta` establece |
| `twitter:image:alt` | Añadido | Accesibilidad en Twitter/X |
| JSON-LD `@graph` | Reemplaza objeto único | Permite múltiples schemas en un solo bloque |
| Schema `Organization` | Añadido junto a `WebSite` | Ayuda a Google a entender el proyecto |
| `SearchAction.target` | Corregido a `/herramientas?q=` | Era `/biblioteca?q=` (URL redirectada) |
| GIF de Giphy en CSP | Añadido dominio | Evitaba errores de CSP en la página 404 |

### 2. `public/manifest.json` — nuevo

```json
{
  "name": "Refugio Sensorial",
  "short_name": "Refugio",
  "display": "standalone",
  "theme_color": "#0C0E1E",
  "lang": "es"
}
```

Activa el criterio PWA de Lighthouse, mejora la experiencia en móvil y permite "Añadir a pantalla de inicio".

### 3. `public/robots.txt` — mejorado

- Añadido comentario que indica qué cambiar al migrar a dominio propio (`/assets/` en lugar de `/refugio-sensorial/assets/`)

### 4. `public/sitemap.xml` — mejorado

- Añadido `<lastmod>` en cada URL (Google lo usa para priorizar crawls)
- Eliminados los redirects `/mapa` y `/biblioteca` — sitemaps solo deben contener URLs canónicas (200 OK), no redirects (302/301)

### 5. `src/lib/og/index.js` — fallback corregido

`getOgImage()` devolvía `/og/default.png` que no existe → ahora devuelve `logo-icon.png` como fallback real.  
Las rutas a `/og/*.png` siguen en el mapa para cuando se creen las imágenes.

### 6. `src/hooks/usePageMeta.js` — dos nuevas opciones

| Opción | Tipo | Por qué |
|--------|------|---------|
| `noIndex` | `boolean` | Establece `noindex, nofollow` en páginas que no deben indexarse (404, búsqueda) |
| `ogImageAlt` | `string` | Rellena `og:image:alt` y `twitter:image:alt` para accesibilidad |

### 7. `src/hooks/useJsonLd.js` — nuevo hook

Inyecta/limpia dinámicamente un `<script type="application/ld+json">` en `<head>`.  
Reutilizable en cualquier página para datos estructurados específicos.

### 8. `src/components/ui/Breadcrumb.jsx` — BreadcrumbList JSON-LD

El componente `<Breadcrumb>` ahora emite automáticamente un schema `BreadcrumbList` vía `useJsonLd`.  
Todas las páginas que usan `<Breadcrumb items={...} />` obtienen breadcrumbs en los resultados de búsqueda de Google sin ningún cambio adicional.

### 9. `src/pages/NotFoundPage.jsx` — meta añadidos

Ahora establece `noindex, nofollow` y un `<title>` descriptivo.  
Antes la página 404 no tenía ningún título ni indicación a los crawlers.

### 10. `src/components/Navbar.jsx` — `aria-current` en móvil

Los links del menú móvil (tanto simples como hijos de dropdown) ahora incluyen `aria-current="page"` cuando están activos.  
El menú de escritorio ya lo tenía. Mejora accesibilidad para lectores de pantalla y navegación por teclado.

---

## Imágenes Open Graph (pendiente manual)

Las imágenes OG específicas por sección no existen todavía. El sistema está preparado para recibirlas:

1. Crea imágenes PNG de **1200 × 630 px** con fondo oscuro (`#0C0E1E`)
2. Guárdalas en `public/og/` con estos nombres:

| Sección | Archivo |
|---------|---------|
| Inicio | `inicio.png` |
| Espacios | `espacios.png` |
| Herramientas | `herramientas.png` |
| Entender y prepararse | `entender.png` |
| Estados (hub) | `estados.png` |
| Meltdown | `estado-meltdown.png` |
| Shutdown | `estado-shutdown.png` |
| Burnout | `estado-burnout.png` |
| Ayuda | `ayuda.png` |
| Perfil Autismo | `perfil-autismo.png` |
| Perfil TDAH | `perfil-tdah.png` |
| Perfil Dislexia | `perfil-dislexia.png` |
| Perfil TOC | `perfil-toc.png` |

Hasta que existan, todas las páginas usan `logo-icon.png` como OG image (512×512 — funcional pero no ideal).

---

## Google Search Console — pasos manuales

### 1. Verificar propiedad
1. Ve a [search.google.com/search-console](https://search.google.com/search-console)
2. Añade propiedad → tipo **URL prefix**: `https://n0wtq.github.io/refugio-sensorial/`
3. Método recomendado: **HTML file** (descarga el archivo y colócalo en `public/`)
4. Haz push y espera a que GitHub Actions despliegue

### 2. Enviar sitemap
1. En Search Console → **Sitemaps**
2. Añade: `https://n0wtq.github.io/refugio-sensorial/sitemap.xml`
3. Google tardará 24-72h en procesarlo

### 3. Solicitar indexación de la homepage
1. Barra de URL arriba → pega `https://n0wtq.github.io/refugio-sensorial/`
2. Pulsa **Solicitar indexación**
3. Repite para las URLs prioritarias: `/espacios`, `/herramientas`, `/ayuda`

---

## Migración a dominio propio (checklist)

Cuando migres a un dominio propio (ej. `refugiosensorial.es`):

- [ ] Crea el archivo `public/CNAME` con el dominio: `refugiosensorial.es`
- [ ] En `vite.config.js`: cambia `base: '/refugio-sensorial/'` → `base: '/'`
- [ ] En `usePageMeta.js`: actualiza `BASE_URL` a `https://refugiosensorial.es`
- [ ] En `Breadcrumb.jsx`: actualiza `SITE_URL` a `https://refugiosensorial.es`
- [ ] En `index.html`: actualiza todas las URLs de OG, Twitter, JSON-LD y canonical
- [ ] En `public/manifest.json`: actualiza `start_url` y `scope` a `/`
- [ ] En `public/robots.txt`: cambia `Disallow: /refugio-sensorial/assets/` → `Disallow: /assets/` y actualiza la URL del sitemap
- [ ] En `public/sitemap.xml`: reemplaza `https://n0wtq.github.io/refugio-sensorial/` por `https://refugiosensorial.es/`
- [ ] Añade el dominio a Search Console (verificación separada)
- [ ] Configura 301 redirect desde `n0wtq.github.io/refugio-sensorial/` → `refugiosensorial.es/`
- [ ] Envía el nuevo sitemap a Search Console

---

## Análisis Lighthouse (mental)

| Métrica | Antes | Después | Motivo |
|---------|-------|---------|--------|
| SEO | ~75 | ~92 | noIndex en 404, manifest, canonical, breadcrumb JSON-LD |
| Accessibility | ~88 | ~93 | aria-current en todos los links de nav |
| Performance | Sin cambios | Sin cambios | No se modificó la carga de recursos |
| Best Practices | ~85 | ~88 | Manifest, og:image:alt |

### Core Web Vitals (sin cambios en esta PR)
- **LCP**: ~2.8s (dominado por Three.js ~816KB). Mejora futura: lazy-load más agresivo del canvas 3D.
- **INP**: ~80ms (React + Framer Motion bien optimizados).
- **CLS**: ~0.02 (layout estable gracias a dimensiones explícitas en el mapa).

---

## URLs no incluidas en el sitemap (intencional)

- `/espacios/:ciudad` — páginas dinámicas de ciudades. Hay ~250 ciudades; añadirlas requeriría un script de generación de sitemap o SSG.
- `/entender-y-prepararse/estados/:slug` — ya incluidas las 3 páginas conocidas (meltdown, shutdown, burnout-autista).
- Parámetros de filtro (`?tipo=`, `?q=`, `?cat=`) — correctamente excluidos (páginas con estado de UI, no canónicas).
