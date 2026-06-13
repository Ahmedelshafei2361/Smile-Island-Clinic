import Image from 'next/image'
import Link from 'next/link'
import type { Service } from '@/lib/data'
import { getBookingUrl } from '@/lib/whatsapp'
import { toLocale } from '@/lib/locale'

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

function splitLastWord(title: string) {
  const words = title.trim().split(/\s+/)

  if (words.length <= 1) {
    return {
      main: '',
      accent: title,
    }
  }

  return {
    main: words.slice(0, -1).join(' '),
    accent: words[words.length - 1],
  }
}

interface ServiceHeroProps {
  service: Service
  /** Resolved, guaranteed-to-exist image path. */
  image: string
  locale: string
}

export default function ServiceHero({ service, image, locale }: ServiceHeroProps) {
  const loc = toLocale(locale)
  const isAr = loc === 'ar'

  const title = isAr ? service.titleAr : service.titleEn
  const description = isAr ? service.shortDescriptionAr : service.shortDescriptionEn
  const { main, accent } = splitLastWord(title)

  const bookUrl = getBookingUrl({
    serviceEn: service.titleEn,
    serviceAr: service.titleAr,
    locale: loc,
  })

  const servicesHref = `/${loc}#services`

  const contactLabel = isAr ? 'تواصل معنا' : 'Contact Us'
  const otherLabel = isAr ? 'تصفح باقي الخدمات' : 'Check other services'

  const accentClass = `font-[family-name:var(--font-heading-accent)] font-medium text-[#9c673f] ${
    isAr ? '' : 'italic'
  }`

  return (
    <section
      dir={isAr ? 'rtl' : 'ltr'}
      className="relative overflow-hidden bg-background px-[20px] pt-[72px] pb-[96px] font-[family-name:var(--font-body)] lg:px-[64px] lg:pt-[150px] lg:pb-[128px]"
    >
      <div className="relative z-10 mx-auto flex max-w-[1280px] flex-col items-center gap-[40px] lg:gap-[80px]">
        {/* Heading + description + actions */}
        <div className="flex w-full max-w-[800px] flex-col items-center gap-[24px] text-center lg:gap-[32px]">
          <h1 className="font-[family-name:var(--font-heading)] font-medium leading-[1.2] text-[32px] md:text-[56px] text-[#352514]">
            {main ? (
              <>
                {main}{' '}
                <span className={accentClass}>{accent}</span>
              </>
            ) : (
              <span className={accentClass}>{accent}</span>
            )}
          </h1>

          <p className="text-[15px] leading-[1.5] text-[#57534d] md:text-[18px]">
            {description}
          </p>

          <div className="flex w-full flex-col items-center justify-center gap-[12px] sm:w-auto sm:flex-row sm:gap-[16px]">
            <a
              href={bookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-[48px] w-full items-center justify-center gap-[10px] rounded-[800px] bg-[#352514] px-[20px] text-[15px] font-medium text-[#f7efe8] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#2a1d10] sm:w-auto md:text-[16px]"
            >
              <WhatsAppIcon className="size-[18px]" />
              {contactLabel}
            </a>

            <Link
              href={servicesHref}
              className="inline-flex h-[48px] w-full items-center justify-center rounded-[800px] bg-[#f1e4d9] px-[24px] text-[15px] font-medium text-[#352514] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#e9d6c5] sm:w-auto md:text-[16px]"
            >
              {otherLabel}
            </Link>
          </div>
        </div>

        {/* Large rounded service image */}
        <div className="relative w-full max-w-[1094px] aspect-[1094/460] overflow-hidden rounded-[24px] lg:rounded-[30px]">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 1024px) 1094px, 100vw"
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}