'use client'

/**
 * TechnicalStateContext
 * 
 * Single source of truth for technical narrative state.
 * All components read from and update this unified state.
 * 
 * Architecture:
 * - Global technical state model
 * - State-driven visuals and media
 * - Unified narrative flow
 * - No component manages its own meaning
 */

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react'

/**
 * Technical Domain - What we're building
 */
export type TechnicalDomain = 'web' | 'mobile' | 'ai' | 'migration' | null

/**
 * System Stage - Where we are in the lifecycle
 */
export type SystemStage = 'discovery' | 'design' | 'build' | 'deploy' | null

/**
 * Architecture Level - Complexity of the system
 */
export type ArchitectureLevel = 'simple' | 'moderate' | 'complex'

/**
 * Focus Layer - What layer we're inspecting
 */
export type FocusLayer = 'ui' | 'api' | 'data' | 'infra' | null

/**
 * Active Section - Which section owns primary visual layer
 */
export type ActiveSection = 'hero' | 'services' | 'how-we-build' | 'process' | 'technology' | null

/**
 * Technical State Model
 * 
 * This is the single source of truth for all technical narrative.
 */
export interface TechnicalState {
  // Primary state dimensions
  currentDomain: TechnicalDomain
  systemStage: SystemStage
  architectureLevel: ArchitectureLevel
  focusLayer: FocusLayer
  
  // Visual ownership
  activeSection: ActiveSection
  
  // Interaction state
  isInspecting: boolean
  previewState: Partial<TechnicalState> | null
  
  // Scroll-based progression
  scrollProgress: number
}

/**
 * Technical State Actions
 */
export interface TechnicalStateActions {
  setDomain: (domain: TechnicalDomain) => void
  setStage: (stage: SystemStage) => void
  setArchitectureLevel: (level: ArchitectureLevel) => void
  setFocusLayer: (layer: FocusLayer) => void
  setActiveSection: (section: ActiveSection) => void
  setPreview: (preview: Partial<TechnicalState> | null) => void
  setScrollProgress: (progress: number) => void
  reset: () => void
}

interface TechnicalStateContextValue extends TechnicalState, TechnicalStateActions {}

const initialState: TechnicalState = {
  currentDomain: null,
  systemStage: null,
  architectureLevel: 'simple',
  focusLayer: null,
  activeSection: null,
  isInspecting: false,
  previewState: null,
  scrollProgress: 0,
}

const TechnicalStateContext = createContext<TechnicalStateContextValue | undefined>(undefined)

interface TechnicalStateProviderProps {
  children: ReactNode
}

export function TechnicalStateProvider({ children }: TechnicalStateProviderProps) {
  const [state, setState] = useState<TechnicalState>(initialState)

  const setDomain = useCallback((domain: TechnicalDomain) => {
    setState(prev => ({
      ...prev,
      currentDomain: domain,
      // Reset stage when domain changes
      systemStage: prev.systemStage,
      // Architecture level depends on domain
      architectureLevel: domain === 'ai' ? 'complex' : domain === 'migration' ? 'moderate' : 'simple',
    }))
  }, [])

  const setStage = useCallback((stage: SystemStage) => {
    setState(prev => ({
      ...prev,
      systemStage: stage,
      // Architecture complexity increases with stage
      architectureLevel:
        stage === 'discovery' ? 'simple' :
        stage === 'design' ? 'moderate' :
        stage === 'build' ? 'moderate' :
        stage === 'deploy' ? 'complex' :
        prev.architectureLevel,
    }))
  }, [])

  const setArchitectureLevel = useCallback((level: ArchitectureLevel) => {
    setState(prev => ({ ...prev, architectureLevel: level }))
  }, [])

  const setFocusLayer = useCallback((layer: FocusLayer) => {
    setState(prev => ({
      ...prev,
      focusLayer: layer,
      isInspecting: layer !== null,
    }))
  }, [])

  const setActiveSection = useCallback((section: ActiveSection) => {
    setState(prev => ({
      ...prev,
      activeSection: section,
    }))
  }, [])

  const setPreview = useCallback((preview: Partial<TechnicalState> | null) => {
    setState(prev => ({
      ...prev,
      previewState: preview,
      isInspecting: preview !== null,
    }))
  }, [])

  const setScrollProgress = useCallback((progress: number) => {
    setState(prev => {
      // Auto-update stage based on scroll progress
      const stages: SystemStage[] = ['discovery', 'design', 'build', 'deploy']
      const stageIndex = Math.floor(progress * (stages.length - 1))
      const newStage = stages[Math.min(stageIndex, stages.length - 1)] || null
      
      return {
        ...prev,
        scrollProgress: progress,
        systemStage: newStage !== prev.systemStage ? newStage : prev.systemStage,
      }
    })
  }, [])

  const reset = useCallback(() => {
    setState(initialState)
  }, [])

  const value: TechnicalStateContextValue = {
    ...state,
    setDomain,
    setStage,
    setArchitectureLevel,
    setFocusLayer,
    setActiveSection,
    setPreview,
    setScrollProgress,
    reset,
  }

  return (
    <TechnicalStateContext.Provider value={value}>
      {children}
    </TechnicalStateContext.Provider>
  )
}

/**
 * Hook to use technical state
 */
export function useTechnicalState() {
  const context = useContext(TechnicalStateContext)
  if (context === undefined) {
    throw new Error('useTechnicalState must be used within a TechnicalStateProvider')
  }
  return context
}

/**
 * Get effective state (current state or preview if inspecting)
 */
export function useEffectiveTechnicalState() {
  const state = useTechnicalState()
  
  if (state.previewState && state.isInspecting) {
    return {
      ...state,
      ...state.previewState,
    }
  }
  
  return state
}

