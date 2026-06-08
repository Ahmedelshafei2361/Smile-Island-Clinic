import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import PopularTreatmentsSection from '@/components/sections/PopularTreatmentsSection'

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
      </main>
      <Footer locale={locale} />
    </>
  )
}
