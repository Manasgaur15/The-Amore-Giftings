import { useState, useEffect } from 'react'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Collections from './components/Collections'
import Features from './components/Features'
import Corporate from './components/Corporate'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'
import Modal from './components/Modal'
import WhatsAppBtn from './components/WhatsAppBtn'
import ScrollProgress from './components/ScrollProgress'

export default function App() {
  const [modal, setModal] = useState({ open: false, name: '', category: '', type: '', src: '' })
  const [loaded, setLoaded] = useState(false)

  const openModal = (name, category, type, src) =>
    setModal({ open: true, name, category, type, src })
  const closeModal = () => setModal(m => ({ ...m, open: false }))

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    // Fallback: force-show content after 4.5s in case onExitComplete doesn't fire
    const fallback = setTimeout(() => {
      setLoaded(true)
      document.body.style.overflow = ''
    }, 4500)
    return () => clearTimeout(fallback)
  }, [])

  const handleLoaded = () => {
    setLoaded(true)
    document.body.style.overflow = ''
  }

  return (
    <>
      <ScrollProgress />
      <Preloader onDone={handleLoaded} />
      {loaded && (
        <>
          <Navbar openModal={openModal} />
          <main>
            <Hero openModal={openModal} />
            <Marquee />
            <About />
            <Collections openModal={openModal} />
            <Features />
            <Corporate openModal={openModal} />
            <Testimonials />
            <CTA />
          </main>
          <Footer openModal={openModal} />
          <WhatsAppBtn />
          <Modal modal={modal} closeModal={closeModal} />
        </>
      )}
    </>
  )
}
