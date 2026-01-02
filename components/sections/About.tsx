/**
 * About Section
 * 
 * Server Component wrapper for About section.
 * Motion is applied via client components only where needed.
 * 
 * Architecture:
 * - Server-rendered for SEO
 * - Minimal client-side JavaScript
 * - Content separated for maintainability
 */

import { AboutContent } from './AboutContent'
import { ScrollReveal } from '@/components/motion/ScrollReveal'

export function About() {
  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto max-w-5xl">
        <ScrollReveal>
          <AboutContent />
        </ScrollReveal>
      </div>
    </section>
  )
}
