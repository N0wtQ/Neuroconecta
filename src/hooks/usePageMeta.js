import { useEffect } from 'react'

export function usePageMeta({ title, description }) {
  useEffect(() => {
    const prev = document.title
    document.title = title

    const metaDesc = document.querySelector('meta[name="description"]')
    const prevDesc = metaDesc?.getAttribute('content') ?? ''
    metaDesc?.setAttribute('content', description)

    return () => {
      document.title = prev
      metaDesc?.setAttribute('content', prevDesc)
    }
  }, [title, description])
}
