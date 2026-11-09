import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import Magnetic from './Magnetic.jsx'
import Counter from './Counter.jsx'
import Globe from './Globe.jsx'
import { profile, stats } from '../data.js'
import { scrollToId } from '../lib/scroll.js'

export default function Hero({ ready }) {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  const { scrollY } = useScroll()
  const fade = useTransform(scrollY, [0, 600], [1, 0])
  const lift = useTransform(scrollY, [0, 600], [0, -120])
  const globeScale = useTransform(scrollY, [0, 700], [1, 1.25])

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % profile.rotating.length), 2400)
    return () => clearInterval(t)
  }, [])

  const words = profile.headline.split(' ')
  const show = ready || reduce
  const from = (v) => (reduce ? false : v)

  return (
    <section className="hero" id="top">
      <div className="aurora" aria-hidden="true">
        <span className="aurora__a" /><span className="aurora__b" /><span className="aurora__c" />
      </div>
      <div className="grid-bg" aria-hidden="true" />

      <div className="hero__wrap">
        <motion.div className="hero__inner" style={reduce ? undefined : { opacity: fade, y: lift }}>
          <motion.p className="eyebrow" initial={from({ opacity: 0, y: 10 })} animate={show ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}>
            <span className="eyebrow__line" aria-hidden="true" />{profile.name}, {profile.role}
          </motion.p>

          <h1 className="hero__title">
            {words.map((w, idx) => (
              <span key={idx}>
                <span className="word-mask">
                  <motion.span
                    initial={from({ y: '110%', rotate: 6 })}
                    animate={show ? { y: 0, rotate: 0 } : {}}
                    transition={{ duration: 0.9, delay: 0.15 + idx * 0.055, ease: [0.16, 1, 0.3, 1] }}
                    className={idx === 2 || idx === 3 ? 'grad-text' : undefined}
                  >{w}</motion.span>
                </span>{idx < words.length - 1 ? ' ' : ''}
              </span>
            ))}
          </h1>

          <motion.p className="hero__sub" initial={from({ opacity: 0 })} animate={show ? { opacity: 1 } : {}} transition={{ delay: 0.9 }}>
            Based in {profile.location}. Five years of shipping{' '}
            <span className="rotator" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.span key={i} initial={{ y: 14, opacity: 0, filter: 'blur(6px)' }} animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }} exit={{ y: -14, opacity: 0, filter: 'blur(6px)' }} transition={{ duration: 0.35 }}>
                  {profile.rotating[i]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.p>

          <motion.div className="hero__actions" initial={from({ opacity: 0, y: 12 })} animate={show ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.05 }}>
            <Magnetic as="button" className="btn btn--primary" onClick={() => scrollToId('work')}>
              <span className="btn__fill" aria-hidden="true" />
              <span className="btn__text">Explore my work</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
            </Magnetic>
            <Magnetic className="btn btn--glass" href={profile.resume} download>Download resume</Magnetic>
          </motion.div>
        </motion.div>

        <motion.div className="hero__globe" initial={from({ opacity: 0, scale: 0.85 })} animate={show ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.4, duration: 1.4, ease: [0.16, 1, 0.3, 1] }} style={reduce ? undefined : { scale: globeScale }}>
          <Globe />
          <p className="hero__hint" aria-hidden="true">Drag to spin the globe</p>
        </motion.div>
      </div>

      <motion.dl className="stats" initial={from({ opacity: 0 })} animate={show ? { opacity: 1 } : {}} transition={{ delay: 1.25 }}>
        {stats.map((s) => (
          <div key={s.label} className="stat">
            <dt>{s.label}</dt>
            <dd>{show ? <Counter to={s.value} /> : 0}{s.suffix}</dd>
          </div>
        ))}
      </motion.dl>
    </section>
  )
}
