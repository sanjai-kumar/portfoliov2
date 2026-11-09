import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Reveal from './Reveal.jsx'
import { skills } from '../data.js'

export default function Skills() {
  const groups = Object.keys(skills)
  const [tab, setTab] = useState(groups[0])

  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <Reveal><h2 id="skills-title" className="kicker">Skills</h2><p className="statement">The toolkit behind every launch.</p></Reveal>
      <Reveal className="skills" delay={0.1}>
        <div className="skills__tabs" role="tablist" aria-label="Skill groups">
          {groups.map((g) => (
            <button key={g} role="tab" aria-selected={tab === g} onClick={() => setTab(g)} className={tab === g ? 'is-on' : ''}>
              {tab === g && <motion.span layoutId="skill-tab" className="skills__bar" />}
              {g}<span className="skills__count">{skills[g].length}</span>
            </button>
          ))}
        </div>
        <div className="skills__panel" role="tabpanel">
          <AnimatePresence mode="wait">
            <motion.ul key={tab} className="skills__grid" initial="hidden" animate="show" exit="hidden"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.035 } } }}>
              {skills[tab].map((s) => (
                <motion.li key={s} variants={{ hidden: { opacity: 0, y: 10, scale: 0.95 }, show: { opacity: 1, y: 0, scale: 1 } }} whileHover={{ y: -3 }}>
                  {s}
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  )
}
