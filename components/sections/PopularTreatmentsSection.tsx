import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal from '@/components/ui/Reveal'
import TreatmentCard from '@/components/ui/TreatmentCard'
import TreatmentsCarousel from '@/components/ui/TreatmentsCarousel'
import { popularTreatments } from '@/lib/data'
import { toLocale } from '@/lib/locale'

interface PopularTreatmentsSectionProps {
  locale: string
}

export default function PopularTreatmentsSection({
  locale,
}: PopularTreatmentsSectionProps) {
  const loc = toLocale(locale)
  const isAr = loc === 'ar'

  const heading = isAr
    ? { title: 'العلاجات', accent: 'الشائعة' }
    : { title: 'Treatments', accent: 'Popular' }

  const subtitle = isAr
    ? 'العلاجات الأكثر طلباً وثقةً بين مرضانا.'
    : 'The treatments our patients choose and trust the most.'

  // Keep number ↔ treatment fixed; reverse only the visual order for RTL so
  // card 01 sits on the right and the row reads naturally right-to-left.
  const items = popularTreatments.map((treatment, index) => ({ treatment, index }))
  const ordered = isAr ? [...items].reverse() : items

  return (
    <section
      id="treatments"
      className="relative isolate overflow-hidden bg-[#fbf8f5] pt-[64px] pb-[80px] md:pt-[88px] md:pb-[112px]"
    >
      <Container>
        <Reveal className="flex flex-col items-center text-center">
          <SectionHeading
            title={heading.title}
            accent={heading.accent}
            accentFirst={!isAr}
            locale={loc}
          />
          <p className="mt-[12px] max-w-[560px] font-[family-name:var(--font-body)] text-[14px] md:text-[16px] leading-[1.6] text-[#5b4a3a]">
            {subtitle}
          </p>
        </Reveal>
      </Container>

      {/* Full-bleed draggable infinite carousel — drifts left in EN, right in AR */}
      <div className="mt-[40px] md:mt-[48px]">
        <TreatmentsCarousel reverse={isAr}>
          {ordered.map(({ treatment, index }) => (
            <TreatmentCard
              key={treatment.slug}
              treatment={treatment}
              index={index}
              locale={loc}
            />
          ))}
        </TreatmentsCarousel>
      </div>
    </section>
  )
}
