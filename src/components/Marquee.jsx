import { marquee } from '../data.js'

export default function Marquee() {
  const items = [...marquee, ...marquee]
  return (
    <div className="marquee" aria-label="Main technologies">
      <div className="marquee__track">
        {items.map((t, i) => (
          <span key={i} aria-hidden={i >= marquee.length ? 'true' : undefined}>{t}<i className="marquee__sep" /></span>
        ))}
      </div>
    </div>
  )
}
