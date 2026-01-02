'use client'

/**
 * EnvironmentBackground
 * 
 * Media as Environment - persistent background world.
 * 
 * Architecture:
 * - Single video instance, never unmounts
 * - Transforms based on environment profile
 * - No content switching, only mood changes
 * - Never competes with foreground content
 * - State-driven: derives profile from TechnicalState
 */

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTechnicalState } from '@/contexts/TechnicalStateContext'
import { getEnvironmentProfile } from '@/contexts/EnvironmentContext'
import { useMedia } from '@/contexts/MediaContext'
import { MediaFrame } from './MediaFrame'

/**
 * Single persistent media asset for environment
 * This is the "world" that exists throughout the site
 */
const ENVIRONMENT_MEDIA_INTENT = 'hero-abstract-tech' as const

const TRANSITION_DURATION = 2000 // 2s smooth transition

export function EnvironmentBackground() {
  // Disabled - video removed for performance
  return null
  
  // State-driven: derive profile from TechnicalState
  // const { currentDomain, systemStage, architectureLevel } = useTechnicalState()
  // const { getMedia, preloadMedia } = useMedia()
  
  // // Derive environment profile from technical state
  // const currentProfile = getEnvironmentProfile(
  //   currentDomain,
  //   systemStage,
  //   architectureLevel
  // )
  
  // // Get single persistent media
  // const environmentMedia = getMedia(ENVIRONMENT_MEDIA_INTENT) || null

  // // Preload on mount
  // useEffect(() => {
  //   preloadMedia(ENVIRONMENT_MEDIA_INTENT)
  // }, [preloadMedia])

  // if (!environmentMedia) {
  //   return null
  // }

  // Calculate focal point transform based on focalArea
  // const getFocalTransform = () => {
  //   const { focalArea, scale } = currentProfile
  //   const baseScale = scale
  //   
  //   switch (focalArea) {
  //     case 'left':
  //       return { scale: baseScale, x: '-10%', y: '0%' }
  //     case 'right':
  //       return { scale: baseScale, x: '10%', y: '0%' }
  //     case 'top':
  //       return { scale: baseScale, x: '0%', y: '-10%' }
  //     case 'bottom':
  //       return { scale: baseScale, x: '0%', y: '10%' }
  //     default:
  //       return { scale: baseScale, x: '0%', y: '0%' }
  //   }
  // }

  // const focalTransform = getFocalTransform()

  // return (
  //   <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
  //     <motion.div
  //       className="absolute inset-0"
  //       animate={{
  //         opacity: currentProfile.opacity,
  //         scale: focalTransform.scale,
  //         x: focalTransform.x,
  //         y: focalTransform.y,
  //         filter: `
  //           blur(${currentProfile.blurLevel}px)
  //           brightness(${currentProfile.brightness})
  //           contrast(${currentProfile.contrast})
  //           saturate(${currentProfile.saturation})
  //         `,
  //       }}
  //       transition={{
  //         duration: TRANSITION_DURATION / 1000,
  //         ease: [0.22, 1, 0.36, 1], // Smooth easing
  //       }}
  //     >
  //       <MediaFrame
  //         asset={environmentMedia}
  //         className="w-full h-full"
  //         objectFit="cover"
  //         priority={true}
  //         playbackRate={currentProfile.motionSpeed}
  //       />
  //       
  //       {/* Grain overlay for texture */}
  //       {currentProfile.grain > 0 && (
  //         <motion.div
  //           className="absolute inset-0 pointer-events-none"
  //           style={{
  //             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
  //             opacity: currentProfile.grain,
  //             mixBlendMode: 'overlay',
  //           }}
  //           animate={{
  //             opacity: currentProfile.grain,
  //           }}
  //           transition={{
  //             duration: TRANSITION_DURATION / 1000,
  //           }}
  //         />
  //       )}

  //       {/* Tone overlay */}
  //       <motion.div
  //         className="absolute inset-0 pointer-events-none"
  //         style={{
  //           backgroundColor:
  //             currentProfile.tone === 'dark'
  //               ? 'rgba(0, 0, 0, 0.3)'
  //               : currentProfile.tone === 'light'
  //               ? 'rgba(255, 255, 255, 0.1)'
  //               : 'transparent',
  //         }}
  //         animate={{
  //           backgroundColor:
  //             currentProfile.tone === 'dark'
  //               ? 'rgba(0, 0, 0, 0.3)'
  //               : currentProfile.tone === 'light'
  //               ? 'rgba(255, 255, 255, 0.1)'
  //               : 'transparent',
  //         }}
  //         transition={{
  //           duration: TRANSITION_DURATION / 1000,
  //         }}
  //       />
  //     </motion.div>
  //   </div>
  // )
}

