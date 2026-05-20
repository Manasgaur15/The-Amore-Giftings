import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

export default function Modal({ modal, closeModal }) {
  const { open, name, category, type, src } = modal

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeModal() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [closeModal])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease }}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
        >
          <motion.div
            className="modal-box"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.45, ease }}
          >
            <div className="modal-head">
              <div>
                <span className="modal-cat">{category}</span>
                <h3 className="modal-title">{name}</h3>
              </div>
              <div className="modal-actions">
                <a
                  href="mailto:corporate@theamoregiftings.in"
                  className="btn btn-gold btn-sm"
                >
                  Enquire
                </a>
                <button className="modal-x" onClick={closeModal} aria-label="Close">✕</button>
              </div>
            </div>

            <div className="modal-body">
              {type === 'pdf' && (
                <iframe
                  src={`${src}#toolbar=0&navpanes=0`}
                  title={name}
                />
              )}
              {type === 'image' && (
                <img src={src} alt={name} />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
