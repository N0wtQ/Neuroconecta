import KitSensorial from '../components/KitSensorial'

export default function KitPage() {
  return (
    <div className="min-h-dvh">
      <div className="max-w-3xl mx-auto px-4 pt-10 pb-4">
        <h1 className="text-2xl font-bold text-text mb-1">Kit Sensorial</h1>
        <p className="text-sm text-muted">
          Entiende lo que te pasa, regúlate y prepara tu kit para salir al mundo.
        </p>
      </div>
      <KitSensorial />
    </div>
  )
}
