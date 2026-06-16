/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Base surfaces — deep dark, no harsh blacks
        bg:      '#0C0E1E',
        surface: '#13152B',
        surfaceH:'#1A1D38',

        // Semantic accent palette — all muted/organic, no neons
        pri:    '#3A82CA',   // calming blue
        sec:    '#816AB7',   // soft violet
        acc:    '#48B0A1',   // teal green
        green:  '#9CC156',   // moss green
        warm:   '#FBB027',   // warm gold
        coral:  '#E57B86',   // muted coral (crisis / help)

        // Text hierarchy
        text:   '#E5E7EB',
        muted:  '#9CA3AF',
        faint:  '#6B7280',

        // Border
        border: 'rgba(129,106,183,0.1)',
        borderH:'rgba(129,106,183,0.2)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      lineHeight: {
        relaxed: '1.65',
        loose:   '1.85',
      },
      letterSpacing: {
        wide: '0.025em',
      },
      borderRadius: {
        card: '14px',
      },
      transitionDuration: {
        slow: '400ms',
      },
    },
  },
  plugins: [],
}
