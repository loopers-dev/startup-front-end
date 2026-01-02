'use client'

/**
 * Process Section
 * 
 * Technical process visualization with system-oriented approach.
 * Shows engineering methodology through technical representations.
 * 
 * Architecture:
 * - Reads from technical state (systemStage)
 * - Visualizes current stage in lifecycle
 * - State-driven, not event-driven
 */

import { useEffect, useRef } from 'react'
import { ProcessStep } from '@/components/cards/ProcessStep'
import { ScrollReveal } from '@/components/motion/ScrollReveal'
import { DataFlow } from '@/components/tech/DataFlow'
import { useTechnicalState, useEffectiveTechnicalState } from '@/contexts/TechnicalStateContext'
import { useInView } from 'framer-motion'

const processSteps = [
  {
    title: 'Discovery',
    description:
      'Technical analysis: system requirements, architecture constraints, and feasibility assessment. We map technical dependencies and define system boundaries.',
    technical: 'Requirements → Analysis → Specification',
  },
  {
    title: 'Design',
    description:
      'System architecture: component structure, API contracts, data models, and integration patterns. Technical specifications serve as implementation blueprint.',
    technical: 'Architecture → Components → Contracts',
  },
  {
    title: 'Development',
    description:
      'Implementation: code structure, testing frameworks, CI/CD pipelines, and quality gates. Modern practices with emphasis on maintainability and scalability.',
    technical: 'Implementation → Testing → Integration',
  },
  {
    title: 'QA & Deployment',
    description:
      'Production readiness: automated testing, performance validation, security audits, and deployment automation. Zero-downtime deployment strategies.',
    technical: 'Validation → Optimization → Deployment',
  },
]

export function Process() {
  const technicalState = useEffectiveTechnicalState()
  const { setActiveSection } = useTechnicalState()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { margin: '-20%', once: false })
  
  // Claim visual ownership when section is in view
  useEffect(() => {
    if (isInView) {
      setActiveSection('process')
    } else {
      setActiveSection(null)
    }
  }, [isInView, setActiveSection])
  
  // Highlight current stage if set
  const currentStageIndex = technicalState.systemStage
    ? processSteps.findIndex(s => s.title.toLowerCase().includes(technicalState.systemStage || ''))
    : -1

  return (
    <section id="process" ref={sectionRef} className="section-padding">
      <div className="container mx-auto max-w-5xl">
        <ScrollReveal>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-center tracking-tight">
            Our Process
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={0.1}>
          <p className="text-lg sm:text-xl md:text-2xl text-muted mb-12 sm:mb-20 text-center max-w-3xl mx-auto px-4">
            Engineering methodology: from requirements to production
          </p>
        </ScrollReveal>

        {/* Technical Flow Visualization */}
        <ScrollReveal delay={0.2}>
          <div className="bg-background/80 backdrop-blur-sm mb-12 sm:mb-16 rounded-2xl p-4 sm:p-6 md:p-8 border border-border mx-4 sm:mx-0">
            <DataFlow
              stages={processSteps.map((step, index) => ({
                id: String(index + 1),
                label: step.title,
                description: step.technical,
              }))}
            />
          </div>
        </ScrollReveal>

        <div className="space-y-12 sm:space-y-16 px-4 sm:px-0">
          {processSteps.map((step, index) => (
            <ProcessStep
              key={index}
              step={index + 1}
              title={step.title}
              description={step.description}
              index={index}
              // isActive={index === currentStageIndex}
              isActive={false}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
