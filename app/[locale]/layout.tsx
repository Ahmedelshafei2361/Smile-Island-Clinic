import type { Metadata } from 'next'
import { toLocale } from '@/lib/locale'
import type { Locale } from '@/lib/locale'
import { SITE_NAME, OG_IMAGE, ogLocale } from '@/lib/seo'
import CookieConsent from '@/components/ui/CookieConsent'

const metaByLocale: Record<Locale, { title: string; description: string }> = {
  en: {
    title: 'Smile Island Dental Clinic | Dentist in Alexandria',
    description:
      'Smile Island Dental Clinic in Alexandria, Egypt offers exceptional dental care at fair prices — implants, whitening, veneers, and more. Book your visit today.',
  },
  ar: {
    title: 'عيادة سمايل ايلاند لطب الأسنان | الإسكندرية',
    description:
      'عيادة سمايل ايلاند لطب الأسنان في الإسكندرية تقدم رعاية أسنان استثنائية بأسعار معقولة — زراعة وتبييض وقشور تجميلية والمزيد. احجز موعدك الآن.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const loc = toLocale(locale)
  const { title, description } = metaByLocale[loc]
  const path = `/${loc}`

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: { en: '/en', ar: '/ar', 'x-default': '/en' },
    },
    openGraph: {
      siteName: SITE_NAME,
      title,
      description,
      type: 'website',
      locale: ogLocale(loc),
      url: path,
      images: [{ url: OG_IMAGE, alt: SITE_NAME }],
    },
  }
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
      <CookieConsent locale={loc} />
    </div>
  )
}
