'use client'

import { useState } from 'react'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal from '@/components/ui/Reveal'
import type { ResolvedService } from '@/sanity/lib/getServices'
import { getBookingUrl } from '@/lib/whatsapp'
import { toLocale } from '@/lib/locale'

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="shrink-0 size-[18px]"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
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
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

interface AllServicesSectionProps {
  locale: string
  services: ResolvedService[]
}

type ServiceItem = ResolvedService

export default function AllServicesSection({
  locale,
  services,
}: AllServicesSectionProps) {
  const loc = toLocale(locale)
  const isAr = loc === 'ar'

  const [selectedSlug, setSelectedSlug] = useState(services[0]?.slug)
  const selected = services.find((s) => s.slug === selectedSlug) ?? services[0]

  const heading = isAr
    ? { title: 'جميع', accent: 'الخدمات' }
    : { title: 'All', accent: 'Services' }

  const subtitle = isAr
    ? 'تصفّح مجموعتنا الكاملة من علاجات الأسنان واختر ما يناسبك.'
    : 'Browse our full range of dental treatments and pick what fits you.'

  const bookLabel = isAr ? 'احجز الخدمة' : 'Book Service'
  const detailsLabel = isAr ? 'تفاصيل الخدمة' : 'See service details'

  const title = (s: ServiceItem) => (isAr ? s.titleAr : s.titleEn)
  const desc = isAr ? selected.shortDescriptionAr : selected.shortDescriptionEn

  const bookUrl = getBookingUrl({
    serviceEn: selected.titleEn,
    serviceAr: selected.titleAr,
    locale: loc,
  })

  const detailsHref = `/${loc}/services/${selected.slug}`

  return (
    <section
      id="services"
      dir={isAr ? 'rtl' : 'ltr'}
      className="bg-[#55402a] py-[64px] font-[family-name:var(--font-body)] text-white md:py-[96px]"
    >
      <Container>
        <Reveal className="text-center lg:text-start">
          <SectionHeading
            title={heading.title}
            accent={heading.accent}
            accentFirst={false}
            locale={loc}
            tone="light"
            accentInherit
            align="center"
            className="lg:text-start"
          />

          <p className="mt-[16px] font-[family-name:var(--font-body)] text-[15px] leading-[1.5] text-white/70 md:text-[18px]">
            {subtitle}
          </p>
        </Reveal>

        <div className="mt-[40px] flex flex-col gap-[32px] md:mt-[48px] lg:grid lg:grid-cols-2 lg:items-start lg:gap-[40px]">
          {/* Services list — swipe on mobile, grid on desktop */}
          <div
            dir={isAr ? 'rtl' : 'ltr'}
            className="-mx-[20px] order-2 grid snap-x snap-mandatory grid-flow-col grid-rows-2 auto-cols-[300px] gap-[12px] overflow-x-auto px-[20px] pb-[4px] scroll-px-[20px] no-scrollbar sm:auto-cols-[320px] lg:order-none lg:mx-0 lg:grid-flow-row lg:grid-rows-none lg:grid-cols-2 lg:auto-cols-auto lg:overflow-visible lg:px-0 lg:pb-0 lg:snap-none"
          >
            {services.map((s) => {
              const active = s.slug === selectedSlug

              return (
                <button
                  key={s.slug}
                  type="button"
                  dir={isAr ? 'rtl' : 'ltr'}
                  onClick={(e) => {
                    setSelectedSlug(s.slug)

                    e.currentTarget.scrollIntoView({
                      behavior: 'smooth',
                      inline: 'center',
                      block: 'nearest',
                    })
                  }}
                  aria-pressed={active}
                  className={`flex min-h-[64px] w-full snap-start items-center justify-between gap-[14px] rounded-[80px] py-[10px] ps-[22px] pe-[10px] text-start transition-colors duration-300 lg:min-h-0 lg:py-[10px] lg:ps-[24px] ${
                    active
                      ? 'bg-[#f7efe8] font-semibold text-[#1f160c]'
                      : 'bg-white/5 font-normal text-white hover:bg-white/10'
                  }`}
                >
                  <span className="min-w-0 flex-1 text-start text-[16px] leading-[1.35] line-clamp-2 lg:truncate lg:text-[18px]">
                    {title(s)}
                  </span>

                  <span
                    className={`grid size-[48px] shrink-0 place-items-center rounded-full transition-colors duration-300 ${
                      active ? 'bg-[#352514] text-[#f7efe8]' : 'bg-white/5 text-white'
                    }`}
                  >
                    <ArrowIcon
                      className={`size-[22px] lg:size-[24px] ${
                        isAr ? '-scale-x-100' : ''
                      }`}
                    />
                  </span>
                </button>
              )
            })}
          </div>

          {/* Selected service preview */}
          <div className="order-1 flex flex-col lg:order-none">
            <img
              src={selected.image}
              alt={title(selected)}
              className="h-[220px] w-full rounded-[18px] object-cover opacity-90 md:h-[280px] lg:h-[350px] lg:rounded-[16px]"
            />

            <h3 className="mt-[24px] min-h-[62px] font-[family-name:var(--font-body)] text-[24px] font-semibold leading-[1.3] md:min-h-[40px] md:text-[28px] md:line-clamp-1">
              {title(selected)}
            </h3>

            <p className="mt-[12px] min-h-[132px] font-[family-name:var(--font-body)] text-[15px] leading-[1.6] text-[#f8f8f8]/90 line-clamp-[5] md:min-h-[104px] md:text-[16px] md:line-clamp-4">
              {desc}
            </p>

            <div className="mt-[24px] flex flex-col gap-[14px] sm:flex-row sm:gap-[16px]">
              <a
                href={bookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[54px] w-full items-center justify-center gap-[10px] rounded-[800px] bg-[#f7efe8] px-[24px] text-[16px] font-medium whitespace-nowrap text-[#4d3519] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white sm:w-auto md:h-[48px]"
              >
                <WhatsAppIcon />
                {bookLabel}
              </a>

              <a
                href={detailsHref}
                className="inline-flex h-[54px] w-full items-center justify-center rounded-[800px] bg-[#352514] px-[24px] text-[16px] font-medium whitespace-nowrap text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#2a1d10] sm:w-auto md:h-[48px]"
              >
                {detailsLabel}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}