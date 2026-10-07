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

// The 4 Figma tiles, repeated so one half of the track is wider than any screen;
// the track holds two identical halves and slides by -50% for a seamless loop.
const REPEAT = 3
const HALF = Array.from({ length: REPEAT }, () => STATS).flat()
const TILE_W = 271
const GAP = 41
const PX_PER_SECOND = 30
const LOOP_SECONDS = (HALF.length * (TILE_W + GAP)) / PX_PER_SECOND

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
// plus its "Full-bleed stat-tile marquee (JS duplicates tiles for seamless loop)" layer.
// Desktop: the module fills the screen and stays pinned while the words fill in;
// the stat tiles loop continuously underneath, and their numbers count up once.
export default function Stats() {
  const wrapRef = useRef(null)
  const pinRef = useRef(null)
  const [progress, setProgress] = useState(1)
  const [count, setCount] = useState(1)

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

  // Numbers count up once, the first time the tiles come into view
  const tilesRef = useRef(null)
  useEffect(() => {
    const el = tilesRef.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setCount(0)
    let raf = 0
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const tick = (now) => {
          const t = Math.min(1, (now - start) / 1800)
          setCount(1 - Math.pow(1 - t, 3))
          if (t < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
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
        </div>

        {/* Full-bleed marquee, edges fade out at the 1440px frame like the reference */}
        <div
          ref={tilesRef}
          className="group mt-[40px] w-full overflow-hidden lg:mt-[28px]"
          style={{
            maskImage:
              'linear-gradient(to right, transparent max(0px, calc(50% - 720px)), #000 calc(max(0px, calc(50% - 720px)) + 48px), #000 calc(min(100%, calc(50% + 720px)) - 48px), transparent min(100%, calc(50% + 720px)))',
          }}
        >
          <ul
            className="marquee-track flex w-max group-hover:[animation-play-state:paused]"
            style={{ '--loop': `${LOOP_SECONDS}s` }}
            aria-label="The Flex in numbers"
          >
            {[...HALF, ...HALF].map((s, i) => (
              <li
                key={i}
                aria-hidden={i >= STATS.length}
                className="mr-[41px] flex w-[271px] shrink-0 flex-col gap-[17px] rounded-[4px] bg-[rgba(38,28,10,0.1)] p-[24px] text-white transition-colors duration-300 hover:bg-[rgba(38,28,10,0.28)]"
              >
                <p className="font-grotesk text-[48px] leading-[48px] font-light tracking-[-0.96px] tabular-nums">
                  {Math.round(s.value * count)}
                  {s.suffix}
                </p>
                <p className="min-h-[35px] text-[14px] leading-[19px]">{s.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
