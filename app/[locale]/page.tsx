import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import PopularTreatmentsSection from '@/components/sections/PopularTreatmentsSection'
import BeforeAfterSection from '@/components/sections/BeforeAfterSection'
import AllServicesSection from '@/components/sections/AllServicesSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import FaqSection from '@/components/sections/FaqSection'

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <>
      <Header locale={locale} />
      <main className="flex-1">
        <HeroSection locale={locale} />
        <AboutSection locale={locale} />
        <PopularTreatmentsSection locale={locale} />
        <BeforeAfterSection locale={locale} />
        <AllServicesSection locale={locale} />
        <TestimonialsSection locale={locale} />
        <FaqSection locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  )
}
