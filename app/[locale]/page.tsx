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

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const [heroContent, beforeAfterContent] = await Promise.all([
    getHeroContent(locale),
    getBeforeAfterContent(),
  ])

  return (
    <>
      <Header locale={locale} />
      <main className="flex-1">
        <HeroSection locale={locale} content={heroContent} />
        <AboutSection locale={locale} />
        <PopularTreatmentsSection locale={locale} />
        <BeforeAfterSection locale={locale} content={beforeAfterContent} />
        <AllServicesSection locale={locale} />
        <TestimonialsSection locale={locale} />
        <FaqSection locale={locale} />
        <ContactSection locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  )
}
