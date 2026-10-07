import { useCallback, useEffect, useMemo, useState } from 'react'
import Modal from './Modal.jsx'
import Button from './Button.jsx'
import Confirmation from './Confirmation.jsx'
import { BOOKING_FIELDS, BOOKING_SLOTS, BOOKING_DAYS_AHEAD, CALL_MINUTES } from '../data/content.js'
import chevron from '../assets/figma/booking-prev.svg'
import nextIcon from '../assets/figma/booking-next.svg'
import globe from '../assets/figma/booking-globe.svg'
import caret from '../assets/figma/booking-caret.svg'
import iconPerson from '../assets/figma/summary-person.svg'
import iconCalendar from '../assets/figma/summary-calendar.svg'
import iconLocation from '../assets/figma/summary-location.svg'
import iconVideo from '../assets/figma/summary-video.svg'

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const EMPTY = { units: '', target: '', city: '', budget: '', name: '', email: '', date: null, time: '' }

const label = 'block text-[14px] leading-[19px] text-[#1e1e1e]'
const field =
  'block h-[42px] w-full rounded-[4px] border border-[rgba(30,30,30,0.1)] bg-white px-[18px] text-[14px] leading-[19px] text-[#1e1e1e] outline-none placeholder:text-[rgba(30,30,30,0.4)] focus:border-principal'

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)
const sameDay = (a, b) => a && b && a.toDateString() === b.toDateString()

// Bookable: weekdays from tomorrow up to BOOKING_DAYS_AHEAD days out
const isBookable = (d, today) => {
  const wd = d.getDay()
  return d > today && d <= addDays(today, BOOKING_DAYS_AHEAD) && wd !== 0 && wd !== 6
}

function timeZoneInfo() {
  const now = new Date()
  const name = new Intl.DateTimeFormat('en-GB', { timeZoneName: 'long' }).formatToParts(now).find((p) => p.type === 'timeZoneName')?.value
  const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }).replace(' ', '').toLowerCase()
  return `${name} (${time})`
}

// "19:00 - 19:45, Monday, October 19, 2026"
function callWhen(date, time) {
  const [h, m] = time.split(':').map(Number)
  const end = new Date(date.getFullYear(), date.getMonth(), date.getDate(), h, m + CALL_MINUTES)
  const hhmm = (d) => d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  const day = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
  return `${time} - ${hhmm(end)}, ${day}`
}

function Calendar({ value, onChange }) {
  const today = useMemo(() => startOfDay(new Date()), [])
  const [month, setMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1))
  const lastBookable = addDays(today, BOOKING_DAYS_AHEAD)
  const canPrev = month > new Date(today.getFullYear(), today.getMonth(), 1)
  const canNext = new Date(month.getFullYear(), month.getMonth() + 1, 1) <= lastBookable

  const offset = (month.getDay() + 6) % 7 // Monday-first grid
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const days = Array.from({ length: daysInMonth }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1))
  const shift = (n) => setMonth((m) => new Date(m.getFullYear(), m.getMonth() + n, 1))

  // Enabled arrows use the filled "next" circle; disabled ones the bare "previous" chevron
  const arrow = (dir, enabled) => (
    <button
      type="button"
      onClick={() => shift(dir)}
      disabled={!enabled}
      aria-label={dir < 0 ? 'Previous month' : 'Next month'}
      className="size-[37.905px] shrink-0 cursor-pointer rounded-full transition-opacity enabled:hover:opacity-80 disabled:cursor-default"
    >
      <img
        alt=""
        src={enabled ? nextIcon : chevron}
        className={`block size-[37.905px] ${(dir < 0) === enabled ? '-scale-x-100' : ''}`}
      />
    </button>
  )

  return (
    <div className="flex w-full max-w-[343.14px] flex-col gap-[15.96px]">
      <div className="flex items-center justify-between">
        {arrow(-1, canPrev)}
        <p className="text-[18px] leading-[23px] text-[#1a1a1a]" aria-live="polite">
          {month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>
        {arrow(1, canNext)}
      </div>

      <div className="grid grid-cols-7 gap-x-[5.985px] gap-y-[7.98px]" role="grid">
        {WEEKDAYS.map((d) => (
          <p key={d} className="mb-[7.98px] text-center text-[11.97px] leading-[11.97px] text-[#1a1a1a] uppercase">{d}</p>
        ))}
        {offset > 0 && <span style={{ gridColumn: `span ${offset}` }} />}
        {days.map((d) => {
          const bookable = isBookable(d, today)
          const selected = sameDay(d, value)
          const isToday = sameDay(d, today)
          return (
            <button
              key={d.getDate()}
              type="button"
              disabled={!bookable}
              onClick={() => onChange(d)}
              aria-pressed={selected}
              aria-label={d.toDateString()}
              className={`relative flex aspect-square w-full max-w-[43.89px] cursor-pointer items-center justify-center justify-self-center rounded-full text-[15.96px] leading-[1.5] transition-colors disabled:cursor-default ${
                selected
                  ? 'bg-principal font-bold text-white'
                  : bookable
                    ? 'bg-[rgba(40,78,76,0.21)] font-bold text-principal hover:bg-[rgba(40,78,76,0.34)]'
                    : 'text-[rgba(26,26,26,0.61)]'
              }`}
            >
              <span className={isToday ? '-translate-y-[1.5px]' : ''}>{d.getDate()}</span>
              {isToday && <span className="absolute top-[71.6%] left-1/2 size-[3.99px] -translate-x-1/2 rounded-full bg-[rgba(26,26,26,0.61)]" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function TimeZone() {
  const tz = useMemo(timeZoneInfo, [])
  return (
    <div className="flex flex-col gap-[5.985px]">
      <p className="text-[15.96px] leading-[1.5] font-bold text-[#1a1a1a]">Time zone</p>
      <div className="flex items-center gap-[3.99px]">
        <span className="flex items-center gap-[11.97px]">
          <img alt="" src={globe} className="block size-[13.965px] -scale-y-100" />
          <span className="text-[13.965px] leading-[1.5] text-[#1a1a1a]">{tz}</span>
        </span>
        <img alt="" src={caret} className="block size-[7.98px] -scale-y-100" />
      </div>
    </div>
  )
}

// "Book a strategy call" modal: form + calendar (38:3024, 41:219) → "Summary" (38:3265).
// Every link to #book opens it; without JS those links still scroll to the final CTA.
export default function BookingModal() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [booked, setBooked] = useState(false)
  const [needTime, setNeedTime] = useState(false)
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  useEffect(() => {
    const onClick = (e) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return
      if (!e.target.closest('a[href="#book"]')) return
      e.preventDefault()
      setOpen(true)
    }
    // Capture phase, so it runs before the smooth-anchor handler
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  const close = useCallback(() => {
    setOpen(false)
    setBooked(false)
    setForm(EMPTY)
    setNeedTime(false)
  }, [])

  const submit = (e) => {
    e.preventDefault()
    if (!form.time) return setNeedTime(true)
    setBooked(true)
  }

  return (
    <Modal open={open} onClose={close} label={booked ? 'Call booked' : 'Book a strategy call'} className={booked ? 'max-w-[618px]' : 'max-w-[800px]'}>
      {booked ? (
        <Confirmation
          title={`You are scheduled, ${form.name.trim().split(' ')[0]}`}
          subtitle="A calendar invitation has been sent to your email address."
          cardTitle="Strategy call with The Flex"
          rows={[
            { icon: iconPerson, text: 'The Flex Academy team' },
            { icon: iconCalendar, text: callWhen(form.date, form.time) },
            { icon: iconLocation, text: form.city },
            { icon: iconVideo, iconSize: 'size-[19.6px]', text: 'Web conferencing details to follow.' },
          ]}
        />
      ) : (
        <form onSubmit={submit} className="flex flex-col md:min-h-[677.6px] md:flex-row">
          {/* Account details */}
          <div className="flex flex-col justify-between gap-[32px] px-[28px] pt-[64px] pb-[28px] md:w-[400px] md:shrink-0 md:pt-[69px]">
            <div className="flex w-full max-w-[332px] flex-col gap-[20px]">
              {BOOKING_FIELDS.map((f) => (
                <label key={f.key} className={label}>
                  {f.label}
                  <span className="relative mt-[13px] block">
                    <select
                      required
                      value={form[f.key]}
                      onChange={set(f.key)}
                      className={`${field} cursor-pointer appearance-none pr-[44px] ${form[f.key] ? '' : 'text-[rgba(30,30,30,0.4)]'}`}
                    >
                      <option value="" disabled>{f.placeholder}</option>
                      {f.options.map((o) => (
                        <option key={o} value={o} className="text-[#1e1e1e]">{o}</option>
                      ))}
                    </select>
                    <img alt="" src={chevron} className="pointer-events-none absolute top-[2px] right-[8.1px] block size-[37.905px] -rotate-90" />
                  </span>
                </label>
              ))}
              <div className={label}>
                <span id="booking-contact">Name and email</span>
                <div className="mt-[13px] flex flex-col gap-[13px]" role="group" aria-labelledby="booking-contact">
                  <input required value={form.name} onChange={set('name')} placeholder="Enter your full name" autoComplete="name" aria-label="Full name" className={field} />
                  <input required type="email" value={form.email} onChange={set('email')} placeholder="Enter your email" autoComplete="email" aria-label="Email" className={field} />
                </div>
              </div>
            </div>
            <div className="flex w-full max-w-[351.12px] justify-between text-[14px] leading-[1.5] whitespace-nowrap">
              <span className="text-[#0069ff]">Cookie settings</span>
              <span className="text-[#1a1a1a]">Report abuse</span>
            </div>
          </div>

          {/* Calendar section */}
          <div className="flex flex-col gap-[22.4px] border-t-[0.7px] border-[rgba(0,0,0,0.1)] px-[28px] pt-[32px] pb-[28px] md:w-[400px] md:shrink-0 md:border-t-0 md:border-l-[0.7px] md:pt-[63px]">
            <h2 className="text-[18px] leading-[13px] font-medium text-principal">Select a Date &amp; Time</h2>
            <Calendar value={form.date} onChange={(date) => setForm((f) => ({ ...f, date, time: '' }))} />

            {form.date ? (
              <div className="enter-up flex flex-col gap-[14px]" style={{ animationDuration: '0.45s' }}>
                <div className="grid max-w-[346px] grid-cols-2 gap-x-[4px] gap-y-[7px]" role="radiogroup" aria-label="Time">
                  {BOOKING_SLOTS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      role="radio"
                      aria-checked={form.time === t}
                      onClick={() => {
                        setForm((f) => ({ ...f, time: t }))
                        setNeedTime(false)
                      }}
                      className={`h-[42px] cursor-pointer rounded-[4px] border border-principal text-[14px] leading-[19px] transition-colors ${
                        form.time === t ? 'bg-principal text-white' : 'bg-white text-principal hover:bg-[rgba(40,78,76,0.12)]'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                {needTime && <p className="text-[13px] text-[#b42318]" role="alert">Pick a time for your call.</p>}
                <TimeZone />
                <Button kind="call" variant="green" type="submit" />
              </div>
            ) : (
              <TimeZone />
            )}
          </div>
        </form>
      )}
    </Modal>
  )
}
