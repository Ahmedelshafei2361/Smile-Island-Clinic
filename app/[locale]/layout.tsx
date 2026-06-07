import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { toLocale } from '@/lib/locale'
import type { Locale } from '@/lib/locale'

// Both fonts loaded locally — no Google Fonts
const playfair = localFont({
  src: [
    {
      path: '../../public/fonts/playfair-display/PlayfairDisplay-VariableFont_wght.ttf',
      style: 'normal',
    },
    {
      path: '../../public/fonts/playfair-display/PlayfairDisplay-Italic-VariableFont_wght.ttf',
      style: 'italic',
    },
  ],
  variable: '--font-playfair',
  display: 'swap',
})

const jakarta = localFont({
  src: [
    {
      path: '../../public/fonts/plus-jakarta-sans/PlusJakartaSans-VariableFont_wght.ttf',
      style: 'normal',
    },
    {
      path: '../../public/fonts/plus-jakarta-sans/PlusJakartaSans-Italic-VariableFont_wght.ttf',
      style: 'italic',
    },
  ],
  variable: '--font-jakarta',
  display: 'swap',
})

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
      className={`${playfair.variable} ${jakarta.variable} min-h-screen flex flex-col`}
    >
      {children}
    </div>
  )
}
