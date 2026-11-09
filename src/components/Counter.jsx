import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'motion/react'

export default function Counter({ to }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, to])

  return <span ref={ref}>{n}</span>
}
