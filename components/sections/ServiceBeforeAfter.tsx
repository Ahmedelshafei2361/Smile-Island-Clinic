import Image from 'next/image'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal from '@/components/ui/Reveal'
import { toLocale } from '@/lib/locale'

interface ServiceBeforeAfterProps {
  locale: string
  /** Optional per-service cases; falls back to shared placeholders. */
  cases?: string[]
}

// Temporary shared placeholders — replace with real per-service before/after
// pairs later (max 3 per service).
const PLACEHOLDER_CASES = [
  '/images/before-after/home-01.jpg',
  '/images/before-after/home-02.jpg',
  '/images/before-after/home-03.jpg',
]

export default function ServiceBeforeAfter({ locale, cases }: ServiceBeforeAfterProps) {
  const loc = toLocale(locale)
  const isAr = loc === 'ar'

  const items = (cases ?? PLACEHOLDER_CASES).slice(0, 3)
  const heading = isAr ? { title: 'قبل', accent: 'وبعد' } : { title: 'Before', accent: '& After' }
  const subtitle = isAr
    ? 'نتائج حقيقية لمرضى حقيقيين في عيادة سمايل ايلاند.'
    : 'Real results from real patients at Smile Island Clinic.'
  const alt = isAr
    ? 'حالة قبل وبعد العلاج في عيادة سمايل ايلاند'
    : 'Before and after dental treatment at Smile Island Clinic'

  return (
    <section className="bg-background py-[64px] md:py-[96px] font-[family-name:var(--font-body)]">
      <Container>
        <Reveal className="flex flex-col items-center text-center">
          <SectionHeading
            title={heading.title}
            accent={heading.accent}
            accentFirst={false}
            locale={loc}
          />
          <p className="mt-[12px] max-w-[560px] text-[14px] md:text-[16px] leading-[1.6] text-[#5b4a3a]">
            {subtitle}
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-[40px] grid gap-[24px] md:mt-[56px] sm:grid-cols-2 lg:grid-cols-3">
          {items.map((src, i) => (
            <div
              key={i}
              className="relative aspect-[421/269] overflow-hidden rounded-[20px] bg-card"
            >
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(min-width: 1024px) 421px, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  )
}
