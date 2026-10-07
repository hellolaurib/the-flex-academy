import { useEffect } from 'react'

// Adds .is-visible to every [data-reveal] element the first time it scrolls into view,
// and drives a subtle parallax on [data-parallax] background images.
export default function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    els.forEach((el) => io.observe(el))

    const layers = document.querySelectorAll('[data-parallax]')
    let frame = 0
    const parallax = () => {
      frame = 0
      const vh = window.innerHeight
      layers.forEach((img) => {
        const r = img.parentElement.getBoundingClientRect()
        if (r.bottom < 0 || r.top > vh) return
        const offset = (r.top + r.height / 2 - vh / 2) * -0.12
        img.style.setProperty('--parallax', `${offset.toFixed(1)}px`)
      })
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(parallax)
    }
    parallax()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      io.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
}
