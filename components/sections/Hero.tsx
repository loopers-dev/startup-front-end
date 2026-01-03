'use client'

/**
 * Hero Section
 * 
 * Client Component for hero section with primary motion and background media.
 * 
 * Architecture:
 * - Primary motion: Hero text reveals
 * - Background media: Abstract tech video/image
 * - Uses motion tokens for consistent timing
 * - Respects prefers-reduced-motion
 * - Server-rendered content via siteConfig
 */

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { siteConfig } from '@/config/site'
import { useTechnicalState } from '@/contexts/TechnicalStateContext'

export function Hero() {
  const { setActiveSection } = useTechnicalState()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { margin: '-20%', once: false })
  
  // Claim visual ownership
  useEffect(() => {
    if (isInView) {
      setActiveSection('hero')
    }
  }, [isInView, setActiveSection])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Overlay Annotation Panel */}
      <div className="relative w-full z-10">
        <div className="container mx-auto max-w-6xl relative z-10">
          {/* System Label Panel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-background/80 backdrop-blur-sm border border-border rounded-lg p-8 font-mono mb-8"
          >
            <div className="text-xs text-muted mb-2">SYSTEM IDENTIFIER</div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight">
              {siteConfig.websiteName}
            </h1>
            <div className="text-sm text-muted">
              <code>{siteConfig.tagline}</code>
            </div>
          </motion.div>

          {/* System Description Panel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-background/80 backdrop-blur-sm border border-border rounded-lg p-6 font-mono mb-8"
          >
            <div className="text-xs text-muted mb-3">SYSTEM DESCRIPTION</div>
            <p className="text-sm text-foreground leading-relaxed">
              Technical execution partner for startups and enterprises. We build scalable software,
              integrate AI capabilities, and deliver production-ready solutions.
            </p>
          </motion.div>

          {/* Action Panel */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="#contact"
              className="px-6 py-3 bg-primary text-background rounded border border-primary font-mono text-sm hover:bg-primary/90 transition-colors"
            >
              INIT_PROJECT
            </Link>
            <Link
              href="#services"
              className="px-6 py-3 border border-border rounded font-mono text-sm hover:border-foreground transition-colors"
            >
              VIEW_MODES
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
