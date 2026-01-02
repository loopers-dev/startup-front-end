'use client'

/**
 * GlobalScrollTracker
 * 
 * Tracks scroll progress globally and updates technical state.
 * Scroll = moving through system layers, increasing complexity.
 * Throttled for performance.
 */

import { useRef, useCallback } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import { useTechnicalState } from '@/contexts/TechnicalStateContext'

export function GlobalScrollTracker() {
  const { setScrollProgress } = useTechnicalState()
  const { scrollYProgress } = useScroll()
  const lastUpdateRef = useRef<number>(0)
  const rafRef = useRef<number | null>(null)

  // Throttled update function
  const throttledUpdate = useCallback((latest: number) => {
    const now = Date.now()
    if (now - lastUpdateRef.current < 100) { // Throttle to 100ms
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      rafRef.current = requestAnimationFrame(() => {
        setScrollProgress(latest)
        lastUpdateRef.current = Date.now()
      })
      return
    }
    setScrollProgress(latest)
    lastUpdateRef.current = now
  }, [setScrollProgress])

  // Update scroll progress in technical state - throttled
  useMotionValueEvent(scrollYProgress, 'change', throttledUpdate)

  return null
}

