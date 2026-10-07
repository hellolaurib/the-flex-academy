import { useState } from 'react'
import faqArrow from '../assets/figma/faq-arrow.svg'
import { FAQS } from '../data/content.js'

// "FAQS" (34:51) — each row is a "Heading 2 → Button" in Figma, built as an accordion
export default function Faqs() {
  const [open, setOpen] = useState(null)

  return (
    <section id="faqs" className="mx-auto mt-[72px] flex max-w-[1230px] flex-col gap-[32px] px-[16px] lg:flex-row lg:gap-[58px]">
      <h2 data-reveal className="text-[32px] leading-[normal] font-semibold text-principal lg:w-[253.985px] lg:shrink-0">
        Frequently asked
        <br />
        questions
      </h2>

      <ul className="flex w-full flex-col gap-[31px] lg:w-[886px]">
        {FAQS.map((f, i) => {
          const isOpen = open === i
          return (
            <li key={f.q} data-reveal style={{ '--d': `${80 + i * 90}ms` }} className="border-b border-line">
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex min-h-[73px] w-full cursor-pointer items-center justify-between gap-[16px] group text-left text-[20px] leading-[normal] text-black transition-colors hover:text-principal lg:text-[24px]"
                >
                  <span className="transition-[translate] duration-300 group-hover:translate-x-[6px]">{f.q}</span>
                  <img
                    alt=""
                    src={faqArrow}
                    className={`mr-[8.45px] block size-[20px] shrink-0 transition-[rotate,translate] duration-300 group-hover:translate-x-[4px] ${isOpen ? 'rotate-90' : ''}`}
                  />
                </button>
              </h3>
              <div className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                  <p className="max-w-[760px] pb-[24px] text-[16px] leading-[20px] text-ink opacity-90">{f.a}</p>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
