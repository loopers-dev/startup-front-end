'use client'

/**
 * EnvironmentContext
 * 
 * Media as Environment, not Content.
 * 
 * Architecture:
 * - Media exists as persistent background world
 * - Sections influence environment mood/style
 * - No mount/unmount - only transforms
 * - Single video instance, multiple environment profiles
 */

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

/**
 * Environment Profile - How the world feels
 */
export type EnvironmentTone = 'light' | 'dark' | 'neutral'
export type FocalArea = 'center' | 'left' | 'right' | 'top' | 'bottom'

export interface EnvironmentProfile {
  tone: EnvironmentTone
  motionSpeed: number // 0.5 - 2.0
  blurLevel: number // 0 - 20
  grain: number // 0 - 1
  focalArea: FocalArea
  opacity: number // 0 - 1
  scale: number // 0.8 - 1.5
  brightness: number // 0 - 2
  contrast: number // 0 - 2
  saturation: number // 0 - 2
}

/**
 * Domain to Environment Profile mapping
 */
const environmentProfiles: Record<string, EnvironmentProfile> = {
  // Web: Bright, structured, fast
  web: {
    tone: 'light',
    motionSpeed: 1.2,
    blurLevel: 2,
    grain: 0.1,
    focalArea: 'center',
    opacity: 0.4,
    scale: 1.0,
    brightness: 1.2,
    contrast: 1.1,
    saturation: 1.0,
  },
  
  // Mobile: Vertical focus, kinetic
  mobile: {
    tone: 'neutral',
    motionSpeed: 1.5,
    blurLevel: 3,
    grain: 0.15,
    focalArea: 'center',
    opacity: 0.35,
    scale: 1.1,
    brightness: 1.1,
    contrast: 1.0,
    saturation: 1.1,
  },
  
  // AI: Dark, slow, abstract
  ai: {
    tone: 'dark',
    motionSpeed: 0.6,
    blurLevel: 8,
    grain: 0.3,
    focalArea: 'center',
    opacity: 0.5,
    scale: 1.2,
    brightness: 0.7,
    contrast: 1.3,
    saturation: 0.8,
  },
  
  // Migration: Wide, cloudy, stable
  migration: {
    tone: 'neutral',
    motionSpeed: 0.8,
    blurLevel: 4,
    grain: 0.2,
    focalArea: 'center',
    opacity: 0.4,
    scale: 0.9,
    brightness: 1.0,
    contrast: 1.0,
    saturation: 0.9,
  },
  
  // Default: Neutral atmosphere
  default: {
    tone: 'neutral',
    motionSpeed: 1.0,
    blurLevel: 3,
    grain: 0.15,
    focalArea: 'center',
    opacity: 0.4,
    scale: 1.0,
    brightness: 1.0,
    contrast: 1.0,
    saturation: 1.0,
  },
}

interface EnvironmentContextValue {
  currentProfile: EnvironmentProfile
  setEnvironment: (domain: string | null) => void
  transitionDuration: number
}

const EnvironmentContext = createContext<EnvironmentContextValue | undefined>(undefined)

interface EnvironmentProviderProps {
  children: ReactNode
}

export function EnvironmentProvider({ children }: EnvironmentProviderProps) {
  const [currentProfile, setCurrentProfile] = useState<EnvironmentProfile>(
    environmentProfiles.default
  )
  
  const transitionDuration = 2000 // 2s smooth transition

  const setEnvironment = useCallback((domain: string | null) => {
    const profile = domain && environmentProfiles[domain]
      ? environmentProfiles[domain]
      : environmentProfiles.default
    
    setCurrentProfile(profile)
  }, [])

  const value: EnvironmentContextValue = {
    currentProfile,
    setEnvironment,
    transitionDuration,
  }

  return (
    <EnvironmentContext.Provider value={value}>
      {children}
    </EnvironmentContext.Provider>
  )
}

/**
 * Hook to use environment context
 */
export function useEnvironment() {
  const context = useContext(EnvironmentContext)
  if (context === undefined) {
    throw new Error('useEnvironment must be used within an EnvironmentProvider')
  }
  return context
}

