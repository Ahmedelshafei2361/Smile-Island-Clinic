'use client'

import { useState } from 'react'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal from '@/components/ui/Reveal'
import { toLocale } from '@/lib/locale'

interface BeforeAfterCase {
  beforeImage: string
  afterImage: string
}

interface ServiceBeforeAfterProps {
  locale: string
  cases?: BeforeAfterCase[]
}

// Temporary dental placeholders: local teeth photos (before) paired with a
// bright Unsplash smile (after) so the slider shows real contrast. Swap for
// real per-service before/after pairs later.
const AFTER_SMILE =
  'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=900&q=70'

const DUMMY_CASES: BeforeAfterCase[] = [
  { beforeImage: '/images/before-after/home-01.jpg', afterImage: AFTER_SMILE },
  { beforeImage: '/images/before-after/home-02.jpg', afterImage: AFTER_SMILE },
  { beforeImage: '/images/before-after/home-03.jpg', afterImage: AFTER_SMILE },
]

function ChevronLeftIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M14.5 6.5L9 12l5.5 5.5" />
    </svg>
  )
}

function ChevronRightIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M9.5 6.5L15 12l-5.5 5.5" />
    </svg>
  )
}

function ComparisonSlider({
  beforeImage,
  afterImage,
  alt,
  isAr,
}: {
  beforeImage: string
  afterImage: string
  alt: string
  isAr: boolean
}) {
  const [position, setPosition] = useState(50)

  return (
    <div
      dir="ltr"
      className="group relative h-[430px] rounded-[28px] p-[4px] select-none lg:h-[440px]"
    >
      <div className="relative h-full overflow-hidden rounded-[24px] bg-[#FAF6F2]">
        {/* After image */}
        <img
          src={afterImage}
          alt={alt}
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Before image clipped */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <img
            src={beforeImage}
            alt={alt}
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        {/* Subtle premium overlay */}
        <div className="pointer-events-none absolute inset-0 bg-black/[0.015]" />

        {/* Labels */}
        <span
          dir={isAr ? 'rtl' : 'ltr'}
          className="absolute left-[18px] top-[18px] z-10 rounded-full bg-[#FAF6F2] px-[13px] py-[7px] text-[12px] font-medium text-[#352514] backdrop-blur-sm"
        >
          {isAr ? 'قبل' : 'Before'}
        </span>

        <span
          dir={isAr ? 'rtl' : 'ltr'}
          className="absolute right-[18px] top-[18px] z-10 rounded-full bg-[#FAF6F2] px-[13px] py-[7px] text-[12px] font-medium text-[#352514] backdrop-blur-sm"
        >
          {isAr ? 'بعد' : 'After'}
        </span>

        {/* Divider */}
        <div
          className="absolute top-0 z-10 h-full w-[2px] bg-[#FAF6F2]"
          style={{ left: `${position}%` }}
        />

        {/* Drag handle */}
        <div
          className="absolute top-1/2 z-10 grid size-[66px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#FAF6F2] text-[#352514] transition-transform duration-200 ease-out group-hover:scale-[1.04]"
          style={{ left: `${position}%` }}
        >
          <div className="flex items-center justify-center gap-[2px] rounded-full bg-[#FAF6F2] px-[8px] py-[7px] text-[#352514]">
            <ChevronLeftIcon className="size-[20px]" />
            <ChevronRightIcon className="size-[20px]" />
          </div>
        </div>

        {/* Drag input — forced LTR so Arabic pages don't invert swipe direction */}
        <input
          dir="ltr"
          type="range"
          min="0"
          max="100"
          value={position}
          aria-label={isAr ? 'مقارنة قبل وبعد' : 'Before and after comparison'}
          onChange={(e) => setPosition(Number(e.target.value))}
          className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
    </div>
  )
}

export default function ServiceBeforeAfter({ locale, cases }: ServiceBeforeAfterProps) {
  const loc = toLocale(locale)
  const isAr = loc === 'ar'

  const items = (cases ?? DUMMY_CASES).slice(0, 3)

  const heading = isAr
    ? { title: 'قبل', accent: 'وبعد' }
    : { title: 'Before', accent: '& After' }

  const subtitle = isAr
    ? 'نتائج حقيقية لمرضى حقيقيين في عيادة سمايل ايلاند.'
    : 'Real results from real patients at Smile Island Clinic.'

  const alt = isAr
    ? 'حالة قبل وبعد العلاج في عيادة سمايل ايلاند'
    : 'Before and after dental treatment at Smile Island Clinic'

  return (
    <section className="bg-background py-[72px] font-[family-name:var(--font-body)] md:py-[112px]">
      <Container>
        <Reveal className="flex flex-col items-center text-center">
          <SectionHeading
            title={heading.title}
            accent={heading.accent}
            accentFirst={false}
            locale={loc}
          />

          <p className="mt-[14px] max-w-[560px] text-[14px] leading-[1.6] text-[#5b4a3a] md:text-[16px]">
            {subtitle}
          </p>
        </Reveal>

        <Reveal
          delay={120}
          className="mt-[44px] grid gap-[20px] md:mt-[56px] sm:grid-cols-2 lg:grid-cols-3 lg:gap-[24px]"
        >
          {items.map((item, i) => (
            <ComparisonSlider
              key={i}
              beforeImage={item.beforeImage}
              afterImage={item.afterImage}
              alt={alt}
              isAr={isAr}
            />
          ))}
        </Reveal>
      </Container>
    </section>
  )
}