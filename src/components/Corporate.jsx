import { useRef, useEffect } from 'react'
import { motion, useInView, useMotionValue, animate } from 'framer-motion'
import ScrollReveal from './ScrollReveal'
import MagBtn from './MagBtn'

const ease = [0.16, 1, 0.3, 1]

function StatNum({ target, suffix = '+' }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true })
  const count  = useMotionValue(0)
  const [display, setDisplay] = [useRef('0'), useRef(null)]

  useEffect(() => {
    if (!inView) return
    const c = animate(count, target, {
      duration: 2,
      ease: 'easeOut',
      onUpdate: (v) => {
        const n = Math.floor(v)
        if (display.current) {
          display.current.textContent =
            target >= 1000 ? Math.floor(n / 1000) + 'K' + suffix : n + suffix
        }
      },
    })
    return c.stop
  }, [inView, target, count])

  return <span ref={ref}><span ref={display}>0{suffix}</span></span>
}

const highlights = [
  { label: 'Custom Logo Branding',      desc: 'Your brand, beautifully placed on every box' },
  { label: 'Bulk Order Discounts',      desc: 'Tiered pricing for orders of all sizes' },
  { label: 'Dedicated Account Manager', desc: 'Single point of contact, quote to delivery' },
  { label: 'Pan-India Shipping',        desc: 'Delivered to multiple addresses in one order' },
]

export default function Corporate({ openModal }) {
  return (
    <section className="section corporate" id="corporate">
      <div className="corp-bg-accent" />
      <div className="container corp-grid">

        {/* ── Content ── */}
        <div className="corp-content">
          <ScrollReveal delay={0}>
            <span className="eyebrow">B2B Solutions</span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="section-title">
              Corporate Gifting,<br /><em>Elevated.</em>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="body-text">
              Build stronger client relationships and celebrate your team with premium,
              brand-aligned corporate hampers. We handle everything — from curation to
              the final delivery.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.28}>
            <ul className="corp-list">
              {highlights.map((h) => (
                <li key={h.label} className="corp-item">
                  <span className="corp-check">✓</span>
                  <div>
                    <strong>{h.label}</strong> — {h.desc}
                  </div>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.38}>
            <div className="corp-btns">
              <MagBtn className="btn btn-gold btn-lg" href="mailto:corporate@theamoregiftings.in">
                Email Us Now
              </MagBtn>
              <MagBtn className="btn btn-outline btn-lg" href="tel:+917976582327">
                +91 79765 82327
              </MagBtn>
            </div>
          </ScrollReveal>
        </div>

        {/* ── Visual ── */}
        <ScrollReveal direction="left" delay={0.15}>
          <div className="corp-visual">
            <div className="corp-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=900&auto=format&fit=crop"
                alt="Corporate Gifting"
                loading="lazy"
              />
              <div className="corp-img-border" />
            </div>

            <div className="corp-stats">
              <div className="cs-item">
                <div className="cs-num"><StatNum target={200} /></div>
                <div className="cs-label">Corporate Clients</div>
              </div>
              <div className="cs-div" />
              <div className="cs-item">
                <div className="cs-num"><StatNum target={10000} /></div>
                <div className="cs-label">Hampers Delivered</div>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}
