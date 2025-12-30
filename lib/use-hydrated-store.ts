"use client"

import { useEffect, useState } from "react"
import { useStore } from "@/lib/store"

export const useHydratedStore = ((selector: any) => {
  const store = useStore(selector)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  return hydrated ? store : undefined
}) as typeof useStore
