import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

// Dot plus a trailing ring. The ring grows and shows a label over elements with data-cursor.
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [label, setLabel] = useState('')
  const [hover, setHover] = useState(false)
  const x = useMotionValue(-100), y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.5 })
  const ry = useSpring(y, { stiffness: 260, damping: 26, mass: 0.5 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setEnabled(fine)
    if (!fine) return
    document.documentElement.classList.add('has-cursor')
    let px = -100, py = -100
    const check = () => {
      const el = document.elementFromPoint(px, py)?.closest?.('[data-cursor], a, button')
      setHover(!!el)
      setLabel(el?.dataset?.cursor || '')
    }
    const move = (e) => { px = e.clientX; py = e.clientY; x.set(px); y.set(py); check() }
    // Re-check on scroll so the label never sticks after the content moves away
    const onScroll = () => requestAnimationFrame(check)
    const leave = () => { x.set(-100); y.set(-100) }
    window.addEventListener('pointermove', move)
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('pointerleave', leave)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [x, y])

  if (!enabled) return null
  return (
    <>
      <motion.div className="cursor-dot" style={{ x, y }} aria-hidden="true" />
      <motion.div
        className={`cursor-ring ${label ? 'has-label' : ''}`}
        style={{ x: rx, y: ry }}
        animate={{ width: label ? 92 : hover ? 54 : 34, height: label ? 92 : hover ? 54 : 34 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        aria-hidden="true"
      >
        {label && <span>{label}</span>}
      </motion.div>
      <div className="cursor-glow-wrap" aria-hidden="true"><motion.div className="cursor-glow" style={{ x: rx, y: ry }} /></div>
    </>
  )
}
