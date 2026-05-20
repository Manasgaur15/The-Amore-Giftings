import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ease = [0.16, 1, 0.3, 1]

const feats = [
  { ico: '🌿', title: 'Artisan Sourced',    body: 'Every product in our hampers is thoughtfully sourced from local artisans and premium suppliers across India.' },
  { ico: '✍️', title: 'Handwritten Notes',  body: 'Add a personal touch with custom handwritten messages — because every gift deserves a heartfelt word.' },
  { ico: '🎨', title: 'Custom Branding',    body: 'Corporate clients enjoy bespoke logo printing, ribbon branding, and fully customised packaging solutions.' },
  { ico: '🚀', title: 'Pan-India Delivery', body: 'Reliable, insured delivery to every corner of India. Your gift arrives beautifully — every single time.' },
]

function FeatCard({ ico, title, body, index }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className="feat-card"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, ease, delay: index * 0.12 }}
      whileHover={{ y: -6, transition: { duration: 0.35, ease } }}
    >
      <div className="feat-ico-wrap">
        <span className="feat-ico">{ico}</span>
      </div>
      <h3 className="feat-title">{title}</h3>
      <p className="feat-body">{body}</p>
    </motion.div>
  )
}

export default function Features() {
  const titleRef = useRef(null)
  const inView   = useInView(titleRef, { once: true, margin: '-60px' })

  return (
    <section className="section features" id="features">
      <div className="container">

        <div className="section-head text-center" ref={titleRef}>
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
          >
            Why Choose TAG
          </motion.span>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease, delay: 0.1 }}
          >
            Crafted with Intention,<br /><em>Delivered with Love.</em>
          </motion.h2>
        </div>

        <div className="feat-grid">
          {feats.map((f, i) => (
            <FeatCard key={f.title} {...f} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
