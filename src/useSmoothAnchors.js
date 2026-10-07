import { useEffect } from 'react'

const HEADER = 78 // sticky header height
const easeInOutQuart = (t) => (t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2)

// Smooth, eased scrolling for every in-page link (#how-it-works, #faqs, …).
// Duration grows with distance, and the user can interrupt it by scrolling.
export default function useSmoothAnchors() {
  useEffect(() => {
    let raf = 0
    const stop = () => cancelAnimationFrame(raf)

    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return
      const link = e.target.closest('a[href^="#"]')
      if (!link) return
      const id = link.getAttribute('href').slice(1)
      const target = id === 'top' ? document.body : document.getElementById(id)
      if (!target) return
      e.preventDefault()

      const from = window.scrollY
      const to = id === 'top' ? 0 : Math.max(0, target.getBoundingClientRect().top + from - HEADER)
      const distance = to - from
      history.pushState(null, '', `#${id}`)

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.scrollTo(0, to)
        return
      }

      const duration = Math.min(1800, Math.max(900, 600 + Math.abs(distance) * 0.25))
      const start = performance.now()
      stop()
      const step = (now) => {
        const t = Math.min(1, (now - start) / duration)
        window.scrollTo(0, from + distance * easeInOutQuart(t))
        if (t < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }

    document.addEventListener('click', onClick)
    // Any manual scroll input cancels the animation
    window.addEventListener('wheel', stop, { passive: true })
    window.addEventListener('touchstart', stop, { passive: true })
    window.addEventListener('keydown', stop)
    return () => {
      stop()
      document.removeEventListener('click', onClick)
      window.removeEventListener('wheel', stop)
      window.removeEventListener('touchstart', stop)
      window.removeEventListener('keydown', stop)
    }
  }, [])
}
