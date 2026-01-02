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
      variants={createStaggerContainer()}
      className={className}
    >
      {children}
    </motion.div>
  )
}

