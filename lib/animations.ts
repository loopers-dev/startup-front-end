/**
 * Animation Variants (Legacy)
 * 
 * @deprecated Use motion-utils.ts functions instead for motion-token-based animations
 * These are kept for backward compatibility during migration.
 * 
 * Architecture Note:
 * - New animations should use createFadeIn(), createSlideUp(), etc. from motion-utils.ts
 * - These reference motion tokens and respect accessibility preferences
 * - Legacy variants will be removed in a future version
 */

import { Variants } from 'framer-motion'
import { motionDuration, motionEasing, motionPresets } from './motion-tokens'
import { getMotionSafeVariants } from './motion-utils'

/**
 * Fade in animation
 * @deprecated Use createFadeIn() from motion-utils.ts
 */
export const fadeIn: Variants = getMotionSafeVariants({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: motionPresets.fadeIn.duration,
      ease: motionPresets.fadeIn.ease,
    },
  },
})

/**
 * Slide up animation
 * @deprecated Use createSlideUp() from motion-utils.ts
 */
export const slideUp: Variants = getMotionSafeVariants({
  hidden: { opacity: 0, y: motionPresets.sectionReveal.y },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionPresets.sectionReveal.duration,
      ease: motionPresets.sectionReveal.ease,
    },
  },
})

/**
 * Slide down animation
 */
export const slideDown: Variants = getMotionSafeVariants({
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionDuration.slow,
      ease: motionEasing.standard,
    },
  },
})

/**
 * Stagger children animation
 * @deprecated Use createStaggerContainer() from motion-utils.ts
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: motionPresets.staggerDelay,
      delayChildren: motionPresets.staggerInitialDelay,
    },
  },
}

/**
 * Scale in animation
 * @deprecated Use createScaleIn() from motion-utils.ts
 */
export const scaleIn: Variants = getMotionSafeVariants({
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: motionDuration.normal,
      ease: motionEasing.standard,
    },
  },
})

/**
 * Text reveal animation (for hero text)
 */
export const textReveal: Variants = getMotionSafeVariants({
  hidden: { opacity: 0, y: motionPresets.heroReveal.y },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionPresets.heroReveal.duration,
      ease: motionPresets.heroReveal.ease,
    },
  },
})

/**
 * Get scroll-triggered animation variants
 * @deprecated Use createSlideUp() from motion-utils.ts with getScrollViewport()
 */
export function getScrollAnimation(delay = 0): Variants {
  return getMotionSafeVariants({
    hidden: { opacity: 0, y: motionPresets.sectionReveal.y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: motionPresets.sectionReveal.duration,
        delay,
        ease: motionPresets.sectionReveal.ease,
      },
    },
  })
}

