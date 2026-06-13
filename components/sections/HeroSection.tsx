import { getBookingUrl } from '@/lib/whatsapp'
import { toLocale } from '@/lib/locale'

interface HeroSectionProps {
  locale: string
}

function WhatsAppIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

function StatDivider() {
  return <div className="w-px h-[52px] bg-[#e9cdb4] shrink-0" />
}

export default function HeroSection({ locale }: HeroSectionProps) {
  const loc = toLocale(locale)
  const whatsappUrl = getBookingUrl({ locale: loc })
  const servicesHref = `/${loc}#services`

  const isAr = loc === 'ar'

  // Heading: `accent` uses the serif/expressive font, `regular` the sans font.
  const heading = isAr
    ? { accent: 'ابتسامة استثنائية', regular: ' بأسعار معقولة' }
    : { accent: 'Exceptional Smile', regular: ' Fairly Priced' }

  // English accent is italic Playfair; Arabic serif is upright.
  const accentItalic = isAr ? '' : 'italic'

  const subtitle = isAr
    ? 'استعد ابتسامتك مع أطباء أسنان ذوي خبرة يقدمون رعاية عالية الجودة بأسعار عادلة.'
    : 'Restore your smile with experienced dentists providing quality care at fair pricing.'

  const ctaContact = isAr ? 'تواصل معنا' : 'Contact Us'
  const ctaExplore = isAr ? 'اكتشف الخدمات' : 'Explore services'

  const stats = isAr
    ? {
        healthy: 'ابتسامة صحية',
        trusted: 'موثوق بها من قبل الآلاف',
        satisfaction: 'رضاء',
        reviews: 'تعليق',
      }
    : {
        healthy: 'Healthy Smile',
        trusted: 'Trusted by thousands',
        satisfaction: 'Satisfaction',
        reviews: 'Reviews',
      }

  return (
    <>
    {/* ── Desktop hero (lg and up) — approved layout, unchanged ── */}
    <section className="relative hidden lg:block h-[849px] overflow-clip rounded-tl-[24px] rounded-tr-[24px]">
      {/* Decorative beige background — soft curves + blurred leaves */}
      <div className="absolute inset-0 overflow-hidden rounded-tl-[24px] rounded-tr-[24px]" aria-hidden>
        <img
          alt=""
          className="absolute h-[113.07%] left-0 max-w-none top-[-3%] w-full object-cover animate-fade"
          src="/images/hero/hero-bg.png"
        />
      </div>

      {/* Foreground team photo (transparent cutout) */}
      <div
        className="-translate-x-1/2 absolute left-1/2 top-[274px] h-[575px] w-[1274px] overflow-hidden pointer-events-none animate-fade delay-2"
        aria-hidden
      >
        <img
          alt="Smile Island dental team"
          className="absolute h-[148.46%] left-[-0.41%] max-w-none top-[-23.97%] w-[100.41%] object-cover"
          src="/images/hero/hero-team.png"
        />
      </div>

      {/* Hero content: heading + subtitle + CTAs */}
      <div className="-translate-x-1/2 absolute left-1/2 top-[123px] w-[1002px] flex flex-col gap-[48px] items-center justify-center">
        {/* Text block */}
        <div className="flex flex-col gap-[16px] items-center justify-center text-center w-full">
          <h1 className="leading-[1.2] w-full animate-rise delay-1">
            <span className={`font-[family-name:var(--font-heading-accent)] font-medium ${accentItalic} leading-[1.2] text-[#9c673f] text-[72px]`}>
              {heading.accent}
            </span>
            <span className="font-[family-name:var(--font-heading)] font-medium leading-[1.2] text-[#352514] text-[72px]">
              {heading.regular}
            </span>
          </h1>
          <p className="font-[family-name:var(--font-body)] font-normal leading-[1.5] text-[18px] text-[#352514] animate-rise delay-2">
            {subtitle}
          </p>
        </div>

        {/* CTA buttons — icon LEFT of label */}
        <div className="flex gap-[16px] items-center animate-rise delay-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-[#352514] flex gap-[8px] items-center justify-center px-[20px] py-[12px] rounded-[800px] text-[#f7efe8] text-[16px] font-medium leading-[1.5] whitespace-nowrap transition-all duration-200 hover:bg-[#2a1d10] hover:-translate-y-0.5"
          >
            <WhatsAppIcon className="size-[18px]" />
            {ctaContact}
          </a>
          <a
            href={servicesHref}
            className="bg-[#efdfd2] flex items-center justify-center px-[24px] py-[12px] rounded-[800px] text-[#352514] text-[16px] font-medium leading-[1.5] whitespace-nowrap transition-all duration-200 hover:bg-[white] hover:-translate-y-0.5"
          >
            {ctaExplore}
          </a>
        </div>
      </div>

      {/* Stats bar */}
      <div className="-translate-x-1/2 absolute left-[calc(50%+0.5px)] top-[652px] w-[807px] bg-[#f9eee7] border border-[#e9cdb4] rounded-[24px] px-[48px] py-[16px] flex items-center justify-between overflow-clip animate-rise delay-4">
        {/* Healthy Smile — laurels kept dir=ltr so RTL never swaps/flips the
            decorative graphics; the Arabic text inside stays dir=rtl */}
        <div dir="ltr" className="flex gap-[2px] items-center justify-center w-[185px]">
          <img
            alt=""
            aria-hidden
            src="/images/hero/laurel-left.svg"
            className="h-[58px] w-[18.353px] object-contain shrink-0"
          />
          <div dir={isAr ? 'rtl' : 'ltr'} className="flex flex-col gap-[1px] items-center text-center text-[#352514] w-[144.52px]">
            <p className={`font-[family-name:var(--font-heading-accent)] font-semibold ${accentItalic} text-[20.355px] leading-[1.5] w-full`}>
              {stats.healthy}
            </p>
            <p className="font-[family-name:var(--font-body)] font-normal text-[14.249px] leading-[1.5] w-full">
              {stats.trusted}
            </p>
          </div>
          <img
            alt=""
            aria-hidden
            src="/images/hero/laurel-right.svg"
            className="h-[58px] w-[18.356px] object-contain shrink-0"
          />
        </div>

        <StatDivider />

        {/* 100% Satisfaction */}
        <div className="flex flex-col gap-[4px] items-center text-[#352514]">
          <p className="font-[family-name:var(--font-body)] font-medium text-[20px] leading-[1.5] text-center min-w-full">
            100%
          </p>
          <p className="font-[family-name:var(--font-body)] font-light text-[16px] leading-[1.5] whitespace-nowrap">
            {stats.satisfaction}
          </p>
        </div>

        <StatDivider />

        {/* 5.00 + Stars */}
        <div className="flex flex-col gap-[4px] items-center w-[83px]">
          <p className="font-[family-name:var(--font-body)] font-medium text-[20px] leading-[1.5] text-[#352514] text-center min-w-full">
            5.00
          </p>
          <img
            alt="5 stars"
            src="/images/hero/stars.svg"
            className="h-[24px] w-[83px] object-contain"
          />
        </div>

        <StatDivider />

        {/* 120+ Reviews */}
        <div className="flex flex-col gap-[4px] items-center text-[#352514]">
          <p className="font-[family-name:var(--font-body)] font-medium text-[20px] leading-[1.5] text-center min-w-full">
            120+
          </p>
          <p className="font-[family-name:var(--font-body)] font-light text-[16px] leading-[1.5] whitespace-nowrap">
            {stats.reviews}
          </p>
        </div>
      </div>
    </section>

    {/* ── Mobile hero (below lg) — flow-based layout ── */}
    <section className="relative lg:hidden overflow-hidden">
      {/* Decorative beige background — same premium style */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <img
          alt=""
          className="h-full w-full object-cover animate-fade"
          src="/images/hero/hero-bg.png"
        />
      </div>

      {/* Heading + subtitle + buttons */}
      <div className="relative flex flex-col gap-[36px] items-center px-[20px] pt-[36px]">
        <div className="flex flex-col gap-[20px] items-center text-center w-full">
          <h1 className="leading-[1.2] w-full animate-rise delay-1">
            <span className={`font-[family-name:var(--font-heading-accent)] font-medium ${accentItalic} leading-[1.2] text-[#9c673f] text-[40px]`}>
              {heading.accent}
            </span>
            <span className="font-[family-name:var(--font-heading)] font-medium leading-[1.2] text-[#352514] text-[40px]">
              {heading.regular}
            </span>
          </h1>
          <p className="font-[family-name:var(--font-body)] font-normal leading-[1.5] text-[14px] text-[#352514] animate-rise delay-2">
            {subtitle}
          </p>
        </div>

        {/* CTA buttons — icon LEFT of label, compact equal halves */}
        <div className="flex gap-[10px] items-stretch w-full animate-rise delay-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-[#352514] flex gap-[6px] items-center justify-center px-[14px] py-[8px] rounded-[800px] text-[#f7efe8] text-[14px] font-medium leading-[1.5] whitespace-nowrap transition-colors duration-200 hover:bg-[#2a1d10]"
          >
            <WhatsAppIcon className="size-[16px]" />
            {ctaContact}
          </a>
          <a
            href={servicesHref}
            className="flex-1 bg-[#efdfd2] flex items-center justify-center px-[14px] py-[8px] rounded-[800px] text-[#352514] text-[14px] font-medium leading-[1.5] whitespace-nowrap transition-colors duration-200 hover:bg-[#e7d3c2]"
          >
            {ctaExplore}
          </a>
        </div>
      </div>

      {/* Team image + stats card — same width so they scale together and the
          leg-crop is fully tucked behind the card at every mobile width */}
      <div className="relative flex flex-col items-center mt-[36px] pb-[40px]">
        <div className="relative w-[calc(100%-24px)] max-w-[440px] aspect-[1274/575] overflow-hidden animate-fade delay-2">
          <img
            alt="Smile Island dental team"
            className="absolute h-[148.46%] left-[-0.41%] max-w-none top-[-23.97%] w-[100.41%] object-cover"
            src="/images/hero/hero-team.png"
          />
        </div>

        {/* Stats card — same width as image, overlapping its bottom */}
        <div className="relative -mt-[36px] w-[calc(100%-24px)] max-w-[440px] bg-white border border-[#e9cdb4] rounded-[24px] px-[24px] py-[16px] flex flex-col gap-[20px] items-center animate-rise delay-3">
          {/* Healthy Smile — laurels kept dir=ltr (see desktop note) */}
          <div dir="ltr" className="flex gap-[2px] items-center justify-center w-[185px]">
            <img
              alt=""
              aria-hidden
              src="/images/hero/laurel-left.svg"
              className="h-[48px] w-[15.187px] object-contain shrink-0"
            />
            <div dir={isAr ? 'rtl' : 'ltr'} className="flex flex-col gap-[1px] items-center text-center text-[#352514] w-[144.52px]">
              <p className={`font-[family-name:var(--font-heading-accent)] font-semibold ${accentItalic} text-[16px] leading-[1.5] w-full`}>
                {stats.healthy}
              </p>
              <p className="font-[family-name:var(--font-body)] font-normal text-[12px] leading-[1.5] w-full">
                {stats.trusted}
              </p>
            </div>
            <img
              alt=""
              aria-hidden
              src="/images/hero/laurel-right.svg"
              className="h-[48px] w-[15.188px] object-contain shrink-0"
            />
          </div>

          {/* Rating row: 5.00 · 100% · 120+ */}
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-[4px] items-center w-[83px]">
              <p className="font-[family-name:var(--font-body)] font-medium text-[18px] leading-[1.5] text-[#352514] text-center min-w-full">
                5.00
              </p>
              <img
                alt="5 stars"
                src="/images/hero/stars.svg"
                className="h-[20px] w-[69.167px] object-contain"
              />
            </div>

            <div className="flex flex-col gap-[4px] items-center text-[#352514]">
              <p className="font-[family-name:var(--font-body)] font-medium text-[18px] leading-[1.5] text-center min-w-full">
                100%
              </p>
              <p className="font-[family-name:var(--font-body)] font-light text-[14px] leading-[1.5] whitespace-nowrap">
                {stats.satisfaction}
              </p>
            </div>

            <div className="flex flex-col gap-[4px] items-center text-[#352514]">
              <p className="font-[family-name:var(--font-body)] font-medium text-[18px] leading-[1.5] text-center min-w-full">
                120+
              </p>
              <p className="font-[family-name:var(--font-body)] font-light text-[14px] leading-[1.5] whitespace-nowrap">
                {stats.reviews}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
