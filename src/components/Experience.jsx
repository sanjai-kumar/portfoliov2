import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import Reveal from './Reveal.jsx'
import { experience } from '../data.js'

export default function Experience() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section className="section" id="experience" aria-labelledby="exp-title">
      <Reveal><h2 id="exp-title" className="kicker">Experience</h2><p className="statement">Five years, two companies, one habit: shipping things that stay up.</p></Reveal>
      <div className="timeline" ref={ref}>
        <span className="timeline__rail" aria-hidden="true"><motion.span className="timeline__fill" style={{ scaleY }} /></span>
        <ol>
        {experience.map((e, i) => (
          <Reveal as="li" key={e.company} className="timeline__item" delay={i * 0.05}>
            <span className={`timeline__dot ${e.current ? 'is-live' : ''}`} aria-hidden="true" />
            <div className="timeline__head">
              <h3>{e.company}</h3>
              <p className="timeline__period">{e.period}{e.current && <span className="pill-live">Current</span>}</p>
            </div>
            <p className="timeline__role">{e.role}</p>
            {e.points.length > 1 && (
              <ul className="timeline__points">{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
            )}
          </Reveal>
        ))}
        </ol>
      </div>
    </section>
  )
}
