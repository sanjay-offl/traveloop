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
      <PopularDestinations />
      <Features />
      <InspirationSection />
      <CommunitySection />
      <CTASection />
      <Footer />
    </main>
  )
}
