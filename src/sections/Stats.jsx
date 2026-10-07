import { useEffect, useRef, useState } from 'react'
import { STATS } from '../data/content.js'

const HEADLINE = 'No course teaches you more about running rentals than the people who run them.'
const SUBTITLE = 'Numbers speak. Everything we teach, we use every day to run The Flex.'
const HEAD_WORDS = HEADLINE.split(' ')
const SUB_WORDS = SUBTITLE.split(' ')
const TOTAL_WORDS = HEAD_WORDS.length + SUB_WORDS.length

// Word-fill model (same feel as cloudbeds.com's value-prop block):
// one continuous fill runs through the headline and then the subtitle,
// with a soft leading edge about EDGE words wide. Unfilled words sit at DIM.
const DIM = 0.12
const EDGE = 3
// The fill completes at this point of the pin, leaving a beat to read it
const FILL_END = 0.85

// Count-up: each tile's number runs for COUNT_MS, starting STAGGER_MS after the previous one
const COUNT_MS = 1600
const STAGGER_MS = 150
const COUNT_TOTAL = COUNT_MS + STAGGER_MS * (STATS.length - 1)

const clamp = (v) => Math.min(1, Math.max(0, v))

function Words({ words, offset, fill }) {
  return words.map((w, i) => (
    <span key={i} style={{ opacity: DIM + (1 - DIM) * clamp((fill - (offset + i)) / EDGE) }}>
      {w}
      {i < words.length - 1 ? ' ' : ''}
    </span>
  ))
}

// "Pin wrapper: its extra height is the scroll range for the word-fill animation → Section" (24:3501)
// Desktop: the module fills the screen and stays pinned while the words fill in
// (same feel as cloudbeds.com). The stat tiles stay put as in Figma; only their numbers move,
// counting up every time the tiles come into view.
export default function Stats() {
  const wrapRef = useRef(null)
  const pinRef = useRef(null)
  const [progress, setProgress] = useState(1)
  // Milliseconds into the count-up animation (starts finished, so no-JS / reduced motion shows final numbers)
  const [elapsed, setElapsed] = useState(COUNT_TOTAL)

  // Scroll-driven word fill
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const desktop = window.matchMedia('(min-width: 1024px)')
    let frame = 0
    const update = () => {
      frame = 0
      const wrap = wrapRef.current
      const pin = pinRef.current
      if (!wrap || !pin) return
      const w = wrap.getBoundingClientRect()
      if (desktop.matches) {
        const p = pin.getBoundingClientRect()
        setProgress(clamp((p.top - w.top) / (w.height - p.height)))
      } else {
        const vh = window.innerHeight
        setProgress(clamp((vh * 0.85 - w.top) / (vh * 0.9)))
      }
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Numbers count up from 0 each time the tiles scroll into view
  const tilesRef = useRef(null)
  useEffect(() => {
    const el = tilesRef.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const io = new IntersectionObserver(
      ([e]) => {
        cancelAnimationFrame(raf)
        if (!e.isIntersecting) {
          setElapsed(0) // reset while hidden, ready to replay
          return
        }
        const start = performance.now()
        const tick = (now) => {
          const ms = Math.min(COUNT_TOTAL, now - start)
          setElapsed(ms)
          if (ms < COUNT_TOTAL) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  const fill = clamp(progress / FILL_END) * (TOTAL_WORDS + EDGE)

  return (
    <section ref={wrapRef} className="relative z-10 bg-principal text-second lg:h-[190vh] lg:shadow-[0px_-24px_48px_rgba(0,0,0,0.18)]">
      <div
        ref={pinRef}
        // Fills the screen under the 78px header; on short screens it pins higher so the tiles stay visible
        className="flex flex-col justify-center overflow-hidden py-[64px] lg:sticky lg:top-[min(78px,calc(100vh_-_666px))] lg:h-[max(666px,calc(100vh_-_78px))] lg:py-0"
      >
        <div className="mx-auto w-full max-w-[1440px] px-[16px] lg:pr-[189px] lg:pl-[118px]">
          <div className="flex flex-col gap-[43px] font-medium">
            <h2 className="text-[40px] leading-[1.14] lg:flex lg:h-[202px] lg:items-center lg:text-[65px]" aria-label={HEADLINE}>
              <span aria-hidden>
                <Words words={HEAD_WORDS} offset={0} fill={fill} />
              </span>
            </h2>
            <p className="text-[22px] leading-[normal] lg:flex lg:h-[54px] lg:items-center lg:text-[32px]" aria-label={SUBTITLE}>
              <span aria-hidden>
                <Words words={SUB_WORDS} offset={HEAD_WORDS.length} fill={fill} />
              </span>
            </p>
          </div>

          <ul ref={tilesRef} className="mt-[40px] grid grid-cols-2 gap-[16px] lg:mt-[28px] lg:flex lg:gap-[41px]">
            {STATS.map((s, i) => {
              const t = clamp((elapsed - i * STAGGER_MS) / COUNT_MS)
              return (
                <li
                  key={s.label}
                  className="flex flex-col gap-[17px] rounded-[4px] bg-[rgba(38,28,10,0.1)] p-[24px] text-white transition-colors duration-300 hover:bg-[rgba(38,28,10,0.28)] lg:w-[271px]"
                >
                  <p className="font-grotesk text-[48px] leading-[48px] font-light tracking-[-0.96px] tabular-nums" aria-label={`${s.value}${s.suffix}`}>
                    <span aria-hidden>
                      {Math.round(s.value * (1 - Math.pow(1 - t, 3)))}
                      {s.suffix}
                    </span>
                  </p>
                  <p className="min-h-[35px] text-[14px] leading-[19px]">{s.label}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
