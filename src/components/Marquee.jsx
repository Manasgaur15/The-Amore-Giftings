const items = [
  'LUXURY PACKAGING', 'PAN-INDIA DELIVERY', 'CUSTOM BRANDING',
  'HANDWRITTEN NOTES', 'PREMIUM SOURCING',  'BESPOKE HAMPERS',  'SINCE 2020',
]

const Row = () =>
  items.map((t, i) => (
    <span key={i} className="marquee-item">
      <span className="mq-text">{t}</span>
      <span className="mq-sep">◆</span>
    </span>
  ))

export default function Marquee() {
  return (
    <div className="marquee-strip" aria-hidden="true">
      <div className="marquee-track">
        <Row /><Row />
      </div>
    </div>
  )
}
