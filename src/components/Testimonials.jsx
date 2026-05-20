import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from './ScrollReveal'

const ease = [0.16, 1, 0.3, 1]

const reviews = [
  {
    stars: 5,
    quote: '"The Diwali hampers were absolutely stunning. Our clients were blown away by the packaging and the quality of products inside. Will definitely order again!"',
    name:  'Riya Mehta',
    role:  'Marketing Head, TechVentures Ltd.',
    init:  'R',
  },
  {
    stars: 5,
    quote: '"We ordered 200 corporate hampers with custom branding and the entire experience was seamless. The team at TAG is incredibly professional and detail-oriented."',
    name:  'Arjun Sharma',
    role:  'CEO, Pinnacle Realtors',
    init:  'A',
  },
  {
    stars: 5,
    quote: '"From Jaipur to Mumbai, delivered perfectly on time for our anniversary event. The hampers had that rare quality — luxurious yet personal. Absolutely loved it!"',
    name:  'Priya Kapoor',
    role:  'Event Director, The Grand Events',
    init:  'P',
  },
]

const slideV = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.6, ease } },
  exit:  (dir) => ({ opacity: 0, x: dir < 0 ? 80 : -80, transition: { duration: 0.4, ease } }),
}

export default function Testimonials() {
  const [[idx, dir], setPage] = useState([0, 0])

  const go = useCallback((newDir) => {
    setPage(([i]) => {
      const next = (i + newDir + reviews.length) % reviews.length
      return [next, newDir]
    })
  }, [])

  useEffect(() => {
    const t = setInterval(() => go(1), 5000)
    return () => clearInterval(t)
  }, [go])

  const r = reviews[idx]

  return (
    <section className="section testimonials" id="testimonials">
      <div className="container">

        <ScrollReveal className="section-head text-center">
          <span className="eyebrow">Client Love</span>
          <h2 className="section-title">
            What Our Clients<br /><em>Say About Us</em>
          </h2>
        </ScrollReveal>

        {/* ── Desktop: 3-card grid ── */}
        <div className="testi-grid">
          {reviews.map((r, i) => (
            <ScrollReveal key={r.name} delay={i * 0.12}>
              <motion.div
                className="testi-card"
                whileHover={{ y: -6, boxShadow: '0 24px 72px rgba(0,0,0,0.55)', borderColor: 'rgba(212,175,55,0.14)' }}
                transition={{ duration: 0.35, ease }}
              >
                <div className="tc-stars">{'★'.repeat(r.stars)}</div>
                <p className="tc-quote">{r.quote}</p>
                <div className="tc-author">
                  <div className="tc-avatar">{r.init}</div>
                  <div>
                    <span className="tc-name">{r.name}</span>
                    <span className="tc-role">{r.role}</span>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* ── Mobile: animated slider ── */}
        <div className="testi-slider">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={idx}
              className="testi-card"
              custom={dir}
              variants={slideV}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <div className="tc-stars">{'★'.repeat(r.stars)}</div>
              <p className="tc-quote">{r.quote}</p>
              <div className="tc-author">
                <div className="tc-avatar">{r.init}</div>
                <div>
                  <span className="tc-name">{r.name}</span>
                  <span className="tc-role">{r.role}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="ts-controls">
            <button className="ts-btn" onClick={() => go(-1)}>←</button>
            <div className="ts-dots">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  className={`ts-dot ${i === idx ? 'active' : ''}`}
                  onClick={() => setPage([i, i > idx ? 1 : -1])}
                />
              ))}
            </div>
            <button className="ts-btn" onClick={() => go(1)}>→</button>
          </div>
        </div>

      </div>
    </section>
  )
}
