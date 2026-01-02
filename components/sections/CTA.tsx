'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { siteConfig } from '@/config/site'
import { ScrollReveal } from '@/components/motion/ScrollReveal'
import { fadeIn } from '@/lib/animations'
import { motionPresets } from '@/lib/motion-tokens'

export function CTA() {
  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto max-w-4xl">
        <ScrollReveal>
          <div className="text-center">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 tracking-tight"
            >
              Ready to Get Started?
            </motion.h2>
            
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{
                duration: motionPresets.fadeIn.duration,
                delay: 0.2,
              }}
              className="text-xl sm:text-2xl text-muted mb-12 max-w-2xl mx-auto"
            >
              Let's discuss your project and explore how we can help bring your vision to life.
            </motion.p>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{
                duration: motionPresets.fadeIn.duration,
                delay: 0.4,
              }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="group relative px-10 py-5 bg-foreground text-background rounded-full font-medium overflow-hidden transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">Contact Us</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
              <Link
                href="#services"
                className="px-10 py-5 border-2 border-border rounded-full font-medium hover:border-foreground transition-all duration-300 hover:scale-105"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
