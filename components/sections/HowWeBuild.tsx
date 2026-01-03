'use client'

/**
 * HowWeBuild
 * 
 * System Boot Sequence
 * 
 * This is NOT a process section.
 * This is a progressive system activation sequence.
 * 
 * Architecture:
 * - Scroll = system boot progression
 * - Nodes appear as system activates
 * - Connections form as dependencies resolve
 * - Layers activate progressively
 * - Metrics appear as system comes online
 */

import { useEffect, useCallback, useMemo } from 'react'
import { motion, useScroll, useInView, useMotionValueEvent } from 'framer-motion'
import { useRef } from 'react'
import { useTechnicalState } from '@/contexts/TechnicalStateContext'

const bootStages = [
  {
    id: 'discovery',
    label: 'DISCOVERY',
    nodes: ['requirements', 'analysis'],
    connections: [],
    status: 'initializing',
  },
  {
    id: 'design',
    label: 'DESIGN',
    nodes: ['requirements', 'analysis', 'api-layer', 'services', 'database'],
    connections: [
      { from: 'api-layer', to: 'services' },
      { from: 'services', to: 'database' },
    ],
    status: 'architecting',
  },
  {
    id: 'build',
    label: 'BUILD',
    nodes: ['requirements', 'analysis', 'api-layer', 'services', 'database', 'cache', 'workers'],
    connections: [
      { from: 'api-layer', to: 'services' },
      { from: 'services', to: 'database' },
      { from: 'services', to: 'cache' },
      { from: 'services', to: 'workers' },
    ],
    status: 'implementing',
  },
  {
    id: 'deploy',
    label: 'DEPLOY',
    nodes: ['requirements', 'analysis', 'api-layer', 'services', 'database', 'cache', 'workers', 'monitoring', 'cdn'],
    connections: [
      { from: 'api-layer', to: 'services' },
      { from: 'services', to: 'database' },
      { from: 'services', to: 'cache' },
      { from: 'services', to: 'workers' },
      { from: 'services', to: 'monitoring' },
      { from: 'cdn', to: 'api-layer' },
    ],
    status: 'operational',
  },
]

export function HowWeBuild() {
  const { systemStage, setStage, setActiveSection } = useTechnicalState()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { margin: '-20%', once: false })

  // Claim visual ownership when section is in view
  useEffect(() => {
    if (isInView) {
      setActiveSection('how-we-build')
    }
  }, [isInView, setActiveSection])

  // Map system stage to boot stage index
  const activeStageIndex = useMemo(() => {
    if (!systemStage) return 0
    const index = bootStages.findIndex(s => s.id === systemStage)
    return Math.max(0, index)
  }, [systemStage])

  const currentStage = bootStages[activeStageIndex]

  return (
    <section
      id="how-we-build"
      ref={sectionRef}
      className="section-padding relative min-h-screen flex items-center"
    >
      <div className="container mx-auto max-w-7xl relative z-10 px-4 sm:px-6">
        {/* Boot Sequence Panel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-background/80 backdrop-blur-sm border border-border rounded-lg p-4 sm:p-6 md:p-8 font-mono"
        >
          <div className="text-[10px] sm:text-xs text-muted mb-4">SYSTEM BOOT SEQUENCE</div>
          
          {/* Stage Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {bootStages.map((stage, index) => {
              const isActive = index === activeStageIndex
              const isComplete = index < activeStageIndex
              
              return (
                <button
                  key={stage.id}
                  onClick={(e) => {
                    e.preventDefault()
                    requestAnimationFrame(() => {
                      setStage(stage.id as any)
                    })
                  }}
                  className={`
                    p-3 sm:p-4 border-2 rounded-lg text-left
                    transition-all duration-200
                    ${isActive
                      ? 'border-primary bg-primary/10 text-primary'
                      : isComplete
                      ? 'border-accent bg-accent/5 text-accent'
                      : 'border-border bg-background/50 text-muted'
                    }
                  `}
                  style={{ 
                    opacity: 1,
                    transform: 'scale(1)'
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-[10px] sm:text-xs font-bold">{stage.label}</div>
                    <div className={`
                      w-2 h-2 rounded-full
                      ${isActive ? 'bg-primary animate-pulse' : isComplete ? 'bg-accent' : 'bg-muted'}
                    `} />
                  </div>
                  <div className="text-[10px] sm:text-xs text-muted">
                    Status: <span className="font-mono">{stage.status}</span>
                  </div>
                  <div className="text-[10px] sm:text-xs text-muted mt-2">
                    Nodes: {stage.nodes.length} | Connections: {stage.connections.length}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Active Stage Details */}
          <div className="border-t border-border pt-4 sm:pt-6">
            <div className="text-[10px] sm:text-xs text-muted mb-3 sm:mb-4">ACTIVE STAGE: {currentStage.label}</div>
            
            {/* Node List */}
            <div className="mb-4">
              <div className="text-[10px] sm:text-xs text-muted mb-2">ONLINE NODES:</div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {currentStage.nodes.map((node, idx) => (
                  <span
                    key={node}
                    className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-primary/10 border border-primary/30 rounded text-[10px] sm:text-xs font-mono"
                    style={{ 
                      opacity: 1,
                      transition: 'opacity 0.2s ease'
                    }}
                  >
                    {node}
                  </span>
                ))}
              </div>
            </div>

            {/* Connection List */}
            {currentStage.connections.length > 0 && (
              <div>
                <div className="text-[10px] sm:text-xs text-muted mb-2">ACTIVE CONNECTIONS:</div>
                <div className="space-y-1">
                  {currentStage.connections.map((conn, idx) => (
                    <div
                      key={`${conn.from}-${conn.to}`}
                      className="text-[10px] sm:text-xs font-mono text-muted break-all sm:break-normal"
                      style={{ 
                        opacity: 1,
                        transition: 'opacity 0.2s ease'
                      }}
                    >
                      <code className="text-primary">{conn.from}</code>
                      {' → '}
                      <code className="text-accent">{conn.to}</code>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* System Status */}
            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <div className="text-[10px] sm:text-xs font-mono">
                  System Status: <span className="text-primary">{currentStage.status.toUpperCase()}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

