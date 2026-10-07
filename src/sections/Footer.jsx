import { useState } from 'react'
import inputArrow from '../assets/figma/input-arrow.svg'
import socialLinkedin from '../assets/figma/social-linkedin.svg'
import socialX from '../assets/figma/social-x.svg'
import socialInstagram from '../assets/figma/social-instagram.svg'
import socialYoutube from '../assets/figma/social-youtube.svg'
import { NAV_LINKS } from '../data/content.js'

const SOCIALS = [
  { label: 'LinkedIn', icon: socialLinkedin },
  { label: 'X', icon: socialX },
  { label: 'Instagram', icon: socialInstagram },
  { label: 'YouTube', icon: socialYoutube },
]

// "Not ready to start yet?" waitlist + footer (34:52)
export default function Footer() {
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)

  return (
    <footer className="mt-[102px] bg-principal text-second">
      <div className="mx-auto max-w-[1440px] px-[16px] pt-[64px] pb-[48px] lg:h-[503px] lg:pt-[91px] lg:pr-[119px] lg:pb-0 lg:pl-[121px]">
        <div className="flex flex-col gap-[40px] lg:flex-row lg:justify-between">
          <div className="lg:w-[517.586px]">
            <h2 className="text-[40px] leading-[1.2] font-semibold lg:flex lg:h-[155.4px] lg:items-center lg:text-[52px] lg:leading-[62px]">
              Not ready to start yet?
            </h2>
            <p className="mt-[12px] text-[16px] leading-[20px] lg:mt-0 lg:flex lg:h-[54px] lg:items-center">
              Stay close. We'll let you know when the next webinar opens, and send you our free STR scaling checklist.
            </p>
          </div>

          <div className="w-full max-w-[439px] self-start rounded-[8px] bg-white drop-shadow-[0px_4px_12.5px_rgba(0,0,0,0.2)] lg:mt-[22px] lg:mr-[39px] lg:h-[181px]">
            <p className="flex h-[50.2px] items-center border-b border-[#e7e7e7] px-[16px] text-[14px] leading-[19px] text-[rgba(0,0,0,0.7)]">
              Join the waitlist
            </p>
            {joined ? (
              <p role="status" className="px-[20px] pt-[24px] pb-[24px] text-[14px] leading-[19px] text-principal">
                Thanks! You're on the list — we'll email {email} when the next webinar opens.
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setJoined(true)
                }}
                className="pt-[15.8px] pr-[23px] pb-[24px] pl-[19px]"
              >
                <label className="block pl-[1px] text-[14px] leading-[19px] text-[#1e1e1e]">
                  Email ID
                  <span className="relative mt-[17.8px] block">
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      autoComplete="email"
                      className="block h-[42px] w-full rounded-[4px] border border-[rgba(30,30,30,0.1)] bg-white pr-[48px] pl-[18px] text-[14px] text-[#1e1e1e] outline-none placeholder:text-[rgba(30,30,30,0.4)] focus:border-principal"
                    />
                    <button
                      type="submit"
                      aria-label="Join the waitlist"
                      className="absolute top-1/2 right-[12px] flex size-[28px] -translate-y-1/2 cursor-pointer items-center justify-center transition-transform hover:translate-x-[2px]"
                    >
                      <img alt="" src={inputArrow} className="block size-[20px]" />
                    </button>
                  </span>
                </label>
              </form>
            )}
          </div>
        </div>

        <div className="mt-[40px] h-px bg-[rgba(255,255,255,0.2)] lg:mt-[68.6px]" />

        <div className="mt-[26px] flex flex-col gap-[24px] lg:flex-row lg:items-start lg:justify-between">
          <ul className="flex gap-[4px]">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a href="#top" aria-label={s.label} className="flex size-[50px] items-center justify-center rounded-full bg-[rgba(38,28,10,0.22)] transition-colors hover:bg-[rgba(38,28,10,0.45)]">
                  <img alt="" src={s.icon} className="block size-[18px]" />
                </a>
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap gap-x-[51px] gap-y-[12px] text-[14px] leading-[19px] lg:mt-[16px] lg:w-[566px]">
            {NAV_LINKS.map((l) => (
              <li key={l.href} className="whitespace-nowrap">
                <a href={l.href} className="transition-opacity hover:opacity-60">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
