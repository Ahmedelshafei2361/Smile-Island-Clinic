import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal from '@/components/ui/Reveal'
import BeforeAfterCarousel from '@/components/ui/BeforeAfterCarousel'
import BeforeAfterCard from '@/components/ui/BeforeAfterCard'
import { beforeAfterCases } from '@/lib/data'
import type { BeforeAfterCase } from '@/lib/data'
import { toLocale } from '@/lib/locale'
import type { BeforeAfterContent } from '@/sanity/lib/getBeforeAfterContent'

interface BeforeAfterSectionProps {
  locale: string
  /** Optional CMS content; each field falls back to local static defaults. */
  content?: BeforeAfterContent | null
}

export default function BeforeAfterSection({ locale, content }: BeforeAfterSectionProps) {
  const loc = toLocale(locale)
  const isAr = loc === 'ar'

  const defaultHeading = isAr
    ? { title: 'قبل', accent: 'وبعد' }
    : { title: 'Before', accent: '& After' }

  const defaultSubtitle = isAr
    ? 'نتائج حقيقية لمرضى حقيقيين في عيادة سمايل ايلاند.'
    : 'Real results from real patients at Smile Island Clinic.'

  const heading = defaultHeading
  const subtitle = defaultSubtitle

  // Use CMS images when available, otherwise fall back to local static data.
  let cases: BeforeAfterCase[]

  if (content?.images && content.images.length > 0) {
    cases = content.images.map((url, index) => ({
      id: `cms-ba-${index}`,
      image: url,
    }))
  } else {
    cases = beforeAfterCases
  }

  return (
    <section
      id="before-after"
      className="relative overflow-hidden bg-background pt-[48px] pb-[80px] md:pt-[88px] md:pb-[112px]"
    >
      <Container>
        <Reveal className="flex flex-col items-center text-center">
          <SectionHeading
            title={heading.title}
            accent={heading.accent}
            accentFirst={false}
            locale={loc}
          />
          <p className="mt-[12px] max-w-[560px] font-[family-name:var(--font-body)] text-[14px] md:text-[16px] leading-[1.6] text-[#5b4a3a]">
            {subtitle}
          </p>
        </Reveal>
      </Container>

      {/* Full-bleed gallery with arrow + dot navigation (swipe also works).
          Static cards — no interactive comparison slider on the homepage. */}
      <Reveal delay={200} className="mt-[40px] md:mt-[48px]">
        <BeforeAfterCarousel isAr={isAr}>
          {cases.map((item) => (
            <BeforeAfterCard key={item.id} item={item} locale={loc} />
          ))}
        </BeforeAfterCarousel>
      </Reveal>
    </section>
  )
}

