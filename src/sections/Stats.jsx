import { useEffect, useRef, useState } from 'react'
import { STATS } from '../data/content.js'

const HEADLINE = 'No course teaches you more about running rentals than the people who run them.'
const WORDS = HEADLINE.split(' ')

// Extra scroll distance (px) the section stays pinned for, on desktop.
// This is the "extra height" the Figma layer name refers to.
const PIN_RANGE = 1000

const clamp = (v) => Math.min(1, Math.max(0, v))
const easeOut = (t) => 1 - Math.pow(1 - t, 3)
// Maps the overall progress p onto a [from, to] window, as 0..1
const phase = (p, from, to) => clamp((p - from) / (to - from))

// "Pin wrapper: its extra height is the scroll range for the word-fill animation → Section" (24:3501).
// On desktop the module stays fixed on screen while you scroll through PIN_RANGE:
//   1. headline words fill in, 2. the subtitle lights up,
//   3. the stat cards rise in one by one while their numbers count up.
// The end state (progress = 1) is exactly the static Figma design.
export default function Stats() {
  const wrapRef = useRef(null)
  const pinRef = useRef(null)
  const [progress, setProgress] = useState(1)

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
        // How far the sticky block has travelled inside its wrapper
        const p = pin.getBoundingClientRect()
        setProgress(clamp((p.top - w.top) / (w.height - p.height)))
      } else {
        // Mobile: no pin, play it while the section scrolls into view
        const vh = window.innerHeight
        setProgress(clamp((vh * 0.9 - w.top) / (vh * 0.9)))
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

  const filled = phase(progress, 0, 0.55) * WORDS.length
  const subtitle = phase(progress, 0.5, 0.62)

  return (
    <section
      ref={wrapRef}
      className="mt-[64px] bg-principal text-second lg:h-[calc(666px_+_var(--pin))]"
      style={{ '--pin': `${PIN_RANGE}px` }}
    >
      <div
        ref={pinRef}
        // Pinned under the 78px header; on short screens it pins higher so the cards stay visible
        className="mx-auto max-w-[1440px] px-[16px] py-[64px] lg:sticky lg:top-[min(78px,calc(100vh_-_666px))] lg:h-[666px] lg:pt-[87px] lg:pr-[189px] lg:pb-0 lg:pl-[118px]"
      >
        <div className="flex flex-col gap-[43px] font-medium">
          <h2 className="text-[40px] leading-[1.14] lg:flex lg:h-[202px] lg:items-center lg:text-[65px]" aria-label={HEADLINE}>
            <span aria-hidden>
              {WORDS.map((w, i) => (
                <span key={i} className="transition-opacity duration-200" style={{ opacity: 0.2 + 0.8 * clamp(filled - i) }}>
                  {w}{i < WORDS.length - 1 ? ' ' : ''}
                </span>
              ))}
            </span>
          </h2>
          <p
            className="text-[22px] leading-[normal] transition-opacity duration-200 lg:flex lg:h-[54px] lg:items-center lg:text-[32px]"
            style={{ opacity: 0.2 + 0.8 * subtitle }}
          >
            Numbers speak. Everything we teach, we use every day to run The Flex.
          </p>
        </div>

        <div className="mt-[40px] grid grid-cols-2 gap-[16px] lg:mt-[28px] lg:flex lg:gap-[41px]">
          {STATS.map((s, i) => {
            const enter = easeOut(phase(progress, 0.58 + i * 0.05, 0.75 + i * 0.05))
            const count = easeOut(phase(progress, 0.6 + i * 0.05, 0.85 + i * 0.05))
            return (
              <div
                key={s.label}
                className="group flex flex-col gap-[17px] rounded-[4px] bg-[rgba(38,28,10,0.1)] p-[24px] text-white transition-colors duration-300 hover:bg-[rgba(38,28,10,0.25)] lg:w-[271px]"
                style={{ opacity: enter, transform: `translateY(${(1 - enter) * 32}px)` }}
              >
                <p className="font-grotesk text-[48px] leading-[48px] font-light tracking-[-0.96px] tabular-nums" aria-label={`${s.value}${s.suffix}`}>
                  {Math.round(s.value * count)}
                  {s.suffix}
                </p>
                <p className="min-h-[35px] text-[14px] leading-[19px]">{s.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
