import { useEffect, useRef } from 'react'

let locks = 0

// Font Awesome "xmark" (solid), the close glyph used on every Figma modal
export function CloseIcon() {
  return (
    <svg width="10" height="14" viewBox="0 0 384 512" fill="currentColor" aria-hidden>
      <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
    </svg>
  )
}

// Shared dialog shell for the "Form and modals" frames (41:1382): white card,
// 16.8px radius, hairline border. Closes on Escape, backdrop click and the X.
export default function Modal({ open, onClose, label, className = '', children }) {
  const cardRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const previous = document.activeElement
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    // Counted, so handing off from one modal to another keeps the page locked
    if (locks++ === 0) document.body.style.overflow = 'hidden'
    cardRef.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      if (--locks === 0) document.body.style.overflow = ''
      if (previous?.isConnected) previous.focus()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      onClick={onClose}
      className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)] p-[16px]"
    >
      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className={`modal-card relative max-h-[calc(100dvh-32px)] w-full overflow-y-auto rounded-[16.8px] border-[0.7px] border-[rgba(26,26,26,0.1)] bg-white outline-none ${className}`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-[24px] right-[20px] z-10 flex size-[32px] cursor-pointer items-center justify-center rounded-full text-principal transition-colors hover:bg-[rgba(40,78,76,0.12)] md:top-[23px] md:right-[14px]"
        >
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>
  )
}
