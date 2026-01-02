'use client'

/**
 * ScrollReveal
 * 
 * Client component that reveals content on scroll with motion.
 * 
 * Architecture:
 * - Uses motion tokens for consistent animation
 * - Respects prefers-reduced-motion
 * - Optimized viewport detection
 * - Only animates once for performance
 */

import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'
import { createSlideUp } from '@/lib/motion-utils'
import { getScrollViewport } from '@/lib/motion-utils'

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function ScrollReveal({ children, delay = 0, className }: ScrollRevealProps) {
  const ref = useRef(null)
  const viewportConfig = getScrollViewport()
  const isInView = useInView(ref, { 
    once: viewportConfig.once, 
    margin: viewportConfig.margin as string,
    amount: viewportConfig.amount 
  })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={createSlideUp(delay)}
      className={className}
    >
      {children}
    </motion.div>
  )
}

