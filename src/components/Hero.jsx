import { motion } from 'framer-motion'
import MagBtn from './MagBtn'

const ease = [0.16, 1, 0.3, 1]

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 32 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.85, ease, delay },
})

export default function Hero({ openModal }) {
  return (
    <section className="hero-new" id="hero">
      <div className="hn-deco-dots" />
      <div className="hn-deco-ring" />

      <div className="container hn-inner">

        {/* ── Left: Content ── */}
        <div className="hn-left">
          <motion.div className="hn-pill" {...fadeUp(0.05)}>
            <span className="hn-pill-dot" />
            Curated in Jaipur · Est. 2020
          </motion.div>

          <motion.h1 className="hn-title" {...fadeUp(0.18)}>
            Gift Every<br />Moment<br />with <em>Love.</em>
          </motion.h1>

          <motion.p className="hn-sub" {...fadeUp(0.32)}>
            Premium handcrafted hampers for life's most precious moments —
            festive celebrations, corporate milestones, and everything in between.
            Beautifully crafted in Jaipur.
          </motion.p>

          <motion.div className="hn-btns" {...fadeUp(0.46)}>
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
            <MagBtn className="btn btn-outline btn-lg" href="#collections">
              Explore Collections
            </MagBtn>
          </motion.div>

          <motion.div className="hn-stats" {...fadeUp(0.6)}>
            <div className="hn-stat">
              <span className="hn-stat-n">500+</span>
              <span className="hn-stat-l">Happy Clients</span>
            </div>
            <span className="hn-stat-sep" />
            <div className="hn-stat">
              <span className="hn-stat-n">50+</span>
              <span className="hn-stat-l">Premium Products</span>
            </div>
            <span className="hn-stat-sep" />
            <div className="hn-stat">
              <span className="hn-stat-n">5</span>
              <span className="hn-stat-l">Years of Craft</span>
            </div>
          </motion.div>
        </div>

        {/* ── Right: Visual ── */}
        <motion.div
          className="hn-right"
          initial={{ opacity: 0, x: 48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 1.0, ease }}
        >
          <div className="hn-frame">
            <img
              src="/assets/diwali-photo.jpg"
              alt="Luxury Gift Hamper by The Amore Giftings"
              className="hn-img"
              loading="eager"
            />

            {/* CSS float animation — no JS cost during scroll */}
            <div className="hn-badge float-slow">
              <span className="hn-badge-ico">✨</span>
              <div>
                <div className="hn-badge-title">2025 Collection</div>
                <div className="hn-badge-sub">Now Available</div>
              </div>
            </div>

            <div className="hn-craft float-medium">
              <div className="hn-craft-n">100%</div>
              <div className="hn-craft-l">Handcrafted</div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Scroll hint */}
      <div className="scroll-hint">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  )
}
