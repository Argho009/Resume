import { useEffect } from 'react'

export function usePageTitle(title: string) {
  useEffect(() => {
    const base = 'Arghodeep Chowdhury'
    document.title = title === 'Home' ? `${base} | Portfolio` : `${title} | ${base}`
  }, [title])
}
