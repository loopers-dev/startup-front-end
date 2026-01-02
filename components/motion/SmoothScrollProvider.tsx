'use client'

/**
 * SmoothScrollProvider
 * 
 * Provides Lenis smooth scrolling with proper initialization and cleanup.
 * 
 * Architecture Decisions:
 * - Client component wrapper for Lenis (requires browser APIs)
 * - Singleton pattern: only one Lenis instance per app
 * - Route-safe: handles Next.js navigation properly
 * - Respects prefers-reduced-motion
 * - Disabled on mobile for better performance
 * 
 * Usage:
 * Wrap the app in layout.tsx to enable smooth scrolling globally.
 */

import { useEffect, ReactNode, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from '@studio-freight/lenis'
import { motionDuration, motionEasing, mobileConfig } from '@/lib/motion-tokens'
import { prefersReducedMotion, isMobileDevice } from '@/lib/motion-utils'

interface SmoothScrollProviderProps {
  children: ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)
  const rafRef = useRef<number | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    // Respect accessibility preferences
    if (prefersReducedMotion()) {
      return
    }

    // Disable on mobile for better performance
    if (isMobileDevice() && mobileConfig.disableSmoothScroll) {
      return
    }

    // Initialize Lenis
    const lenis = new Lenis({
      duration: motionDuration.slow,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: false, // Disable on touch for better mobile performance
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis

    // RAF loop for Lenis
    function raf(time: number) {
      lenis.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }

    rafRef.current = requestAnimationFrame(raf)

    // Handle route changes (Next.js App Router)
    // Scroll to top on route change
    lenis.scrollTo(0, { immediate: true })

    // Cleanup
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      lenis.destroy()
      lenisRef.current = null
    }
  }, []) // Initialize once

  // Handle route changes
  useEffect(() => {
    if (lenisRef.current) {
      // Scroll to top on route change
      lenisRef.current.scrollTo(0, { immediate: false })
    }
  }, [pathname])

  return <>{children}</>
}

