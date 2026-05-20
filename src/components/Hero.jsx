import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import MagBtn from './MagBtn'

const ease = [0.16, 1, 0.3, 1]

const containerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.3 } },
}
const wordV = {
  hidden: { opacity: 0, y: 110, skewY: 5 },
  show:   { opacity: 1, y: 0, skewY: 0, transition: { duration: 1.1, ease } },
}
const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 28 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease, delay },
})

export default function Hero({ openModal }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY     = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const contentY = useTransform(scrollYProgress, [0, 0.6], ['0%', '12%'])
  const opacity  = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  return (
    <section className="hero-cin" id="hero" ref={ref}>

      {/* ── Parallax background ── */}
      <motion.div className="hc-bg" style={{ y: imgY }}>
        <img
          src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1920&auto=format&fit=crop"
          alt=""
          aria-hidden="true"
        />
      </motion.div>

      {/* ── Overlay ── */}
      <div className="hc-overlay" />

      {/* ── Content ── */}
      <motion.div className="hc-content" style={{ y: contentY, opacity }}>

        <motion.div className="hc-kicker" {...fadeUp(0.05)}>
          <span className="hc-line" />
          Curated in Jaipur · Est. 2020 · Pan-India
          <span className="hc-line" />
        </motion.div>

        <motion.h1
          className="hc-title"
          variants={containerV}
          initial="hidden"
          animate="show"
        >
          <span className="hc-title-row">
            {['The', 'Art', 'of'].map((w, i) => (
              <motion.span key={i} className="hc-word" variants={wordV}>{w}</motion.span>
            ))}
          </span>
          <motion.span className="hc-word hc-italic" variants={wordV}>
            Gifting.
          </motion.span>
        </motion.h1>

        <motion.p className="hc-sub" {...fadeUp(0.72)}>
          Premium handcrafted hampers for life's most precious moments —
          from festive celebrations to corporate milestones.
        </motion.p>

        <motion.div className="hc-btns" {...fadeUp(0.9)}>
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
            <span>View Catalogue</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </MagBtn>
          <MagBtn className="btn btn-ghost btn-lg" href="#collections">
            Explore Hampers
          </MagBtn>
        </motion.div>

        <motion.div className="hc-stats" {...fadeUp(1.08)}>
          <div className="hcs-item">
            <span className="hcs-num">500+</span>
            <span className="hcs-label">Happy Clients</span>
          </div>
          <span className="hcs-sep" />
          <div className="hcs-item">
            <span className="hcs-num">50+</span>
            <span className="hcs-label">Premium Products</span>
          </div>
          <span className="hcs-sep" />
          <div className="hcs-item">
            <span className="hcs-num">5</span>
            <span className="hcs-label">Years of Craft</span>
          </div>
        </motion.div>

      </motion.div>

      {/* ── Scroll hint ── */}
      <div className="scroll-hint">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>

    </section>
  )
}
