import type { Metadata } from 'next'
import { toLocale } from '@/lib/locale'
import type { Locale } from '@/lib/locale'

const metaByLocale: Record<Locale, { title: string; description: string }> = {
  en: {
    title: 'Smile Island Dental Clinic',
    description:
      'Exceptional dental care at fair pricing. Book your appointment in Alexandria, Egypt.',
  },
  ar: {
    title: 'عيادة سمايل ايلاند لطب الأسنان',
    description:
      'رعاية أسنان استثنائية بأسعار معقولة. احجز موعدك في الإسكندرية، مصر.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const loc = toLocale(locale)
  return metaByLocale[loc]
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }]
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const loc = toLocale(locale)
  const dir = loc === 'ar' ? 'rtl' : 'ltr'

  return (
    <div
      lang={loc}
      dir={dir}
      className="min-h-screen flex flex-col font-[family-name:var(--font-body)]"
    >
      {children}
    </div>
  )
}
