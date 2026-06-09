import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal from '@/components/ui/Reveal'
import BeforeAfterCarousel from '@/components/ui/BeforeAfterCarousel'
import BeforeAfterCard from '@/components/ui/BeforeAfterCard'
import { beforeAfterCases } from '@/lib/data'
import { toLocale } from '@/lib/locale'

interface BeforeAfterSectionProps {
  locale: string
}

export default function BeforeAfterSection({ locale }: BeforeAfterSectionProps) {
  const loc = toLocale(locale)
  const isAr = loc === 'ar'

  const heading = isAr
    ? { title: 'قبل', accent: 'وبعد' }
    : { title: 'Before', accent: '& After' }

  const subtitle = isAr
    ? 'نتائج حقيقية لمرضى حقيقيين في عيادة سمايل ايلاند.'
    : 'Real results from real patients at Smile Island Clinic.'

  // Natural order — RTL visual ordering is handled by the carousel's dir.
  const cases = beforeAfterCases

  return (
    <section
      id="before-after"
      className="relative overflow-hidden bg-background pt-[24px] pb-[80px] md:pb-[112px]"
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
      <div className="mt-[40px] md:mt-[48px]">
        <BeforeAfterCarousel isAr={isAr}>
          {cases.map((item) => (
            <BeforeAfterCard key={item.id} item={item} locale={loc} />
          ))}
        </BeforeAfterCarousel>
      </div>
    </section>
  )
}
