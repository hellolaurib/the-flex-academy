import Header from './sections/Header.jsx'
import Hero from './sections/Hero.jsx'
import Stats from './sections/Stats.jsx'
import HowItWorks from './sections/HowItWorks.jsx'
import Grow from './sections/Grow.jsx'
import Learn from './sections/Learn.jsx'
import Programmes from './sections/Programmes.jsx'
import Team from './sections/Team.jsx'
import Testimonials from './sections/Testimonials.jsx'
import Webinar from './sections/Webinar.jsx'
import FinalCta from './sections/FinalCta.jsx'
import Faqs from './sections/Faqs.jsx'
import Footer from './sections/Footer.jsx'
import useReveal from './useReveal.js'
import useSmoothAnchors from './useSmoothAnchors.js'

// The Flex Academy landing page — Figma "Landing Page" / Home (4:1089)
export default function App() {
  useReveal()
  useSmoothAnchors()

  return (
    <>
      <Header />
      <main>
        {/* Hero sticks inside this wrapper only, so it can never peek through later sections */}
        <div className="relative">
          <Hero />
          <Stats />
        </div>
        <HowItWorks />
        <Grow />
        <Learn />
        <Programmes />
        <Team />
        <Testimonials />
        <Webinar />
        <FinalCta />
        <Faqs />
      </main>
      <Footer />
    </>
  )
}
