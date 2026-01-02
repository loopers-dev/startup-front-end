'use client'

/**
 * SystemCanvas
 * 
 * Global persistent canvas representing system topology.
 * Lives for entire page, never unmounts.
 * 
 * Architecture:
 * - Full viewport canvas
 * - Reacts to scroll depth (increases complexity)
 * - Reacts to domain (changes topology)
 * - Reacts to system stage (adds layers)
 * - Visual language: grids, lines, nodes, panels
 */

import { useMemo } from 'react'
import { useTechnicalState } from '@/contexts/TechnicalStateContext'

interface SystemNode {
  id: string
  label: string
  type: 'service' | 'database' | 'api' | 'frontend' | 'backend' | 'queue' | 'cache' | 'gateway'
  position: { x: number; y: number }
  layer: 'ui' | 'api' | 'data' | 'infra'
}

interface SystemConnection {
  from: string
  to: string
  layer: 'ui' | 'api' | 'data' | 'infra'
}

/**
 * Generate system topology based on domain and complexity
 */
function generateTopology(
  domain: 'web' | 'mobile' | 'ai' | 'migration' | null,
  complexity: number, // 0-1 based on scroll progress
  stage: 'discovery' | 'design' | 'build' | 'deploy' | null
): { nodes: SystemNode[]; connections: SystemConnection[] } {
  const nodes: SystemNode[] = []
  const connections: SystemConnection[] = []

  // Base nodes that always exist
  const baseNodes: SystemNode[] = [
    { id: 'client', label: 'Client', type: 'frontend', position: { x: 100, y: 300 }, layer: 'ui' },
  ]

  nodes.push(...baseNodes)

  // Add nodes based on complexity (scroll depth)
  const nodeCount = Math.floor(3 + complexity * 8) // 3-11 nodes

  if (nodeCount >= 2) {
    nodes.push({
      id: 'gateway',
      label: 'Gateway',
      type: 'gateway',
      position: { x: 300, y: 300 },
      layer: 'api',
    })
    connections.push({ from: 'client', to: 'gateway', layer: 'api' })
  }

  if (nodeCount >= 3) {
    nodes.push({
      id: 'api',
      label: 'API',
      type: 'api',
      position: { x: 500, y: 200 },
      layer: 'api',
    })
    connections.push({ from: 'gateway', to: 'api', layer: 'api' })
  }

  if (nodeCount >= 4) {
    nodes.push({
      id: 'service',
      label: 'Service',
      type: 'service',
      position: { x: 700, y: 200 },
      layer: 'api',
    })
    connections.push({ from: 'api', to: 'service', layer: 'api' })
  }

  if (nodeCount >= 5) {
    nodes.push({
      id: 'db',
      label: 'Database',
      type: 'database',
      position: { x: 700, y: 400 },
      layer: 'data',
    })
    connections.push({ from: 'service', to: 'db', layer: 'data' })
  }

  if (nodeCount >= 6) {
    nodes.push({
      id: 'cache',
      label: 'Cache',
      type: 'cache',
      position: { x: 500, y: 400 },
      layer: 'data',
    })
    connections.push({ from: 'service', to: 'cache', layer: 'data' })
  }

  if (nodeCount >= 7) {
    nodes.push({
      id: 'queue',
      label: 'Queue',
      type: 'queue',
      position: { x: 300, y: 500 },
      layer: 'infra',
    })
    connections.push({ from: 'service', to: 'queue', layer: 'infra' })
  }

  if (nodeCount >= 8) {
    nodes.push({
      id: 'worker',
      label: 'Worker',
      type: 'backend',
      position: { x: 100, y: 500 },
      layer: 'infra',
    })
    connections.push({ from: 'queue', to: 'worker', layer: 'infra' })
  }

  if (nodeCount >= 9) {
    nodes.push({
      id: 'auth',
      label: 'Auth',
      type: 'service',
      position: { x: 500, y: 100 },
      layer: 'api',
    })
    connections.push({ from: 'gateway', to: 'auth', layer: 'api' })
  }

  if (nodeCount >= 10) {
    nodes.push({
      id: 'cdn',
      label: 'CDN',
      type: 'gateway',
      position: { x: 50, y: 100 },
      layer: 'infra',
    })
    connections.push({ from: 'cdn', to: 'client', layer: 'ui' })
  }

  if (nodeCount >= 11) {
    nodes.push({
      id: 'monitor',
      label: 'Monitor',
      type: 'service',
      position: { x: 900, y: 300 },
      layer: 'infra',
    })
    connections.push({ from: 'service', to: 'monitor', layer: 'infra' })
  }

  // Domain-specific adjustments
  if (domain === 'mobile') {
    // Add mobile-specific nodes
    const mobileNode = nodes.find(n => n.id === 'client')
    if (mobileNode) {
      mobileNode.label = 'Mobile App'
    }
  }

  if (domain === 'ai') {
    // Add AI-specific nodes
    if (nodeCount >= 6) {
      nodes.push({
        id: 'ai-service',
        label: 'AI Service',
        type: 'service',
        position: { x: 900, y: 200 },
        layer: 'api',
      })
      connections.push({ from: 'service', to: 'ai-service', layer: 'api' })
    }
  }

  if (domain === 'migration') {
    // Add legacy system node
    if (nodeCount >= 5) {
      nodes.push({
        id: 'legacy',
        label: 'Legacy',
        type: 'database',
        position: { x: 900, y: 500 },
        layer: 'data',
      })
      connections.push({ from: 'service', to: 'legacy', layer: 'data' })
    }
  }

  return { nodes, connections }
}

export function SystemCanvas() {
  const { currentDomain, systemStage, scrollProgress, focusLayer } =
    useTechnicalState()

  // Calculate complexity from scroll progress
  const complexity = useMemo(() => {
    return Math.min(1, scrollProgress * 1.5) // Accelerate complexity growth
  }, [scrollProgress])

  // Generate topology based on current state
  const topology = useMemo(() => {
    return generateTopology(currentDomain, complexity, systemStage)
  }, [currentDomain, complexity, systemStage])

  const getLayerOpacity = (layer: 'ui' | 'api' | 'data' | 'infra') => {
    if (focusLayer === layer) return 1
    if (focusLayer) return 0.1
    // Progressive reveal based on complexity
    const layerOrder = ['ui', 'api', 'data', 'infra']
    const layerIndex = layerOrder.indexOf(layer)
    const threshold = (layerIndex + 1) * 0.25
    return complexity >= threshold ? 0.3 + (complexity - threshold) * 0.7 : 0
  }

  const getNodeColor = (type: SystemNode['type']) => {
    const colors = {
      frontend: 'text-primary',
      gateway: 'text-accent',
      api: 'text-primary',
      service: 'text-accent',
      database: 'text-secondary',
      backend: 'text-muted',
      queue: 'text-accent/70',
      cache: 'text-secondary/70',
    }
    return colors[type] || 'text-foreground'
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[1]" style={{ willChange: 'auto' }}>
      {/* Grid Background - static, no animation */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          opacity: 0.1 + complexity * 0.2,
        }}
      />

      {/* System Topology SVG */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Connections */}
        <g className="connections">
          {topology.connections.map((conn, index) => {
            const fromNode = topology.nodes.find(n => n.id === conn.from)
            const toNode = topology.nodes.find(n => n.id === conn.to)
            if (!fromNode || !toNode) return null

            const layerOpacity = getLayerOpacity(conn.layer)
            if (layerOpacity === 0) return null

            return (
              <line
                key={`${conn.from}-${conn.to}-${index}`}
                x1={fromNode.position.x}
                y1={fromNode.position.y}
                x2={toNode.position.x}
                y2={toNode.position.y}
                stroke="currentColor"
                strokeWidth={1.5}
                className="text-primary/30"
                opacity={layerOpacity * 0.4}
                style={{ transition: 'opacity 0.3s ease' }}
              />
            )
          })}
        </g>

        {/* Nodes */}
        {topology.nodes.map((node, index) => {
          const layerOpacity = getLayerOpacity(node.layer)
          if (layerOpacity === 0) return null

          return (
            <g key={node.id} opacity={layerOpacity} style={{ transition: 'opacity 0.3s ease' }}>
              <circle
                cx={node.position.x}
                cy={node.position.y}
                r={12}
                className={getNodeColor(node.type)}
                fill="currentColor"
                stroke="currentColor"
                strokeWidth={1}
              />
              <text
                x={node.position.x}
                y={node.position.y + 25}
                textAnchor="middle"
                className="text-xs fill-foreground/60 font-mono"
                style={{ fontSize: '10px' }}
              >
                {node.label}
              </text>
            </g>
          )
        })}
      </svg>

      {/* Layer Labels (when focused) */}
      {focusLayer && (
        <div
          className="absolute top-4 left-4 font-mono text-xs text-muted"
          style={{ transition: 'opacity 0.2s ease' }}
        >
          <div className="bg-background/80 backdrop-blur-sm px-3 py-2 rounded border border-border">
            Layer: {focusLayer.toUpperCase()}
          </div>
        </div>
      )}

      {/* System Metrics (when complexity is high) */}
      {complexity > 0.7 && (
        <div
          className="absolute bottom-4 right-4 font-mono text-xs"
          style={{ transition: 'opacity 0.2s ease' }}
        >
          <div className="bg-background/80 backdrop-blur-sm px-3 py-2 rounded border border-border space-y-1">
            <div className="text-muted">Nodes: {topology.nodes.length}</div>
            <div className="text-muted">Connections: {topology.connections.length}</div>
            <div className="text-muted">Complexity: {Math.round(complexity * 100)}%</div>
          </div>
        </div>
      )}
    </div>
  )
}

