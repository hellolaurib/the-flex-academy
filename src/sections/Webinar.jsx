import { useState } from 'react'
import { EVENT_DETAILS, COUNTRIES } from '../data/content.js'

const label = 'block text-[14px] leading-[19px] text-[#1e1e1e]'
const input =
  'mt-[11.6px] block h-[42px] w-full rounded-[4px] border border-[rgba(30,30,30,0.1)] bg-white px-[18px] text-[14px] leading-[19px] text-[#1e1e1e] outline-none placeholder:text-[rgba(30,30,30,0.4)] focus:border-principal'

// "Join the free webinar, save your seat today" (31:10596)
export default function Webinar() {
  const [form, setForm] = useState({ name: '', email: '', country: '' })
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="webinar" className="mx-auto flex max-w-[1240px] flex-col items-center gap-[59px] px-[16px] pt-[109px]">
      <div className="flex flex-col items-center gap-[10px] text-center">
        <h2 className="text-[40px] leading-[1.2] font-semibold text-principal lg:h-[82px] lg:text-[52px] lg:leading-[62px]">
          Join the free webinar, <em className="font-normal">save your seat today</em>
        </h2>
        <p className="max-w-[856px] text-[20px] leading-[28px] text-black">
          Learn how to start a rental business the safe way, straight from the founders of The Flex. This free live session is your first step.
        </p>
      </div>

      <div className="flex w-full flex-col items-center gap-[48px] lg:w-auto lg:flex-row lg:gap-[158px]">
        <div className="flex w-full max-w-[356px] flex-col gap-[8px]">
          <div className="flex flex-col gap-[5px] lg:h-[79px] lg:w-[381px]">
            <h3 className="text-[32px] leading-[32px] font-medium text-principal opacity-98">Meet the founders live.</h3>
            <p className="font-poppins text-[16px] leading-[22.4px] text-black opacity-98">Fill in the form to save your free seat.</p>
          </div>
          <p className="text-[14px] leading-[19px] text-black opacity-92">Event Details &amp; Registration</p>
          {EVENT_DETAILS.map((d) => (
            <div key={d.text} className="flex items-center gap-[19px]">
              <div className="relative size-[50px] shrink-0 rounded-full bg-principal opacity-92">
                <img alt="" src={d.icon} className={`absolute left-[12.5px] ${d.iconTop} block size-[24px]`} />
              </div>
              <p className="text-[16px] leading-[20px] text-black opacity-92">{d.text}</p>
            </div>
          ))}
          <p className="flex items-center text-[16px] leading-[20px] text-black opacity-82 lg:h-[105px] lg:w-[361px]">
            We respect your privacy: no spam, no sharing your data. Can't make it live? Register and we'll send you the recording.
          </p>
        </div>

        <div className="w-full max-w-[473px] shrink-0 overflow-hidden rounded-[12px] bg-white/94 shadow-[0px_4px_19px_0px_rgba(0,0,0,0.18)] lg:h-[536px] lg:w-[473px]">
          <div className="px-[32px] pt-[30px]">
            <h3 className="text-[32px] leading-[normal] font-medium text-principal">Save your seat</h3>
            <p className="mt-[8px] text-[16px] leading-[20px] text-[rgba(30,30,30,0.7)]">Three quick details and you're in.</p>
          </div>
          <div className="mx-[32px] mt-[26px] h-px bg-[rgba(30,30,30,0.1)]" />

          {sent ? (
            <div role="status" className="flex flex-col items-start gap-[12px] px-[37px] pt-[40px] pb-[40px]">
              <p className="text-[24px] leading-[normal] font-semibold text-principal">You're in, {form.name.split(' ')[0]}!</p>
              <p className="text-[16px] leading-[20px] text-[rgba(30,30,30,0.7)]">
                We've saved your seat. Check {form.email} for the joining link — and if you can't make it live, we'll send you the recording.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="pt-[14px] pr-[26.58px] pb-[32px] pl-[37px]">
              <label className={label}>
                Full name
                <input required value={form.name} onChange={set('name')} placeholder="Enter your full name" autoComplete="name" className={input} />
              </label>
              <label className={`${label} mt-[17.6px]`}>
                Email ID
                <input required type="email" value={form.email} onChange={set('email')} placeholder="Enter your email" autoComplete="email" className={input} />
              </label>
              <label className={`${label} mt-[17.6px]`}>
                Country
                <select
                  required
                  value={form.country}
                  onChange={set('country')}
                  className={`${input} cursor-pointer appearance-none ${form.country ? '' : 'text-[rgba(30,30,30,0.4)]'}`}
                >
                  <option value="" disabled>Select your country</option>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c} className="text-[#1e1e1e]">{c}</option>
                  ))}
                </select>
              </label>
              <button
                type="submit"
                className="mt-[40px] block h-[46.41px] w-full cursor-pointer rounded-[4px] bg-principal font-poppins text-[16px] leading-[22.4px] text-white transition-opacity hover:opacity-90"
              >
                Save my free seat
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
