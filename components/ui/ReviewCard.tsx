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

function GoogleGlyph({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path fill="#4285F4" d="M23.5 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47a5.5 5.5 0 0 1-2.4 3.6v3h3.87c2.26-2.09 3.56-5.17 3.56-8.84Z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.94-2.91l-3.88-3c-1.08.72-2.45 1.16-4.06 1.16-3.12 0-5.77-2.11-6.71-4.96H1.29v3.09A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.29 14.29A7.2 7.2 0 0 1 4.91 12c0-.8.14-1.57.38-2.29V6.62H1.29A12 12 0 0 0 0 12c0 1.94.46 3.77 1.29 5.38l4-3.09Z" />
      <path fill="#EA4335" d="M12 4.75c1.76 0 3.34.61 4.59 1.8l3.43-3.43C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.29 6.62l4 3.09C6.23 6.86 8.88 4.75 12 4.75Z" />
    </svg>
  )
}

interface ReviewCardProps {
  item: GoogleReview
  locale: 'en' | 'ar'
}

/**
 * Static Google-review card — gold rating, bold headline, quote, and a reviewer
 * pill (name + "Google Review"). No photo/initial avatar (Figma shows none in
 * the project's content). Content is local data, easy to swap for Sanity later.
 */
export default function ReviewCard({ item, locale }: ReviewCardProps) {
  const isAr = locale === 'ar'
  const name = isAr ? item.nameAr : item.nameEn
  const headline = isAr ? item.headlineAr : item.headlineEn
  const quote = isAr ? item.quoteAr : item.quoteEn
  const sourceLabel = isAr ? 'مراجعة Google' : 'Google Review'

  return (
    <article className="snap-center shrink-0 flex flex-col w-[288px] sm:w-[420px] lg:w-[600px] rounded-[24px] bg-gradient-to-r from-[rgba(241,228,217,0.6)] to-[rgba(241,228,217,0.4)] px-[24px] lg:px-[28px] py-[24px]">
      <Stars />

      <p className="mt-[14px] font-medium text-[19px] lg:text-[24px] leading-[1.3] text-[#1f160c]">
        {isAr ? `«${headline}»` : `“${headline}”`}
      </p>

      <p className="mt-[6px] text-[14px] lg:text-[15px] leading-[1.6] text-[#57534d]">
        {quote}
      </p>

      {/* Reviewer pill, anchored to the bottom of the (stretched) card */}
      <div className="mt-auto pt-[24px]">
        <div className="inline-flex flex-col gap-[1px] rounded-[14px] bg-white px-[16px] py-[10px] leading-[1.4] shadow-[0px_0px_2.9px_#e2cab3]">
          <span className="text-[14px] font-medium text-[#1f160c]">{name}</span>
          <span className="inline-flex items-center gap-[5px] text-[12px] text-[#57534d]">
            <GoogleGlyph className="size-[12px]" />
            {sourceLabel}
          </span>
        </div>
      </div>
    </article>
  )
}
