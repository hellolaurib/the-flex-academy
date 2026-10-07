import checkCircle from '../assets/figma/summary-check.svg'

// Confirmation body shared by the "Summary" frames (38:3265 booking, 41:1340 webinar seat)
export default function Confirmation({ title, subtitle, cardTitle, rows, children }) {
  return (
    <div role="status" className="flex flex-col items-center gap-[28px] px-[24px] pt-[56px] pb-[40px] md:px-[80px] md:pt-[40px]">
      <div className="flex w-full max-w-[458px] flex-col items-center gap-[8px] text-center">
        <div className="flex items-center justify-center gap-[10px]">
          <img alt="" src={checkCircle} className="block size-[28.8px] shrink-0" />
          <h2 className="text-[24px] leading-[normal] font-medium text-principal">{title}</h2>
        </div>
        <p className="text-[16px] leading-[20px] text-[#737373]">{subtitle}</p>
      </div>

      <div className="flex w-full max-w-[458px] flex-col gap-[10px] rounded-[8px] border border-[rgba(0,0,0,0.1)] px-[24px] py-[16px]">
        {cardTitle && <p className="text-[18px] leading-[1.5] font-bold text-[#1a1a1a]">{cardTitle}</p>}
        <ul className="flex flex-col gap-[11.97px]">
          {rows.map((r) => (
            <li key={r.text} className="flex items-center gap-[7.98px]">
              <span className="flex size-[20px] shrink-0 items-center justify-center">
                <img alt="" src={r.icon} className={`block ${r.iconSize ?? 'size-[20px]'}`} />
              </span>
              <p className="min-w-0 flex-1 text-[16px] leading-[1.5] font-bold text-[rgba(26,26,26,0.6)]">{r.text}</p>
            </li>
          ))}
        </ul>
      </div>

      {children}
    </div>
  )
}
