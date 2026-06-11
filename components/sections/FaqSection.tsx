import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import FaqAccordion from '@/components/ui/FaqAccordion'
import { faqs } from '@/lib/data'
import { toLocale } from '@/lib/locale'

interface FaqSectionProps {
  locale: string
}

export default function FaqSection({ locale }: FaqSectionProps) {
  const loc = toLocale(locale)
  const isAr = loc === 'ar'

  const subtitle = isAr
    ? 'كل ما تريد معرفته قبل زيارتك، في مكان واحد.'
    : 'Everything you want to know before your visit, in one place.'

  const accentClass = `font-[family-name:var(--font-heading-accent)] text-[#9c673f] ${
    isAr ? '' : 'italic'
  }`

  const imageAlt = isAr
    ? 'استقبال عيادة سمايل ايلاند لطب الأسنان'
    : 'Smile Island Dental Clinic reception'

  return (
    <section
      id="faq"
      className="bg-background py-[64px] md:py-[96px] font-[family-name:var(--font-body)]"
    >
      <Container>
        <Reveal className="mx-auto flex max-w-[800px] flex-col items-center text-center">
          <h2 className="font-[family-name:var(--font-heading)] font-medium leading-[1.3] text-[32px] md:text-[48px] text-[#352514]">
            {isAr ? (
              <>
                لديك أسئلة؟ نحن <span className={accentClass}>بجانبك</span>
              </>
            ) : (
              <>
                Questions? We’ve got you <span className={accentClass}>covered</span>
              </>
            )}
          </h2>
          <p className="mt-[16px] text-[15px] md:text-[18px] leading-[1.5] text-[#352514]/80">
            {subtitle}
          </p>
        </Reveal>

        <div className="mt-[40px] grid items-start gap-[24px] md:mt-[56px] lg:grid-cols-[515px_1fr] lg:gap-[48px]">
          <Reveal>
            <div className="overflow-hidden rounded-[24px] h-[220px] sm:h-[320px] lg:h-[516px]">
              <img
                src="/images/faq/faq-clinic.jpg"
                alt={imageAlt}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <FaqAccordion items={faqs} locale={loc} />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
