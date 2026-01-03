'use client'

import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/motion/ScrollReveal'
import { StaggerReveal } from '@/components/motion/StaggerReveal'

// Simple fade-in variant for performance
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
}

const teamRoles = [
  {
    role: 'Founder',
    description: 'Strategic vision and business development',
  },
  {
    role: 'CTO',
    description: 'Technical leadership and architecture decisions',
  },
  {
    role: 'Head of Product Engineering',
    description: 'Product strategy and engineering execution',
  },
]

export function Team() {
  return (
    <section id="team" className="section-padding bg-surface">
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-center tracking-tight">
            Team
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={0.1}>
          <p className="text-xl sm:text-2xl text-muted mb-20 text-center max-w-3xl mx-auto">
            Experienced technical leadership focused on execution
          </p>
        </ScrollReveal>

        <StaggerReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamRoles.map((member, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                variants={fadeIn}
                className="p-8 rounded-2xl border border-border bg-background hover:border-foreground/20 transition-all duration-300 text-center"
              >
                <h3 className="text-2xl font-semibold mb-4">{member.role}</h3>
                <p className="text-lg text-muted">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </StaggerReveal>
      </div>
    </section>
  )
}
