/**
 * Media Configuration
 * 
 * Defines media intent and discovery rules for each section.
 * This abstraction layer allows for dynamic media sourcing without hardcoding URLs.
 * 
 * Architecture:
 * - Section-based media mapping
 * - Keyword-based discovery hints
 * - Fallback chain for reliability
 * - Type-safe media definitions
 */

export type MediaType = 'image' | 'video'
export type MediaIntent = 
  | 'hero-abstract-tech'
  | 'web-development'
  | 'mobile-development'
  | 'ai-automation'
  | 'system-migration'
  | 'process-discovery'
  | 'process-design'
  | 'process-development'
  | 'process-deployment'
  | 'tech-stack-background'
  | 'tech-abstract'

export interface MediaConfig {
  intent: MediaIntent
  type: MediaType
  keywords: string[]
  fallback?: MediaIntent
  priority?: 'high' | 'normal' | 'low'
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
}

/**
 * Media configuration map
 * Each section defines its media requirements
 */
export const mediaConfig: Record<string, MediaConfig[]> = {
  hero: [
    {
      intent: 'hero-abstract-tech',
      type: 'video',
      keywords: ['abstract technology', 'code visualization', 'data flow', 'digital transformation'],
      priority: 'high',
      autoplay: true,
      loop: true,
      muted: true,
      fallback: 'tech-abstract',
    },
  ],
  services: [
    {
      intent: 'web-development',
      type: 'image',
      keywords: ['web development', 'code editor', 'react', 'next.js', 'typescript'],
      priority: 'normal',
    },
    {
      intent: 'mobile-development',
      type: 'image',
      keywords: ['mobile app', 'ios android', 'react native', 'mobile interface'],
      priority: 'normal',
    },
    {
      intent: 'ai-automation',
      type: 'image',
      keywords: ['artificial intelligence', 'machine learning', 'neural network', 'automation'],
      priority: 'normal',
    },
    {
      intent: 'system-migration',
      type: 'image',
      keywords: ['cloud migration', 'system architecture', 'devops', 'infrastructure'],
      priority: 'normal',
    },
  ],
  process: [
    {
      intent: 'process-discovery',
      type: 'image',
      keywords: ['discovery', 'planning', 'whiteboard', 'strategy'],
      priority: 'low',
    },
    {
      intent: 'process-design',
      type: 'image',
      keywords: ['design', 'wireframe', 'ui ux', 'prototype'],
      priority: 'low',
    },
    {
      intent: 'process-development',
      type: 'image',
      keywords: ['development', 'coding', 'programming', 'software engineering'],
      priority: 'low',
    },
    {
      intent: 'process-deployment',
      type: 'image',
      keywords: ['deployment', 'cloud', 'server', 'launch'],
      priority: 'low',
    },
  ],
  technology: [
    {
      intent: 'tech-stack-background',
      type: 'video',
      keywords: ['technology', 'code', 'abstract', 'digital'],
      priority: 'normal',
      autoplay: true,
      loop: true,
      muted: true,
      fallback: 'tech-abstract',
    },
  ],
}

/**
 * Get media config for a section
 */
export function getMediaConfig(section: string): MediaConfig[] {
  return mediaConfig[section] || []
}

/**
 * Get media config by intent
 */
export function getMediaConfigByIntent(intent: MediaIntent): MediaConfig | undefined {
  for (const configs of Object.values(mediaConfig)) {
    const config = configs.find(c => c.intent === intent)
    if (config) return config
  }
  return undefined
}

