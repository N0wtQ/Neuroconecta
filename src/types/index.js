/**
 * @fileoverview Canonical JSDoc types for all content models in Refugio Sensorial.
 * Use these in JSDoc @type / @param / @returns annotations across the codebase.
 */

// ─── CONTENT TYPE DISCRIMINATOR ───────────────────────────────────────────────

/**
 * @typedef {'espacio'|'herramienta'|'estado'|'senal'|'tecnica'|'recurso'|'organizacion'} ContentType
 */

// ─── SEO META ─────────────────────────────────────────────────────────────────

/**
 * @typedef {Object} SeoMeta
 * @property {string} title         - Document title (max 60 chars)
 * @property {string} description   - Meta description (max 160 chars)
 * @property {string} [canonical]   - Canonical URL
 * @property {string} [ogTitle]     - Open Graph title (defaults to title)
 * @property {string} [ogDesc]      - Open Graph description
 * @property {string} [ogImage]     - Open Graph image URL
 * @property {string} [ogType]      - OG type: 'website' | 'article'
 * @property {string} [twitterCard] - Twitter card type
 * @property {string[]} [keywords]  - SEO keywords
 * @property {string} [schemaType]  - Schema.org @type value
 */

// ─── ACCESSIBILITY ────────────────────────────────────────────────────────────

/**
 * @typedef {Object} A11yProps
 * @property {string}  [ariaLabel]       - Accessible label override
 * @property {string}  [ariaDescribedby] - ID of element that describes this
 * @property {string}  [ariaLive]        - 'polite'|'assertive'|'off'
 * @property {boolean} [ariaHidden]      - Whether to hide from AT
 * @property {string}  [role]            - ARIA role override
 */

// ─── ESPACIO ──────────────────────────────────────────────────────────────────

/**
 * @typedef {Object} Espacio
 * @property {string}  id          - Unique identifier (e.g. 'REAL-001')
 * @property {number}  lat         - Latitude
 * @property {number}  lng         - Longitude
 * @property {string}  nombre      - Display name
 * @property {string}  tipo        - Space type (supermercado, biblioteca, etc.)
 * @property {string}  ciudad      - City name (raw)
 * @property {string}  ciudadSlug  - City slug for routing (e.g. 'madrid')
 * @property {string}  horario     - Opening hours description
 * @property {string}  descripcion - Full description
 * @property {string}  [url]       - External source URL
 * @property {SeoMeta} [seo]       - Page-level SEO meta
 */

// ─── HERRAMIENTA ──────────────────────────────────────────────────────────────

/**
 * @typedef {Object} Herramienta
 * @property {string}   nombre      - Tool name
 * @property {string}   categoria   - Category label
 * @property {string}   perfiles    - Comma-separated ND profiles (TEA, TDAH, DIS…)
 * @property {string}   plataforma  - Comma-separated platforms
 * @property {string}   precio      - 'Gratis' | 'Freemium' | 'Pago'
 * @property {string}   subcategoria- Sub-category label
 * @property {string}   enlace      - External URL
 * @property {string}   notas       - Description / notes
 * @property {string}   tipo        - 'APP' | 'WEB' | 'EXT' | 'HARD' | 'SOFT' | 'COM' | 'TIENDA' | 'JUEGO'
 * @property {string}   valoracion  - 'Excelente' | 'Muy bueno' | 'Bueno'
 */

// ─── ESTADO ───────────────────────────────────────────────────────────────────

/**
 * @typedef {Object} Estado
 * @property {string}   id          - 'meltdown' | 'shutdown' | 'burnout'
 * @property {string}   slug        - URL slug (e.g. 'meltdown', 'burnout-autista')
 * @property {string}   titulo      - Display title
 * @property {string}   subtitulo   - Short subtitle
 * @property {string}   que         - Full explanation
 * @property {string[]} signos      - Warning signs
 * @property {string[]} ayuda       - What helps
 * @property {string[]} [evitar]    - What to avoid
 * @property {string}   tts         - Text-to-speech content
 * @property {string}   infografia  - Filename of infographic PDF
 * @property {string}   color       - Tailwind color token (coral, pri, sec…)
 * @property {string}   icon        - Font Awesome icon class
 * @property {SeoMeta}  [seo]       - Page-level SEO meta
 */

// ─── SENAL ────────────────────────────────────────────────────────────────────

/**
 * @typedef {Object} Senal
 * @property {string}   id       - 'corporales' | 'cognitivas' | 'emocionales' | 'conductuales'
 * @property {string}   titulo   - Display title
 * @property {string}   subtitulo
 * @property {string}   icon     - FA icon class
 * @property {string}   color    - Tailwind color
 * @property {string[]} items    - List of signals
 * @property {string}   tts      - TTS text
 */

// ─── TECNICA ──────────────────────────────────────────────────────────────────

/**
 * @typedef {Object} Tecnica
 * @property {string} id     - Slug-safe identifier
 * @property {string} titulo - Display title
 * @property {string} desc   - Short description
 * @property {string} tts    - TTS text
 * @property {string} icon   - FA icon class
 * @property {string} color  - Tailwind color
 * @property {string} bg     - Tailwind bg class
 */

// ─── RECURSO ──────────────────────────────────────────────────────────────────

/**
 * @typedef {Object} Recurso
 * @property {number}  id          - Numeric ID
 * @property {string}  titulo      - Document title
 * @property {string}  [descripcion] - Extended description
 * @property {string}  [url]       - External URL
 * @property {string}  [archivo]   - Local PDF filename in /public/docs/
 * @property {string}  categoria   - Category label (Crisis, Regulación, Burnout, Educación, Vida adulta)
 * @property {string}  color       - Hex accent color
 * @property {string}  [icono]     - FA icon class
 */

// ─── ORGANIZACION ─────────────────────────────────────────────────────────────

/**
 * @typedef {Object} Organizacion
 * @property {string} nombre   - Organization name
 * @property {string} desc     - Description
 * @property {string} href     - Website URL
 * @property {string} icon     - FA icon class
 * @property {string} color    - Tailwind color token
 */

// ─── CONTENT GRAPH ────────────────────────────────────────────────────────────

/**
 * @typedef {Object} ContentRelation
 * @property {ContentType} fromType  - Source content type
 * @property {string}      fromId    - Source content identifier
 * @property {ContentType} toType    - Target content type
 * @property {string}      toId      - Target content identifier
 * @property {string}      [weight]  - Relation strength 'primary'|'secondary'
 */

/**
 * @typedef {Object} RelatedItem
 * @property {ContentType} type   - Content type
 * @property {string}      id     - Unique identifier within its type
 * @property {string}      titulo - Display title
 * @property {string}      desc   - Short description
 * @property {string}      href   - Internal URL
 * @property {string}      icon   - FA icon class
 * @property {string}      color  - Tailwind color token
 */

// ─── SEARCH ───────────────────────────────────────────────────────────────────

/**
 * @typedef {Object} SearchItem
 * @property {ContentType} type    - Item type for filtering
 * @property {string}      id      - Unique key within type
 * @property {string}      titulo  - Display title (primary searchable field)
 * @property {string}      desc    - Description (secondary searchable field)
 * @property {string}      href    - Internal route
 * @property {string}      icon    - FA icon class
 * @property {string}      color   - Tailwind color token
 * @property {string[]}    [tags]  - Additional searchable keywords
 */

// ─── ANALYTICS ────────────────────────────────────────────────────────────────

/**
 * @typedef {Object} AnalyticsEvent
 * @property {string} name       - Event name (snake_case)
 * @property {Object} [props]    - Event properties
 */

/**
 * @typedef {Object} AnalyticsAdapter
 * @property {function(AnalyticsEvent): void} track - Track an event
 * @property {function(): void}                init  - Initialize the adapter
 */

// ─── FAVORITES ────────────────────────────────────────────────────────────────

/**
 * @typedef {Object} FavoriteItem
 * @property {ContentType} type  - Content type
 * @property {string}      id    - Unique identifier
 * @property {string}      titulo
 * @property {string}      href
 */

/**
 * @typedef {Object} FavoritesStore
 * @property {FavoriteItem[]} items
 * @property {function(FavoriteItem): void} add
 * @property {function(ContentType, string): void} remove
 * @property {function(ContentType, string): boolean} has
 * @property {function(): void} clear
 */

// ─── DYNAMIC LANDING ──────────────────────────────────────────────────────────

/**
 * @typedef {Object} ProfileConfig
 * @property {string}   slug       - URL slug (e.g. 'autismo')
 * @property {string}   label      - Display label (e.g. 'Autismo (TEA)')
 * @property {string}   filterKey  - Value to match in herramientas.perfiles
 * @property {string}   desc       - Page description
 * @property {string}   icon       - FA icon class
 * @property {string}   color      - Tailwind color token
 * @property {SeoMeta}  seo        - Page-level SEO
 */

/**
 * @typedef {Object} CategoryConfig
 * @property {string}   slug       - URL slug (e.g. 'concentracion')
 * @property {string}   label      - Display label
 * @property {string[]} cats       - herramientas.categoria values to include
 * @property {string[]} [subcats]  - herramientas.subcategoria values (optional filter)
 * @property {string}   desc       - Page description
 * @property {string}   icon       - FA icon class
 * @property {string}   color      - Tailwind color token
 * @property {SeoMeta}  seo        - Page-level SEO
 */

/**
 * @typedef {Object} CiudadConfig
 * @property {string}   slug       - Normalized URL slug (e.g. 'madrid')
 * @property {string}   label      - Display name (e.g. 'Madrid')
 * @property {string}   desc       - Page description
 */
