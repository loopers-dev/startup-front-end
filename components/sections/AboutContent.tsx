/**
 * AboutContent
 * 
 * Server Component containing the About section content.
 * Separated from motion logic for better SEO and performance.
 * 
 * Architecture:
 * - Server-rendered content (better SEO)
 * - Motion wrapper applied in parent component
 * - Semantic HTML structure maintained
 */

export function AboutContent() {
  return (
    <>
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-16 text-center tracking-tight">
        Our Mission
      </h2>

      <div className="space-y-8">
        <p className="text-lg sm:text-xl md:text-2xl text-muted leading-relaxed max-w-3xl mx-auto">
          We are a technical execution partner focused on building software that matters.
          Our mission is to bridge the gap between ambitious product vision and reliable,
          scalable technical implementation.
        </p>

        <p className="text-lg sm:text-xl text-muted leading-relaxed max-w-3xl mx-auto">
          We work with startup founders, SMEs, and enterprise teams who need technical
          expertise without the overhead of building an in-house team from scratch.
          Our approach combines modern development practices with pragmatic business
          understanding.
        </p>

        <p className="text-lg sm:text-xl text-muted leading-relaxed max-w-3xl mx-auto">
          Whether you need a complete product built, AI capabilities integrated into
          existing systems, or technical leadership to guide your team, we provide
          the expertise and execution you need.
        </p>
      </div>
    </>
  )
}

