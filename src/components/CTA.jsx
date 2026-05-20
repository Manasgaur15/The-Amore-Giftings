import ScrollReveal from './ScrollReveal'
import MagBtn from './MagBtn'

export default function CTA() {
  return (
    <section className="cta" id="contact">
      <div className="cta-deco" />
      <div className="container">
        <div className="cta-body">

          <ScrollReveal delay={0}>
            <span className="eyebrow">Get in Touch</span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="cta-title">
              Let's Create Something<br /><em>Unforgettable Together.</em>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.22}>
            <p className="cta-sub">
              Whether it's a festive hamper for 10 or a corporate order for 10,000 —
              we're here to make it perfect.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.34}>
            <div className="cta-btns">
              <MagBtn className="btn btn-gold btn-lg" href="mailto:corporate@theamoregiftings.in">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>corporate@theamoregiftings.in</span>
              </MagBtn>

              <MagBtn className="btn btn-outline btn-lg" href="tel:+917976582327">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 12a19.79 19.79 0 01-3.07-8.67A2 2 0 013.6 1.28h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 8.5a16 16 0 006 6l.92-.92a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0121.48 16z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>+91 79765 82327</span>
              </MagBtn>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  )
}
