import Link from 'next/link'
import { toLocale, type Locale } from '@/lib/locale'
import { siteSettings } from '@/lib/data'
import { getWhatsAppUrl } from '@/lib/whatsapp'

const footerLinks: Record<Locale, { label: string; href: string }[]> = {
  en: [
    { label: 'Contact Us', href: '/en#contact' },
    { label: 'Testimonials', href: '/en#testimonials' },
    { label: 'Services', href: '/en#services' },
    { label: 'Home', href: '/en' },
  ],
  ar: [
    { label: 'تواصل معنا', href: '/ar#contact' },
    { label: 'آراء العملاء', href: '/ar#testimonials' },
    { label: 'خدمات', href: '/ar#services' },
    { label: 'الرئيسية', href: '/ar' },
  ],
}

const copyright: Record<Locale, string> = {
  en: '© 2026 Smile Island. All rights reserved.',
  ar: '© 2026 جزيرة الابتسامة. جميع الحقوق محفوظة.',
}

function WhatsAppIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

function SocialIcon({
  platform,
  className = '',
}: {
  platform: string
  className?: string
}) {
  const key = platform.toLowerCase()

  if (key.includes('facebook')) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
        <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.03 1.8-4.7 4.55-4.7 1.32 0 2.7.24 2.7.24v2.98h-1.52c-1.5 0-1.97.94-1.97 1.9v2.24h3.35l-.54 3.49h-2.81V24C19.61 23.1 24 18.1 24 12.07Z" />
      </svg>
    )
  }

  if (key.includes('instagram')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1.35" fill="currentColor" />
      </svg>
    )
  }

  if (key.includes('tiktok')) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.55"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={className}
      >
        <path d="M14.5 3v11.1a4.35 4.35 0 1 1-3.35-4.25" />
        <path d="M14.5 3c.45 3.05 2.45 5.05 5.5 5.45" />
      </svg>
    )
  }

  if (key.includes('x') || key.includes('twitter')) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
        <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-7.4L6.3 22H3.2l7.3-8.4L2.8 2h6.4l4.5 6.7L18.9 2Zm-1.1 17.8h1.7L8.2 4.1H6.4l11.4 15.7Z" />
      </svg>
    )
  }

  if (key.includes('linkedin')) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
        <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.28 8.02h4.43V23H.28V8.02ZM8.12 8.02h4.25v2.05h.06c.59-1.12 2.03-2.3 4.18-2.3 4.47 0 5.3 2.94 5.3 6.77V23h-4.43v-7.5c0-1.79-.03-4.09-2.49-4.09-2.5 0-2.88 1.95-2.88 3.96V23H7.68V8.02h.44Z" />
      </svg>
    )
  }

  if (key.includes('youtube')) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.2 31.2 0 0 0 0 12a31.2 31.2 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.2 31.2 0 0 0 24 12a31.2 31.2 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z" />
      </svg>
    )
  }

  if (key.includes('google')) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
        <path d="M12 10.2v3.7h5.2c-.2 1.2-1.6 3.5-5.2 3.5-3.1 0-5.7-2.6-5.7-5.8S8.9 5.8 12 5.8c1.8 0 3 .8 3.7 1.4l2.5-2.4A9 9 0 0 0 12 2.4a9.2 9.2 0 1 0 0 18.4c5.3 0 8.8-3.7 8.8-9 0-.6-.1-1.1-.2-1.6H12Z" />
      </svg>
    )
  }

  return null
}

interface FooterProps {
  locale: string
}

export default function Footer({ locale }: FooterProps) {
  const loc = toLocale(locale)
  const isAr = loc === 'ar'
  const links = footerLinks[loc]

  const contactLabel = isAr ? 'اتصل بنا' : 'Contact Us'
  const contactUrl = getWhatsAppUrl(
    isAr
      ? 'مرحباً، أريد التواصل مع عيادة سمايل ايلاند.'
      : 'Hello, I would like to get in touch with Smile Island Dental Clinic.',
  )

  return (
    <footer
      dir={isAr ? 'rtl' : 'ltr'}
      className="rounded-tl-[32px] rounded-tr-[32px] bg-[#55402a] text-[#f7efe8] font-[family-name:var(--font-body)]"
    >
      <div className="mx-auto max-w-[1760px] px-[24px] py-[56px] sm:px-[40px] md:px-[80px] md:pt-[64px] md:pb-[72px]">
        {/* CTA */}
        <div className="flex flex-col items-center text-center">
          <h2 className="max-w-[920px] text-[38px] leading-[1.12] tracking-[0.01em] text-[#f7efe8] md:text-[64px]">
            {isAr ? (
              <>
                <span className="block font-[family-name:var(--font-heading-accent)] font-normal">
                  ابتسامتك المثالية
                </span>
                <span className="block mt-[12px] font-[family-name:var(--font-body)] font-normal">
                  تبدأ بمحادثة بسيطة.
                </span>
              </>
            ) : (
              <span className="font-[family-name:var(--font-heading)]">
                Your{' '}
                <span className="font-[family-name:var(--font-heading-accent)] italic">
                  perfect smile
                </span>{' '}
                starts with a
                <br />
                simple conversation.
              </span>
            )}
          </h2>

          <p className="mt-[32px] max-w-[760px] text-[15px] leading-[1.6] text-[#f7efe8]/90 md:mt-[40px] md:text-[20px]">
            {isAr
              ? 'اتصل بفريقنا اليوم واكتشف رعاية الأسنان المصممة خصيصًا لراحتك.'
              : 'Contact our team today and discover dental care designed around your comfort.'}
          </p>

          <a
            href={contactUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-[40px] inline-flex h-[48px] items-center justify-center gap-[10px] rounded-[800px] bg-[#f7efe8] px-[24px] text-[15px] font-medium text-[#352514] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white md:mt-[56px] md:h-[56px] md:gap-[14px] md:px-[30px] md:text-[18px]"
          >
            <WhatsAppIcon className="size-[18px] md:size-[22px]" />
            {contactLabel}
          </a>
        </div>

        {/* Nav row */}
        <nav className="mt-[72px] grid grid-cols-2 gap-y-[22px] text-center md:mt-[92px] md:grid-cols-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] font-normal text-[#f7efe8]/85 transition-colors duration-200 hover:text-[#f7efe8] md:text-[17px]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className="mt-[32px] h-px w-full bg-[#f7efe8]/22 md:mt-[36px]" />

        {/* Bottom row */}
        <div className="mt-[28px] grid items-center gap-[24px] md:grid-cols-[1fr_auto_1fr] md:gap-[28px]">
          <div className="flex justify-center md:justify-start">
            <img
              src="/images/logo/logo-footer.svg"
              alt="Smile Island Dental Clinic"
              className="h-auto w-[120px] max-w-[38vw] md:w-[165px] lg:w-[185px]"
            />
          </div>

          <p className="text-center text-[13px] leading-[1.4] text-[#f7efe8]/75 md:text-[16px]">
            {copyright[loc]}
          </p>

          <div className="flex items-center justify-center gap-[18px] md:justify-end md:gap-[22px]">
            {siteSettings.social.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.platform}
                className="grid size-[24px] place-items-center text-[#f7efe8]/82 transition-all duration-200 hover:-translate-y-0.5 hover:text-[#f7efe8] md:size-[26px]"
              >
                <SocialIcon platform={s.platform} className="size-[20px] md:size-[22px]" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}