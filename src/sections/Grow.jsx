import Button from '../components/Button.jsx'
import starsDark from '../assets/figma/stars-dark.svg'
import starHalfDark from '../assets/figma/star-half-dark.svg'
import { COHORT_AVATARS } from '../data/content.js'

// "Grow your units, not your workload" (26:9761)
export default function Grow() {
  return (
    <section className="mx-auto flex max-w-[961px] flex-col items-center gap-[20px] px-[16px] pt-[79px] text-center lg:px-0">
      <div data-reveal className="flex items-center gap-[18px]">
        <div className="flex">
          {COHORT_AVATARS.map((src, i) => (
            <img
              key={src}
              alt=""
              src={src}
              className={`relative block size-[40px] rounded-full border border-principal object-cover transition-[translate] duration-200 hover:z-10 hover:-translate-y-[5px] ${i > 0 ? "-ml-[10px]" : ""}`}
            />
          ))}
        </div>
        <div className="flex w-[220.641px] flex-col items-start gap-[4px]">
          <div className="flex items-center gap-[4px]">
            <img alt="" src={starsDark} className="block h-[16px] w-[77px]" />
            <img alt="" src={starHalfDark} className="block size-[16px]" />
          </div>
          <p className="text-[16px] leading-[20px] text-ink">4.6 Rated by our first cohort.</p>
        </div>
      </div>

      <h2 data-reveal style={{ '--d': '100ms' }} className="text-[40px] leading-[1.14] font-medium text-principal lg:text-[65px]">
        Grow your units, not <em className="font-normal">your workload</em>
      </h2>

      <p data-reveal style={{ '--d': '200ms' }} className="max-w-[743px] text-[20px] leading-[28px] text-ink">
        Manual work, thin margins and no time to grow? In a free strategy call, we'll look at your operation and show you how to turn it into a real company.
      </p>

      <div data-reveal style={{ '--d': '300ms' }}>
        <Button kind="call" variant="green" href="#book" />
      </div>
    </section>
  )
}
