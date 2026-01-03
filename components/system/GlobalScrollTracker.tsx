'use client'

/**
 * GlobalScrollTracker
 * 
 * Tracks scroll progress globally and updates technical state.
 * Uses simple scroll hook for better performance.
 * Scroll = moving through system layers, increasing complexity.
 */

import { useEffect } from 'react'
import { useSimpleScroll } from '@/hooks/useSimpleScroll'
import { useTechnicalState } from '@/contexts/TechnicalStateContext'

export function GlobalScrollTracker() {
  const { setScrollProgress } = useTechnicalState()
  const { scrollProgress } = useSimpleScroll()

  // Update scroll progress in technical state
  // The hook already handles debouncing, so we can update directly
  useEffect(() => {
    setScrollProgress(scrollProgress)
  }, [scrollProgress, setScrollProgress])

  return null
}

