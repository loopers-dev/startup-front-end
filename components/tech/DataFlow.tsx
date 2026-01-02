'use client'

/**
 * DataFlow
 * 
 * Animated data flow visualization showing input → process → output.
 * Represents technical pipelines and data transformations.
 * 
 * Architecture:
 * - Horizontal flow visualization
 * - Animated data particles
 * - Stage-based progression
 * - Scroll-triggered animation
 */

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { getScrollViewport } from '@/lib/motion-utils'

interface FlowStage {
  id: string
  label: string
  description?: string
}

interface DataFlowProps {
  stages: FlowStage[]
  className?: string
}

export function DataFlow({ stages, className = '' }: DataFlowProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px', amount: 0.3 })

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-4">
        {stages.map((stage, index) => {
          // Progressive reveal - only show labels for visible stages
          const shouldShowLabel = isInView
          
          return (
          <div key={stage.id} className="flex-1 flex flex-col items-center w-full sm:w-auto">
            {/* Stage Circle */}
            <motion.div
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-primary bg-background flex items-center justify-center relative z-10"
              initial={{ scale: 0, opacity: 0 }}
              animate={
                isInView
                  ? {
                      scale: 1,
                      opacity: 1,
                    }
                  : { scale: 0, opacity: 0 }
              }
              transition={{
                duration: 0.4,
                delay: index * 0.2,
              }}
            >
              <span className="text-xs sm:text-sm font-mono font-bold">{index + 1}</span>
            </motion.div>

            {/* Label - Progressive reveal */}
            {shouldShowLabel && (
              <motion.div
                className="mt-2 sm:mt-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.2 + 0.2,
                }}
              >
                <div className="text-xs sm:text-sm font-semibold font-mono">{stage.label}</div>
                {stage.description && (
                  <div className="text-[10px] sm:text-xs text-muted mt-1 px-2">{stage.description}</div>
                )}
              </motion.div>
            )}

            {/* Connection Arrow - Horizontal for desktop */}
            {index < stages.length - 1 && (
              <>
                <motion.div
                  className="hidden sm:block absolute top-8 left-[calc(50%+2rem)] w-full h-0.5 bg-primary/30"
                  initial={{ scaleX: 0 }}
                  animate={
                    isInView
                      ? {
                          scaleX: 1,
                        }
                      : { scaleX: 0 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2 + 0.4,
                  }}
                >
                  <motion.div
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-8 border-l-primary/30 border-t-4 border-t-transparent border-b-4 border-b-transparent"
                    animate={
                      isInView
                        ? {
                            x: [0, 10, 0],
                          }
                        : {}
                    }
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: index * 0.2 + 1,
                    }}
                  />
                </motion.div>
                {/* Vertical arrow for mobile */}
                <motion.div
                  className="block sm:hidden absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 w-0.5 h-8 bg-primary/30"
                  initial={{ scaleY: 0 }}
                  animate={
                    isInView
                      ? {
                          scaleY: 1,
                        }
                      : { scaleY: 0 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2 + 0.4,
                  }}
                >
                  <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-t-8 border-t-primary/30 border-l-4 border-l-transparent border-r-4 border-r-transparent"
                    animate={
                      isInView
                        ? {
                            y: [0, 5, 0],
                          }
                        : {}
                    }
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: index * 0.2 + 1,
                    }}
                  />
                </motion.div>
              </>
            )}
          </div>
          )
        })}
      </div>
    </div>
  )
}

