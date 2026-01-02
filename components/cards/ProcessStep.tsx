'use client'

/**
 * ProcessStep
 * 
 * Client Component for process step cards with scroll-triggered animation.
 * 
 * Architecture:
 * - Uses motion tokens for consistent timing
 * - Respects accessibility preferences
 */

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { createSlideUp, getScrollViewport } from '@/lib/motion-utils'
import { motionPresets } from '@/lib/motion-tokens'

interface ProcessStepProps {
  step: number
  title: string
  description: string
  icon?: ReactNode
  index?: number
  isActive?: boolean
}

export function ProcessStep({ step, title, description, icon, index = 0, isActive = false }: ProcessStepProps) {
  const viewport = getScrollViewport()
  const variants = createSlideUp(index * motionPresets.staggerDelay * 1.5)

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={variants}
      className={`relative ${isActive ? 'ring-2 ring-primary rounded-lg p-4' : ''}`}
    >
      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-8">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-xl sm:text-2xl">
            {step}
          </div>
        </div>
        <div className="flex-1 pt-0 sm:pt-2">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-4">{title}</h3>
          <p className="text-base sm:text-lg text-muted leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}
