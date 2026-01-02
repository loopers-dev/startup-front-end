/**
 * Motion Design Tokens
 * 
 * Centralized motion design system for consistent animations across the site.
 * All animation durations, easings, and presets should reference these tokens.
 * 
 * Architecture Decision:
 * - Separates motion design from implementation
 * - Enables easy theming and A/B testing
 * - Supports accessibility preferences
 */

/**
 * Motion duration scale (in seconds)
 * Fast: Quick micro-interactions
 * Normal: Standard animations
 * Slow: Hero and major transitions
 */
export const motionDuration = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  slower: 0.8,
} as const

/**
 * Easing functions
 * Using cubic-bezier for premium feel
 * Reference: https://easings.net/
 */
export const motionEasing = {
  // Standard easing - smooth and natural
  standard: [0.22, 1, 0.36, 1] as [number, number, number, number],
  // Ease out - quick start, slow end
  easeOut: [0.16, 1, 0.3, 1] as [number, number, number, number],
  // Ease in - slow start, quick end
  easeIn: [0.7, 0, 0.84, 0] as [number, number, number, number],
  // Linear - constant speed
  linear: [0, 0, 1, 1] as [number, number, number, number],
} as const

/**
 * Motion presets for common animation patterns
 * These combine duration, easing, and common properties
 */
export const motionPresets = {
  // Hero text reveal - slow, smooth entrance
  heroReveal: {
    duration: motionDuration.slower,
    ease: motionEasing.standard,
    y: 20,
  },
  // Section reveal - normal speed, scroll-triggered
  sectionReveal: {
    duration: motionDuration.slow,
    ease: motionEasing.standard,
    y: 40,
  },
  // Card hover - fast, subtle lift
  cardHover: {
    duration: motionDuration.fast,
    ease: motionEasing.easeOut,
    y: -8,
  },
  // Button hover - fast, scale
  buttonHover: {
    duration: motionDuration.fast,
    ease: motionEasing.easeOut,
    scale: 1.05,
  },
  // Fade in - simple opacity transition
  fadeIn: {
    duration: motionDuration.slow,
    ease: motionEasing.standard,
  },
  // Stagger delay between children
  staggerDelay: 0.1,
  // Initial delay for children
  staggerInitialDelay: 0.2,
} as const

/**
 * Scroll trigger configuration
 */
export const scrollConfig = {
  // Margin from viewport edge before triggering
  margin: '-100px',
  // Only trigger once (performance optimization)
  once: true,
  // Amount of element visibility required (0-1)
  amount: 0.3,
} as const

/**
 * Mobile optimization
 * Reduce motion complexity on mobile devices
 */
export const mobileConfig = {
  // Disable smooth scrolling on mobile (better performance)
  disableSmoothScroll: true,
  // Reduce animation complexity
  reduceMotion: true,
  // Simpler easing on mobile
  easing: motionEasing.easeOut,
} as const

