import type { BeforeAfterCase } from '@/lib/data'

interface BeforeAfterCardProps {
  item: BeforeAfterCase
  locale: string
}

/**
 * Homepage before/after card — a single combined image.
 * Fixed height so all cards stay visually consistent.
 */
export default function BeforeAfterCard({ item, locale }: BeforeAfterCardProps) {
  const alt =
    locale === 'ar'
      ? 'حالة قبل وبعد العلاج في عيادة سمايل ايلاند'
      : 'Before and after dental treatment at Smile Island Clinic'

  return (
    <div className="snap-center shrink-0 mr-[24px] w-[280px] lg:w-[400px] h-[377px] rounded-[20px] overflow-hidden bg-card select-none">
      <img
        src={item.image}
        alt={alt}
        draggable={false}
        className="block h-full w-full object-cover pointer-events-none"
      />
    </div>
  )
}