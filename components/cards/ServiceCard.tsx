'use client'

/**
 * ServiceCard
 * 
 * Client Component for service cards with hover and reveal animations.
 * Supports interaction-driven media switching.
 * 
 * Architecture:
 * - Uses motion tokens for hover effects
 * - Respects accessibility preferences
 * - Optimized viewport detection
 * - Media switching on hover/click
 */

import { motion } from 'framer-motion'
import { ReactNode, useCallback, useMemo } from 'react'
import { createScaleIn, getScrollViewport } from '@/lib/motion-utils'
import { motionPresets } from '@/lib/motion-tokens'
import { useTechnicalState, useEffectiveTechnicalState } from '@/contexts/TechnicalStateContext'
import { ServiceVisual } from '@/components/tech/ServiceVisual'

interface ServiceCardProps {
  title: string
  description: string
  icon?: ReactNode
  index?: number
  domain: 'web' | 'mobile' | 'ai' | 'migration'
}

export function ServiceCard({ 
  title, 
  description, 
  icon, 
  index = 0,
  domain
}: ServiceCardProps) {
  const viewport = getScrollViewport()
  const variants = createScaleIn(index * motionPresets.staggerDelay)
  const { setDomain, setPreview } = useTechnicalState()
  const effectiveState = useEffectiveTechnicalState()
  
  // Check if this domain is active - memoized
  const isActive = useMemo(() => {
    return effectiveState.currentDomain === domain
  }, [effectiveState.currentDomain, domain])
  
  const isPreviewing = useMemo(() => {
    return effectiveState.previewState?.currentDomain === domain
  }, [effectiveState.previewState?.currentDomain, domain])

  // Update technical state on interaction - useCallback to prevent re-renders
  const handleMouseEnter = useCallback(() => {
    setPreview({ currentDomain: domain })
  }, [setPreview, domain])

  const handleMouseLeave = useCallback(() => {
    setPreview(null)
  }, [setPreview])

  const handleClick = useCallback(() => {
    setDomain(domain)
  }, [setDomain, domain])

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={variants}
      whileHover={{ y: motionPresets.cardHover.y }}
      transition={{ duration: motionPresets.cardHover.duration, ease: motionPresets.cardHover.ease }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group p-8 rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden relative z-10 ${
        isActive || isPreviewing
          ? 'border-primary bg-primary/5 z-20'
          : 'border-border bg-background hover:border-foreground/20'
      }`}
      onClick={handleClick}
    >
      {/* Technical Visualization - Only when section owns visuals */}
      {(isActive || isPreviewing) && effectiveState.activeSection === 'services' && (
        <div className="absolute inset-0 opacity-100 transition-opacity duration-500 pointer-events-none z-30">
          <div className="absolute inset-0 bg-background/95 backdrop-blur-sm" />
          <div className="absolute inset-0 p-4">
            <ServiceVisual 
              serviceType={domain}
              isActive={isActive || isPreviewing}
              systemStage={effectiveState.systemStage}
              architectureLevel={effectiveState.architectureLevel}
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        {icon && (
          <div className="mb-6 text-primary opacity-60 group-hover:opacity-100 transition-opacity duration-300">
            {icon}
          </div>
        )}
        <h3 className="text-2xl font-semibold mb-4 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-muted leading-relaxed text-lg">{description}</p>
      </div>
    </motion.div>
  )
}
