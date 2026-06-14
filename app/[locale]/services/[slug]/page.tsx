import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ServiceHero from '@/components/sections/ServiceHero'
import ServiceSteps from '@/components/sections/ServiceSteps'
import ServiceBeforeAfter from '@/components/sections/ServiceBeforeAfter'
import ContactSection from '@/components/sections/ContactSection'
import { getServiceBySlug, getServiceSlugs } from '@/sanity/lib/getServices'
import { LOCALES, toLocale } from '@/lib/locale'
import { SITE_NAME, OG_IMAGE, ogLocale } from '@/lib/seo'

// Allow service pages added in Sanity after deployment to render on demand,
// without requiring a rebuild for every new slug.
export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = await getServiceSlugs()
  return LOCALES.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const loc = toLocale(locale)
  const service = await getServiceBySlug(slug)
  if (!service) return {}
  const isAr = loc === 'ar'
  const title = isAr ? service.titleAr : service.titleEn
  const description = isAr ? service.shortDescriptionAr : service.shortDescriptionEn
  const path = `/${loc}/services/${slug}`

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    alternates: {
      canonical: path,
      languages: {
        en: `/en/services/${slug}`,
        ar: `/ar/services/${slug}`,
        'x-default': `/en/services/${slug}`,
      },
    },
    openGraph: {
      siteName: SITE_NAME,
      title: `${title} | ${SITE_NAME}`,
      description,
      type: 'website',
      locale: ogLocale(loc),
      url: path,
      images: [{ url: OG_IMAGE, alt: SITE_NAME }],
    },
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const loc = toLocale(locale)
  const service = await getServiceBySlug(slug)
  if (!service) notFound()

  return (
    <>
      <Header locale={loc} />
      <main className="flex-1">
        <ServiceHero service={service} image={service.image} locale={loc} />
        <ServiceSteps service={service} locale={loc} />
        {service.sliderCases.length > 0 && (
          <ServiceBeforeAfter locale={loc} cases={service.sliderCases} />
        )}
        <ContactSection locale={loc} />
      </main>
      <Footer locale={loc} />
    </>
  )
}
