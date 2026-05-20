import { motion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'
import MagBtn from './MagBtn'

const ease = [0.16, 1, 0.3, 1]

const cards = [
  {
    img:   '/assets/Festive%20Opulence.png',
    tag:   'PDF Catalogue',
    cat:   'Festive',
    title: 'Festive Opulence',
    modal: { name: 'Diwali 2025 Catalogue', cat: 'Festive Collection', type: 'pdf', src: '/assets/2025%20Diwali%20catalogue.pdf' },
  },
  {
    img:   '/assets/Executive%20Suite.png',
    tag:   'PDF Catalogue',
    cat:   'Corporate',
    title: 'Executive Suite',
    modal: { name: 'Corporate Hampers', cat: 'B2B Gifting Solutions', type: 'pdf', src: '/assets/Corporate%20Hampers.pdf' },
  },
  {
    img:   '/assets/Premium%20Festive%20Box.png',
    cat:   'Festive',
    title: 'Premium Festive Box',
    modal: { name: 'Premium Festive Box', cat: 'Diwali 2025', type: 'image', src: '/assets/Premium%20Festive%20Box.png' },
  },
  {
    img:   '/assets/The%20Boardroom%20Gift%20%20Luxury%20executive%20gifting.png',
    cat:   'Corporate',
    title: 'The Boardroom Gift',
    modal: { name: 'The Boardroom Gift', cat: 'Corporate Gifting', type: 'image', src: '/assets/The%20Boardroom%20Gift%20%20Luxury%20executive%20gifting.png' },
  },
  {
    img:   '/assets/Anniversary.png',
    cat:   'Seasonal',
    title: 'Anniversary Edition',
    modal: { name: 'Anniversary Edition', cat: 'Special Occasions', type: 'image', src: '/assets/Anniversary.png' },
  },
]

export default function Collections({ openModal }) {
  return (
    <section className="section collections-new" id="collections">
      <div className="container">

        <div className="cn-head">
          <div className="cn-head-text">
            <span className="eyebrow">The 2025 Edit</span>
            <h2 className="section-title" style={{ marginBottom: 0 }}>
              Our <em>Collections</em>
            </h2>
          </div>
          <MagBtn
            className="btn btn-outline"
            href="mailto:corporate@theamoregiftings.in"
          >
            Request Custom Quote
          </MagBtn>
        </div>

        <div className="cn-grid">
          {cards.map((c, i) => (
            <ScrollReveal key={c.title} delay={i * 0.08}>
              <motion.div
                className="cn-card"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35, ease }}
                onClick={() => openModal(c.modal.name, c.modal.cat, c.modal.type, c.modal.src)}
              >
                <div className="cn-img">
                  <img src={c.img} alt={c.title} loading="lazy" />
                  {c.tag && <span className="cn-tag">{c.tag}</span>}
                </div>
                <div className="cn-info">
                  <span className="cn-cat">{c.cat}</span>
                  <h3 className="cn-title">{c.title}</h3>
                  <span className="cn-cta">
                    {c.tag ? 'Open Catalogue' : 'Quick View'}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  )
}
