import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ease = [0.16, 1, 0.3, 1]

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  duration = 0.9,
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-70px' })

  const hidden = {
    opacity: 0,
    y: direction === 'up' ? 44 : direction === 'down' ? -44 : 0,
    x: direction === 'left' ? 64 : direction === 'right' ? -64 : 0,
  }

  return (
    <motion.div
      ref={ref}
      initial={hidden}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : hidden}
      transition={{ duration, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
