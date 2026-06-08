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

  const heading =
    loc === 'ar'
      ? { italic: 'ابتسامة استثنائية', regular: ' بأسعار معقولة' }
      : { italic: 'Exceptional Smile', regular: ' Fairly Priced' }

  const subtitle =
    loc === 'ar'
      ? 'استعد ابتسامتك مع أطباء أسنان متمرسين يقدمون رعاية عالية الجودة بأسعار منصفة.'
      : 'Restore your smile with experienced dentists providing quality care at fair pricing.'

  const ctaContact = loc === 'ar' ? 'تواصل معنا' : 'Contact Us'
  const ctaExplore = loc === 'ar' ? 'استعرض الخدمات' : 'Explore services'

  return (
    <section className="relative h-[849px] overflow-clip rounded-tl-[24px] rounded-tr-[24px]">
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

      {/* Bottom fade — toward the warm page tone (not pure white) so the
          team grounds softly without an obvious white block */}
      <div
        className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent from-[78%] to-[#FEFCFB]/90"
        aria-hidden
      />

      {/* Hero content: heading + subtitle + CTAs */}
      <div className="-translate-x-1/2 absolute left-1/2 top-[123px] w-[1002px] flex flex-col gap-[48px] items-center justify-center">
        {/* Text block */}
        <div className="flex flex-col gap-[16px] items-center justify-center text-center w-full">
          <h1 className="leading-[1.2] w-full animate-rise delay-1">
            <span className="font-[family-name:var(--font-heading)] font-medium italic leading-[1.2] text-[#9c673f] text-[72px]">
              {heading.italic}
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
            className="group bg-[#352514] flex gap-[8px] items-center justify-center px-[20px] py-[12px] rounded-[800px] text-[#f7efe8] text-[16px] font-medium leading-[1.5] whitespace-nowrap transition-all duration-200 hover:bg-[#2a1d10] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#352514]/20"
          >
            <WhatsAppIcon className="size-[18px]" />
            {ctaContact}
          </a>
          <a
            href={servicesHref}
            className="bg-[#efdfd2] flex items-center justify-center px-[24px] py-[12px] rounded-[800px] text-[#352514] text-[16px] font-medium leading-[1.5] whitespace-nowrap transition-all duration-200 hover:bg-[#e7d3c2] hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#9c673f]/15"
          >
            {ctaExplore}
          </a>
        </div>
      </div>

      {/* Stats bar */}
      <div className="-translate-x-1/2 absolute left-[calc(50%+0.5px)] top-[652px] w-[807px] bg-[#f9eee7] border border-[#e9cdb4] rounded-[24px] px-[48px] py-[16px] flex items-center justify-between overflow-clip animate-rise delay-4">
        {/* Healthy Smile */}
        <div className="flex gap-[2px] items-center justify-center w-[185px]">
          <img
            alt=""
            aria-hidden
            src="/images/hero/laurel-left.svg"
            className="h-[58px] w-[18.353px] object-contain shrink-0"
          />
          <div className="flex flex-col gap-[1px] items-center text-center text-[#352514] w-[144.52px]">
            <p className="font-[family-name:var(--font-heading)] font-semibold italic text-[20.355px] leading-[1.5] w-full">
              Healthy Smile
            </p>
            <p className="font-[family-name:var(--font-body)] font-normal text-[14.249px] leading-[1.5] w-full">
              Trusted by thousands
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
            Satisfaction
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
            Reviews
          </p>
        </div>
      </div>
    </section>
  )
}
