'use client'

/**
 * TubesCursorBackground
 * 
 * Interactive 3D tubes cursor effect as background.
 * Uses Three.js TubesCursor component from CDN.
 * 
 * Architecture:
 * - Client component (requires browser APIs)
 * - Fixed position background layer
 * - Respects prefers-reduced-motion
 * - Optional click interaction for color changes
 */

import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '@/lib/motion-utils'
import { getThemePreference } from '@/lib/theme'
import { useSimpleScroll } from '@/hooks/useSimpleScroll'

interface TubesCursorBackgroundProps {
  enabled?: boolean
  interactive?: boolean
  colors?: string[]
  lightColors?: string[]
}

// Color palettes for different themes
const DARK_THEME_COLORS = ['#f967fb', '#53bc28', '#6958d5']
const DARK_THEME_LIGHT_COLORS = ['#83f36e', '#fe8a2e', '#ff008a', '#60aed5']

// Lighter, more subtle colors for light theme
const LIGHT_THEME_COLORS = ['#8b5cf6', '#06b6d4', '#ec4899'] // Purple, cyan, pink
const LIGHT_THEME_LIGHT_COLORS = ['#a78bfa', '#22d3ee', '#f472b6', '#60a5fa'] // Lighter versions

export function TubesCursorBackground({
  enabled = true,
  interactive = true,
  colors,
  lightColors,
}: TubesCursorBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const appRef = useRef<any>(null)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
    const { scrollProgress } = useSimpleScroll()
    const lastScrollProgressRef = useRef(0)
    const fpsRef = useRef<number[]>([])
    const lastFrameTimeRef = useRef(performance.now())
    const performanceModeRef = useRef<'normal' | 'reduced'>('normal')
  
  // Detect theme changes
  useEffect(() => {
    const updateTheme = () => {
        const currentTheme = getThemePreference()
        setTheme(currentTheme)
    }
    
      // Initial theme detection
    updateTheme()
    
      // Watch for theme changes via class changes
    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
    
      // Also listen to storage changes (if theme is changed in another tab)
    window.addEventListener('storage', updateTheme)
    
      // Listen for custom theme change events
      const handleThemeChange = () => updateTheme()
      window.addEventListener('themechange', handleThemeChange)

    return () => {
      observer.disconnect()
      window.removeEventListener('storage', updateTheme)
        window.removeEventListener('themechange', handleThemeChange)
    }
  }, [])
  
  useEffect(() => {
    // Get colors based on theme (defined inside useEffect to avoid dependency issues)
    const getColors = () => {
      if (colors) return colors
      return theme === 'dark' ? DARK_THEME_COLORS : LIGHT_THEME_COLORS
    }
    
    const getLightColors = () => {
      if (lightColors) return lightColors
      return theme === 'dark' ? DARK_THEME_LIGHT_COLORS : LIGHT_THEME_LIGHT_COLORS
    }
    if (!enabled || !canvasRef.current) return

    // Respect accessibility preferences
    if (prefersReducedMotion()) {
      return
    }

    let handleClick: (() => void) | null = null
    let checkInterval: NodeJS.Timeout | null = null

    // Load TubesCursor from CDN using script tag
    const loadTubesCursor = () => {
      // Check if TubesCursor is already loaded
      if ((window as any).TubesCursor) {
        initializeTubesCursor()
        return
      }

      // Create script tag to load module
      const scriptId = 'tubes-cursor-script'
      if (document.getElementById(scriptId)) {
        // Script already exists, wait for it to load
        checkInterval = setInterval(() => {
          if ((window as any).TubesCursor) {
            if (checkInterval) clearInterval(checkInterval)
            initializeTubesCursor()
          }
        }, 100)
        return
      }

      const script = document.createElement('script')
      script.id = scriptId
      script.type = 'module'
      script.textContent = `
        import TubesCursor from "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js"
        window.TubesCursor = TubesCursor
        window.dispatchEvent(new CustomEvent('tubesCursorLoaded'))
      `
      document.head.appendChild(script)

      const handleLoad = () => {
        initializeTubesCursor()
        window.removeEventListener('tubesCursorLoaded', handleLoad)
      }
      window.addEventListener('tubesCursorLoaded', handleLoad)
    }

    const initializeTubesCursor = () => {
      if (!canvasRef.current || !(window as any).TubesCursor) {
        console.log('TubesCursor not ready:', {
          hasCanvas: !!canvasRef.current,
          hasTubesCursor: !!(window as any).TubesCursor,
        })
        return
      }

      try {
        const TubesCursor = (window as any).TubesCursor

        // Ensure canvas has proper size
        const canvas = canvasRef.current
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        // Get theme-appropriate colors
        const currentColors = getColors()
        const currentLightColors = getLightColors()
        
        // Adjust intensity based on theme (much lower for light theme for subtlety)
        const intensity = theme === 'dark' ? 200 : 100

          // Performance mode detection - check if device is low-end
          const isLowEndDevice =
              navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4 ||
              (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4

          // Initialize TubesCursor with performance-aware settings
        const app = TubesCursor(canvas, {
          tubes: {
            colors: currentColors,
            lights: {
                intensity: isLowEndDevice ? intensity * 0.7 : intensity,
              colors: currentLightColors,
            },
          },
        })
        
        // Ensure cursor tracking is enabled
        // TubesCursor should automatically track cursor, but we can verify
          console.log('TubesCursor initialized with theme:', theme, 'colors:', currentColors, 'performance mode:', isLowEndDevice ? 'reduced' : 'normal')

        appRef.current = app
          performanceModeRef.current = isLowEndDevice ? 'reduced' : 'normal'
        console.log('TubesCursor initialized successfully')

        // Handle window resize
        const handleResize = () => {
          if (canvasRef.current) {
            canvasRef.current.width = window.innerWidth
            canvasRef.current.height = window.innerHeight
            app.resize?.()
          }
        }
        window.addEventListener('resize', handleResize)

        // Optional: Change colors on click
        if (interactive) {
          handleClick = () => {
            const newColors = generateRandomColors(3)
            const newLightColors = generateRandomColors(4)
            app.tubes.setColors(newColors)
            app.tubes.setLightsColors(newLightColors)
          }
          document.body.addEventListener('click', handleClick)
        }
        
          // Update colors when theme changes (will be called when theme state changes)
        const updateColors = () => {
          if (app && app.tubes) {
            const currentColors = getColors()
            const currentLightColors = getLightColors()
            app.tubes.setColors(currentColors)
              app.tubes.setLightsColors(currentLightColors)
          }
        }
        
          // Track mouse position for gradient overlay in light mode (throttled)
          let mouseUpdateRaf: number | null = null
        const updateMousePosition = (e: MouseEvent) => {
            if (theme === 'light' && !mouseUpdateRaf) {
                mouseUpdateRaf = requestAnimationFrame(() => {
                    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`)
                    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`)
                    mouseUpdateRaf = null
                })
          }
          }
          document.addEventListener('mousemove', updateMousePosition, { passive: true })

          // FPS monitoring (development only)
          let fpsCheckInterval: NodeJS.Timeout | null = null
          if (process.env.NODE_ENV === 'development') {
              fpsCheckInterval = setInterval(() => {
                  const now = performance.now()
                  const delta = now - lastFrameTimeRef.current
                  const fps = 1000 / delta

                  fpsRef.current.push(fps)
                  if (fpsRef.current.length > 60) {
                      fpsRef.current.shift()
                  }

                  const avgFps = fpsRef.current.reduce((a, b) => a + b, 0) / fpsRef.current.length

                  if (avgFps < 30 && performanceModeRef.current === 'normal') {
                      console.warn('[TubesCursor] Performance warning: FPS < 30. Consider reducing effects.')
                      performanceModeRef.current = 'reduced'
                  }

                  lastFrameTimeRef.current = now
              }, 1000)
          }

        // Cleanup handlers
        return () => {
          window.removeEventListener('resize', handleResize)
            document.removeEventListener('mousemove', updateMousePosition)
            if (mouseUpdateRaf) {
                cancelAnimationFrame(mouseUpdateRaf)
            }
            if (fpsCheckInterval) {
                clearInterval(fpsCheckInterval)
            }
        }
      } catch (error) {
        console.warn('Failed to initialize TubesCursor:', error)
      }
    }

    loadTubesCursor()

    // Cleanup on unmount
    return () => {
      if (checkInterval) {
        clearInterval(checkInterval)
      }
      if (handleClick) {
        document.body.removeEventListener('click', handleClick)
      }
      if (appRef.current) {
        try {
          appRef.current.destroy?.()
        } catch (e) {
          console.warn('Error destroying TubesCursor:', e)
        }
        appRef.current = null
      }
    }
  }, [enabled, interactive, colors, lightColors, theme])

    // Handle scroll-based color changes (only on major section changes - 25% increments)
    useEffect(() => {
        if (!appRef.current || !enabled) return

        const scrollSection = Math.floor(scrollProgress * 4) // 0, 1, 2, 3, 4
        const lastScrollSection = Math.floor(lastScrollProgressRef.current * 4)

        // Only update colors when crossing major section boundaries (25% increments)
        if (scrollSection !== lastScrollSection) {
            // Use CSS filter for brightness adjustment instead of redrawing
            // This is much more performant than changing colors
            const brightness = 1 - (scrollProgress * 0.2) // Slight darkening as you scroll

            if (canvasRef.current) {
                canvasRef.current.style.filter = `brightness(${Math.max(0.8, brightness)})`
            }

            lastScrollProgressRef.current = scrollProgress
        }
    }, [scrollProgress, enabled])

  if (!enabled || prefersReducedMotion()) {
    return null
  }

  // Adjust opacity based on theme - lower in light mode for better visibility
  const canvasOpacity = theme === 'dark' ? 1 : 0.4

  return (
    <div 
      className="fixed inset-0 z-0" 
      style={{ 
        backgroundColor: 'transparent',
        pointerEvents: 'none', // Don't block content clicks
      }}
    >
      {/* Dark overlay in light mode to make tubes more visible */}
      {theme === 'light' && (
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 0, 0, 0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
            mixBlendMode: 'multiply',
          }}
        />
      )}
      <canvas
        ref={canvasRef}
        id="tubes-cursor-canvas"
        className="w-full h-full"
        style={{
          touchAction: 'none',
          display: 'block',
          pointerEvents: 'none',
          opacity: canvasOpacity,
          transition: 'opacity 0.3s ease',
        }}
      />
    </div>
  )
}

function generateRandomColors(count: number): string[] {
  return new Array(count)
    .fill(0)
    .map(
      () =>
        '#' +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, '0')
    )
}

