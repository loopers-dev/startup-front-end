'use client'

/**
 * ServiceVisual
 * 
 * Service-specific technical visualization component.
 * Each service gets its own unique visual signature.
 * 
 * Architecture:
 * - Web: Component trees, layout grids
 * - Mobile: App navigation flows, screen transitions
 * - AI: Input → Model → Output pipelines
 * - Migration: Legacy → Modern architecture transformation
 */

import { motion } from 'framer-motion'
import { SystemDiagram } from './SystemDiagram'
import { DataFlow } from './DataFlow'
import { CodeGrid } from './CodeGrid'

interface ServiceVisualProps {
  serviceType: 'web' | 'mobile' | 'ai' | 'migration'
  isActive?: boolean
  systemStage?: 'discovery' | 'design' | 'build' | 'deploy' | null
  architectureLevel?: 'simple' | 'moderate' | 'complex'
  className?: string
}

export function ServiceVisual({
  serviceType,
  isActive = false,
  systemStage = null,
  architectureLevel = 'simple',
  className = '',
}: ServiceVisualProps) {
  if (serviceType === 'web') {
    return (
      <div className={className}>
        <CodeGrid
          cells={[
            { id: '1', content: '<Header />', type: 'component', span: 4 },
            { id: '2', content: '<Sidebar />', type: 'component', span: 1 },
            { id: '3', content: '<Main />', type: 'component', span: 2 },
            { id: '4', content: '<Widget />', type: 'component', span: 1 },
            { id: '5', content: 'useState()', type: 'logic', span: 1 },
            { id: '6', content: 'API.fetch()', type: 'data', span: 1 },
            { id: '7', content: '<Footer />', type: 'component', span: 4 },
          ]}
          columns={4}
        />
      </div>
    )
  }

  if (serviceType === 'mobile') {
    return (
      <div className={className}>
        <DataFlow
          stages={[
            { id: '1', label: 'Splash', description: 'Launch' },
            { id: '2', label: 'Auth', description: 'Login' },
            { id: '3', label: 'Home', description: 'Dashboard' },
            { id: '4', label: 'Detail', description: 'Content' },
          ]}
        />
      </div>
    )
  }

  if (serviceType === 'ai') {
    // System complexity increases with architecture level
    const baseNodes = [
      { id: 'input', label: 'Input', type: 'frontend' as const, position: { x: 100, y: 300 } },
      { id: 'api', label: 'API', type: 'api' as const, position: { x: 300, y: 300 } },
      { id: 'model', label: 'Model', type: 'service' as const, position: { x: 500, y: 300 } },
      { id: 'output', label: 'Output', type: 'frontend' as const, position: { x: 700, y: 300 } },
    ]
    
    const complexNodes = architectureLevel === 'complex' ? [
      { id: 'vector', label: 'Vector DB', type: 'database' as const, position: { x: 500, y: 150 } },
      { id: 'cache', label: 'Cache', type: 'queue' as const, position: { x: 500, y: 450 } },
    ] : []
    
    const nodes = [...baseNodes, ...complexNodes]
    
    // Active node based on system stage
    const activeNode = systemStage === 'build' ? 'model' : 
                     systemStage === 'design' ? 'api' :
                     systemStage === 'deploy' ? 'output' : undefined
    
    return (
      <div className={className}>
        <SystemDiagram
          nodes={nodes}
          connections={[
            { from: 'input', to: 'api' },
            { from: 'api', to: 'model' },
            ...(architectureLevel === 'complex' ? [
              { from: 'model', to: 'vector' },
              { from: 'model', to: 'cache' },
            ] : []),
            { from: 'model', to: 'output' },
          ]}
          activeNode={isActive ? activeNode : undefined}
        />
      </div>
    )
  }

  if (serviceType === 'migration') {
    return (
      <div className={className}>
        <div className="flex items-center justify-between gap-8">
          <motion.div
            className="flex-1 p-6 border-2 border-muted rounded-lg"
            initial={{ opacity: 0.5 }}
            animate={isActive ? { opacity: 1, scale: 1.05 } : { opacity: 0.5 }}
          >
            <div className="text-sm font-mono text-muted">Legacy System</div>
            <div className="mt-2 text-xs font-mono">Monolith</div>
          </motion.div>
          <motion.div
            animate={isActive ? { x: [0, 10, 0] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-2xl"
          >
            →
          </motion.div>
          <motion.div
            className="flex-1 p-6 border-2 border-primary rounded-lg"
            initial={{ opacity: 0.5 }}
            animate={isActive ? { opacity: 1, scale: 1.05 } : { opacity: 0.5 }}
          >
            <div className="text-sm font-mono text-primary">Modern System</div>
            <div className="mt-2 text-xs font-mono">Microservices</div>
          </motion.div>
        </div>
      </div>
    )
  }

  return null
}

