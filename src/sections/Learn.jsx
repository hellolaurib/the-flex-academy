import iconHouse from '../assets/figma/icon-house.svg'
import iconMessenger from '../assets/figma/icon-messenger.svg'
import learnUnit from '../assets/figma/learn-unit.png'
import learnInbox from '../assets/figma/learn-inbox.png'
import { SMALL_LEARN_CARDS } from '../data/content.js'

const card = 'relative shrink-0 overflow-hidden rounded-[12px] bg-white shadow-[0px_4px_9.2px_0px_rgba(0,0,0,0.08)]'
const iconBox = 'absolute left-[32px] size-[40px] rounded-[4px] border border-[rgba(255,255,255,0.05)] bg-principal'

// "What you'll learn" (30:10315)
export default function Learn() {
  return (
    <section id="learn" className="mt-[78px] bg-cream">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-[10px] px-[16px] py-[50px] lg:h-[1095px] lg:px-[122px]">
        <div className="flex flex-col items-center gap-[20px] text-center lg:h-[138px]">
          <h2 className="text-[40px] leading-[1.2] font-semibold text-principal lg:text-[52px] lg:leading-[62px]">
            What you'll <em className="font-normal">learn</em>
          </h2>
          <p className="text-[20px] leading-[28px] text-ink">The same systems we use every day to run The Flex.</p>
        </div>

        <div className="flex w-full max-w-[1013px] flex-col gap-[34px]">
          <div className="flex flex-col items-center gap-[28px] lg:flex-row">
            <article className={`${card} h-[468px] w-full max-w-[317px]`}>
              <div className={`${iconBox} top-[31.59px]`}>
                <img alt="" src={iconHouse} className="absolute top-[6.41px] left-[6.5px] block size-[25px]" />
              </div>
              <img alt="" src={learnUnit} className="absolute top-[91px] left-[31.5px] block h-[202px] w-[361px] max-w-none object-cover" />
              <h3 className="absolute top-[355px] left-[32px] text-[24px] leading-[normal] font-semibold whitespace-nowrap text-principal">
                Find your first unit
              </h3>
              <p className="absolute top-[395.5px] right-[47.5px] left-[31.5px] font-poppins text-[14px] leading-[19.6px] text-black">
                Pick the right market, run the numbers and pitch landlords.
              </p>
            </article>

            <article className={`${card} h-[520px] w-full lg:h-[468px] lg:w-[668px]`}>
              <div className={`${iconBox} top-[32px]`}>
                <img alt="" src={iconMessenger} className="absolute top-[6px] left-[6.5px] block size-[25px]" />
              </div>
              <img alt="" src={learnInbox} className="absolute top-[89px] left-[31.5px] block h-[234px] w-[400px] max-w-none object-cover" />
              <img alt="" src={learnInbox} className="absolute top-[89px] left-[448.5px] block h-[234px] w-[400px] max-w-none object-cover" />
              <h3 className="absolute top-[355px] left-[32px] text-[24px] leading-[normal] font-semibold text-principal lg:whitespace-nowrap">
                Every guest message, one inbox
              </h3>
              <p className="absolute top-[425px] right-[16px] lg:top-[401px] left-[32px] font-poppins text-[14px] leading-[19.6px] text-principal lg:whitespace-nowrap">
                Answer Airbnb, Booking.com and WhatsApp in one place, with AI help.
              </p>
            </article>
          </div>

          <div className="flex flex-col items-center gap-[28px] lg:flex-row">
            {SMALL_LEARN_CARDS.map((c) => (
              <article key={c.title} className={`${card} h-[271.59px] w-full max-w-[317.33px]`}>
                <div className={`${iconBox} top-[32px]`}>
                  <img alt="" src={c.icon} className={`absolute top-[7px] ${c.iconLeft} block size-[24px]`} />
                </div>
                <h3 className={`absolute top-[108px] left-[32px] right-0 flex h-[59.41px] items-center ${c.titleRight} font-poppins text-[24px] leading-[31px] font-medium text-principal`}>
                  {c.title}
                </h3>
                <p className="absolute top-[179.8px] right-[46.97px] left-[32px] flex h-[59.18px] items-center font-poppins text-[14px] leading-[19.6px] text-principal">
                  {c.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
