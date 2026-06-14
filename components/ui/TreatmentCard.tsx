import { getBookingUrl } from '@/lib/whatsapp'
import { toLocale } from '@/lib/locale'
import type { PopularTreatment } from '@/lib/data'

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="shrink-0 size-[16px]"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

interface TreatmentCardProps {
  treatment: PopularTreatment
  index: number
  locale: string
}

export default function TreatmentCard({ treatment, index, locale }: TreatmentCardProps) {
  const isAr = toLocale(locale) === 'ar'
  const num = String(index + 1).padStart(2, '0')

  const title = isAr ? treatment.titleAr : treatment.titleEn
  const desc = isAr ? treatment.descAr : treatment.descEn
  const detailsHref = `/${locale}/services/${treatment.slug}`

  const bookUrl = getBookingUrl({
    serviceEn: treatment.titleEn,
    serviceAr: treatment.titleAr,
    locale,
  })

  const seeLabel = isAr ? 'عرض تفاصيل الخدمة' : 'See service details'
  const bookLabel = isAr ? 'احجز الخدمة' : 'Book service'

  const numClass = `font-[family-name:var(--font-heading-accent)] ${
    isAr ? '' : 'italic'
  } text-[#9c673f] text-[38px] lg:text-[40px] leading-none`

  return (
    <article
      dir={isAr ? 'rtl' : 'ltr'}
      className="
        group shrink-0 me-[20px]
        w-[calc(100vw-32px)]
        sm:w-[420px]
        md:w-[520px]
        lg:w-[650px]
        xl:w-[700px]
        2xl:w-[730px]
        bg-[#F4EAE1]
        rounded-[20px]
        border-2 border-white
        p-[11px]
        flex flex-col lg:flex-row lg:items-center
        gap-[14px] lg:gap-[22px]
        select-none
        transition-colors duration-500 ease-out
        hover:bg-[#F1E5DA]
      "
    >
      <div
        className="
          order-2 lg:order-none
          shrink-0
          w-full
          lg:w-[270px]
          xl:w-[296px]
          2xl:w-[312px]
          aspect-[4/3]
          rounded-[14px]
          overflow-hidden
        "
      >
        <img
          src={treatment.image}
          alt={title}
          draggable={false}
          className="h-full w-full object-cover pointer-events-none"
        />
      </div>

      <div
        className="
          order-1 lg:order-none
          flex-1 min-w-0
          flex flex-col
          lg:self-stretch
          lg:py-[13px]
        "
      >
        <span className={numClass}>{num}</span>

        <h3
          className="
            font-[family-name:var(--font-body)]
            font-semibold
            text-[18px] lg:text-[20px]
            leading-[1.2]
            text-[#352514]
            mt-[8px]
          "
        >
          {title}
        </h3>

        <p
          className="
            font-[family-name:var(--font-body)]
            font-normal
            text-[13px] lg:text-[14px]
            leading-[1.55]
            text-[#5b4a3a]
            mt-[7px]
          "
        >
          {desc}
        </p>

        <div
          className="
            flex flex-col sm:flex-row
            gap-[10px]
            mt-[14px] lg:mt-auto lg:pt-[14px]
          "
        >
          <a
            href={bookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              shrink-0
              w-full sm:w-auto
              whitespace-nowrap
              bg-[#352514]
              text-[#f7efe8]
              rounded-[800px]
              px-[20px]
              py-[11px]
              text-[15px]
              font-medium
              leading-none
              flex items-center justify-center gap-[8px]
              transition-transform duration-200
              hover:-translate-y-0.5 hover:bg-[#2a1d10]
            "
          >
            <WhatsAppIcon />
            {bookLabel}
          </a>

          <a
            href={detailsHref}
            className="
              shrink-0
              w-full sm:w-auto
              whitespace-nowrap
              bg-white
              text-[#352514]
              rounded-[800px]
              px-[22px]
              py-[11px]
              text-[15px]
              font-medium
              leading-none
              text-center
              transition-transform duration-200
              hover:-translate-y-0.5
            "
          >
            {seeLabel}
          </a>
        </div>
      </div>
    </article>
  )
}