'use client'

/**
 * MediaFrame
 * 
 * Client Component for displaying images and videos with smooth transitions.
 * 
 * Architecture:
 * - Supports both image and video media
 * - Smooth crossfade transitions
 * - Lazy loading for performance
 * - Accessibility support
 * - Graceful fallbacks
 */

import { useState, useEffect, ReactNode, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MediaAsset } from '@/lib/media-discovery'
import { prefersReducedMotion } from '@/lib/motion-utils'
import { motionDuration, motionEasing } from '@/lib/motion-tokens'

interface MediaFrameProps {
  asset: MediaAsset | null
  className?: string
  priority?: boolean
  objectFit?: 'cover' | 'contain' | 'fill'
  overlay?: ReactNode
  onLoad?: () => void
  playbackRate?: number
}

export function MediaFrame({
  asset,
  className = '',
  priority = false,
  objectFit = 'cover',
  overlay,
  onLoad,
  playbackRate = 1.0,
}: MediaFrameProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const reducedMotion = prefersReducedMotion()

  // Update playbackRate when it changes
  useEffect(() => {
    if (videoRef.current && asset?.type === 'video') {
      videoRef.current.playbackRate = playbackRate
    }
  }, [playbackRate, asset?.type])

  useEffect(() => {
    if (asset && loaded) {
      onLoad?.()
    }
  }, [asset, loaded, onLoad])

  if (!asset || error) {
    return null
  }

  const transition = reducedMotion
    ? { duration: 0.01 }
    : {
        duration: motionDuration.normal,
        ease: motionEasing.standard,
      }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={asset.url}
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 0.15 : 0 }} // Low opacity for texture
          exit={{ opacity: 0 }}
          transition={transition}
          className="absolute inset-0"
          style={{
            filter: 'blur(20px) grayscale(0.3)',
            mixBlendMode: 'overlay',
          }}
        >
          {asset.type === 'video' ? (
            <video
              ref={videoRef}
              src={asset.url}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full"
              onLoadedData={() => {
                setLoaded(true)
                // Ensure playbackRate is set after load
                if (videoRef.current) {
                  videoRef.current.playbackRate = playbackRate
                }
              }}
              onError={() => setError(true)}
              style={{ objectFit }}
            />
          ) : (
            <img
              src={asset.url}
              alt={asset.alt}
              loading={priority ? 'eager' : 'lazy'}
              className="w-full h-full"
              onLoad={() => setLoaded(true)}
              onError={() => setError(true)}
              style={{ objectFit }}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Grain overlay for texture */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
          opacity: 0.2,
          mixBlendMode: 'overlay',
        }}
      />

      {overlay && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          {overlay}
        </div>
      )}
    </div>
  )
}

