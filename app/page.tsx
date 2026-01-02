import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Services } from '@/components/sections/Services'
import { Process } from '@/components/sections/Process'
import { TechnologyStack } from '@/components/sections/TechnologyStack'
import { HowWeBuild } from '@/components/sections/HowWeBuild'
import { Pricing } from '@/components/sections/Pricing'
import { Team } from '@/components/sections/Team'
import { CTA } from '@/components/sections/CTA'
import { EnvironmentBackground } from '@/components/media/EnvironmentBackground'
import { SystemCanvas } from '@/components/system/SystemCanvas'
import { GlobalScrollTracker } from '@/components/system/GlobalScrollTracker'

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Global System Canvas - persistent, never unmounts */}
      <SystemCanvas />
      
      {/* Global Scroll Tracker */}
      <GlobalScrollTracker />
      
      {/* Persistent environment - texture layer only */}
      <EnvironmentBackground />
      
      {/* Content as overlays on the system */}
      <div className="relative z-10">
        <Header />
        <Hero />
        <About />
        <Services />
        <HowWeBuild />
        <Process />
        <TechnologyStack />
        <Pricing />
        <Team />
        <CTA />
        <Footer />
      </div>
    </main>
  )
}

