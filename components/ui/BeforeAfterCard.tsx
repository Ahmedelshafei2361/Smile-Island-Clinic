import type { BeforeAfterCase } from '@/lib/data'

interface BeforeAfterCardProps {
  item: BeforeAfterCase
  locale: string
}

/**
 * Homepage before/after card — a single combined image (before stacked over
 * after). Static by design; interactive comparison sliders live on the
 * individual service pages instead.
 */
export default function BeforeAfterCard({ item, locale }: BeforeAfterCardProps) {
  const alt =
    locale === 'ar'
      ? 'حالة قبل وبعد العلاج في عيادة سمايل ايلاند'
      : 'Before and after dental treatment at Smile Island Clinic'

  return (
    <div className="snap-center shrink-0 mr-[24px] w-[280px] lg:w-[400px] rounded-[20px] overflow-hidden bg-card select-none">
      <img
        src={item.image}
        alt={alt}
        draggable={false}
        className="block w-full h-auto pointer-events-none"
      />
    </div>
  )
}
