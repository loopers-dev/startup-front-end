'use client'

/**
 * Header
 * 
 * Client Component for site header with scroll-based styling.
 * 
 * Architecture:
 * - Fixed position with scroll detection
 * - Smooth entrance animation
 * - Theme toggle integration
 * - Navigation links
 */

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { siteConfig } from '@/config/site'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { motionDuration, motionEasing } from '@/lib/motion-tokens'

const navSections = [
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'process', label: 'Process', href: '#process' },
  { id: 'team', label: 'Team', href: '#team' },
  { id: 'contact', label: 'Contact', href: '#contact' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    
    // Throttle scroll handler
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener('scroll', throttledScroll, { passive: true })
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [])

  // Simple active section detection using IntersectionObserver
  useEffect(() => {
    const sections = navSections.map(section => 
      document.getElementById(section.id.replace('#', ''))
    ).filter(Boolean) as HTMLElement[]

    if (sections.length === 0) return

    // Simple observer - section is active if it's in the top 30% of viewport
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0px -50% 0px',
        threshold: [0, 0.3, 0.5],
      }
    )

    sections.forEach((section) => {
      observerRef.current?.observe(section)
    })

    return () => {
      observerRef.current?.disconnect()
    }
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: motionDuration.slow, ease: motionEasing.standard }}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'border-b border-border bg-background/80 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2 group">
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold text-foreground"
          >
            {siteConfig.websiteName}
          </motion.span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navSections.map((section) => {
            const isActive = activeSection === section.id.replace('#', '')
            return (
              <Link
                key={section.id}
                href={section.href}
                className={`text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? 'text-foreground'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                {section.label}
              </Link>
            )
          })}
          <ThemeToggle />
        </nav>

        <div className="md:hidden">
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  )
}
