'use client'

/**
 * useSimpleScroll
 * 
 * Simple, performant scroll tracking hook.
 * 
 * Features:
 * - Debounced scroll events (100ms)
 * - Tracks only scroll Y position
 * - Calculates scroll progress (0-1)
 * - Uses requestAnimationFrame for smooth updates
 * - Minimal overhead
 */

import { useState, useEffect, useCallback, useRef } from 'react'

interface UseSimpleScrollReturn {
  scrollY: number
  scrollProgress: number
}

export function useSimpleScroll(): UseSimpleScrollReturn {
  const [scrollY, setScrollY] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const rafRef = useRef<number | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    let ticking = false

    const updateScroll = () => {
      const currentScrollY = window.scrollY
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = documentHeight > 0 ? Math.min(1, Math.max(0, currentScrollY / documentHeight)) : 0

      setScrollY(currentScrollY)
      setScrollProgress(progress)
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current)
        }
        
        rafRef.current = requestAnimationFrame(() => {
          // Debounce with 100ms delay
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
          }
          
          timeoutRef.current = setTimeout(() => {
            updateScroll()
          }, 100)
          
          ticking = true
        })
      }
    }

    // Initial calculation
    updateScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateScroll)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return { scrollY, scrollProgress }
}

