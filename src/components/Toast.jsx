import { AnimatePresence, motion } from 'motion/react'

export default function Toast({ message }) {
  return (
    <div className="toast-wrap" role="status" aria-live="polite">
      <AnimatePresence>
        {message && (
          <motion.div className="toast" initial={{ y: 30, opacity: 0, scale: 0.95 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 20, opacity: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
