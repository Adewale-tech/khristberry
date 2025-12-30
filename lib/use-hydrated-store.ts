import { useState, useEffect } from 'react'

export function useHydratedStore<T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  selector: (state: T) => F
) {
  const [hydrated, setHydrated] = useState(false)
  const result = store(selector) as F

  useEffect(() => {
    setHydrated(true)
  }, [])

  return hydrated ? result : undefined
}
