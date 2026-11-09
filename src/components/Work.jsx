import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'motion/react'
import ProjectModal from './ProjectModal.jsx'
import Reveal from './Reveal.jsx'
import { projects } from '../data.js'

function Card({ p, i, onOpen }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
    e.currentTarget.style.setProperty('--rx', `${((e.clientY - r.top) / r.height - 0.5) * -8}deg`)
    e.currentTarget.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * 10}deg`)
  }
  const reset = (e) => { e.currentTarget.style.setProperty('--rx', '0deg'); e.currentTarget.style.setProperty('--ry', '0deg') }
  return (
    <motion.button
      layoutId={`card-${p.id}`}
      className="wcard spot"
      style={{ '--a': p.accent[0], '--b': p.accent[1] }}
      onClick={() => onOpen(p)}
      onPointerMove={onMove}
      onPointerLeave={reset}
      data-cursor="View"
      aria-label={`Open details for ${p.title}`}
    >
      <span className="wcard__art" aria-hidden="true">
        <span className="wcard__orb" />
        <span className="wcard__orb wcard__orb--2" />
        <span className="wcard__index">{String(i + 1).padStart(2, '0')}</span>
        <span className="wcard__metric">{p.metric}</span>
      </span>
      <span className="wcard__body">
        <span className="wcard__top"><span className="wcard__cat">{p.category}</span><span>{p.year}</span></span>
        <span className="wcard__title">{p.title}</span>
        <span className="wcard__summary">{p.summary}</span>
        <span className="wcard__stack">
          {p.stack.slice(0, 4).map((s) => <span key={s}>{s}</span>)}
          {p.stack.length > 4 && <span>+{p.stack.length - 4}</span>}
        </span>
      </span>
    </motion.button>
  )
}

export default function Work() {
  const [open, setOpen] = useState(null)
  const [pinned, setPinned] = useState(true)
  const [distance, setDistance] = useState(0)
  const [current, setCurrent] = useState(1)
  const outer = useRef(null)
  const track = useRef(null)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)')
    const set = () => setPinned(mq.matches)
    set(); mq.addEventListener('change', set)
    return () => mq.removeEventListener('change', set)
  }, [])

  useLayoutEffect(() => {
    if (!pinned) return
    const measure = () => {
      const el = track.current
      if (el) setDistance(Math.max(0, el.scrollWidth - window.innerWidth))
    }
    measure()
    document.fonts?.ready.then(measure)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [pinned])

  const { scrollYProgress } = useScroll({ target: outer, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 })
  const x = useTransform(smooth, [0, 1], [0, -distance])
  const bar = useTransform(smooth, [0, 1], [0, 1])
  useMotionValueEvent(scrollYProgress, 'change', (v) => setCurrent(Math.min(projects.length, Math.floor(v * projects.length) + 1)))

  const header = (
    <div className="work__head">
      <div>
        <h2 id="work-title" className="kicker">Selected work</h2>
        <p className="work__title">Seven products, from booking engines to streaming at scale.</p>
      </div>
      {pinned && (
        <div className="work__progress" aria-hidden="true">
          <span className="work__count">{String(current).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
          <span className="work__bar"><motion.span style={{ scaleX: bar }} /></span>
        </div>
      )}
    </div>
  )

  return (
    <section id="work" aria-labelledby="work-title">
      {pinned ? (
        <div ref={outer} className="work-pin" style={{ height: `calc(100vh + ${distance}px)` }}>
          <div className="work-pin__sticky">
            {header}
            <motion.ul ref={track} className="work-track" style={{ x }}>
              {projects.map((p, i) => <li key={p.id}><Card p={p} i={i} onOpen={setOpen} /></li>)}
            </motion.ul>
          </div>
        </div>
      ) : (
        <div ref={outer} className="work-flat">
          <Reveal>{header}</Reveal>
          <ul className="work-row">
            {projects.map((p, i) => <li key={p.id}><Card p={p} i={i} onOpen={setOpen} /></li>)}
          </ul>
        </div>
      )}
      <AnimatePresence>{open && <ProjectModal project={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  )
}
