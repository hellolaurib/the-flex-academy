import Button from '../components/Button.jsx'
import ctaBg from '../assets/figma/cta-bg.jpg'

// "Ready to run a real rental company?" hero (31:10597)
export default function FinalCta() {
  return (
    <section id="book" className="relative mt-[109px] overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <img alt="" src={ctaBg} className="absolute inset-0 size-full scale-110 object-cover" style={{ translate: '0 var(--parallax, 0px)' }} data-parallax />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.41)]" />
      </div>
      <div className="relative mx-auto flex max-w-[1440px] flex-col items-center justify-center gap-[32px] px-[16px] py-[86px] text-center text-white lg:h-[464px] lg:pr-[119px] lg:pl-[124px]">
        <h2 data-reveal className="text-[52px] leading-[1] font-normal tracking-[-2px] lg:text-[96px] lg:leading-[82px]">
          Ready to run a real rental <br className="hidden lg:block" />
          company?
        </h2>
        <p data-reveal style={{ '--d': '120ms' }} className="max-w-[551.25px] text-[20px] leading-[28px]">
          Tell us about your units and goals, and we'll show you how to scale with the systems behind The Flex.
        </p>
        <div data-reveal style={{ '--d': '240ms' }}>
          <Button kind="call" variant="cream" href="#book" />
        </div>
      </div>
    </section>
  )
}
