import type { GoogleReview } from '@/lib/data'

function Stars({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex gap-[3px] text-[#f0a93c] ${className}`} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="size-[19px]">
          <path d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.9l-5.8 3.05 1.1-6.46-4.69-4.58 6.49-.94L12 2.5Z" />
        </svg>
      ))}
    </span>
  )
}

interface ReviewCardProps {
  item: GoogleReview
  locale: 'en' | 'ar'
}

export default function ReviewCard({ item, locale }: ReviewCardProps) {
  const isAr = locale === 'ar'
  const name = isAr ? item.nameAr : item.nameEn
  const headline = isAr ? item.headlineAr : item.headlineEn
  const quote = isAr ? item.quoteAr : item.quoteEn
  const sourceLabel = isAr ? 'تقييم Google' : 'Google Review'

  return (
    <article
      dir={isAr ? 'rtl' : 'ltr'}
      className="snap-center shrink-0 flex flex-col w-[288px] sm:w-[420px] lg:w-[600px] rounded-[24px] bg-[#F4EAE1] px-[24px] lg:px-[28px] py-[24px]"
    >
      <Stars />

      <p className="mt-[14px] font-medium text-[19px] lg:text-[24px] leading-[1.3] text-[#1f160c]">
        {isAr ? `"${headline}"` : `“${headline}”`}
      </p>

      <p className="mt-[6px] text-[14px] lg:text-[15px] leading-[1.6] text-[#57534d]">
        {quote}
      </p>

      <div className="mt-auto pt-[24px]">
        <p className="text-[14px] font-medium leading-[1.4] text-[#1f160c]">
          {name}
        </p>
        <p className="mt-[2px] text-[12px] leading-[1.4] text-[#57534d]">
          {sourceLabel}
        </p>
      </div>
    </article>
  )
}