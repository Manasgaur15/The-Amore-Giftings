import { motion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'

const ease = [0.16, 1, 0.3, 1]

const reviews = [
  {
    stars: 5,
    quote: 'The Diwali hampers were absolutely stunning. Our clients were blown away by the packaging and quality of products inside. Will definitely order again!',
    name:  'Riya Mehta',
    role:  'Marketing Head, TechVentures Ltd.',
    init:  'R',
  },
  {
    stars: 5,
    quote: 'We ordered 200 corporate hampers with custom branding and the entire experience was seamless. The team at TAG is incredibly professional and detail-oriented.',
    name:  'Arjun Sharma',
    role:  'CEO, Pinnacle Realtors',
    init:  'A',
  },
  {
    stars: 5,
    quote: 'From Jaipur to Mumbai, delivered perfectly on time for our anniversary event. The hampers had that rare quality — luxurious yet deeply personal.',
    name:  'Priya Kapoor',
    role:  'Event Director, The Grand Events',
    init:  'P',
  },
]

export default function Testimonials() {
  return (
    <section className="section testimonials-new" id="testimonials">
      <div className="container">

        <ScrollReveal className="section-head text-center">
          <span className="eyebrow">Client Love</span>
          <h2 className="section-title">
            What Our Clients <em>Say</em>
          </h2>
          <p className="section-sub">
            From personal celebrations to large-scale corporate orders — our clients trust us
            with their most important moments.
          </p>
        </ScrollReveal>

        <div className="testi-grid-new">
          {reviews.map((r, i) => (
            <ScrollReveal key={r.name} delay={i * 0.12}>
              <motion.div
                className="testi-card-new"
                whileHover={{ y: -5 }}
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

      </div>
    </section>
  )
}
