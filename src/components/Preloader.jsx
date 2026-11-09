import { useEffect, useState } from 'react'
import { animate, motion } from 'motion/react'
import { profile } from '../data.js'

// Short intro shown once per visit: counts to 100, then the curtain lifts.
export default function Preloader({ onDone }) {
  const [n, setN] = useState(0)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const c = animate(0, 100, {
      duration: 1.6, ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setN(Math.round(v)),
      onComplete: () => setTimeout(onDone, 250),
    })
    return () => { c.stop(); document.body.style.overflow = '' }
  }, [onDone])

  return (
    <motion.div className="loader" exit={{ y: '-100%' }} transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }} aria-hidden="true">
      <div className="loader__name">
        {profile.name.split('').map((ch, i) => (
          <motion.span key={i} initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ delay: 0.1 + i * 0.03, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            {ch === ' ' ? '\u00A0' : ch}
          </motion.span>
        ))}
      </div>
      <div className="loader__bar"><motion.span style={{ scaleX: n / 100 }} /></div>
      <p className="loader__count">{String(n).padStart(3, '0')}</p>
    </motion.div>
  )
}
