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
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M8.0013 2.15478C8.5295 2.42944 8.99544 2.80998 9.37005 3.27269C9.74466 3.73539 10.0199 4.27032 10.1786 4.84411C10.2257 5.01456 10.3385 5.15934 10.4923 5.24661C10.646 5.33387 10.8282 5.35648 10.9986 5.30945C11.1691 5.26241 11.3139 5.1496 11.4011 4.99582C11.4884 4.84204 11.511 4.65989 11.464 4.48945C11.1607 3.39383 10.5349 2.41476 9.66797 1.67945C9.77819 1.67056 9.8893 1.66634 10.0013 1.66678C11.3393 1.66678 12.4546 2.15211 13.2213 3.07345C13.9766 3.97811 14.3346 5.23078 14.3346 6.66678C14.3346 8.73145 13.992 10.5768 13.4046 11.9321C12.8446 13.2241 11.9326 14.3334 10.668 14.3334C9.93464 14.3334 9.47664 13.8988 9.20464 13.4268C8.9633 13.0068 8.8193 12.4781 8.7033 12.0521C8.5653 11.5454 8.4593 11.1668 8.30864 10.9054C8.1853 10.6901 8.1013 10.6668 8.0013 10.6668C7.9013 10.6668 7.81797 10.6901 7.69397 10.9054C7.5433 11.1668 7.4373 11.5454 7.2993 12.0521C7.1833 12.4781 7.0393 13.0074 6.79797 13.4268C6.52597 13.8988 6.06797 14.3334 5.33464 14.3334C4.06997 14.3334 3.15797 13.2241 2.59797 11.9321C2.0113 10.5768 1.66797 8.73211 1.66797 6.66678C1.66797 5.23078 2.02664 3.97811 2.7813 3.07345C3.54797 2.15211 4.66264 1.66678 6.0013 1.66678H6.01997C6.70984 1.66941 7.38912 1.83672 8.0013 2.15478Z"
        fill="currentColor"
      />
    </svg>
  )
}

interface TestimonialsCarouselProps {
  children: React.ReactNode
  isAr: boolean
  label: string
  gapClassName?: string
}

export default function TestimonialsCarousel({
  children,
  isAr,
  label,
  gapClassName = 'gap-[20px] lg:gap-[32px]',
}: TestimonialsCarouselProps) {
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
    'absolute top-1/2 z-30 hidden size-[44px] -translate-y-1/2 place-items-center rounded-full bg-[#f7efe8] text-[#352514] shadow-[0_10px_28px_rgba(53,37,20,0.18)] transition-all duration-300 ease-out hover:bg-[#352514] hover:text-[#f7efe8] active:scale-95 disabled:opacity-30 disabled:pointer-events-none md:grid lg:size-[56px]'

  return (
    <div className="relative mx-auto w-full max-w-[1248px] px-[24px]">
      <div
        className="relative"
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
      >
        <div
          dir={isAr ? 'rtl' : 'ltr'}
          className="relative overflow-visible"
          style={{
            marginLeft: 'calc(50% - 50vw)',
            marginRight: 'calc(50% - 50vw)',
          }}
        >
          <div
            dir={isAr ? 'rtl' : 'ltr'}
            ref={scrollerRef}
            className={`no-scrollbar flex touch-pan-x ${gapClassName} overflow-x-auto overscroll-x-contain snap-x snap-mandatory scroll-smooth px-6 pb-[4px] scroll-px-6 md:px-12 md:scroll-px-12 lg:px-20 lg:scroll-px-20`}
          >
            {children}
          </div>

          <button
            type="button"
            aria-label={isAr ? 'التالي' : 'Previous'}
            onClick={() => goTo(isAr ? active + 1 : active - 1)}
            disabled={isAr ? atEnd : atStart}
            className={`${arrowBase} left-4 lg:left-8`}
          >
            <ArrowIcon className="size-[22px] rotate-180" />
          </button>

          <button
            type="button"
            aria-label={isAr ? 'السابق' : 'Next'}
            onClick={() => goTo(isAr ? active - 1 : active + 1)}
            disabled={isAr ? atStart : atEnd}
            className={`${arrowBase} right-4 lg:right-8`}
          >
            <ArrowIcon className="size-[22px]" />
          </button>
        </div>
      </div>

      <div
        dir="ltr"
        className="mt-[24px] flex items-center justify-center gap-[10px]"
      >
        {Array.from({ length: count }).map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`${isAr ? 'عنصر' : 'Item'} ${i + 1}`}
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