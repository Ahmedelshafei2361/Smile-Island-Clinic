import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import { siteSettings } from '@/lib/data'
import { getWhatsAppUrl, PHONE_NUMBER } from '@/lib/whatsapp'
import { toLocale } from '@/lib/locale'

function WhatsAppIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

function PhoneIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M6.62 10.79a15.5 15.5 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.4 11.4 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
    </svg>
  )
}

function PinIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2a7 7 0 0 0-7 7c0 4.5 7 13 7 13s7-8.5 7-13a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
    </svg>
  )
}

function ClockIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}

function ArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  )
}

interface ContactSectionProps {
  locale: string
}

export default function ContactSection({ locale }: ContactSectionProps) {
  const loc = toLocale(locale)
  const isAr = loc === 'ar'

  const mapsUrl = 'https://www.google.com/maps/place/%D8%B3%D9%85%D8%A7%D9%8A%D9%84+%D8%A7%D9%8A%D9%84%D8%A7%D9%86%D8%AF+%D9%84%D8%AA%D8%AC%D9%85%D9%8A%D9%84+%D8%A7%D9%84%D9%84%D8%AB%D9%87+%D9%88%D8%B2%D8%B1%D8%A7%D8%B9%D8%A9+%D8%A7%D9%84%D8%A3%D8%B3%D9%86%D8%A7%D9%86+Smile+Island%E2%80%AD/@31.2302137,29.9585276,17.88z/data=!4m6!3m5!1s0x14f5c50a67e3679b:0xdeb1e9b886d35102!8m2!3d31.2304003!4d29.9585073!16s%2Fg%2F11vqwzc74l?hl=en-EG&entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D'

  const subtitle = isAr
    ? 'تواصل معنا، زرنا، أو احجز موعدك — نحن هنا لمساعدتك.'
    : 'Reach out, visit us, or book your appointment — we’re here to help.'

  const accentClass = `font-[family-name:var(--font-heading-accent)] text-[#9c673f] ${
    isAr ? '' : 'italic'
  }`

  const cards = [
    {
      key: 'whatsapp',
      title: isAr ? 'واتساب' : 'WhatsApp',
      detail: siteSettings.whatsapp,
      href: getWhatsAppUrl(
        isAr
          ? 'مرحباً، أريد حجز موعد في عيادة سمايل ايلاند.'
          : 'Hello, I want to book an appointment at Smile Island Dental Clinic.',
      ),
      external: true,
      icon: <WhatsAppIcon className="size-[26px]" />,
    },
    {
      key: 'phone',
      title: isAr ? 'الهاتف' : 'Phone',
      detail: siteSettings.phone,
      href: `tel:+${PHONE_NUMBER}`,
      external: false,
      icon: <PhoneIcon className="size-[26px]" />,
    },
    {
      key: 'address',
      title: isAr ? 'العنوان' : 'Address',
      detail: isAr ? siteSettings.addressAr : siteSettings.addressEn,
      href: mapsUrl,
      external: true,
      icon: <PinIcon className="size-[26px]" />,
    },
  ]

  const hoursTitle = isAr ? 'مواعيد العمل' : 'Working Hours'
  const mapAria = isAr
    ? 'افتح موقع العيادة على خرائط جوجل'
    : 'Open the clinic location on Google Maps'

  return (
    <section
      id="contact"
      className="bg-[#FAF6F2] py-[64px] md:py-[96px] font-[family-name:var(--font-body)]"
    >
      <Container>
        <Reveal className="flex flex-col items-center text-center">
          <h2 className="font-[family-name:var(--font-heading)] font-medium leading-[1.3] text-[32px] md:text-[48px] text-[#352514]">
            {isAr ? (
              <>
                <span className={accentClass}>تواصل</span> معنا
              </>
            ) : (
              <>
                <span className={accentClass}>Contact</span> details
              </>
            )}
          </h2>

          <p className="mt-[16px] max-w-[600px] text-[15px] md:text-[18px] leading-[1.5] text-[#352514]/80">
            {subtitle}
          </p>
        </Reveal>

        <div className="mt-[40px] grid grid-cols-1 items-stretch gap-[24px] md:mt-[56px] lg:grid-cols-[minmax(0,500px)_1fr] lg:gap-[48px]">
          <Reveal className="flex flex-col gap-[16px]">
            {cards.map((c) => (
              <a
                key={c.key}
                href={c.href}
                target={c.external ? '_blank' : undefined}
                rel={c.external ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-[16px] rounded-[16px] bg-[#F4EAE1] p-[16px] transition-colors duration-200 hover:bg-[#F1E5DA]"
              >
                <span className="grid size-[48px] shrink-0 place-items-center rounded-[10px] bg-white text-[#9c673f]">
                  {c.icon}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-[16px] md:text-[18px] font-medium leading-[1.4] text-[#14110f]">
                    {c.title}
                  </span>
                  <span className="block truncate text-start text-[14px] md:text-[16px] leading-[1.5] text-[#57534d]">
                    {c.detail}
                  </span>
                </span>

                <span
                  className={`grid size-[40px] shrink-0 place-items-center rounded-full bg-white text-[#352514] transition-transform duration-200 ${
                    isAr ? 'group-hover:-translate-x-[2px]' : 'group-hover:translate-x-[2px]'
                  }`}
                >
                  <ArrowIcon className={`size-[20px] ${isAr ? 'rotate-180' : ''}`} />
                </span>
              </a>
            ))}

            <div className="flex items-start gap-[16px] rounded-[16px] bg-[#F4EAE1] p-[16px]">
              <span className="grid size-[48px] shrink-0 place-items-center rounded-[10px] bg-white text-[#9c673f]">
                <ClockIcon className="size-[24px]" />
              </span>

              <div className="min-w-0 flex-1">
                <span className="block text-[16px] md:text-[18px] font-medium leading-[1.4] text-[#14110f]">
                  {hoursTitle}
                </span>

                <ul className="mt-[6px] flex flex-col gap-[3px]">
                  {siteSettings.workingHours.map((h, i) => (
                    <li
                      key={i}
                      className="flex flex-wrap gap-x-[8px] text-[13px] md:text-[15px] leading-[1.5] text-[#57534d]"
                    >
                      <span className="font-medium text-[#352514]">
                        {isAr ? h.daysAr : h.daysEn}:
                      </span>
                      <span>{isAr ? h.hoursAr : h.hoursEn}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="h-full">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={mapAria}
              title={mapAria}
              className="group relative block h-[260px] w-full overflow-hidden rounded-[24px] bg-[#F4EAE1] sm:h-[340px] lg:h-full lg:min-h-[420px]"
            >
              <img
                src="/images/contact/map-snapshot.png"
                alt={isAr ? 'خريطة موقع عيادة سمايل ايلاند' : 'Map location of Smile Island Clinic'}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />

              <span className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/[0.04]" />

              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="grid size-[60px] place-items-center rounded-full bg-white/95 text-[#9c673f] shadow-[0_14px_34px_rgba(53,37,20,0.22)] ring-1 ring-[#352514]/10 transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-105">
                  <PinIcon className="size-[30px]" />
                </span>
              </span>

              <span
                translate="no"
                className="absolute bottom-[12px] left-[12px] rounded-full bg-white/90 px-[10px] py-[5px] text-[12px] font-medium text-[#57534d] shadow-[0_6px_18px_rgba(53,37,20,0.16)]"
              >
                Google Maps
              </span>

              <span className="absolute bottom-[12px] right-[12px] inline-flex items-center gap-[8px] rounded-[800px] bg-white/95 px-[14px] py-[8px] text-[13px] font-medium text-[#352514] shadow-[0_6px_18px_rgba(53,37,20,0.16)] transition-transform duration-300 group-hover:-translate-y-0.5">
                <ArrowIcon className={`size-[15px] ${isAr ? 'rotate-180' : ''}`} />
                {isAr ? 'افتح الخريطة' : 'Open map'}
              </span>
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  )
} 