import iconX from '../assets/figma/icon-x.svg'
import iconLinkedin from '../assets/figma/icon-linkedin.svg'
import { TEAM, COMPANY_LOGOS } from '../data/content.js'

// "Meet the team" + trust logos (30:9952)
export default function Team() {
  return (
    <section id="team" className="mt-[127px] overflow-hidden bg-principal text-second">
      <div className="mx-auto max-w-[1440px] px-[16px] pt-[64px] pb-[64px] lg:h-[1017px] lg:px-[117px] lg:pt-[91px] lg:pb-0">
        <div className="flex flex-col items-center gap-[50px] lg:w-[1207px]">
          <div className="flex flex-col items-center gap-[10px] text-center">
            <h2 className="text-[40px] leading-[1.2] font-semibold lg:text-[52px] lg:leading-[62px]">
              Meet <em className="font-normal">the team</em>
            </h2>
            <p className="text-[20px] leading-[28px]">Learn from operators, not gurus</p>
          </div>

          <div className="flex flex-col gap-[42px] sm:flex-row">
            {TEAM.map((m) => (
              <article key={m.name} className="flex w-full max-w-[373px] flex-col gap-[31px]">
                <div className="aspect-square w-full overflow-hidden rounded-[8px] bg-white">
                  <img alt={m.name} src={m.photo} className="block size-full object-cover" />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <h3 className="text-[24px] leading-[29px] font-semibold">{m.name}</h3>
                  <p className="text-[16px] leading-[20px]">{m.role}</p>
                  <div className="flex gap-[6px]">
                    <a href="#team" aria-label={`${m.name} on X`} className="flex size-[44px] items-center justify-center rounded-full bg-[rgba(38,28,10,0.44)] transition-colors hover:bg-[rgba(38,28,10,0.7)]">
                      <img alt="" src={iconX} className="block size-[18px]" />
                    </a>
                    <a href="#team" aria-label={`${m.name} on LinkedIn`} className="flex size-[44px] items-center justify-center rounded-full bg-[rgba(38,28,10,0.44)] transition-colors hover:bg-[rgba(38,28,10,0.7)]">
                      <img alt="" src={iconLinkedin} className="block size-[18px]" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Trust section: 835px from the section top in Figma */}
        <div className="mt-[64px] flex flex-col gap-[31px] lg:mt-[81px]">
          <p className="text-center text-[16px] leading-[20px] lg:w-[1207px]">The Flex houses teams from 150+ companies.</p>
          <ul className="flex flex-wrap items-end justify-center gap-[27px] lg:flex-nowrap lg:justify-start">
            {COMPANY_LOGOS.map((l) => (
              <li
                key={l.src}
                className={`shrink-0 bg-second ${l.tall ? 'h-[40px] w-[113px]' : 'h-[28px] w-[82px]'}`}
                style={{
                  maskImage: `url("${l.src}")`,
                  WebkitMaskImage: `url("${l.src}")`,
                  maskSize: '100% 100%',
                  WebkitMaskSize: '100% 100%',
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                }}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
