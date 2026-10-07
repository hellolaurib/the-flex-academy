import { useState } from 'react'
import logo from '../assets/figma/logo.png'
import { NAV_LINKS } from '../data/content.js'

// NavBar (2:585) + webinar announcement Top bar (4:1584)
export default function Header() {
  const [bannerOpen, setBannerOpen] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 bg-second shadow-[-3px_0px_3px_3px_rgba(0,0,0,0.05)]">
        <nav className="mx-auto flex h-[78px] max-w-[1440px] items-center justify-between px-[16px] lg:pr-[115px] lg:pl-[120px]">
          <a href="#top" className="block h-[29.06px] w-[120px]" aria-label="The Flex — home">
            <img alt="The Flex" src={logo} className="block size-full object-contain object-bottom" />
          </a>

          <ul className="hidden w-[564px] items-center gap-[51px] text-[14px] leading-[19px] text-principal lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href} className="whitespace-nowrap">
                <a href={l.href} className="transition-opacity hover:opacity-60">{l.label}</a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="flex size-[40px] cursor-pointer flex-col items-center justify-center gap-[5px] lg:hidden"
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className={`h-[2px] w-[22px] bg-principal transition-transform ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`h-[2px] w-[22px] bg-principal transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-[2px] w-[22px] bg-principal transition-transform ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </button>
        </nav>

        {menuOpen && (
          <ul className="flex flex-col gap-[18px] border-t border-line px-[16px] py-[20px] text-[16px] text-principal lg:hidden">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
              </li>
            ))}
          </ul>
        )}
      </header>

      {bannerOpen && (
        <div className="relative bg-principal px-[40px] py-[16px] text-center text-[12px] text-white lg:h-[63px] lg:pt-[26px] lg:pb-0">
          <p className="mx-auto max-w-[655px] leading-[normal]">
            Free live webinar on Friday:&nbsp; how to start a short-term rental business, by the founders of The Flex.&nbsp;{' '}
            <a href="#webinar" className="italic underline">Save my seat here</a>
          </p>
          <button
            type="button"
            aria-label="Close announcement"
            onClick={() => setBannerOpen(false)}
            className="absolute top-1/2 right-[12px] flex size-[24px] -translate-y-1/2 cursor-pointer items-center justify-center text-white lg:right-[27px] lg:top-[38px]"
          >
            {/* Font Awesome "xmark" (solid), as in Figma */}
            <svg width="10" height="14" viewBox="0 0 384 512" fill="currentColor" aria-hidden>
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>
          </button>
        </div>
      )}
    </>
  )
}
