import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'motion/react'

export default function ProjectModal({ project, onClose }) {
  const closeRef = useRef(null)
  const [a, b] = project.accent

  useEffect(() => {
    const prev = document.activeElement
    closeRef.current?.focus()
    window.__lenis?.stop()
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      window.__lenis?.start()
      prev?.focus?.()
    }
  }, [onClose])

  return createPortal(
    <motion.div className="overlay" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div
        layoutId={`card-${project.id}`}
        className="sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
        onClick={(e) => e.stopPropagation()}
        style={{ '--a': a, '--b': b }}
        transition={{ type: 'spring', stiffness: 260, damping: 30 }}
        data-lenis-prevent
      >
        <div className="sheet__art" aria-hidden="true"><span className="pcard__orb" /></div>
        <button ref={closeRef} className="sheet__close" onClick={onClose} aria-label="Close project details">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
        </button>
        <motion.div className="sheet__body" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <p className="pcard__cat">{project.category}, {project.year}</p>
          <h2 id="sheet-title" className="sheet__title">{project.title}</h2>
          <p className="sheet__role">{project.role}</p>
          <p className="sheet__summary">{project.summary}</p>
          <h3 className="sheet__sub">What I did</h3>
          <ul className="sheet__list">
            {project.highlights.map((h, i) => (
              <motion.li key={h} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.05 }}>{h}</motion.li>
            ))}
          </ul>
          <h3 className="sheet__sub">Tech stack</h3>
          <ul className="chips">{project.stack.map((s) => <li key={s}>{s}</li>)}</ul>
        </motion.div>
      </motion.div>
    </motion.div>,
    document.body
  )
}
