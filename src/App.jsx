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

// The Flex Academy landing page — Figma "Landing Page" / Home (4:1089)
export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
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
