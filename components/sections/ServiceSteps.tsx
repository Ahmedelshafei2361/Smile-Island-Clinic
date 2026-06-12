import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal from '@/components/ui/Reveal'
import type { Service } from '@/lib/data'
import { toLocale } from '@/lib/locale'

interface ServiceStepsProps {
  service: Service
  locale: string
}

export default function ServiceSteps({ service, locale }: ServiceStepsProps) {
  const loc = toLocale(locale)
  const isAr = loc === 'ar'

  const steps = isAr ? service.stepsAr : service.stepsEn
  const heading = isAr ? { title: 'خطوات', accent: 'العلاج' } : { title: 'Our', accent: 'Steps' }
  const subtitle = isAr
    ? 'إجراء واضح ومريح من البداية حتى النهاية.'
    : 'A clear, comfortable process from start to finish.'

  // Number uses the expressive accent font (Playfair italic EN / Thmanyah AR).
  const numClass = `font-[family-name:var(--font-heading-accent)] ${
    isAr ? '' : 'italic'
  } text-[40px] lg:text-[58px] leading-none text-[#9c673f]`

  return (
    <section className="bg-background py-[64px] md:py-[96px] font-[family-name:var(--font-body)]">
      <Container>
        <Reveal className="mx-auto flex max-w-[800px] flex-col items-center text-center">
          <SectionHeading
            title={heading.title}
            accent={heading.accent}
            accentFirst={false}
            locale={loc}
          />
          <p className="mt-[12px] text-[14px] md:text-[16px] leading-[1.6] text-[#5b4a3a]">
            {subtitle}
          </p>
        </Reveal>

        <Reveal
          delay={120}
          className="mt-[40px] grid gap-[16px] md:mt-[56px] md:grid-cols-2 md:gap-x-[40px] md:gap-y-[32px] lg:gap-x-[71px] lg:gap-y-[45px]"
        >
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex flex-col gap-[12px] rounded-[24px] border-2 border-white bg-[#faf4f0] px-[24px] pb-[28px] pt-[16px] lg:gap-[16px] lg:px-[48px] lg:pb-[32px]"
            >
              <span dir="ltr" className={`${numClass} text-start`}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-[16px] md:text-[20px] lg:text-[22px] font-medium leading-[1.35] text-[#14110f]">
                {step}
              </p>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  )
}
