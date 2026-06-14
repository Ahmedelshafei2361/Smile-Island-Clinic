import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import TestimonialsCarousel from '@/components/ui/TestimonialsCarousel'
import VideoTestimonialCard from '@/components/ui/VideoTestimonialCard'
import ReviewCard from '@/components/ui/ReviewCard'
import { videoTestimonials, googleReviews } from '@/lib/data'
import { toLocale } from '@/lib/locale'

interface TestimonialsSectionProps {
  locale: string
}

export default function TestimonialsSection({ locale }: TestimonialsSectionProps) {
  const loc = toLocale(locale)
  const isAr = loc === 'ar'

  const subtitle = isAr
    ? 'استمع إلى آراء مرضانا وشاهد نتائج حقيقية من زيارات حقيقية.'
    : 'Hear from our patients and see real results from real visits.'

  // Heading: middle-word gold italic accent ("What Our [Clients] Say").
  const accentClass = `font-[family-name:var(--font-heading-accent)] text-[#9c673f] ${
    isAr ? '' : 'italic'
  }`

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[rgba(241,228,217,0.2)] py-[64px] md:py-[96px] font-[family-name:var(--font-body)]"
    >
      <Container>
        <Reveal className="flex flex-col items-center text-center max-w-[800px] mx-auto">
          <h2 className="font-[family-name:var(--font-heading)] font-medium leading-[1.2] text-[32px] md:text-[52px] text-[#352514]">
            {isAr ? (
              <>
                ماذا يقول <span className={accentClass}>عملاؤنا</span>
              </>
            ) : (
              <>
                What Our <span className={accentClass}>Clients</span> Say
              </>
            )}
          </h2>
          <p className="mt-[16px] text-[15px] md:text-[18px] leading-[1.5] text-[#352514]/80">
            {subtitle}
          </p>
        </Reveal>
      </Container>

      {/* Video testimonials (YouTube Shorts — lazy thumbnails, open on click) */}
      <Reveal delay={200} className="mt-[40px] md:mt-[56px]">
        <TestimonialsCarousel
          isAr={isAr}
          label={isAr ? 'شهادات بالفيديو' : 'Video testimonials'}
        >
          {videoTestimonials.map((item) => (
            <VideoTestimonialCard key={item.id} item={item} locale={loc} />
          ))}
        </TestimonialsCarousel>
      </Reveal>

      {/* Google reviews */}
      <Reveal delay={300} className="mt-[40px] md:mt-[56px]">
        <TestimonialsCarousel
          isAr={isAr}
          label={isAr ? 'تقييمات Google' : 'Google reviews'}
        >
          {googleReviews.map((item) => (
            <ReviewCard key={item.id} item={item} locale={loc} />
          ))}
        </TestimonialsCarousel>
      </Reveal>
    </section>
  )
}
