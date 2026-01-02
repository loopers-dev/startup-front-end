'use client'

/**
 * SystemDiagram
 * 
 * Visual representation of system architecture and data flow.
 * Shows technical depth through interactive system visualization.
 * 
 * Architecture:
 * - Node-based system representation
 * - Animated data flow
 * - Interactive layer inspection
 * - Scroll/click-driven state changes
 */

import { motion } from 'framer-motion'
import { useState } from 'react'
import { motionPresets } from '@/lib/motion-tokens'

interface Node {
  id: string
  label: string
  type: 'service' | 'database' | 'api' | 'frontend' | 'backend' | 'queue'
  position: { x: number; y: number }
}

interface Connection {
  from: string
  to: string
  animated?: boolean
}

interface SystemDiagramProps {
  nodes: Node[]
  connections: Connection[]
  activeNode?: string
  onNodeClick?: (nodeId: string) => void
  className?: string
}

export function SystemDiagram({
  nodes,
  connections,
  activeNode,
  onNodeClick,
  className = '',
}: SystemDiagramProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  
  // Dim inactive nodes for focus - improves readability
  const getNodeOpacity = (nodeId: string) => {
    if (activeNode === nodeId || hoveredNode === nodeId) return 1
    if (activeNode) return 0.4 // Dim inactive nodes when something is active
    return 1
  }
  
  const getConnectionOpacity = (conn: Connection) => {
    const isActive = activeNode === conn.from || activeNode === conn.to
    const isHovered = hoveredNode === conn.from || hoveredNode === conn.to
    if (isActive || isHovered) return 1
    if (activeNode) return 0.2 // Dim inactive connections when something is active
    return 0.3
  }

  const getNodeColor = (type: Node['type'], isActive: boolean) => {
    if (isActive) return 'bg-primary text-background'
    
    const colors = {
      service: 'bg-accent/20 border-accent',
      database: 'bg-secondary/20 border-secondary',
      api: 'bg-primary/20 border-primary',
      frontend: 'bg-foreground/10 border-foreground/30',
      backend: 'bg-muted/20 border-muted',
      queue: 'bg-accent/10 border-accent/50',
    }
    return colors[type] || colors.service
  }

  return (
    <div className={`relative ${className}`}>
      <svg
        className="w-full h-full"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid meet"
        style={{ color: 'var(--color-foreground)' }}
      >
        {/* Connections */}
        <g className="connections">
          {connections.map((conn, index) => {
            const fromNode = nodes.find(n => n.id === conn.from)
            const toNode = nodes.find(n => n.id === conn.to)
            if (!fromNode || !toNode) return null

            const isActive = activeNode === conn.from || activeNode === conn.to
            const isHovered = hoveredNode === conn.from || hoveredNode === conn.to
            const connOpacity = getConnectionOpacity(conn)

            return (
              <motion.line
                key={`${conn.from}-${conn.to}-${index}`}
                x1={fromNode.position.x}
                y1={fromNode.position.y}
                x2={toNode.position.x}
                y2={toNode.position.y}
                stroke="currentColor"
                strokeWidth={isActive ? 3 : 1}
                strokeOpacity={connOpacity}
                className="text-primary"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: connOpacity,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
              />
            )
          })}
        </g>

        {/* Nodes */}
        {nodes.map((node) => {
          const isActive = activeNode === node.id
          const isHovered = hoveredNode === node.id
          const nodeOpacity = getNodeOpacity(node.id)

          return (
            <g key={node.id} opacity={nodeOpacity}>
              <motion.circle
                cx={node.position.x}
                cy={node.position.y}
                r={isActive || isHovered ? 35 : 25}
                className={getNodeColor(node.type, isActive || isHovered)}
                fill="currentColor"
                stroke="currentColor"
                strokeWidth={2}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: nodes.indexOf(node) * 0.1,
                }}
                whileHover={{ scale: 1.2 }}
                onClick={() => onNodeClick?.(node.id)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                style={{ cursor: onNodeClick ? 'pointer' : 'default' }}
              />
              <text
                x={node.position.x}
                y={node.position.y + 50}
                textAnchor="middle"
                className="text-xs font-mono"
                style={{ 
                  fontSize: '12px', 
                  opacity: nodeOpacity,
                }}
              >
                {node.label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

