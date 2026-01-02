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
import { useState, useEffect } from 'react'
import { siteConfig } from '@/config/site'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { motionDuration, motionEasing } from '@/lib/motion-tokens'

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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
          <Link
            href="#services"
            className="text-sm font-medium text-muted hover:text-foreground transition-colors duration-300"
          >
            Services
          </Link>
          <Link
            href="#process"
            className="text-sm font-medium text-muted hover:text-foreground transition-colors duration-300"
          >
            Process
          </Link>
          <Link
            href="#team"
            className="text-sm font-medium text-muted hover:text-foreground transition-colors duration-300"
          >
            Team
          </Link>
          <Link
            href="#contact"
            className="text-sm font-medium text-muted hover:text-foreground transition-colors duration-300"
          >
            Contact
          </Link>
          <ThemeToggle />
        </nav>

        <div className="md:hidden">
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  )
}
