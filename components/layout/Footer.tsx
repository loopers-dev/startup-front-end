'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { siteConfig } from '@/config/site'
import { fadeIn } from '@/lib/animations'
import { motionPresets } from '@/lib/motion-tokens'

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="col-span-1 md:col-span-2"
          >
            <h3 className="text-2xl font-bold mb-4">{siteConfig.websiteName}</h3>
            <p className="text-muted max-w-md leading-relaxed">
              {siteConfig.tagline}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{
              duration: motionPresets.fadeIn.duration,
              delay: 0.1,
            }}
          >
            <h4 className="text-sm font-semibold mb-6 uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="#services"
                  className="text-muted hover:text-foreground transition-colors duration-300"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="#process"
                  className="text-muted hover:text-foreground transition-colors duration-300"
                >
                  Process
                </Link>
              </li>
              <li>
                <Link
                  href="#team"
                  className="text-muted hover:text-foreground transition-colors duration-300"
                >
                  Team
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{
              duration: motionPresets.fadeIn.duration,
              delay: 0.2,
            }}
          >
            <h4 className="text-sm font-semibold mb-6 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-muted hover:text-foreground transition-colors duration-300"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
            transition={{
              duration: motionPresets.fadeIn.duration,
              delay: 0.3,
            }}
          className="mt-16 pt-8 border-t border-border"
        >
          <p className="text-sm text-muted text-center">
            © {new Date().getFullYear()} {siteConfig.projectName}. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
