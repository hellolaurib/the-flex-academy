import arrowDark from '../assets/figma/arrow-dark.svg'
import arrowLight from '../assets/figma/arrow-light.svg'

// Variants from the "Link → Button" component sets in Figma (24:3687 / 34:501):
// cream, green, and ghost (transparent; its second state is underlined).
// Hover swaps cream <-> green, ghost underlines.
const VARIANTS = {
  cream: 'bg-second text-ink hover:bg-principal hover:text-second',
  green: 'bg-principal text-second hover:bg-second hover:text-ink',
  ghost: 'bg-transparent text-second hover:underline',
}

// The two labels used across the page, with their Figma box sizes.
const SIZES = {
  seat: { label: 'Save mi seat', width: 'w-[165.59px]', labelWidth: 'w-[96.61px]' },
  call: { label: 'Book a strategy call', width: 'w-[205px]', labelWidth: 'w-[127px]' },
}

export default function Button({ kind = 'call', variant = 'cream', href, onClick, className = '' }) {
  const size = SIZES[kind]
  const Tag = href ? 'a' : 'button'
  const restArrow = variant === 'cream' ? arrowDark : arrowLight
  const hoverArrow = variant === 'green' ? arrowDark : arrowLight
  return (
    <Tag
      href={href}
      onClick={onClick}
      type={href ? undefined : 'button'}
      className={`group inline-flex h-[39px] shrink-0 cursor-pointer items-center gap-[7px] rounded-[30px] border border-transparent pl-[24px] text-[12.8px] font-semibold whitespace-nowrap underline-offset-2 transition-[color,background-color,scale] duration-200 active:scale-[0.97] ${size.width} ${VARIANTS[variant]} ${className}`}
    >
      <span className={`${size.labelWidth} text-center leading-[13px]`}>{size.label}</span>
      <span className="relative h-[16px] w-[15px] shrink-0 transition-transform duration-200 group-hover:translate-x-[3px]">
        <img alt="" src={restArrow} className="absolute inset-0 block size-full group-hover:opacity-0" />
        <img alt="" src={hoverArrow} className="absolute inset-0 block size-full opacity-0 group-hover:opacity-100" />
      </span>
    </Tag>
  )
}
