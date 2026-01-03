'use client'

/**
 * ScrollReveal
 * 
 * Simplified scroll reveal with opacity-only fade-in for performance.
 * 
 * Architecture:
 * - Simple opacity animation (no transforms)
 * - Optimized viewport detection
 * - Only animates once for performance
 * - Respects prefers-reduced-motion
 */

import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  className?: string
}

// Simple fade-in variant - opacity only for performance
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5 }
  }
}

export function ScrollReveal({ children, delay = 0, className }: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true,
    margin: '-10%',
    amount: 0.2
  })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeIn}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

