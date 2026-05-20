import { useRef } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'
import ScrollReveal from './ScrollReveal'

const ease = [0.16, 1, 0.3, 1]

/* ── 3-D tilt card ── */
function TiltCard({ children, className }) {
  const ref = useRef(null)
  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)
  const z    = useMotionValue(0)

  const onMove = (e) => {
    const r  = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width  - 0.5
    const py = (e.clientY - r.top)  / r.height - 0.5
    rotX.set(-py * 8)
    rotY.set( px * 8)
    z.set(6)
  }
  const onLeave = () => {
    animate(rotX, 0, { type: 'spring', stiffness: 200, damping: 22 })
    animate(rotY, 0, { type: 'spring', stiffness: 200, damping: 22 })
    animate(z,    0, { type: 'spring', stiffness: 200, damping: 22 })
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX: rotX, rotateY: rotY, translateZ: z, transformPerspective: 900 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  )
}

const cards = [
  {
    size: 'large',
    img:  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop',
    alt:  'Diwali Catalogue 2025',
    tag:  'PDF Catalogue',
    cat:  'Diwali 2025',
    title: 'Festive Opulence Collection',
    desc:  'A curated journey through our finest festive hampers — artisan sweets, diyas, dry fruits & luxury keepsakes.',
    modal: { name: 'Diwali 2025 Catalogue', cat: 'Festive Collection', type: 'pdf', src: '/assets/2025 Diwali catalogue.pdf' },
  },
  {
    size: 'large',
    img:  'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?q=80&w=800&auto=format&fit=crop',
    alt:  'Corporate Hampers',
    tag:  'PDF Catalogue',
    cat:  'Corporate',
    title: 'Executive Hamper Collection',
    desc:  'Premium B2B gifting with custom branding. From boardroom to client desks — make every gesture memorable.',
    modal: { name: 'Corporate Hampers', cat: 'B2B Gifting Solutions', type: 'pdf', src: '/assets/Corporate Hampers.pdf' },
  },
  {
    size: 'small',
    img:  'https://images.unsplash.com/photo-1583394293214-0b3c4984bfd1?q=80&w=600&auto=format&fit=crop',
    alt:  'Diwali Hamper',
    cat:  'Diwali 2025',
    title: 'Premium Festive Box',
    price: 'Enquire for Pricing',
    modal: { name: 'Premium Festive Box', cat: 'Diwali 2025', type: 'image', src: '/assets/diwali-photo.jpg' },
  },
  {
    size: 'small',
    img:  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=600&auto=format&fit=crop',
    alt:  'Corporate Hamper',
    cat:  'Corporate',
    title: 'The Executive Suite',
    price: 'Enquire for Pricing',
    modal: { name: 'The Executive Suite', cat: 'Corporate Gifting', type: 'image', src: '/assets/corporate-photo.jpg' },
  },
]

export default function Collections({ openModal }) {
  return (
    <section className="section collections" id="collections">
      <div className="container">

        <ScrollReveal className="section-head text-center">
          <span className="eyebrow">The 2025 Edit</span>
          <h2 className="section-title">
            Our Catalogues<br />& <em>Curated Hampers</em>
          </h2>
          <p className="section-sub">
            Explore our handpicked collections — each hamper a labour of love.
          </p>
        </ScrollReveal>

        <div className="coll-grid">
          {cards.map((c, i) => (
            <ScrollReveal key={c.title} delay={i * 0.1} direction="up">
              <TiltCard className={`coll-card coll-card--${c.size}`}>
                <div className="cc-img-wrap">
                  <img src={c.img} alt={c.alt} loading="lazy" />
                  <div className="cc-overlay">
                    <button
                      className="btn btn-gold btn-sm"
                      onClick={() => openModal(c.modal.name, c.modal.cat, c.modal.type, c.modal.src)}
                    >
                      {c.size === 'large' ? 'Open Catalogue →' : 'Quick View'}
                    </button>
                  </div>
                  {c.tag && <div className="cc-tag">{c.tag}</div>}
                </div>
                <div className="cc-info">
                  <span className="cc-cat">{c.cat}</span>
                  <h3 className="cc-title">{c.title}</h3>
                  {c.desc  && <p className="cc-desc">{c.desc}</p>}
                  {c.price && <span className="cc-price">{c.price}</span>}
                  {c.desc  && (
                    <button
                      className="cc-link"
                      onClick={() => openModal(c.modal.name, c.modal.cat, c.modal.type, c.modal.src)}
                    >
                      View Full Catalogue →
                    </button>
                  )}
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  )
}
