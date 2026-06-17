// Añade tus PDFs aquí. Sube los archivos a public/docs/ y rellena este array.
// BASE_URL se añade automáticamente — solo pon el nombre del archivo en 'archivo'.
// Para PDFs externos (Google Drive, etc.) usa 'url' en lugar de 'archivo'.

export const RECURSOS_PDF = [
  {
    id: 1,
    titulo: 'Guía 1: Estrategias proactivas de regulación emocional',
    descripcion: 'Guía práctica de Autismo Madrid sobre conducta desafiante, causas subyacentes y plan de intervención para la regulación emocional en TEA. 70 páginas.',
    archivo: 'estrategias-regulacion-emocional-autismo-madrid.pdf',
    categoria: 'Regulación',
    color: '#48B0A1',
  },
  {
    id: 2,
    titulo: 'Guía 2: Orientaciones para una convivencia inclusiva con estudiantes autistas',
    descripcion: 'Universidad Autónoma de Chile · PsiConecta. Enfoque interdisciplinario con casos prácticos: orientaciones para la comunidad universitaria sobre el "¿Qué hago?" en situaciones académicas y de convivencia.',
    url: 'https://drive.google.com/file/d/1MMJApw5XKwsnYeXk32M84JxKBsWD1bQZ/view?usp=drive_link',
    categoria: 'Educación',
    color: '#3A82CA',
  },
]
