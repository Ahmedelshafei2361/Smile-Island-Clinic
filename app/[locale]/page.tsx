import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import PopularTreatmentsSection from '@/components/sections/PopularTreatmentsSection'
import BeforeAfterSection from '@/components/sections/BeforeAfterSection'
import AllServicesSection from '@/components/sections/AllServicesSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import FaqSection from '@/components/sections/FaqSection'
import ContactSection from '@/components/sections/ContactSection'
import { getHeroContent } from '@/sanity/lib/getHeroContent'
import { getBeforeAfterContent } from '@/sanity/lib/getBeforeAfterContent'
import { getServices } from '@/sanity/lib/getServices'
import { getPopularTreatments } from '@/sanity/lib/getPopularTreatments'
import { popularTreatments as localPopular } from '@/lib/data'
import type { PopularTreatment } from '@/lib/data'

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const [heroContent, beforeAfterContent, services, popular] = await Promise.all([
    getHeroContent(locale),
    getBeforeAfterContent(),
    getServices(),
    getPopularTreatments(),
  ])

  // popular.items === null → use local fallback; [] → hide section; [...] → show CMS.
  const popularItems: PopularTreatment[] =
    popular.items === null
      ? localPopular
      : popular.items.map((s) => ({
          slug: s.slug,
          titleEn: s.titleEn,
          titleAr: s.titleAr,
          descEn: s.shortDescriptionEn,
          descAr: s.shortDescriptionAr,
          image: s.image,
        }))

  return (
    <>
      <Header locale={locale} />
      <main className="flex-1">
        <HeroSection locale={locale} content={heroContent} />
        <AboutSection locale={locale} />
        {popular.showSection && popularItems.length >= 3 && (
          <PopularTreatmentsSection locale={locale} items={popularItems} />
        )}
        <BeforeAfterSection locale={locale} content={beforeAfterContent} />
        <AllServicesSection locale={locale} services={services} />
        <TestimonialsSection locale={locale} />
        <FaqSection locale={locale} />
        <ContactSection locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  )
}
