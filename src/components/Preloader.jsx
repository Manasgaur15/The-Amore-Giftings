import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

export default function Preloader({ onDone }) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 2600)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {show && (
        <motion.div
          className="preloader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease }}
        >
          <div className="pl-inner">
            <motion.div
              className="pl-logo"
              initial={{ opacity: 0, y: 30, scale: 0.92 }}
              animate={{ opacity: 1, y: 0,  scale: 1 }}
              transition={{ duration: 0.9, ease }}
            >
              TAG
            </motion.div>

            <motion.p
              className="pl-tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.7 }}
            >
              The Amore Giftings
            </motion.p>

            <div className="pl-bar-wrap">
              <motion.div
                className="pl-bar"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
                style={{ transformOrigin: 'left' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
