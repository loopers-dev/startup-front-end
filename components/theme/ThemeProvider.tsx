'use client'

import { useEffect, useState } from 'react'
import { initializeTheme, getThemePreference, type ThemeMode } from '@/lib/theme'

interface ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    initializeTheme()
  }, [])

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <>{children}</>
  }

  return <>{children}</>
}

