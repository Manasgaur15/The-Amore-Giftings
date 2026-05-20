import { useRef } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'

const ease = [0.16, 1, 0.3, 1]

const cards = [
  {
    img:   'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop',
    cat:   'Festive',
    title: 'Festive Opulence',
    desc:  'Diwali 2025 Collection',
    modal: { name: 'Diwali 2025 Catalogue', cat: 'Festive Collection', type: 'pdf', src: '/assets/2025 Diwali catalogue.pdf' },
  },
  {
    img:   'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?q=80&w=800&auto=format&fit=crop',
    cat:   'Corporate',
    title: 'Executive Suite',
    desc:  'B2B Gifting Solutions',
    modal: { name: 'Corporate Hampers', cat: 'B2B Gifting Solutions', type: 'pdf', src: '/assets/Corporate Hampers.pdf' },
  },
  {
    img:   'https://images.unsplash.com/photo-1583394293214-0b3c4984bfd1?q=80&w=800&auto=format&fit=crop',
    cat:   'Festive',
    title: 'Premium Festive Box',
    desc:  'Handcrafted with love',
    modal: { name: 'Premium Festive Box', cat: 'Diwali 2025', type: 'image', src: '/assets/diwali-photo.jpg' },
  },
  {
    img:   'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=800&auto=format&fit=crop',
    cat:   'Corporate',
    title: 'The Boardroom Gift',
    desc:  'Luxury executive gifting',
    modal: { name: 'The Executive Suite', cat: 'Corporate Gifting', type: 'image', src: '/assets/corporate-photo.jpg' },
  },
  {
    img:   'https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=800&auto=format&fit=crop',
    cat:   'Seasonal',
    title: 'Anniversary Edition',
    desc:  'For milestone moments',
    modal: { name: 'Anniversary Edition', cat: 'Special Occasions', type: 'image', src: '/assets/diwali-photo.jpg' },
  },
]

export default function Collections({ openModal }) {
  const constraintRef = useRef(null)

  return (
    <section className="collections-v2" id="collections">
      <div className="container">
        <ScrollReveal className="cv2-head">
          <span className="eyebrow">The 2025 Edit</span>
          <h2 className="section-title">Our <em>Collections</em></h2>
          <p className="cv2-hint">— Drag to explore</p>
        </ScrollReveal>
      </div>

      <div className="cv2-drag-outer" ref={constraintRef}>
        <motion.div
          className="cv2-track"
          drag="x"
          dragConstraints={constraintRef}
          dragElastic={0.04}
          whileDrag={{ cursor: 'grabbing' }}
        >
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              className="cv2-card"
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.75, delay: i * 0.07, ease }}
              onClick={() => openModal(c.modal.name, c.modal.cat, c.modal.type, c.modal.src)}
            >
              <div className="cv2-img">
                <img src={c.img} alt={c.title} loading="lazy" draggable="false" />
                <div className="cv2-img-ov" />
              </div>
              <div className="cv2-info">
                <span className="cv2-cat">{c.cat}</span>
                <h3 className="cv2-title">{c.title}</h3>
                <p className="cv2-desc">{c.desc}</p>
                <span className="cv2-cta">View →</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
