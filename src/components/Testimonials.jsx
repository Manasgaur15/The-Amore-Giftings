import ScrollReveal from './ScrollReveal'

const reviews = [
  {
    stars: 5,
    quote: 'The Diwali hampers were absolutely stunning. Our clients were blown away by the packaging and quality of products inside.',
    name:  'Riya Mehta',
    role:  'Marketing Head, TechVentures Ltd.',
  },
  {
    stars: 5,
    quote: 'We ordered 200 corporate hampers with custom branding. The entire experience was seamless and incredibly professional.',
    name:  'Arjun Sharma',
    role:  'CEO, Pinnacle Realtors',
  },
  {
    stars: 5,
    quote: 'From Jaipur to Mumbai, delivered perfectly on time for our anniversary event. Luxurious yet deeply personal.',
    name:  'Priya Kapoor',
    role:  'Event Director, The Grand Events',
  },
  {
    stars: 5,
    quote: 'Exceptional quality and presentation. The attention to detail is unmatched. We order every festive season without fail.',
    name:  'Vikram Joshi',
    role:  'Director, Sunrise Enterprises',
  },
  {
    stars: 5,
    quote: 'Every hamper told a story. The craft and care put into each box is simply extraordinary. Truly a 5-star experience.',
    name:  'Ananya Singh',
    role:  'Creative Lead, DesignHub',
  },
]

function ReviewItem({ r }) {
  return (
    <div className="tmq-item">
      <div className="tmq-stars">{'★'.repeat(r.stars)}</div>
      <p className="tmq-quote">"{r.quote}"</p>
      <div>
        <span className="tmq-name">{r.name}</span>
        <span className="tmq-role">{r.role}</span>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const doubled = [...reviews, ...reviews]

  return (
    <section className="section testimonials-v2" id="testimonials">
      <div className="container">
        <ScrollReveal className="section-head text-center">
          <span className="eyebrow">Client Love</span>
          <h2 className="section-title">
            What Our Clients <em>Say</em>
          </h2>
        </ScrollReveal>
      </div>

      <div className="tmq-wrap">
        <div className="tmq-track tmq-left">
          {doubled.map((r, i) => <ReviewItem key={i} r={r} />)}
        </div>
        <div className="tmq-track tmq-right">
          {doubled.map((r, i) => <ReviewItem key={i} r={r} />)}
        </div>
      </div>
    </section>
  )
}
