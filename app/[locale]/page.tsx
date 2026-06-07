import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Container from '@/components/ui/Container'

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <>
      <Header locale={locale} />
      <main className="flex-1 pt-[120px]">
        <Container>
          <div className="py-[72px] text-center">
            <p className="text-[14px] text-[#9c673f]">
              Phase 1 complete — homepage sections coming in Phase 2.
            </p>
          </div>
        </Container>
      </main>
      <Footer locale={locale} />
    </>
  )
}
