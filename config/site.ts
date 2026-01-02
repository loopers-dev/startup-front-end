/**
 * Centralized site configuration
 * Update values here to change branding across the entire site
 */

export const siteConfig = {
  // Core branding
  projectName: '{{PROJECT_NAME}}',
  websiteName: '{{WEBSITE_NAME}}',
  tagline: '{{TAGLINE}}',
  
  // Theme configuration
  theme: {
    defaultMode: 'light' as 'light' | 'dark',
    primaryColor: '#000000', // Black (light) / White (dark)
    secondaryColor: '#6b7280', // Gray
    accentColor: '#3b82f6', // Blue accent
  },
  
  // Contact information
  contact: {
    email: 'hello@example.com',
  },
  
  // Social links
  social: {
    twitter: '',
    linkedin: '',
    github: '',
  },
  
  // SEO metadata
  seo: {
    title: '{{WEBSITE_NAME}} - {{TAGLINE}}',
    description: 'Technology startup landing page for pitching software development & AI agency services.',
    keywords: ['software development', 'AI integration', 'web development', 'mobile apps'],
    author: '{{PROJECT_NAME}}',
    ogImage: '/og-image.jpg',
  },
  
  // Site URLs
  url: {
    base: process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com',
  },
} as const

export type SiteConfig = typeof siteConfig

