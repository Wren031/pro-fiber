import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar/Navbar'
import Hero from './features/hero/Hero'
import Plans from './features/plans/Plans'
import Coverage from './features/coverage/Coverage'
import Services from './features/services/Services'
import WhyChooseUs from './features/whyChooseUs/WhyChooseUs'
import Stats from './features/stats/Stats'
import Testimonials from './features/testimonials/Testimonials'
import FAQ from './features/faq/FAQ'
import Contact from './features/contact/Contact'
import Footer from './components/Footer/Footer'
import Login from './features/login/Login'
import Dashboard from './features/dashboard/Dashboard'

function HomePage() {
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

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}
