import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, animate, useTransform, useInView } from 'framer-motion'
import MagBtn from './MagBtn'

const ease = [0.16, 1, 0.3, 1]

/* ── Animated counter ── */
function Counter({ target, suffix = '+' }) {
  const ref  = useRef(null)
  const inView = useInView(ref, { once: true })
  const count  = useMotionValue(0)
  const display = useTransform(count, v => {
    const n = Math.floor(v)
    if (target >= 1000) return Math.floor(n / 1000) + 'K' + suffix
    return n + (n >= target ? suffix : '')
  })

  useEffect(() => {
    if (!inView) return
    const c = animate(count, target, { duration: 2, ease: 'easeOut' })
    return c.stop
  }, [inView, target, count])

  return <span ref={ref}><motion.span>{display}</motion.span></span>
}

/* ── Word-stagger variants ── */
const containerV = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
}
const wordV = {
  hidden: { opacity: 0, y: 80, skewY: 4 },
  show:   { opacity: 1, y: 0,  skewY: 0, transition: { duration: 1.05, ease } },
}

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 28 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease, delay },
})

export default function Hero({ openModal }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) =>
      setMouse({
        x: (e.clientX / window.innerWidth  - 0.5) * 16,
        y: (e.clientY / window.innerHeight - 0.5) * 16,
      })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section className="hero" id="hero">
      {/* ── Background ── */}
      <div className="hero-bg">
        <div className="hero-orb orb-1" />
        <div className="hero-orb orb-2" />
      </div>
      <div className="hero-noise" />

      <div className="container">
        <div className="hero-grid">

          {/* ── Left – Content ── */}
          <div className="hero-content">
            <motion.div className="hero-badge" {...fadeUp(0.05)}>
              <span className="badge-dot" />
              Curated in Jaipur · Delivered Pan-India
            </motion.div>

            <motion.h1
              className="hero-title"
              variants={containerV}
              initial="hidden"
              animate="show"
            >
              <span className="title-line">
                {['Where', 'Every', 'Gift'].map((w, i) => (
                  <motion.span key={i} className="word" variants={wordV}>{w}</motion.span>
                ))}
              </span>
              <span className="title-line italic gold-text">
                {['Tells', 'a', 'Story.'].map((w, i) => (
                  <motion.span key={i} className="word" variants={wordV}>{w}</motion.span>
                ))}
              </span>
            </motion.h1>

            <motion.p className="hero-sub" {...fadeUp(0.6)}>
              Premium handcrafted hampers for life's most precious moments. From festive
              celebrations to corporate milestones — we curate luxury you can feel.
            </motion.p>

            <motion.div className="hero-btns" {...fadeUp(0.82)}>
              <MagBtn
                className="btn btn-gold btn-lg"
                onClick={() =>
                  openModal(
                    'Diwali 2025 Catalogue',
                    'Festive Collection',
                    'pdf',
                    '/assets/2025 Diwali catalogue.pdf',
                  )
                }
              >
                <span>View Diwali Catalogue</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </MagBtn>

              <MagBtn className="btn btn-ghost btn-lg" href="#collections">
                Explore Hampers
              </MagBtn>
            </motion.div>

            <motion.div className="hero-stats" {...fadeUp(1.02)}>
              <div className="stat">
                <div className="stat-num"><Counter target={500} /></div>
                <div className="stat-label">Happy Clients</div>
              </div>
              <div className="stat-sep" />
              <div className="stat">
                <div className="stat-num"><Counter target={50} /></div>
                <div className="stat-label">Premium Products</div>
              </div>
              <div className="stat-sep" />
              <div className="stat">
                <div className="stat-num"><Counter target={5} /></div>
                <div className="stat-label">Years of Craft</div>
              </div>
            </motion.div>
          </div>

          {/* ── Right – Visual ── */}
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, x: 70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 1.15, ease }}
          >
            <div className="hero-frame">
              <div className="frame-glow" />

              {/* 3-D tilt on mouse move */}
              <motion.div
                className="frame-img-wrap"
                animate={{
                  rotateX:  mouse.y * 0.28,
                  rotateY:  mouse.x * 0.28,
                }}
                transition={{ type: 'spring', stiffness: 55, damping: 18 }}
                style={{ transformPerspective: 1200 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=900&auto=format&fit=crop"
                  alt="Luxury Gift Hamper"
                  className="hero-img"
                  loading="eager"
                />
              </motion.div>

              {/* Floating collection card */}
              <motion.div
                className="float-card"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="fc-icon">✨</span>
                <div>
                  <div className="fc-title">2025 Collection</div>
                  <div className="fc-sub">The Royal Opulence</div>
                </div>
              </motion.div>

              {/* Floating badge */}
              <motion.div
                className="float-badge"
                animate={{ y: [0, -8, 0], rotate: [0, 2, 0, -2, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <div className="fb-num">100%</div>
                <div className="fb-label">Handcrafted</div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll hint */}
      <div className="scroll-hint">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  )
}
