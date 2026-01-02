'use client'

import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/motion/ScrollReveal'
import { StaggerReveal } from '@/components/motion/StaggerReveal'
import { scaleIn } from '@/lib/animations'

const pricingModels = [
  {
    title: 'Project-Based',
    description:
      'Fixed-price or time-and-materials pricing for specific projects. Ideal for well-defined scopes with clear deliverables.',
  },
  {
    title: 'Retainers',
    description:
      'Ongoing monthly engagements for continuous development and support. Provides predictable costs and dedicated resources.',
  },
  {
    title: 'Staff Augmentation',
    description:
      'Integrate our engineers into your team on a part-time or full-time basis. Perfect for scaling your technical capacity quickly.',
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="section-padding">
      <div className="container mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-center tracking-tight">
            Pricing Philosophy
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={0.1}>
          <p className="text-xl sm:text-2xl text-muted mb-20 text-center max-w-3xl mx-auto">
            Flexible engagement models tailored to your needs
          </p>
        </ScrollReveal>

        <StaggerReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingModels.map((model, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                variants={scaleIn}
                whileHover={{ y: -8 }}
                className="p-8 rounded-2xl border border-border bg-background hover:border-foreground/20 transition-all duration-300"
              >
                <h3 className="text-2xl font-semibold mb-4">{model.title}</h3>
                <p className="text-lg text-muted leading-relaxed">{model.description}</p>
              </motion.div>
            ))}
          </div>
        </StaggerReveal>

        <ScrollReveal delay={0.4}>
          <div className="mt-16 text-center">
            <p className="text-lg sm:text-xl text-muted">
              All pricing is complexity-based and tailored to your specific requirements.
              Contact us for a detailed proposal.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
