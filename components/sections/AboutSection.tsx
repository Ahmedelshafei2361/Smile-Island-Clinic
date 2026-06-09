import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal from '@/components/ui/Reveal'
import { about } from '@/lib/data'
import { toLocale } from '@/lib/locale'

interface AboutSectionProps {
  locale: string
}

export default function AboutSection({ locale }: AboutSectionProps) {
  const loc = toLocale(locale)
  const isAr = loc === 'ar'

  const title = isAr ? about.titleAr : about.titleEn
  const accent = isAr ? about.accentAr : about.accentEn
  const paragraphs = isAr ? about.paragraphsAr : about.paragraphsEn

  return (
    <section id="about" className="bg-background pt-[72px] pb-[80px] md:pt-[96px] md:pb-[112px]">
      <Container>
        <Reveal className="flex flex-col items-center text-center">
          <SectionHeading
            title={title}
            accent={accent}
            accentFirst={!isAr}
            locale={loc}
          />

          <div className="mt-[16px] md:mt-[20px] max-w-[640px] flex flex-col gap-[10px]">
            {paragraphs.map((text, i) => (
              <p
                key={i}
                className="font-[family-name:var(--font-body)] font-normal text-[14px] md:text-[16px] leading-[1.7] text-[#5b4a3a]"
              >
                {text}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120} className="mt-[40px] md:mt-[56px]">
          {/* Branded About card — shown at its natural aspect so the full
              card (logo + artwork) is never cropped on any breakpoint. */}
          <div className="w-full overflow-hidden rounded-[20px] md:rounded-[24px]">
            <img
              src={about.image}
              alt="Smile Island Dental Clinic"
              className="block h-auto w-full"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
