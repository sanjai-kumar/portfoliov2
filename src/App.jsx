import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react'
import Lenis from 'lenis'
import Preloader from './components/Preloader.jsx'
import Cursor from './components/Cursor.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import About from './components/About.jsx'
import Work from './components/Work.jsx'
import Experience from './components/Experience.jsx'
import Skills from './components/Skills.jsx'
import Contact from './components/Contact.jsx'
import Toast from './components/Toast.jsx'

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const seenIntro = () => { try { return sessionStorage.getItem('intro') === '1' } catch { return false } }

export default function App() {
  const [loading, setLoading] = useState(() => !reduceMotion() && !seenIntro())
  const [toast, setToast] = useState('')
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'dark')
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  useEffect(() => {
    if (reduceMotion()) return
    const lenis = new Lenis({ lerp: 0.09 })
    window.__lenis = lenis
    let id
    const raf = (t) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy(); window.__lenis = null }
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('theme', theme) } catch {}
  }, [theme])

  const done = useCallback(() => {
    try { sessionStorage.setItem('intro', '1') } catch {}
    setLoading(false)
  }, [])

  const notify = (msg) => {
    setToast(msg)
    clearTimeout(window.__toastTimer)
    window.__toastTimer = setTimeout(() => setToast(''), 2400)
  }

  return (
    <>
      <AnimatePresence>{loading && <Preloader onDone={done} />}</AnimatePresence>
      <motion.div className="progress" style={{ scaleX: progress }} />
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <Nav theme={theme} onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} />
      <main>
        <Hero ready={!loading} />
        <Marquee />
        <About />
        <Work />
        <Experience />
        <Skills />
        <Contact notify={notify} />
      </main>
      <Toast message={toast} />
    </>
  )
}
