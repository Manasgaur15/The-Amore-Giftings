const smoothTo = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  const nav = document.querySelector('.nav')
  const top = el.getBoundingClientRect().top + window.scrollY - (nav?.offsetHeight ?? 80) - 16
  window.scrollTo({ top, behavior: 'smooth' })
}

export default function Footer({ openModal }) {
  const catalogues = [
    { label: 'Diwali 2025',      name: 'Diwali 2025 Catalogue', cat: 'Festive Collection',    src: '/assets/2025 Diwali catalogue.pdf' },
    { label: 'Corporate Hampers', name: 'Corporate Hampers',     cat: 'B2B Gifting Solutions', src: '/assets/Corporate Hampers.pdf' },
  ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">

          {/* ── Brand ── */}
          <div className="footer-brand">
            <div className="fb-logo">TAG</div>
            <div className="fb-name">The Amore Giftings</div>
            <p className="fb-tagline">Curated with Love in Jaipur</p>
          </div>

          {/* ── Links ── */}
          <div className="footer-nav">
            <div className="fn-col">
              <h4 className="fn-head">Explore</h4>
              <a onClick={() => smoothTo('about')}>Our Story</a>
              <a onClick={() => smoothTo('collections')}>Collections</a>
              <a onClick={() => smoothTo('corporate')}>Corporate</a>
              <a onClick={() => smoothTo('testimonials')}>Testimonials</a>
            </div>

            <div className="fn-col">
              <h4 className="fn-head">Catalogues</h4>
              {catalogues.map(c => (
                <a
                  key={c.label}
                  onClick={() => openModal(c.name, c.cat, 'pdf', c.src)}
                >
                  {c.label}
                </a>
              ))}
            </div>

            <div className="fn-col">
              <h4 className="fn-head">Contact</h4>
              <a href="mailto:corporate@theamoregiftings.in">Email Us</a>
              <a href="tel:+917976582327">+91 79765 82327</a>
              <a href="https://wa.me/917976582327" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <p>© 2025 The Amore Giftings. All rights reserved. Crafted with ♥ in Jaipur.</p>
        </div>
      </div>
    </footer>
  )
}
