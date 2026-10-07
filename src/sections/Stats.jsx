import { useEffect, useRef, useState } from 'react'
import { STATS } from '../data/content.js'

const HEADLINE = 'No course teaches you more about running rentals than the people who run them.'
const WORDS = HEADLINE.split(' ')

// "Pin wrapper … word-fill animation → Section" (24:3501).
// The Figma layer name asks for the headline words to fill in as you scroll
// through the section; the static design is the fully-filled end state.
export default function Stats() {
  const ref = useRef(null)
  const [progress, setProgress] = useState(1)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const onScroll = () => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      // 0 when the section's top enters the bottom of the viewport,
      // 1 once it has reached ~30% from the top.
      const p = (vh - r.top) / (vh * 0.7)
      setProgress(Math.min(1, Math.max(0, p)))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const filled = progress * WORDS.length

  return (
    <section ref={ref} className="mt-[64px] bg-principal text-second">
      <div className="mx-auto max-w-[1440px] px-[16px] py-[64px] lg:h-[666px] lg:pt-[87px] lg:pr-[189px] lg:pb-0 lg:pl-[118px]">
        <div className="flex flex-col gap-[43px] font-medium">
          <h2 className="text-[40px] leading-[1.14] lg:flex lg:h-[202px] lg:items-center lg:text-[65px]" aria-label={HEADLINE}>
            <span aria-hidden>
              {WORDS.map((w, i) => (
                <span
                  key={i}
                  className="transition-opacity duration-300"
                  style={{ opacity: Math.min(1, Math.max(0.2, filled - i + 0.2)) }}
                >
                  {w}{i < WORDS.length - 1 ? ' ' : ''}
                </span>
              ))}
            </span>
          </h2>
          <p className="text-[22px] leading-[normal] lg:flex lg:h-[54px] lg:items-center lg:text-[32px]">
            Numbers speak. Everything we teach, we use every day to run The Flex.
          </p>
        </div>

        <div className="mt-[40px] grid grid-cols-2 gap-[16px] lg:mt-[28px] lg:flex lg:gap-[41px]">
          {STATS.map((s) => (
            <div key={s.value} className="flex flex-col gap-[17px] rounded-[4px] bg-[rgba(38,28,10,0.1)] p-[24px] text-white lg:w-[271px]">
              <p className="font-grotesk text-[48px] leading-[48px] font-light tracking-[-0.96px]">{s.value}</p>
              <p className="min-h-[35px] text-[14px] leading-[19px]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
