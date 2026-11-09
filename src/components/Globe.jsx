import { useEffect, useRef } from 'react'
import { routes } from '../data.js'

// A dotted 3D globe drawn on canvas, with animated flight arcs from Chennai.
// Drag to spin. Pauses when off screen. Static when reduced motion is on.
const DEG = Math.PI / 180

function toXYZ(lat, lon) {
  const la = lat * DEG, lo = lon * DEG
  return [Math.cos(la) * Math.sin(lo), Math.sin(la), Math.cos(la) * Math.cos(lo)]
}
function rotate([x, y, z], ry, rx) {
  const cy = Math.cos(ry), sy = Math.sin(ry)
  const x1 = x * cy - z * sy, z1 = x * sy + z * cy
  const cx = Math.cos(rx), sx = Math.sin(rx)
  return [x1, y * cx - z1 * sx, y * sx + z1 * cx]
}
function slerp(a, b, t) {
  const d = Math.acos(Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2])))
  if (d < 1e-6) return a
  const s = Math.sin(d), k1 = Math.sin((1 - t) * d) / s, k2 = Math.sin(t * d) / s
  return [a[0] * k1 + b[0] * k2, a[1] * k1 + b[1] * k2, a[2] * k1 + b[2] * k2]
}

export default function Globe() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Fibonacci sphere of dots
    const N = 2600
    const dots = []
    const golden = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < N; i++) {
      const y = 1 - (2 * (i + 0.5)) / N
      const r = Math.sqrt(1 - y * y)
      dots.push([Math.cos(i * golden) * r, y, Math.sin(i * golden) * r])
    }
    const home = routes.find((r) => r.home)
    const h = toXYZ(home.lat, home.lon)
    const arcs = routes.filter((r) => !r.home).map((r, i) => {
      const b = toXYZ(r.lat, r.lon)
      const pts = []
      for (let k = 0; k <= 48; k++) {
        const t = k / 48
        const p = slerp(h, b, t)
        const lift = 1 + 0.22 * Math.sin(Math.PI * t)
        pts.push([p[0] * lift, p[1] * lift, p[2] * lift])
      }
      return { name: r.name, end: b, pts, offset: i * 0.37 }
    })

    let w = 0, hgt = 0, dpr = 1, R = 0
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width; hgt = rect.height
      canvas.width = w * dpr; canvas.height = hgt * dpr
      R = Math.min(w, hgt) * 0.42
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    let colors = {}
    const readColors = () => {
      const cs = getComputedStyle(document.documentElement)
      colors = {
        dot: cs.getPropertyValue('--globe-dot').trim() || 'rgba(255,255,255,.5)',
        a: cs.getPropertyValue('--violet').trim(),
        b: cs.getPropertyValue('--cyan').trim(),
        text: cs.getPropertyValue('--text').trim(),
      }
    }
    readColors()
    const mo = new MutationObserver(readColors)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    // Face India at start
    let ry = home.lon * DEG - 0.35, rx = 0.12, vel = -0.0012
    let dragging = false, lastX = 0, lastY = 0
    const down = (e) => { dragging = true; lastX = e.clientX; lastY = e.clientY; canvas.setPointerCapture(e.pointerId) }
    const move = (e) => {
      if (!dragging) return
      ry -= (e.clientX - lastX) * 0.006
      rx = Math.max(-1, Math.min(1, rx + (e.clientY - lastY) * 0.004))
      vel = -(e.clientX - lastX) * 0.0006
      lastX = e.clientX; lastY = e.clientY
    }
    const up = () => { dragging = false }
    canvas.addEventListener('pointerdown', down)
    canvas.addEventListener('pointermove', move)
    canvas.addEventListener('pointerup', up)
    canvas.addEventListener('pointercancel', up)

    let visible = true
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(canvas)

    const project = (p) => {
      const q = rotate(p, ry, rx)
      return [w / 2 + q[0] * R, hgt / 2 - q[1] * R, q[2]]
    }

    let raf, start = performance.now()
    const draw = (now) => {
      raf = requestAnimationFrame(draw)
      if (!visible) return
      const t = (now - start) / 1000
      if (!dragging && !reduce) { ry += vel; vel += (-0.0012 - vel) * 0.02 }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, hgt)

      // Atmosphere
      const g = ctx.createRadialGradient(w / 2, hgt / 2, R * 0.9, w / 2, hgt / 2, R * 1.18)
      g.addColorStop(0, 'transparent'); g.addColorStop(0.3, colors.a + '33'); g.addColorStop(1, 'transparent')
      ctx.fillStyle = g
      ctx.beginPath(); ctx.arc(w / 2, hgt / 2, R * 1.18, 0, Math.PI * 2); ctx.fill()

      // Dots
      ctx.fillStyle = colors.dot
      for (const d of dots) {
        const [x, y, z] = project(d)
        if (z < -0.05) continue
        ctx.globalAlpha = 0.15 + 0.85 * Math.max(0, z)
        const s = 0.8 + 1.4 * Math.max(0, z)
        ctx.fillRect(x - s / 2, y - s / 2, s, s)
      }
      ctx.globalAlpha = 1

      // Arcs
      for (const arc of arcs) {
        const cycle = reduce ? 1 : ((t * 0.28 + arc.offset) % 1.4) / 1.4
        const head = Math.min(1, cycle * 1.6)
        const tail = Math.min(1, Math.max(0, cycle * 1.6 - 0.55))
        const pts = arc.pts.map(project)
        const grad = ctx.createLinearGradient(pts[0][0], pts[0][1], pts[48][0], pts[48][1])
        grad.addColorStop(0, colors.a); grad.addColorStop(1, colors.b)
        ctx.strokeStyle = grad
        ctx.lineWidth = 2
        ctx.beginPath()
        let started = false
        for (let k = Math.floor(tail * 48); k <= Math.floor(head * 48); k++) {
          const p = pts[k]
          if (p[2] < -0.1) { started = false; continue }
          if (!started) { ctx.moveTo(p[0], p[1]); started = true } else ctx.lineTo(p[0], p[1])
        }
        ctx.stroke()
        // Plane head
        const hp = pts[Math.min(48, Math.floor(head * 48))]
        if (hp && head < 1 && hp[2] > 0) {
          ctx.fillStyle = colors.b
          ctx.beginPath(); ctx.arc(hp[0], hp[1], 2.6, 0, Math.PI * 2); ctx.fill()
        }
        // Destination
        const e = project(arc.end)
        if (e[2] > 0.05) {
          ctx.fillStyle = colors.b
          ctx.globalAlpha = 0.5 + 0.5 * e[2]
          ctx.beginPath(); ctx.arc(e[0], e[1], 2.2, 0, Math.PI * 2); ctx.fill()
          ctx.font = '500 11px Geist, system-ui, sans-serif'
          ctx.fillStyle = colors.text
          ctx.globalAlpha = 0.75 * e[2]
          ctx.fillText(arc.name, e[0] + 6, e[1] - 6)
          ctx.globalAlpha = 1
        }
      }

      // Home pulse
      const hp = project(h)
      if (hp[2] > 0) {
        const pulse = reduce ? 0.5 : (t % 2) / 2
        ctx.strokeStyle = colors.b
        ctx.globalAlpha = 1 - pulse
        ctx.lineWidth = 1.5
        ctx.beginPath(); ctx.arc(hp[0], hp[1], 4 + pulse * 18, 0, Math.PI * 2); ctx.stroke()
        ctx.globalAlpha = 1
        ctx.fillStyle = '#fff'
        ctx.beginPath(); ctx.arc(hp[0], hp[1], 3.5, 0, Math.PI * 2); ctx.fill()
        ctx.font = '600 12px Geist, system-ui, sans-serif'
        ctx.fillStyle = colors.text
        ctx.fillText('Chennai', hp[0] + 9, hp[1] + 4)
      }
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); mo.disconnect()
      canvas.removeEventListener('pointerdown', down)
      canvas.removeEventListener('pointermove', move)
      canvas.removeEventListener('pointerup', up)
      canvas.removeEventListener('pointercancel', up)
    }
  }, [])

  return <canvas ref={ref} className="globe" aria-label="Globe showing flight routes from Chennai. Drag to spin." role="img" />
}
