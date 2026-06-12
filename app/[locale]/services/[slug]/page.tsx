import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ServiceHero from '@/components/sections/ServiceHero'
import ServiceSteps from '@/components/sections/ServiceSteps'
import ServiceBeforeAfter from '@/components/sections/ServiceBeforeAfter'
import ContactSection from '@/components/sections/ContactSection'
import { services } from '@/lib/data'
import { LOCALES, toLocale } from '@/lib/locale'

// Real images that exist today; everything else falls back to the preview.
const HERO_IMAGES: Record<string, string> = {
  'dental-implants': '/images/services/dental-implants.jpg',
  'gum-contouring': '/images/services/gum-contouring.jpg',
}
const FALLBACK_IMAGE = '/images/services/service-preview.jpg'

function resolveImage(slug: string): string {
  return HERO_IMAGES[slug] ?? FALLBACK_IMAGE
}

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    services.map((service) => ({ locale, slug: service.slug }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) return {}
  const isAr = toLocale(locale) === 'ar'
  const title = isAr ? service.titleAr : service.titleEn
  const description = isAr ? service.shortDescriptionAr : service.shortDescriptionEn
  return {
    title: `${title} | Smile Island Dental Clinic`,
    description,
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const loc = toLocale(locale)
  const service = services.find((s) => s.slug === slug)
  if (!service) notFound()

  return (
    <>
      <Header locale={loc} />
      <main className="flex-1">
        <ServiceHero service={service} image={resolveImage(service.slug)} locale={loc} />
        <ServiceSteps service={service} locale={loc} />
        <ServiceBeforeAfter locale={loc} />
        <ContactSection locale={loc} />
      </main>
      <Footer locale={loc} />
    </>
  )
}
