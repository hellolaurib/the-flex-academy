import { useEffect, useState } from 'react'
import Button from '../components/Button.jsx'
import heroBg from '../assets/figma/hero-bg.jpg'
import starsHero from '../assets/figma/stars-hero.svg'
import starHalfHero from '../assets/figma/star-half-hero.svg'
import videoThumb from '../assets/figma/video-thumb.jpg'
import playIcon from '../assets/figma/play-icon.svg'

// Hero (25:3723) + "Link dialog - open lightbox" video card (25:3729)
export default function Hero() {
  const [lightbox, setLightbox] = useState(false)

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e) => e.key === 'Escape' && setLightbox(false)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox])

  return (
    <>
      <section id="top" className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <img alt="" src={heroBg} className="absolute inset-0 size-full object-cover object-bottom" />
          <div className="absolute inset-0 bg-[rgba(0,0,0,0.41)]" />
        </div>

        <div className="relative mx-auto flex max-w-[1440px] flex-col items-center gap-[32px] px-[16px] pt-[64px] pb-[260px] text-center text-white lg:h-[725px] lg:pt-[86px] lg:pr-[119px] lg:pl-[124px]">
          <div className="flex h-[22.41px] items-center">
            <img alt="" src={starsHero} className="block h-[16px] w-[77px]" />
            <img alt="" src={starHalfHero} className="ml-[3.74px] block size-[16px]" />
            <p className="w-[220.641px] text-[16px] leading-[20px]">4.6 Rated by our first cohort</p>
          </div>

          <h1 className="text-[52px] leading-[1] font-normal tracking-[-2px] lg:text-[96px] lg:leading-[82px]">
            How to start a rental <br className="hidden lg:block" />
            business you own
          </h1>

          <p className="max-w-[551.25px] text-[20px] leading-[28px]">
            Learn the playbook and software behind The Flex, from your first unit to a real company.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-[29px]">
            <Button kind="seat" variant="cream" href="#webinar" />
            <Button kind="call" variant="ghost" href="#book" />
          </div>
        </div>
      </section>

      <div className="relative z-10 mx-auto -mt-[209px] max-w-[994px] px-[16px] lg:px-0">
        <button
          type="button"
          onClick={() => setLightbox(true)}
          aria-label="Play video"
          className="group relative block aspect-[994/581] w-full cursor-pointer overflow-hidden rounded-[8px]"
        >
          <img alt="" src={videoThumb} className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 bg-[rgba(0,0,0,0.21)]" />
          <div className="absolute top-[45.4%] left-1/2 h-[85px] w-[120px] -translate-x-1/2 rounded-[24px] bg-[rgba(0,0,0,0.5)] backdrop-blur-[3.5px] transition-transform duration-200 group-hover:scale-110 max-lg:scale-75">
            <img
              alt=""
              src={playIcon}
              className="absolute top-1/2 left-[calc(50%+4.99px)] block h-[42.589px] w-[37.98px] -translate-x-1/2 -translate-y-1/2"
            />
          </div>
        </button>
      </div>

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Video"
          onClick={() => setLightbox(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.85)] p-[16px]"
        >
          <div className="relative w-full max-w-[1100px]" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setLightbox(false)}
              aria-label="Close video"
              className="absolute -top-[44px] right-0 cursor-pointer text-[32px] leading-none text-white"
            >
              ×
            </button>
            <div className="relative aspect-video w-full overflow-hidden rounded-[8px] bg-black">
              <img alt="" src={videoThumb} className="absolute inset-0 size-full object-cover opacity-40" />
              <p className="absolute inset-0 flex items-center justify-center text-[20px] text-white">
                Video coming soon
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
