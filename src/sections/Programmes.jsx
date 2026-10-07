import Button from '../components/Button.jsx'
import programmeLaunch from '../assets/figma/programme-launch.jpg'
import programmeScale from '../assets/figma/programme-scale.jpg'
import iconCheck from '../assets/figma/icon-check.svg'

function Benefits({ items }) {
  return (
    <ul className="flex flex-col gap-[21px]">
      {items.map((b) => (
        <li key={b} className="flex items-start gap-[15px] text-[16px] leading-[20px] text-white">
          <img alt="" src={iconCheck} className="block size-[22px] shrink-0" />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  )
}

function Price({ title, amount, note }) {
  return (
    <>
      <h3 className="text-[32px] leading-[normal] font-medium text-white lg:h-[83px]">
        Learn how
        <br />
        <em className="font-normal">{title}</em>
      </h3>
      <div className="text-white">
        <p className="-mb-[20px] flex h-[122px] items-center text-[65px] leading-[1.14] font-semibold">{amount}</p>
        <p className="text-[16px] leading-[20px]">{note}</p>
      </div>
    </>
  )
}

const cardBase = 'relative w-full max-w-[580px] overflow-hidden rounded-[12px] lg:h-[730px] lg:w-[580px]'

// "Two programmes, one playbook" (34:295)
export default function Programmes() {
  return (
    <section id="programmes" className="mx-auto flex max-w-[1240px] flex-col items-center gap-[70px] px-[16px] pt-[106px]">
      <div className="flex flex-col items-center gap-[20px] text-center">
        <h2 className="text-[40px] leading-[1.2] font-semibold text-principal lg:text-[52px] lg:leading-[62px]">
          Two programmes, <em className="font-normal">one playbook</em>
        </h2>
        <p className="text-[20px] leading-[28px] text-brown">Pick the one that matches where you are today.</p>
      </div>

      <div className="flex w-full flex-col items-center gap-[44px] lg:flex-row lg:justify-center">
        {/* Card1 (34:282): content block is vertically centred */}
        <article className={`${cardBase} flex items-center px-[24px] py-[48px] lg:px-[57px] lg:py-[58px]`}>
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <img alt="" src={programmeLaunch} className="absolute top-[-27.7%] left-[-9.79%] h-[158.9%] w-[133.35%] max-w-none" />
            <div className="absolute inset-0 bg-[rgba(28,57,26,0.76)]" />
          </div>
          <div className="relative flex w-full max-w-[348px] flex-col gap-[48px] lg:gap-[77px]">
            <Price title="to launch" amount="$997" note="Example price X" />
            <div className="flex flex-col gap-[32px]">
              <Benefits items={['Self-paced course', 'Live group sessions', 'Templates to open your first units', 'Starts with a free live webinar']} />
              <Button kind="seat" variant="cream" href="#webinar" />
            </div>
          </div>
        </article>

        {/* Card2 (30:10105): content block pinned 59px from the top */}
        <article className={`${cardBase} px-[24px] py-[48px] lg:pt-[59px] lg:pl-[65px]`}>
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <img alt="" src={programmeScale} className="absolute top-[-2.88%] left-[-41.84%] h-[128.77%] w-[243.07%] max-w-none" />
            <div className="absolute inset-0 bg-[rgba(28,57,26,0.76)]" />
          </div>
          <div className="relative flex w-full max-w-[348px] flex-col gap-[48px] lg:gap-[60px]">
            <div className="flex flex-col gap-[48px] lg:h-[325px] lg:gap-[88px]">
              <Price title="to scale" amount="$4,997" note="Example price Y" />
            </div>
            <div className="flex flex-col gap-[21px]">
              <Benefits items={['12-week programme with weekly sessions', 'Monthly 1:1 with a founder', 'Operator community and SOPs', 'Access to Base360']} />
              <Button kind="call" variant="cream" href="#book" />
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
