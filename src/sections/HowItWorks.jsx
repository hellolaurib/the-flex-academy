import { STEPS } from '../data/content.js'

// "How it works" strip (2:355)
export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-cream">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-[40px] px-[16px] py-[50px] lg:h-[243px] lg:flex-row lg:items-center lg:gap-[125px] lg:px-[122px]">
        <div data-reveal className="flex flex-col gap-[23px] lg:w-[188px]">
          <h2 className="text-[24px] leading-[21px] font-semibold text-principal">How it works?</h2>
          <p className="text-[14px] leading-[19px] text-ink opacity-90">From zero to your first booking, in three steps.</p>
        </div>

        <ol className="flex flex-col gap-[32px] sm:flex-row lg:gap-[118px]">
          {STEPS.map((s, i) => (
            <li key={s.title} data-reveal style={{ '--d': `${120 + i * 120}ms` }} className={`group flex flex-col gap-[14px] ${s.width}`}>
              <div className="flex w-fit items-center rounded-[10px] bg-principal p-[6px] transition-[rotate,scale] duration-300 group-hover:-rotate-6 group-hover:scale-110">
                <img alt="" src={s.icon} className="block size-[32px]" />
              </div>
              <div className="text-ink">
                <h3 className="text-[18px] leading-[28px] font-medium">{s.title}</h3>
                <p className="mt-[6px] min-h-[47px] text-[16px] leading-[20px] opacity-90">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
