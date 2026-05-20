import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const bar = useRef(null)

  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const pct = total > 0 ? window.scrollY / total : 0
      if (bar.current) bar.current.style.scaleX = pct
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div
      ref={bar}
      className="scroll-progress"
      style={{ transformOrigin: 'left' }}
    />
  )
}
