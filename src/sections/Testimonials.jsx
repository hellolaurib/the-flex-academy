import starsGroup from '../assets/figma/stars-group.svg'
import starHalfA from '../assets/figma/star-half-a.svg'
import starHalfB from '../assets/figma/star-half-b.svg'
import { TESTIMONIALS } from '../data/content.js'

function Stars() {
  return (
    <div className="relative h-[21px] w-[120px] overflow-hidden" role="img" aria-label="4.5 out of 5 stars">
      <img alt="" src={starsGroup} className="absolute top-[0.69px] left-0 block h-[18.9px] w-[94.79px]" />
      <img alt="" src={starHalfA} className="absolute top-[0.69px] left-[100.84px] block h-[18.9px] w-[19.16px]" />
      <img alt="" src={starHalfB} className="absolute top-[0.69px] left-[100.84px] block h-[18.9px] w-[9.58px]" />
    </div>
  )
}

// "Real operators, real progress" (31:10577)
export default function Testimonials() {
  return (
    <section className="mx-auto flex max-w-[1240px] flex-col gap-[62px] px-[16px] pt-[71px]">
      <div data-reveal className="flex flex-col items-center gap-[10px] text-center">
        <h2 className="text-[40px] leading-[1.2] font-semibold text-principal lg:text-[52px] lg:leading-[62px]">
          Real operators, <em className="font-normal">real progress</em>
        </h2>
        <p className="text-[20px] leading-[28px] text-brown">What people say about learning from a real rental company.</p>
      </div>

      <div className="flex flex-col items-center gap-[43px] lg:flex-row">
        {TESTIMONIALS.map((t, i) => (
          <article key={t.name} data-reveal style={{ '--d': `${80 + i * 120}ms` }} className="w-full transition-[translate,box-shadow] duration-300 hover:-translate-y-[6px] hover:shadow-[0px_18px_34px_0px_rgba(28,57,26,0.28)] max-w-[373px] shrink-0 rounded-[12px] bg-principal px-[32px] pt-[51px] pb-[24px] lg:h-[383px] lg:w-[373px]">
            <Stars />
            <div className="mt-[28px] flex w-full max-w-[313px] flex-col gap-[6px]">
              <h3 className="text-[24px] leading-[normal] font-semibold text-white lg:flex lg:h-[80px] lg:items-center">{t.title}</h3>
              <p className="text-[16px] leading-[20px] text-[rgba(255,255,255,0.7)] lg:flex lg:h-[113px] lg:items-center">{t.text}</p>
              <div className="flex items-start gap-[22px]">
                <img alt="" src={t.photo} className="block size-[50px] rounded-[3px] object-cover object-top" />
                <div className="flex flex-col gap-[3px] text-[12px]">
                  <p className={`h-[23px] text-white ${t.variant === 'b' ? 'leading-[20px] font-normal' : 'leading-[22.4px] font-medium'}`}>
                    {t.name}
                  </p>
                  <p className={`leading-[22.4px] whitespace-nowrap ${t.variant === 'b' ? 'text-[rgba(255,255,255,0.7)]' : 'text-[rgba(255,255,255,0.5)]'}`}>
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
