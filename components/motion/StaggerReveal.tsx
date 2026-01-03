'use client'

/**
 * StaggerReveal
 * 
 * Simplified stagger reveal with opacity-only animations for performance.
 * 
 * Architecture:
 * - Simple opacity stagger (no transforms)
 * - Optimized for performance (animates once)
 * - Minimal stagger delay to prevent jank
 */

import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode, Children } from 'react'

interface StaggerRevealProps {
  children: ReactNode
  className?: string
}

// Simple fade-in variant for children
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5 }
  }
}

// Container variant with minimal stagger
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Reduced from default to prevent jank
      delayChildren: 0
    }
  }
}

export function StaggerReveal({ children, className }: StaggerRevealProps) {
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
      variants={staggerContainer}
      className={className}
    >
      {Children.map(children, (child, index) => (
        <motion.div key={index} variants={fadeIn}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

