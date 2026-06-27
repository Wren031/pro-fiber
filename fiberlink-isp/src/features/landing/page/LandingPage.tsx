import Navbar from '../../../components/Navbar/Navbar'
import Footer from '../../../components/Footer/Footer'
import Hero from '../components/Hero'
import Plans from '../components/Plans'
import Coverage from '../components/Coverage'
import Services from '../components/Services'
import WhyChooseUs from '../components/WhyChooseUs'
import Stats from '../components/Stats'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Plans />
        <Coverage />
        <Services />
        <WhyChooseUs />
        <Stats />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
