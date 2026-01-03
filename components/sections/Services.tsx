'use client'

/**
 * Services Section
 * 
 * System Mode Configuration Panel
 * 
 * Services are NOT sections - they are system configurations.
 * Switching a service reconfigures the system canvas topology.
 * 
 * Architecture:
 * - Inspector panel overlay
 * - System mode switchers
 * - Reconfigures canvas topology
 * - Updates system architecture
 */

import { useEffect, useRef, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTechnicalState, useEffectiveTechnicalState } from '@/contexts/TechnicalStateContext'

const systemModes = [
  {
    id: 'web',
    label: 'WEB',
    code: 'web',
    description: 'Web application architecture',
    topology: 'spa-ssr',
  },
  {
    id: 'mobile',
    label: 'MOBILE',
    code: 'mobile',
    description: 'Mobile-native architecture',
    topology: 'native-hybrid',
  },
  {
    id: 'ai',
    label: 'AI',
    code: 'ai',
    description: 'AI-integrated systems',
    topology: 'ml-pipeline',
  },
  {
    id: 'migration',
    label: 'MIGRATION',
    code: 'migration',
    description: 'Legacy modernization',
    topology: 'migration-path',
  },
]

export function Services() {
  const { setDomain, setActiveSection } = useTechnicalState()
  const effectiveState = useEffectiveTechnicalState()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { margin: '-20%', once: false })
  const hoverTimeoutRef = useRef<Map<string, NodeJS.Timeout>>(new Map())
  
  // Claim visual ownership when section is in view
  useEffect(() => {
    if (isInView) {
      setActiveSection('services')
    }
  }, [isInView, setActiveSection])

  // Cleanup timeouts on unmount
  useEffect(() => {
    const timeouts = hoverTimeoutRef.current
    return () => {
      timeouts.forEach((timeout) => {
        clearTimeout(timeout)
      })
      timeouts.clear()
    }
  }, [])

  const handleModeSelect = useCallback((domain: 'web' | 'mobile' | 'ai' | 'migration') => {
    // Use requestAnimationFrame to prevent blocking
    requestAnimationFrame(() => {
      setDomain(domain)
    })
  }, [setDomain])

  const handleMouseEnter = useCallback((domain: 'web' | 'mobile' | 'ai' | 'migration') => {
    // Clear existing timeout for this domain
    const existing = hoverTimeoutRef.current.get(domain)
    if (existing) {
      clearTimeout(existing)
    }
    // Debounce hover to prevent excessive updates
    const timeoutId = setTimeout(() => {
      setDomain(domain)
      hoverTimeoutRef.current.delete(domain)
    }, 150)
    hoverTimeoutRef.current.set(domain, timeoutId)
  }, [setDomain])

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section-padding relative min-h-screen flex items-center"
    >
      {/* Inspector Panel Overlay */}
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Panel Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="bg-background/80 backdrop-blur-sm border border-border rounded-lg p-6 font-mono">
            <div className="text-xs text-muted mb-2">SYSTEM CONFIGURATION</div>
            <h2 className="text-3xl font-bold">Mode Selection</h2>
            <div className="text-sm text-muted mt-2">
              Select architecture preset to reconfigure system topology
            </div>
          </div>
        </motion.div>

        {/* Mode Switchers - Grid Layout */}
        <div className="bg-background/80 backdrop-blur-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {systemModes.map((mode, index) => {
            const isActive = effectiveState.currentDomain === mode.code
            const isPreviewing = effectiveState.previewState?.currentDomain === mode.code

            return (
              <motion.button
                key={mode.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                onClick={(e) => {
                  e.preventDefault()
                  handleModeSelect(mode.code as any)
                }}
                onMouseEnter={() => {
                  if (!isActive) {
                    handleMouseEnter(mode.code as any)
                  }
                }}
                className={`
                  relative p-6 border-2 rounded-lg font-mono text-left
                  transition-all duration-300
                  ${isActive || isPreviewing
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border bg-background/50 hover:border-foreground/50 text-foreground'
                  }
                `}
              >
                {/* Status Indicator */}
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs font-bold tracking-wider">{mode.label}</div>
                  <div className={`
                    w-2 h-2 rounded-full
                    ${isActive || isPreviewing ? 'bg-primary' : 'bg-muted'}
                  `} />
                </div>

                {/* Code Label */}
                <div className="text-xs text-muted mb-2 font-mono">
                  <code className="bg-background/50 px-2 py-1 rounded">{mode.code}</code>
                </div>

                {/* Description */}
                <div className="text-sm text-muted leading-relaxed">
                  {mode.description}
                </div>

                {/* Topology Label */}
                <div className="mt-4 text-xs text-muted border-t border-border pt-3">
                  Topology: <span className="font-mono">{mode.topology}</span>
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Active Mode Info Panel */}
        {effectiveState.currentDomain && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-8 bg-background/80 backdrop-blur-sm border border-border rounded-lg p-6 font-mono"
          >
            <div className="text-xs text-muted mb-2">ACTIVE CONFIGURATION</div>
            <div className="text-lg font-bold mb-2">
              {systemModes.find(m => m.code === effectiveState.currentDomain)?.label}
            </div>
            <div className="text-sm text-muted">
              System topology reconfigured. Canvas updated with {systemModes.find(m => m.code === effectiveState.currentDomain)?.topology} architecture.
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
