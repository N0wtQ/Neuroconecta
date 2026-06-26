import { useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

const INITIAL = { nombre: '', email: '', pais: '', mensaje: '' }

function Field({ id, label, required, error, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-sm font-medium text-muted"
      >
        {label}
        {required && <span className="ml-1 text-coral" aria-hidden="true">*</span>}
        {required && <span className="sr-only"> (obligatorio)</span>}
      </label>
      {children}
      {/* Error sits right below the field it belongs to — calm, descriptive */}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-warm flex items-center gap-1.5">
          <i className="fa-solid fa-circle-exclamation" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}

const inputClass =
  'w-full px-4 py-3 rounded-xl bg-surfaceH border border-border text-text text-sm placeholder:text-faint outline-none focus:border-pri/50 focus:ring-1 focus:ring-pri/30 transition-colors duration-200'

export default function ContactForm() {
  const prefersReduced = useReducedMotion()
  const [values, setValues] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const validate = () => {
    const e = {}
    if (!values.nombre.trim()) e.nombre = 'Por favor, escribe tu nombre.'
    if (!values.email.trim()) e.email = 'Por favor, escribe tu dirección de correo electrónico.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      e.email = 'El correo electrónico no tiene un formato válido (ejemplo: tu@correo.com).'
    if (!values.pais.trim()) e.pais = 'Por favor, indica tu país.'
    if (!values.mensaje.trim()) e.mensaje = 'Por favor, escribe tu mensaje.'
    else if (values.mensaje.trim().length < 10)
      e.mensaje = 'El mensaje debe tener al menos 10 caracteres.'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    // Clear error for this field on edit
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      // Move focus to first invalid field
      const firstId = Object.keys(errs)[0]
      document.getElementById(firstId)?.focus()
      return
    }
    setStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/mwvzvdbd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-12" role="status" aria-live="polite">
        <div className="w-14 h-14 rounded-full bg-acc/10 flex items-center justify-center mx-auto mb-4">
          <i className="fa-solid fa-check text-acc text-xl" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold text-text mb-2">Mensaje enviado</h3>
        <p className="text-sm text-muted">Gracias por escribir. Leo todos los mensajes y respondo en cuanto puedo.</p>
      </div>
    )
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      noValidate
      initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: prefersReduced ? 0 : 0.45 }}
      className="flex flex-col gap-5"
      aria-label="Formulario de contacto"
    >
      <Field id="nombre" label="Nombre" required error={errors.nombre}>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={values.nombre}
          onChange={handleChange}
          placeholder="Tu nombre"
          autoComplete="name"
          className={inputClass}
          aria-describedby={errors.nombre ? 'nombre-error' : undefined}
          aria-invalid={!!errors.nombre}
        />
      </Field>

      <Field id="email" label="Correo electrónico" required error={errors.email}>
        <input
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="tu@correo.com"
          autoComplete="email"
          className={inputClass}
          aria-describedby={errors.email ? 'email-error' : undefined}
          aria-invalid={!!errors.email}
        />
      </Field>

      <Field id="pais" label="País" required error={errors.pais}>
        <input
          type="text"
          id="pais"
          name="pais"
          value={values.pais}
          onChange={handleChange}
          placeholder="España"
          autoComplete="country-name"
          className={inputClass}
          aria-describedby={errors.pais ? 'pais-error' : undefined}
          aria-invalid={!!errors.pais}
        />
      </Field>

      <Field id="mensaje" label="Mensaje" required error={errors.mensaje}>
        <textarea
          id="mensaje"
          name="mensaje"
          value={values.mensaje}
          onChange={handleChange}
          rows={5}
          placeholder="Escribe tu mensaje aquí..."
          className={`${inputClass} resize-y min-h-[120px]`}
          aria-describedby={errors.mensaje ? 'mensaje-error' : undefined}
          aria-invalid={!!errors.mensaje}
        />
      </Field>

      {status === 'error' && (
        <p role="alert" className="text-sm text-warm bg-warm/8 border border-warm/20 rounded-xl px-4 py-3">
          <i className="fa-solid fa-triangle-exclamation mr-2" aria-hidden="true" />
          Hubo un problema al enviar. Por favor, inténtalo de nuevo o escríbeme directamente por{' '}
          <a
            href="https://www.instagram.com/refugio.sensorial.oficial"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-warm/75 transition-colors"
          >
            Instagram
          </a>.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        aria-busy={status === 'sending'}
        aria-label={status === 'sending' ? 'Enviando mensaje, por favor espera' : 'Enviar mensaje'}
        className="self-start px-7 py-3.5 rounded-xl bg-pri text-white text-sm font-semibold tracking-wide hover:bg-pri/85 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed min-w-[160px]"
      >
        {status === 'sending' ? (
          <span className="inline-flex items-center gap-2">
            <i className="fa-solid fa-spinner fa-spin" aria-hidden="true" />
            Enviando...
          </span>
        ) : (
          'Enviar mensaje'
        )}
      </button>
    </motion.form>
  )
}
