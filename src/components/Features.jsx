import { motion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'

const ease = [0.16, 1, 0.3, 1]

const items = [
  {
    num:  '01',
    name: 'Artisan Sourced',
    body: 'Every product handpicked from local craftsmen across India — quality you can see, feel, and trust in every hamper.',
  },
  {
    num:  '02',
    name: 'Luxury Packaging',
    body: 'Each box is designed in-house using premium materials. The unboxing experience is as memorable as the gift itself.',
  },
  {
    num:  '03',
    name: 'Pan-India Delivery',
    body: 'From Jaipur to any corner of India, your hampers arrive safely, beautifully, and always on time.',
  },
  {
    num:  '04',
    name: 'Custom Branding',
    body: 'Corporate orders include bespoke packaging, logo printing, and personalised messaging tailored to your identity.',
  },
]

export default function Features() {
  return (
    <section className="section features-v2" id="features">
      <div className="container">

        <ScrollReveal className="section-head">
          <span className="eyebrow">Why Choose Us</span>
          <h2 className="section-title">
            Crafted to <em>Perfection.</em>
          </h2>
        </ScrollReveal>

        <div className="feat-list">
          {items.map((item, i) => (
            <ScrollReveal key={item.num} delay={i * 0.06}>
              <motion.div
                className="feat-row"
                whileHover={{ x: 14 }}
                transition={{ duration: 0.38, ease }}
              >
                <span className="feat-num">{item.num}</span>
                <h3 className="feat-name">{item.name}</h3>
                <p className="feat-body">{item.body}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  )
}
