import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ScrollReveal from './ScrollReveal'

const features = [
  { ico: '🎁', name: 'Artisan Sourced',    desc: 'Products from local craftsmen across India' },
  { ico: '📦', name: 'Luxury Packaging',   desc: 'Every box designed in-house with care' },
  { ico: '🚚', name: 'Pan-India Delivery', desc: 'Safely delivered to your door, anywhere' },
]

export default function About() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [-30, 30])

  return (
    <section className="section about" id="about" ref={sectionRef}>
      <div className="container about-grid">

        {/* ── Images stack ── */}
        <div className="about-imgs">
          <motion.div className="ai-main" style={{ y: y1 }}>
            <img
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=800&auto=format&fit=crop"
              alt="Gift Hamper Curation"
              loading="lazy"
            />
            <div className="ai-deco" />
          </motion.div>

          <motion.div className="ai-accent" style={{ y: y2 }}>
            <img
              src="https://images.unsplash.com/photo-1608755728617-aefab37d2edd?q=80&w=400&auto=format&fit=crop"
              alt="Premium Packaging"
              loading="lazy"
            />
          </motion.div>

          <ScrollReveal delay={0.3}>
            <div className="ai-tag">
              <div className="ai-tag-city">Jaipur</div>
              <div className="ai-tag-label">City of Origin</div>
            </div>
          </ScrollReveal>
        </div>

        {/* ── Text ── */}
        <div className="about-text">
          <ScrollReveal delay={0}>
            <span className="eyebrow">Our Story</span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="section-title">
              Born from a Passion<br />for <em>Beautiful Gifting.</em>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="body-text">
              The Amore Giftings was born in the pink city of Jaipur with a single belief —
              that a gift is more than an object. It's an emotion, carefully wrapped.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.28}>
            <p className="body-text">
              Every hamper we craft is a curated experience — from the sourcing of artisan
              products to the final bow on the box. We don't just gift; we create memories
              that last.
            </p>
          </ScrollReveal>

          <div className="about-feats">
            {features.map((f, i) => (
              <ScrollReveal key={f.name} delay={0.35 + i * 0.1}>
                <div className="af-row">
                  <span className="af-ico">{f.ico}</span>
                  <div>
                    <div className="af-name">{f.name}</div>
                    <div className="af-desc">{f.desc}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
