import { useRef } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'

const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

export default function MagBtn({ children, className, onClick, href, strength = 0.28 }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const onMove = isTouch ? undefined : (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * strength)
    y.set((e.clientY - r.top - r.height / 2) * strength)
  }

  const onLeave = isTouch ? undefined : () => {
    animate(x, 0, { type: 'spring', stiffness: 200, damping: 24 })
    animate(y, 0, { type: 'spring', stiffness: 200, damping: 24 })
  }

  const Tag = href ? 'a' : 'button'

  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: 'inline-block' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <Tag href={href} onClick={onClick} className={className}>
        {children}
      </Tag>
    </motion.div>
  )
}
