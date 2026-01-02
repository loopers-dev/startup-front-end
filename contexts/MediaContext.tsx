'use client'

/**
 * MediaContext
 * 
 * Context provider for managing media state across the application.
 * 
 * Architecture:
 * - Centralized media state management
 * - Lazy loading of media assets
 * - Caching for performance
 * - State-driven media selection (synced with TechnicalState)
 */

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import { MediaAsset } from '@/lib/media-discovery'
import { MediaIntent, getMediaConfigByIntent } from '@/config/media'
import { discoverMedia } from '@/lib/media-discovery'
import { useTechnicalState } from './TechnicalStateContext'

interface MediaContextValue {
  getMedia: (intent: MediaIntent) => MediaAsset | null
  getMediaForState: () => MediaAsset | null
  setActiveMedia: (intent: MediaIntent) => void
  activeMedia: MediaIntent | null
  preloadMedia: (intent: MediaIntent) => Promise<void>
  isMediaLoading: (intent: MediaIntent) => boolean
}

const MediaContext = createContext<MediaContextValue | undefined>(undefined)

interface MediaProviderProps {
  children: ReactNode
}

/**
 * Map technical state to media intent
 */
function getMediaIntentFromState(
  domain: string | null,
  stage: string | null
): MediaIntent | null {
  if (domain === 'web') return 'web-development'
  if (domain === 'mobile') return 'mobile-development'
  if (domain === 'ai') return 'ai-automation'
  if (domain === 'migration') return 'system-migration'
  if (stage === 'discovery') return 'process-discovery'
  if (stage === 'design') return 'process-design'
  if (stage === 'build') return 'process-development'
  if (stage === 'deploy') return 'process-deployment'
  return null
}

export function MediaProvider({ children }: MediaProviderProps) {
  // MediaProvider must be inside TechnicalStateProvider (enforced by layout)
  const technicalState = useTechnicalState()

  const [mediaCache, setMediaCache] = useState<Map<MediaIntent, MediaAsset>>(new Map())
  const [loadingSet, setLoadingSet] = useState<Set<MediaIntent>>(new Set())
  const [activeMedia, setActiveMedia] = useState<MediaIntent | null>(null)

  const preloadMedia = useCallback(
    async (intent: MediaIntent) => {
      // Skip if already cached or loading
      if (mediaCache.has(intent) || loadingSet.has(intent)) {
        return
      }

      const config = getMediaConfigByIntent(intent)
      if (!config) return

      setLoadingSet(prev => new Set(prev).add(intent))

      try {
        const asset = await discoverMedia(intent, config.keywords, config.type)
        if (asset) {
          setMediaCache(prev => new Map(prev).set(intent, asset))
        }
      } catch (error) {
        console.error(`Failed to load media for intent: ${intent}`, error)
      } finally {
        setLoadingSet(prev => {
          const next = new Set(prev)
          next.delete(intent)
          return next
        })
      }
    },
    [mediaCache, loadingSet]
  )

  // Sync media with technical state
  useEffect(() => {
    const effectiveDomain = technicalState.previewState?.currentDomain || technicalState.currentDomain
    const effectiveStage = technicalState.previewState?.systemStage || technicalState.systemStage
    
    const intent = getMediaIntentFromState(effectiveDomain, effectiveStage)
    if (intent && intent !== activeMedia) {
      setActiveMedia(intent)
      preloadMedia(intent)
    }
  }, [technicalState.currentDomain, technicalState.systemStage, technicalState.previewState, activeMedia, preloadMedia])

  const getMedia = useCallback(
    (intent: MediaIntent): MediaAsset | null => {
      return mediaCache.get(intent) || null
    },
    [mediaCache]
  )

  const isMediaLoading = useCallback(
    (intent: MediaIntent): boolean => {
      return loadingSet.has(intent)
    },
    [loadingSet]
  )

  const handleSetActiveMedia = useCallback((intent: MediaIntent) => {
    setActiveMedia(intent)
    // Preload if not already cached
    if (!mediaCache.has(intent)) {
      preloadMedia(intent)
    }
  }, [mediaCache, preloadMedia])

  const getMediaForState = useCallback((): MediaAsset | null => {
    const effectiveDomain = technicalState.previewState?.currentDomain || technicalState.currentDomain
    const effectiveStage = technicalState.previewState?.systemStage || technicalState.systemStage
    
    const intent = getMediaIntentFromState(effectiveDomain, effectiveStage)
    if (intent) {
      return getMedia(intent)
    }
    return null
  }, [technicalState, getMedia])

  const value: MediaContextValue = {
    getMedia,
    getMediaForState,
    setActiveMedia: handleSetActiveMedia,
    activeMedia,
    preloadMedia,
    isMediaLoading,
  }

  return <MediaContext.Provider value={value}>{children}</MediaContext.Provider>
}

/**
 * Hook to use media context
 */
export function useMedia() {
  const context = useContext(MediaContext)
  if (context === undefined) {
    throw new Error('useMedia must be used within a MediaProvider')
  }
  return context
}

