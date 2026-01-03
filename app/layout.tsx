import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { siteConfig } from '@/config/site'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import { SmoothScrollProvider } from '@/components/motion/SmoothScrollProvider'
import { TechnicalStateProvider } from '@/contexts/TechnicalStateContext'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url.base),
  title: {
    default: siteConfig.seo.title,
    template: `%s | ${siteConfig.websiteName}`,
  },
  description: siteConfig.seo.description,
  keywords: [...siteConfig.seo.keywords],
  authors: [{ name: siteConfig.seo.author }],
  creator: siteConfig.seo.author,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url.base,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    siteName: siteConfig.websiteName,
    images: [
      {
        url: siteConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.websiteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [siteConfig.seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <TechnicalStateProvider>
            <SmoothScrollProvider>
              {children}
            </SmoothScrollProvider>
          </TechnicalStateProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

