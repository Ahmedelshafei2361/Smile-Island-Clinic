'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

function ArrowIcon({ className = '' }: { className?: string }) {
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
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  )
}

function ToothMark({ className = '' }: { className?: string }) {
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

export default function BeforeAfterCarousel({ children, isAr }: BeforeAfterCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)
  const [active, setActive] = useState(0)
  const [count, setCount] = useState(1)

  const getPageMetrics = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return null

    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth)
    const pages = Math.max(1, Math.ceil(el.scrollWidth / el.clientWidth))

    return { el, maxScroll, pages }
  }, [])

  const getLogicalScroll = useCallback(
    (el: HTMLDivElement) => {
      return isAr ? Math.abs(el.scrollLeft) : el.scrollLeft
    },
    [isAr],
  )

  const getNativeScroll = useCallback(
    (value: number) => {
      return isAr ? -value : value
    },
    [isAr],
  )

  const recompute = useCallback(() => {
    const metrics = getPageMetrics()
    if (!metrics) return

    const { el, maxScroll, pages } = metrics

    setCount(pages)

    if (maxScroll <= 0) {
      setActive(0)
      return
    }

    const progress = getLogicalScroll(el) / maxScroll
    const nextActive = Math.round(progress * (pages - 1))

    setActive(Math.max(0, Math.min(nextActive, pages - 1)))
  }, [getPageMetrics, getLogicalScroll])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

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
    const metrics = getPageMetrics()
    if (!metrics) return

    const { el, maxScroll, pages } = metrics
    const clamped = Math.max(0, Math.min(i, pages - 1))

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const logicalLeft = pages <= 1 ? 0 : (maxScroll / (pages - 1)) * clamped

    el.scrollTo({
      left: getNativeScroll(logicalLeft),
      behavior: reduce ? 'auto' : 'smooth',
    })
  }

  const atStart = active <= 0
  const atEnd = active >= count - 1

  const arrowBase =
    'absolute top-1/2 z-10 hidden size-[40px] -translate-y-1/2 place-items-center rounded-full border border-[#e9cdb4] bg-[#f3e9df] text-[#352514] shadow-[0_10px_28px_rgba(53,37,20,0.18)] transition-all duration-300 ease-out hover:border-[#352514] hover:bg-[#352514] hover:text-[#f7efe8] active:scale-95 disabled:opacity-30 disabled:pointer-events-none md:grid lg:size-[48px]'

  return (
    <div className="relative" dir={isAr ? 'rtl' : 'ltr'}>
      <div
        ref={scrollerRef}
        dir={isAr ? 'rtl' : 'ltr'}
        className="no-scrollbar flex touch-pan-x overflow-x-auto overscroll-x-contain snap-x snap-mandatory scroll-smooth px-[20px] lg:px-[64px]"
      >
        {children}
      </div>

      <button
        type="button"
        aria-label={isAr ? 'التالي' : 'Previous'}
        onClick={() => goTo(isAr ? active + 1 : active - 1)}
        disabled={isAr ? atEnd : atStart}
        className={`${arrowBase} left-[10px] lg:left-[24px]`}
      >
        {/* Left visual arrow */}
        <ArrowIcon className="size-[20px] rotate-180" />
      </button>

      <button
        type="button"
        aria-label={isAr ? 'السابق' : 'Next'}
        onClick={() => goTo(isAr ? active - 1 : active + 1)}
        disabled={isAr ? atStart : atEnd}
        className={`${arrowBase} right-[10px] lg:right-[24px]`}
      >
        {/* Right visual arrow */}
        <ArrowIcon className="size-[20px]" />
      </button>

      <div
        dir={isAr ? 'rtl' : 'ltr'}
        className="mt-[24px] flex items-center justify-center gap-[10px]"
      >
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`${isAr ? 'حالة' : 'Case'} ${i + 1}`}
            aria-current={i === active}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 ease-out ${
              i === active
                ? 'scale-110 text-[#9c673f]'
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