/**
 * Motion Utilities
 * 
 * Helper functions for motion that respect accessibility preferences
 * and provide consistent animation behavior.
 */

import { Variants } from 'framer-motion'
import { motionDuration, motionEasing, motionPresets } from './motion-tokens'

/**
 * Check if user prefers reduced motion
 * Respects prefers-reduced-motion media query
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Check if device is mobile
 * Simple check for mobile optimization
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768
}

/**
 * Get motion-safe animation variants
 * Returns reduced motion variants if user prefers reduced motion
 */
export function getMotionSafeVariants(
  normalVariants: Variants,
  reducedVariants?: Variants
): Variants {
  if (prefersReducedMotion()) {
    return reducedVariants || {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: 0.01, // Instant for reduced motion
        },
      },
    }
  }
  return normalVariants
}

/**
 * Create fade-in variant with motion tokens
 */
export function createFadeIn(delay = 0): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: motionPresets.fadeIn.duration,
        delay,
        ease: motionPresets.fadeIn.ease,
      },
    },
  }
}

/**
 * Create slide-up variant with motion tokens
 */
export function createSlideUp(delay = 0, distance = motionPresets.sectionReveal.y): Variants {
  return {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: motionPresets.sectionReveal.duration,
        delay,
        ease: motionPresets.sectionReveal.ease,
      },
    },
  }
}

/**
 * Create scale-in variant with motion tokens
 */
export function createScaleIn(delay = 0): Variants {
  return {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: motionDuration.normal,
        delay,
        ease: motionEasing.standard,
      },
    },
  }
}

/**
 * Create stagger container variant
 */
export function createStaggerContainer(): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: motionPresets.staggerDelay,
        delayChildren: motionPresets.staggerInitialDelay,
      },
    },
  }
}

/**
 * Get scroll viewport configuration
 * Respects mobile and accessibility preferences
 */
export function getScrollViewport(): {
  once: boolean
  margin: '-100px' | '0px'
  amount: number
} {
  const reducedMotion = prefersReducedMotion()
  const isMobile = isMobileDevice()

  return {
    once: true, // Performance: only animate once
    margin: reducedMotion ? '0px' : '-100px', // Closer trigger for reduced motion
    amount: reducedMotion ? 0 : 0.3,
  }
}

