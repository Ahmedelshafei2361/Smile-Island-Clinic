import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal from '@/components/ui/Reveal'
import TreatmentCard from '@/components/ui/TreatmentCard'
import TreatmentsCarousel from '@/components/ui/TreatmentsCarousel'
import type { PopularTreatment } from '@/lib/data'
import { toLocale } from '@/lib/locale'

interface PopularTreatmentsSectionProps {
  locale: string
  /** Treatments to show (already resolved from CMS or local fallback). */
  items: PopularTreatment[]
}

export default function PopularTreatmentsSection({
  locale,
  items: treatments,
}: PopularTreatmentsSectionProps) {
  const loc = toLocale(locale)
  const isAr = loc === 'ar'

  const heading = isAr
    ? { title: 'العلاجات', accent: 'الشائعة' }
    : { title: 'Treatments', accent: 'Popular' }

  const subtitle = isAr
    ? 'العلاجات الأكثر طلباً وثقةً بين مرضانا.'
    : 'The treatments our patients choose and trust the most.'

  const items = treatments.map((treatment, index) => ({ treatment, index }))
  const ordered = isAr ? [...items].reverse() : items

  return (
    <section
      id="treatments"
      className="relative isolate overflow-hidden bg-background-soft pt-[64px] pb-[80px] md:pt-[88px] md:pb-[112px]"
    >
      {/* Decorative tooth */}
      <img
        src="/images/decor/tooth.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-[-96px] top-[-64px] z-0 w-[230px] opacity-[0.65] sm:left-[-88px] sm:top-[-72px] sm:w-[280px] md:left-[-72px] md:top-[-96px] md:w-[360px] lg:left-[-64px] lg:top-[-112px] lg:w-[430px]"
      />

      <div className="relative z-10">
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

        <Reveal delay={200} className="mt-[40px] md:mt-[48px]">
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
        </Reveal>
      </div>
    </section>
  )
}