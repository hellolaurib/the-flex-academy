import { useEffect, useRef, useState } from 'react'

// Counts from 0 up to `value` the first time it scrolls into view.
export default function CountUp({ value, prefix = '', suffix = '', duration = 1400 }) {
  const ref = useRef(null)
  const [n, setN] = useState(value)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setN(0)
    let raf = 0
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const tick = (now) => {
          const t = Math.min(1, (now - start) / duration)
          setN(Math.round(value * (1 - Math.pow(1 - t, 3))))
          if (t < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { rootMargin: '0px 0px -15% 0px' },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, duration])

  return (
    <span ref={ref} className="tabular-nums" aria-label={`${prefix}${value.toLocaleString('en-US')}${suffix}`}>
      <span aria-hidden>
        {prefix}
        {n.toLocaleString('en-US')}
        {suffix}
      </span>
    </span>
  )
}
