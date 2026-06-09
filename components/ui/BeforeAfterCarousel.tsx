'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

function Chevron({ className = '' }: { className?: string }) {
  // Points left (‹) by default; flipped per side / direction by the caller.
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M15 6l-6 6 6 6" />
    </svg>
  )
}

function ToothMark({ className = '' }: { className?: string }) {
  // Small tooth silhouette used as a navigation indicator.
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 3c-2.5 0-3.7 1.2-5.5 1.2-1.1 0-1.9-.6-2.7 0C2.5 5.2 2.6 8 3.4 11.2c.6 2.4 1 5 1.3 6.6.2 1.3.5 3.2 1.5 3.2.9 0 1.2-1.4 1.6-3.2.3-1.4.6-2.9 1.2-2.9s.9 1.5 1.2 2.9c.4 1.8.7 3.2 1.6 3.2 1 0 1.3-1.9 1.5-3.2.3-1.6.7-4.2 1.3-6.6.8-3.2.9-6-.4-7-.8-.6-1.6 0-2.7 0C15.7 4.2 14.5 3 12 3Z" />
    </svg>
  )
}

interface BeforeAfterCarouselProps {
  children: React.ReactNode
  isAr: boolean
}

/**
 * Static before/after gallery with carousel navigation (arrows + dots).
 * Native horizontal scroll → touch-swipe works for free; arrows/dots drive it
 * via scrollIntoView, which is direction-agnostic (correct for RTL). No
 * interactive comparison slider here (those live on service pages).
 */
export default function BeforeAfterCarousel({ children, isAr }: BeforeAfterCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)
  const [active, setActive] = useState(0)
  const [count, setCount] = useState(0)

  const recompute = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const cards = Array.from(el.children) as HTMLElement[]
    if (!cards.length) return
    const mid = el.getBoundingClientRect().left + el.clientWidth / 2
    let best = 0
    let bestD = Infinity
    cards.forEach((c, i) => {
      const r = c.getBoundingClientRect()
      const d = Math.abs(r.left + r.width / 2 - mid)
      if (d < bestD) {
        bestD = d
        best = i
      }
    })
    setActive(best)
  }, [])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    setCount(el.children.length)
    recompute()
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(recompute)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', recompute)
    return () => {
      el.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', recompute)
      cancelAnimationFrame(rafRef.current)
    }
  }, [recompute])

  const goTo = (i: number) => {
    const el = scrollerRef.current
    if (!el) return
    const clamped = Math.max(0, Math.min(i, el.children.length - 1))
    const card = el.children[clamped] as HTMLElement | undefined
    card?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  const atStart = active <= 0
  const atEnd = active >= count - 1

  // Default: soft cream button with a brown arrow. Hover: brown fill, cream arrow.
  const arrowBase =
    'absolute top-1/2 -translate-y-1/2 z-10 grid place-items-center size-[40px] lg:size-[48px] rounded-full bg-[#f3e9df] text-[#352514] border border-[#e9cdb4] shadow-sm transition-all duration-300 ease-out hover:bg-[#352514] hover:text-[#f7efe8] hover:border-[#352514] active:scale-95 disabled:opacity-30 disabled:pointer-events-none'

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="no-scrollbar flex overflow-x-auto snap-x snap-mandatory scroll-smooth px-[20px] lg:px-[64px]"
      >
        {children}
      </div>

      {/* Previous — start side */}
      <button
        type="button"
        aria-label={isAr ? 'السابق' : 'Previous'}
        onClick={() => goTo(active - 1)}
        disabled={atStart}
        className={`${arrowBase} start-[10px] lg:start-[24px]`}
      >
        <Chevron className={`size-[20px] ${isAr ? '-scale-x-100' : ''}`} />
      </button>

      {/* Next — end side */}
      <button
        type="button"
        aria-label={isAr ? 'التالي' : 'Next'}
        onClick={() => goTo(active + 1)}
        disabled={atEnd}
        className={`${arrowBase} end-[10px] lg:end-[24px]`}
      >
        <Chevron className={`size-[20px] ${isAr ? '' : '-scale-x-100'}`} />
      </button>

      {/* Tooth-shaped indicators */}
      <div className="mt-[24px] flex items-center justify-center gap-[10px]">
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`${isAr ? 'حالة' : 'Case'} ${i + 1}`}
            aria-current={i === active}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 ease-out ${
              i === active
                ? 'text-[#9c673f] scale-110'
                : 'text-[#dcc7b0] hover:text-[#c4a888]'
            }`}
          >
            <ToothMark className="size-[15px]" />
          </button>
        ))}
      </div>
    </div>
  )
}
