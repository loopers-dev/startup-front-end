'use client'

/**
 * StaggerReveal
 * 
 * Client component that reveals children with staggered animation.
 * 
 * Architecture:
 * - Uses motion tokens for consistent stagger timing
 * - Respects prefers-reduced-motion
 * - Optimized for performance (animates once)
 */

import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'
import { createStaggerContainer } from '@/lib/motion-utils'
import { getScrollViewport } from '@/lib/motion-utils'

interface StaggerRevealProps {
  children: ReactNode
  className?: string
}

export function StaggerReveal({ children, className }: StaggerRevealProps) {
  const ref = useRef(null)
  const viewport = getScrollViewport()
  const isInView = useInView(ref, viewport)

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={createStaggerContainer()}
      className={className}
    >
      {children}
    </motion.div>
  )
}

