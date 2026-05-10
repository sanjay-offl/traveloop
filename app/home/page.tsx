import Link from 'next/link'

import { Navbar } from '../../components/navbar/Navbar'
import { Hero } from '../../components/hero/Hero'
import PopularDestinations from '../../components/sections/PopularDestinations'
import { Features } from '../../components/sections/FeaturesSection'
import InspirationSection from '../../components/sections/InspirationSection'
import CommunitySection from '../../components/sections/CommunitySection'
import CTASection from '../../components/sections/CTASection'
import { Footer } from '../../components/footer/Footer'
import ClientEffects from '../../components/ClientEffects'

export default function HomePage() {
  return (
    <main className="page-shell space-y-6">
      <ClientEffects />
      <Navbar />
      <Hero />
      <section className="section-card grid gap-6 px-6 py-8 sm:px-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-14">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.18em] text-brand-cyan">Full dashboard</p>
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
            The complete Traveloop planner is ready in the dashboard.
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-white/70 sm:text-base">
            Trips, budget, calendar, checklist, notifications, and profile controls all live in one place.
            Open the dashboard to see the full planning experience.
          </p>
        </div>
        <div className="flex lg:justify-end">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-full bg-brand-cyan px-6 py-3 font-semibold text-brand-black transition-transform duration-300 hover:-translate-y-0.5"
          >
            Launch dashboard
          </Link>
        </div>
      </section>
      <PopularDestinations />
      <Features />
      <InspirationSection />
      <CommunitySection />
      <CTASection />
      <Footer />
    </main>
  )
}
