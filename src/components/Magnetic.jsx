import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

// Wraps a button or link so it leans toward the pointer.
export default function Magnetic({ as = 'a', strength = 0.3, className = '', children, ...props }) {
  const ref = useRef(null)
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 })
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 })
  const Comp = as === 'button' ? motion.button : motion.a

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => { x.set(0); y.set(0) }

  return (
    <Comp ref={ref} className={className} style={{ x, y }} onPointerMove={onMove} onPointerLeave={reset} whileTap={{ scale: 0.96 }} {...props}>
      {children}
    </Comp>
  )
}
