'use client'

/**
 * TechnologyStack Section
 * 
 * Client Component for technology stack section with background media.
 * 
 * Architecture:
 * - Background video/image for tech visualization
 * - Preloads media on mount
 * - Respects accessibility preferences
 */

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ScrollReveal } from '@/components/motion/ScrollReveal'
import { StaggerReveal } from '@/components/motion/StaggerReveal'
import { scaleIn } from '@/lib/animations'
import { useTechnicalState } from '@/contexts/TechnicalStateContext'

const technologies = [
  {
    category: 'Frontend',
    items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'TypeScript', 'REST APIs', 'GraphQL'],
  },
  {
    category: 'AI & ML',
    items: ['OpenAI API', 'LangChain', 'Vector Databases', 'Custom Models'],
  },
  {
    category: 'Infrastructure',
    items: ['AWS', 'Vercel', 'Docker', 'CI/CD'],
  },
]

export function TechnologyStack() {
  const { setActiveSection } = useTechnicalState()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { margin: '-20%', once: false })
  
  // Claim visual ownership
  useEffect(() => {
    if (isInView) {
      setActiveSection('technology')
    } else {
      setActiveSection(null)
    }
  }, [isInView, setActiveSection])

  return (
    <section
      id="technology"
      ref={sectionRef}
      className="section-padding bg-surface relative"
    >
      {/* Environment is persistent, no need to mount here */}
      <div className="container mx-auto max-w-7xl relative z-10">
        <ScrollReveal>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-center tracking-tight">
            Technology Stack
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={0.1}>
          <p className="text-xl sm:text-2xl text-muted mb-20 text-center max-w-3xl mx-auto">
            Modern tools and frameworks we use to build scalable solutions
          </p>
        </ScrollReveal>

        <StaggerReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={scaleIn}
                whileHover={{ y: -4 }}
                className="p-8 rounded-2xl border border-border bg-background hover:border-foreground/20 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-6">{tech.category}</h3>
                <ul className="space-y-3">
                  {tech.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-muted text-lg">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </StaggerReveal>
      </div>
    </section>
  )
}
