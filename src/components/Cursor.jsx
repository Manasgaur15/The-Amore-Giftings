import { useEffect, useRef } from 'react'

export default function Cursor() {
  const ring = useRef(null)
  const dot  = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return

    let cx = window.innerWidth / 2,  cy = window.innerHeight / 2
    let tx = cx, ty = cy
    let raf

    const lerp = (a, b, t) => a + (b - a) * t

    const onMove = (e) => { tx = e.clientX; ty = e.clientY }

    const tick = () => {
      cx = lerp(cx, tx, 0.11)
      cy = lerp(cy, ty, 0.11)
      if (ring.current) {
        ring.current.style.left = cx + 'px'
        ring.current.style.top  = cy + 'px'
      }
      if (dot.current) {
        dot.current.style.left = tx + 'px'
        dot.current.style.top  = ty + 'px'
      }
      raf = requestAnimationFrame(tick)
    }

    const enter = () => ring.current?.classList.add('hover')
    const leave = () => ring.current?.classList.remove('hover')
    const down  = () => ring.current?.classList.add('clicking')
    const up    = () => ring.current?.classList.remove('clicking')

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mousedown', down)
    document.addEventListener('mouseup',   up)

    const addHover = () => {
      document.querySelectorAll('a, button, [role="button"], .coll-card, .feat-card, .testi-card').forEach(el => {
        el.addEventListener('mouseenter', enter)
        el.addEventListener('mouseleave', leave)
      })
    }
    addHover()

    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', down)
      document.removeEventListener('mouseup',   up)
    }
  }, [])

  return (
    <>
      <div className="cursor-ring" ref={ring} />
      <div className="cursor-dot"  ref={dot}  />
    </>
  )
}
