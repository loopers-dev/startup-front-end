'use client'

/**
 * CodeGrid
 * 
 * Grid-based layout inspired by code editors and dashboards.
 * Shows technical depth through structured, system-oriented visuals.
 * 
 * Architecture:
 * - Grid system representing component structure
 * - Code-like visual language
 * - Responsive breakpoint visualization
 */

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GridCell {
  id: string
  content: ReactNode
  span?: number
  type?: 'component' | 'data' | 'logic' | 'ui'
}

interface CodeGridProps {
  cells: GridCell[]
  columns?: number
  className?: string
}

export function CodeGrid({ cells, columns = 4, className = '' }: CodeGridProps) {
  const getCellColor = (type?: string) => {
    const colors = {
      component: 'bg-primary/10 border-primary/30',
      data: 'bg-secondary/10 border-secondary/30',
      logic: 'bg-accent/10 border-accent/30',
      ui: 'bg-muted/10 border-muted/30',
    }
    return colors[type as keyof typeof colors] || colors.component
  }
  
  // Progressive reveal - stagger more for readability
  const staggerDelay = 0.08

  return (
    <div
      className={`grid gap-2 ${className}`}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {cells.map((cell, index) => (
        <motion.div
          key={cell.id}
          className={`p-4 rounded border-2 ${getCellColor(cell.type)} font-mono text-xs`}
          style={{ gridColumn: `span ${cell.span || 1}` }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{
            duration: 0.4,
            delay: index * staggerDelay,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{ scale: 1.02, borderColor: 'currentColor' }}
        >
          {cell.content}
        </motion.div>
      ))}
    </div>
  )
}

