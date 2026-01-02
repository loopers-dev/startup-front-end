/**
 * Media Discovery System
 * 
 * Abstraction layer for discovering and selecting media based on intent and keywords.
 * This system can be extended to integrate with:
 * - Stock photo APIs (Unsplash, Pexels, etc.)
 * - AI-curated media services
 * - Custom media CDNs
 * - Placeholder services
 * 
 * Architecture:
 * - Intent-based discovery
 * - Keyword matching
 * - Fallback chain
 * - Performance-aware selection
 */

import { MediaIntent, MediaType, MediaConfig, getMediaConfigByIntent } from '@/config/media'

export interface MediaAsset {
  url: string
  type: MediaType
  thumbnail?: string
  alt: string
  width?: number
  height?: number
}

/**
 * Media discovery function
 * 
 * Uses free, copyright-free media sources:
 * - Unsplash Source API (images) - No API key required
 * - Pexels API (videos) - Free API key available
 * - Curated free media URLs as fallback
 */
export async function discoverMedia(
  intent: MediaIntent,
  keywords: string[],
  type: MediaType
): Promise<MediaAsset | null> {
  const config = getMediaConfigByIntent(intent)
  if (!config) return null

  try {
    if (type === 'image') {
      return await discoverImage(intent, keywords)
    } else {
      return await discoverVideo(intent, keywords)
    }
  } catch (error) {
    console.error(`Failed to discover media for intent: ${intent}`, error)
    // Fallback to curated free media
    return getCuratedMedia(intent, type, keywords)
  }
}

/**
 * Discover image from Unsplash (free, no API key needed)
 */
async function discoverImage(intent: MediaIntent, keywords: string[]): Promise<MediaAsset> {
  // Use Unsplash Source API - free, no API key required
  // Format: https://source.unsplash.com/featured/WIDTHxHEIGHT/?KEYWORDS
  const primaryKeyword = keywords[0] || intent
  const width = 1920
  const height = 1080
  
  // Unsplash Source API (free, no API key)
  const unsplashUrl = `https://source.unsplash.com/featured/${width}x${height}/?${encodeURIComponent(primaryKeyword)}&technology`
  
  return {
    url: unsplashUrl,
    type: 'image',
    alt: generateAltText(intent, keywords),
    width,
    height,
  }
}

/**
 * Discover video from Pexels or use curated free videos
 */
async function discoverVideo(intent: MediaIntent, keywords: string[]): Promise<MediaAsset> {
  // Try Pexels API if API key is available
  const pexelsApiKey = process.env.NEXT_PUBLIC_PEXELS_API_KEY
  
  if (pexelsApiKey) {
    try {
      const primaryKeyword = keywords[0] || intent
      const response = await fetch(
        `https://api.pexels.com/videos/search?query=${encodeURIComponent(primaryKeyword)}&per_page=1`,
        {
          headers: {
            'Authorization': pexelsApiKey,
          },
        }
      )
      
      if (response.ok) {
        const data = await response.json()
        if (data.videos && data.videos.length > 0) {
          const video = data.videos[0]
          // Get HD video file
          const videoFile = video.video_files.find((f: any) => f.quality === 'hd') || video.video_files[0]
          
          return {
            url: videoFile.link,
            type: 'video',
            thumbnail: video.image,
            alt: generateAltText(intent, keywords),
            width: video.width,
            height: video.height,
          }
        }
      }
    } catch (error) {
      console.error('Pexels API error:', error)
    }
  }
  
  // Fallback to curated free videos
  return getCuratedVideo(intent, keywords)
}

/**
 * Get curated free media (fallback)
 * 
 * Curated list of high-quality, copyright-free media URLs
 * These are direct links to free media from Unsplash, Pexels, etc.
 */
function getCuratedMedia(intent: MediaIntent, type: MediaType, keywords: string[]): MediaAsset {
  // Curated free media URLs - all copyright-free
  const curatedMedia: Partial<Record<MediaIntent, { image?: string; video?: string }>> = {
    'hero-abstract-tech': {
      video: 'https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_30fps.mp4', // Abstract tech
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80', // Technology
    },
    'web-development': {
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1920&q=80', // Code
    },
    'mobile-development': {
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1920&q=80', // Mobile
    },
    'ai-automation': {
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1920&q=80', // AI
    },
    'system-migration': {
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80', // Cloud
    },
    'process-discovery': {
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80', // Planning
    },
    'process-design': {
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1920&q=80', // Design
    },
    'process-development': {
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&q=80', // Development
    },
    'process-deployment': {
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80', // Deployment
    },
    'tech-stack-background': {
      video: 'https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_30fps.mp4', // Tech
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80', // Tech stack
    },
    'tech-abstract': {
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80', // Abstract tech
    },
  }

  const media = curatedMedia[intent]
  if (!media) {
    // Ultimate fallback - use Unsplash with keyword
    const keyword = keywords[0] || intent
    return {
      url: `https://source.unsplash.com/featured/1920x1080/?${encodeURIComponent(keyword)}`,
      type,
      alt: generateAltText(intent, keywords),
      width: 1920,
      height: 1080,
    }
  }

  const url = type === 'video' ? media.video : media.image
  if (!url) {
    // Fallback to image if video not available
    return {
      url: media.image || `https://source.unsplash.com/featured/1920x1080/?${encodeURIComponent(keywords[0] || intent)}`,
      type: 'image',
      alt: generateAltText(intent, keywords),
      width: 1920,
      height: 1080,
    }
  }

  return {
    url,
    type,
    alt: generateAltText(intent, keywords),
    width: 1920,
    height: 1080,
  }
}

/**
 * Get curated free video
 */
function getCuratedVideo(intent: MediaIntent, keywords: string[]): MediaAsset {
  // Free video URLs from Pexels (copyright-free)
  const curatedVideos: Partial<Record<MediaIntent, string>> = {
    'hero-abstract-tech': 'https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_30fps.mp4',
    'tech-stack-background': 'https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_30fps.mp4',
  }

  // Default video for tech-related intents
  const defaultVideo = 'https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_30fps.mp4'
  const videoUrl = curatedVideos[intent] || defaultVideo

  return {
    url: videoUrl,
    type: 'video',
    alt: generateAltText(intent, keywords),
    width: 1920,
    height: 1080,
  }
}

/**
 * Generate alt text for accessibility
 */
function generateAltText(intent: MediaIntent, keywords: string[]): string {
  const intentMap: Record<MediaIntent, string> = {
    'hero-abstract-tech': 'Abstract technology visualization',
    'web-development': 'Web development and coding',
    'mobile-development': 'Mobile application development',
    'ai-automation': 'Artificial intelligence and automation',
    'system-migration': 'System migration and cloud infrastructure',
    'process-discovery': 'Discovery and planning phase',
    'process-design': 'Design and prototyping phase',
    'process-development': 'Development and coding phase',
    'process-deployment': 'Deployment and launch phase',
    'tech-stack-background': 'Technology stack visualization',
    'tech-abstract': 'Abstract technology background',
  }
  
  return intentMap[intent] || keywords.join(', ')
}

/**
 * Batch discover media for multiple intents
 */
export async function discoverMediaBatch(
  intents: MediaIntent[]
): Promise<Map<MediaIntent, MediaAsset>> {
  const results = new Map<MediaIntent, MediaAsset>()
  
  for (const intent of intents) {
    const config = getMediaConfigByIntent(intent)
    if (!config) continue
    
    const asset = await discoverMedia(intent, config.keywords, config.type)
    if (asset) {
      results.set(intent, asset)
    }
  }
  
  return results
}

/**
 * Get optimized media URL
 * 
 * In production, this would:
 * - Apply image optimization (WebP, sizes, etc.)
 * - Use CDN with transformations
 * - Return responsive image sets
 */
export function getOptimizedUrl(
  asset: MediaAsset,
  options?: {
    width?: number
    height?: number
    format?: 'webp' | 'jpg' | 'png'
  }
): string {
  // Placeholder: return original URL
  // In production, apply transformations here
  return asset.url
}

