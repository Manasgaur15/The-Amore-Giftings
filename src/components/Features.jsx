import { motion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'

const ease = [0.16, 1, 0.3, 1]

const items = [
  { ico: '🌿', title: 'Artisan Sourced',    body: 'Every product handpicked from local craftsmen across India — quality you can see and feel.' },
  { ico: '📦', title: 'Luxury Packaging',   body: 'Each box designed in-house using premium materials. The unboxing is part of the gift.' },
  { ico: '🚚', title: 'Pan-India Delivery', body: 'From Jaipur to every corner of India — safely delivered, on time, every time.' },
  { ico: '🎨', title: 'Custom Branding',    body: 'Logo printing, ribbon branding, personalised messages — tailored to your identity.' },
]

export default function Features() {
  return (
    <section className="section features-new" id="features">
      <div className="container">

        <ScrollReveal className="section-head text-center">
          <span className="eyebrow">Why Choose Us</span>
          <h2 className="section-title">
            Crafted with <em>Intention.</em>
          </h2>
          <p className="section-sub">
            Every detail matters. Here's what makes The Amore Giftings the preferred choice
            for individuals and businesses across India.
          </p>
        </ScrollReveal>

        <div className="feat-grid-new">
          {items.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.1}>
              <motion.div
                className="feat-card-new"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.35, ease }}
              >
                <div className="feat-ico-wrap">
                  <span className="feat-ico">{item.ico}</span>
                </div>
                <h3 className="feat-title-new">{item.title}</h3>
                <p className="feat-body-new">{item.body}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  )
}
