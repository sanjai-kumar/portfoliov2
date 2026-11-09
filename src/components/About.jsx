import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'
import Reveal from './Reveal.jsx'
import SpotlightCard from './SpotlightCard.jsx'
import { profile, experience } from '../data.js'

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return <motion.span style={{ opacity }}>{children} </motion.span>
}

// Paragraph whose words light up as you scroll through it.
function ScrollText({ text }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className="scroll-text">
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>{w}</Word>
      ))}
    </p>
  )
}

const cities = [
  { code: 'DEL', city: 'Delhi', base: 5400, dur: ['2h 05m', '2h 20m', '2h 10m'] },
  { code: 'BOM', city: 'Mumbai', base: 4100, dur: ['1h 55m', '2h 00m', '1h 50m'] },
  { code: 'BLR', city: 'Bengaluru', base: 2600, dur: ['1h 00m', '1h 05m', '0h 55m'] },
]

function BookingDemo() {
  const [route, setRoute] = useState(cities[0])
  const [state, setState] = useState('idle')
  const search = () => { setState('loading'); setTimeout(() => setState('done'), 1300) }
  const pick = (r) => { setRoute(r); setState('idle') }
  const results = [
    { time: '06:15', price: route.base },
    { time: '11:40', price: route.base + 750 },
    { time: '19:30', price: route.base - 320 },
  ]

  return (
    <div className="demo">
      <div className="demo__head">
        <p className="card__label">Interactive demo</p>
        <p className="demo__title">Search a flight, the way my booking APIs do it</p>
      </div>
      <div className="demo__route">
        <span className="demo__code">MAA<small>Chennai</small></span>
        <span className="demo__path" aria-hidden="true">
          <motion.span className="demo__plane" animate={{ left: state === 'idle' ? '0%' : '100%' }} transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" transform="rotate(90 12 12)" /></svg>
          </motion.span>
        </span>
        <span className="demo__code demo__code--end">{route.code}<small>{route.city}</small></span>
      </div>
      <div className="demo__controls">
        <div className="demo__chips" role="group" aria-label="Destination">
          {cities.map((r) => (
            <button key={r.code} onClick={() => pick(r)} className={r.code === route.code ? 'is-on' : ''} aria-pressed={r.code === route.code}>{r.city}</button>
          ))}
        </div>
        <button className="btn btn--primary btn--sm" onClick={search} disabled={state === 'loading'}>
          <span className="btn__text">{state === 'loading' ? 'Searching' : 'Search flights'}</span>
        </button>
      </div>
      <div className="demo__results" aria-live="polite">
        <AnimatePresence mode="popLayout">
          {state === 'loading' && [0, 1, 2].map((k) => <motion.div key={`s${k}`} className="demo__row skeleton" exit={{ opacity: 0 }} />)}
          {state === 'done' && results.map((r, k) => (
            <motion.div key={`${route.code}${k}`} className="demo__row" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: k * 0.08 }}>
              <span>{r.time}</span><span className="muted">{route.dur[k]}, non-stop</span><strong>₹{r.price.toLocaleString('en-IN')}</strong>
            </motion.div>
          ))}
          {state === 'idle' && <motion.p key="hint" className="demo__hint muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Pick a city and hit search. Fares shown are sample data.</motion.p>}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function About() {
  const edu = experience[experience.length - 1]
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <Reveal><h2 id="about-title" className="kicker">About</h2></Reveal>
      <ScrollText text={profile.summary} />

      <div className="cards">
        <Reveal className="cards__demo"><SpotlightCard><BookingDemo /></SpotlightCard></Reveal>
        <Reveal className="cards__a" delay={0.08}>
          <SpotlightCard>
            <p className="card__label">Currently</p>
            <p className="card__big">Navigatio</p>
            <p className="muted">Full Stack Developer building B2C and B2B flight and bus booking on AWS.</p>
          </SpotlightCard>
        </Reveal>
        <Reveal className="cards__b" delay={0.14}>
          <SpotlightCard>
            <p className="card__label">Leadership</p>
            <p className="card__big">Team of 10</p>
            <p className="muted">Led developers at Webnexs through 60+ client launches.</p>
          </SpotlightCard>
        </Reveal>
        <Reveal className="cards__c" delay={0.2}>
          <SpotlightCard>
            <p className="card__label">Education</p>
            <p className="card__mid">{edu.role}</p>
            <p className="muted">{edu.company}, {edu.period}</p>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  )
}
