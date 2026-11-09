import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { scrollToId } from '../lib/scroll.js'
import { profile } from '../data.js'

const links = [
  ['about', 'About'],
  ['work', 'Work'],
  ['experience', 'Experience'],
  ['skills', 'Skills'],
  ['contact', 'Contact'],
]

export default function Nav({ theme, onToggleTheme }) {
  const [active, setActive] = useState('')
  const [hover, setHover] = useState(null)
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    links.forEach(([id]) => { const el = document.getElementById(id); if (el) obs.observe(el) })
    let last = 0
    const onScroll = () => { const y = window.scrollY; setHidden(y > last && y > 300); last = y }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { obs.disconnect(); window.removeEventListener('scroll', onScroll) }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (open) window.__lenis?.stop(); else window.__lenis?.start()
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (e, id) => { e.preventDefault(); setOpen(false); setTimeout(() => scrollToId(id), open ? 450 : 0) }
  const highlighted = hover ?? active

  return (
    <>
      <motion.header className="nav" animate={{ y: hidden && !open ? '-120%' : 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
        <a href="#top" className="nav__logo" onClick={(e) => go(e, 'top')} aria-label="Back to top">SK</a>
        <nav aria-label="Sections" className="nav__pill" onPointerLeave={() => setHover(null)}>
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={(e) => go(e, id)} onPointerEnter={() => setHover(id)}
               className={active === id ? 'is-active' : ''} aria-current={active === id ? 'true' : undefined}>
              {highlighted === id && <motion.span layoutId="nav-bubble" className="nav__bubble" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
              <span className="nav__label">{label}</span>
            </a>
          ))}
        </nav>
        <div className="nav__tools">
          <button className="icon-btn" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
            <motion.svg key={theme} initial={{ rotate: -90, scale: 0.5, opacity: 0 }} animate={{ rotate: 0, scale: 1, opacity: 1 }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {theme === 'dark'
                ? <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
                : <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>}
            </motion.svg>
          </button>
          <a href="#contact" onClick={(e) => go(e, 'contact')} className="nav__cta">Let&rsquo;s talk</a>
          <button className={`burger ${open ? 'is-open' : ''}`} onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Close menu' : 'Open menu'}>
            <span /><span />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" className="menu" initial={{ clipPath: 'circle(0% at 100% 0%)' }} animate={{ clipPath: 'circle(150% at 100% 0%)' }} exit={{ clipPath: 'circle(0% at 100% 0%)' }} transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}>
            <nav aria-label="Mobile">
              {links.map(([id, label], i) => (
                <motion.a key={id} href={`#${id}`} onClick={(e) => go(e, id)} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 + i * 0.06 }}>
                  <span className="menu__num">0{i + 1}</span>{label}
                </motion.a>
              ))}
            </nav>
            <motion.div className="menu__foot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <a href={profile.resume} download>Download resume</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
