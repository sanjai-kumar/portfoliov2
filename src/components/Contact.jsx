import { useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import Reveal from './Reveal.jsx'
import Magnetic from './Magnetic.jsx'
import { profile } from '../data.js'

// The Formspree form ID comes from an environment variable. Never hardcode keys or IDs in code.
const FORM_ID = import.meta.env.VITE_FORMSPREE_ID

export default function Contact({ notify }) {
  const [status, setStatus] = useState('idle')
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const x1 = useTransform(scrollYProgress, [0, 1], ['10%', '-25%'])
  const x2 = useTransform(scrollYProgress, [0, 1], ['-30%', '5%'])

  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email); notify('Email copied to clipboard') }
    catch { window.location.href = `mailto:${profile.email}` }
  }

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    if (!FORM_ID) {
      const subject = encodeURIComponent(`Portfolio message from ${data.get('name')}`)
      const body = encodeURIComponent(`${data.get('message')}\n\nReply to: ${data.get('email')}`)
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(`https://formspree.io/f/${FORM_ID}`, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      if (!res.ok) throw new Error('failed')
      form.reset(); setStatus('sent'); notify('Message sent')
    } catch { setStatus('error') }
  }

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title" ref={ref}>
      <div className="contact__glow" aria-hidden="true" />
      <h2 id="contact-title" className="sr-only">Contact</h2>
      <div className="giant" aria-hidden="true">
        <motion.p style={{ x: x1 }}>Let&rsquo;s build <span className="grad-text">something</span></motion.p>
        <motion.p style={{ x: x2 }} className="giant__outline">that ships. Let&rsquo;s talk.</motion.p>
      </div>

      <div className="contact__grid">
        <Reveal className="contact__left">
          <p className="contact__lede">Hiring for a full stack role, or need a booking engine, streaming platform or cloud setup built? I&rsquo;d love to hear about it.</p>
          <div className="contact__orbs">
            <Magnetic as="a" strength={0.4} className="orb-btn" href={`mailto:${profile.email}`} data-cursor="Write">
              <span>Email me</span>
            </Magnetic>
            <div className="contact__links">
              <button className="link-row" onClick={copy} data-cursor="Copy"><span>Copy email</span><span>{profile.email}</span></button>
              <a className="link-row" href={profile.linkedin} target="_blank" rel="noreferrer"><span>LinkedIn</span><span>Connect</span></a>
              {profile.github && <a className="link-row" href={profile.github} target="_blank" rel="noreferrer"><span>GitHub</span><span>Profile</span></a>}
              <a className="link-row" href={profile.resume} download><span>Resume</span><span>Download PDF</span></a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form className="form" onSubmit={onSubmit}>
            <div className="field"><input id="f-name" name="name" required placeholder=" " autoComplete="name" /><label htmlFor="f-name">Your name</label></div>
            <div className="field"><input id="f-email" name="email" type="email" required placeholder=" " autoComplete="email" /><label htmlFor="f-email">Your email</label></div>
            <div className="field"><textarea id="f-msg" name="message" rows="5" required placeholder=" " /><label htmlFor="f-msg">Tell me about your project or role</label></div>
            <motion.button className="btn btn--primary" type="submit" disabled={status === 'sending'} whileTap={{ scale: 0.97 }}>
              <span className="btn__fill" aria-hidden="true" />
              <span className="btn__text">{status === 'sending' ? 'Sending message' : status === 'sent' ? 'Message sent' : 'Send message'}</span>
            </motion.button>
            {status === 'error' && <p className="form__error" role="alert">Message not sent. Check your connection and try again, or email {profile.email}.</p>}
          </form>
        </Reveal>
      </div>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} {profile.name}</p>
        <p>{profile.location}</p>
      </footer>
    </section>
  )
}
