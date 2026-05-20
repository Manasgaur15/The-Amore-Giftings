import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

const smoothTo = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  const nav = document.querySelector('.nav')
  const top = el.getBoundingClientRect().top + window.scrollY - (nav?.offsetHeight ?? 80) - 16
  window.scrollTo({ top, behavior: 'smooth' })
}

export default function Navbar({ openModal }) {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMobile = () => {
    setMobileOpen(false)
    document.body.style.overflow = ''
  }

  const toggleMobile = () => {
    const next = !mobileOpen
    setMobileOpen(next)
    document.body.style.overflow = next ? 'hidden' : ''
  }

  const goTo = (id) => { closeMobile(); smoothTo(id) }

  const catalogues = [
    { label: 'Diwali 2025', sub: 'Festive Hamper Collection', ico: '🪔', src: '/assets/2025%20Diwali%20catalogue.pdf', cat: 'Festive Collection' },
    { label: 'Corporate Hampers', sub: 'B2B Gifting Solutions', ico: '💼', src: '/assets/Corporate%20Hampers.pdf', cat: 'B2B Gifting Solutions' },
  ]

  const mobileLinks = [
    { label: 'Our Story',    id: 'about' },
    { label: 'Collections',  id: 'collections' },
    { label: 'B2B Services', id: 'corporate' },
    { label: 'Testimonials', id: 'testimonials' },
  ]

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner">

          <button
            className="nav-brand"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="brand-sup">The Amore Giftings</span>
            <span className="brand-mark">TAG</span>
          </button>

          <ul className="nav-links">
            <li><button className="nav-link" onClick={() => goTo('about')}>Our Story</button></li>
            <li><button className="nav-link" onClick={() => goTo('collections')}>Collections</button></li>

            <li className="nav-drop">
              <span className="nav-link">
                Catalogues
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <div className="drop-panel">
                {catalogues.map(c => (
                  <button
                    key={c.label}
                    className="dp-item"
                    onClick={() => openModal(c.label, c.cat, 'pdf', c.src)}
                  >
                    <span className="dp-ico">{c.ico}</span>
                    <div>
                      <span className="dp-name">{c.label}</span>
                      <span className="dp-sub">{c.sub}</span>
                    </div>
                  </button>
                ))}
              </div>
            </li>

            <li><button className="nav-link" onClick={() => goTo('corporate')}>B2B</button></li>
          </ul>

          <div className="nav-right">
            <a href="mailto:corporate@theamoregiftings.in" className="btn btn-gold btn-sm">
              Enquire Now
            </a>
            <button className="hamburger" onClick={toggleMobile} aria-label="Menu">
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mob-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease }}
          >
            <button className="mob-close-btn" onClick={closeMobile}>✕</button>

            <nav className="mob-nav">
              {mobileLinks.map(({ label, id }, i) => (
                <motion.button
                  key={id}
                  className="mob-link"
                  onClick={() => goTo(id)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 + 0.1, duration: 0.55, ease }}
                >
                  {label}
                </motion.button>
              ))}

              {catalogues.map((c, i) => (
                <motion.button
                  key={c.label}
                  className="mob-link"
                  onClick={() => { openModal(c.label, c.cat, 'pdf', c.src); closeMobile() }}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (mobileLinks.length + i) * 0.07 + 0.1, duration: 0.55, ease }}
                >
                  {c.label}
                </motion.button>
              ))}

              <motion.a
                href="mailto:corporate@theamoregiftings.in"
                className="mob-cta"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.52, duration: 0.55, ease }}
              >
                Enquire Now →
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
