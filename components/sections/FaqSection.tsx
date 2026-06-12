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

        <Reveal delay={120} className="mx-auto mt-[40px] w-full max-w-[820px] md:mt-[56px]">
          <FaqAccordion items={faqs} locale={loc} />
        </Reveal>
      </Container>
    </section>
  )
}
