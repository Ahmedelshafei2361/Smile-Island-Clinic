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

  const numClass = `font-[family-name:var(--font-heading-accent)] ${
    isAr ? '' : 'italic'
  } text-[40px] lg:text-[58px] leading-none text-[#9c673f]`

  return (
    <section
      dir={isAr ? 'rtl' : 'ltr'}
      className="relative isolate overflow-hidden bg-[#FAF6F2] pt-[48px] pb-[64px] md:pt-[56px] md:pb-[96px] font-[family-name:var(--font-body)]"
    >
      {/* Decorative tooth */}
      <img
        src="/images/decor/tooth.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-[-88px] top-[36px] z-0 w-[250px] opacity-[0.65] sm:left-[-96px] sm:top-[40px] sm:w-[300px] md:left-[-64px] md:top-[52px] md:w-[380px] lg:left-[-52px] lg:top-[0px] lg:w-[380px]"
      />

      <Container>
        <div className="relative z-10">
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
            {steps.map((step, i) => {
              const shouldCenterLastCard = steps.length === 3 && i === 2

              return (
                <div
                  key={i}
                  dir={isAr ? 'rtl' : 'ltr'}
                  className={`flex min-h-[170px] flex-col rounded-[24px] border-2 border-white bg-[#F4EAE1] px-[24px] pb-[28px] pt-[16px] lg:min-h-[190px] lg:px-[48px] lg:pb-[32px] ${
                    shouldCenterLastCard
                      ? 'md:col-span-2 md:mx-auto md:w-[calc(50%-20px)] lg:w-[calc(50%-35.5px)]'
                      : ''
                  }`}
                >
                  <span
                    dir="ltr"
                    className={`${numClass} block w-full ${isAr ? 'text-end' : 'text-start'}`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <p className="mt-[28px] text-start text-[16px] md:text-[20px] lg:text-[22px] font-normal leading-[1.35] text-[#57534D]">
                    {step}
                  </p>
                </div>
              )
            })}
          </Reveal>
        </div>
      </Container>
    </section>
  )
}