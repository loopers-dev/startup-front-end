'use client'

/**
 * MediaBackground
 * 
 * Client Component for background media (videos/images) in sections.
 * 
 * Architecture:
 * - Full-bleed background media
 * - Content overlay support
 * - Performance optimized
 * - Accessibility aware
 * - Proper lifecycle management
 */

import { AnimatePresence } from 'framer-motion'
import { MediaFrame } from './MediaFrame'
import { MediaAsset } from '@/lib/media-discovery'

interface MediaBackgroundProps {
  asset: MediaAsset | null
  children?: React.ReactNode
  className?: string
  overlay?: boolean
  priority?: boolean
}

export function MediaBackground({
  asset,
  children,
  className = '',
  overlay = true,
  priority = false,
}: MediaBackgroundProps) {
  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        {asset && (
          <div key={asset.url} className="absolute inset-0 -z-10">
            <MediaFrame
              asset={asset}
              className="w-full h-full"
              objectFit="cover"
              priority={priority}
            />
            {overlay && (
              <div className="absolute inset-0 bg-background/40 dark:bg-background/60" />
            )}
          </div>
        )}
      </AnimatePresence>
      {children && <div className="relative z-10">{children}</div>}
    </div>
  )
}

