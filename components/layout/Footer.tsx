import Link from 'next/link'
import { toLocale, type Locale } from '@/lib/locale'
import { siteSettings } from '@/lib/data'
import { getWhatsAppUrl } from '@/lib/whatsapp'

const footerLinks: Record<Locale, { label: string; href: string }[]> = {
  en: [
    { label: 'Home', href: '/en' },
    { label: 'Services', href: '/en#services' },
    { label: 'Testimonials', href: '/en#testimonials' },
    { label: 'FAQ', href: '/en#faq' },
    { label: 'Contact', href: '/en#contact' },
  ],
  ar: [
    { label: 'الرئيسية', href: '/ar' },
    { label: 'الخدمات', href: '/ar#services' },
    { label: 'آراء العملاء', href: '/ar#testimonials' },
    { label: 'الأسئلة الشائعة', href: '/ar#faq' },
    { label: 'تواصل معنا', href: '/ar#contact' },
  ],
}

const copyright: Record<Locale, string> = {
  en: '© 2026 Smile Island Dental Clinic. All rights reserved.',
  ar: '© 2026 عيادة سمايل ايلاند لطب الأسنان. جميع الحقوق محفوظة.',
}

function WhatsAppIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={`shrink-0 ${className}`}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

function SocialIcon({ platform, className = '' }: { platform: string; className?: string }) {
  const p = platform.toLowerCase()
  const common = { viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true, className }
  if (p === 'facebook')
    return (
      <svg {...common}>
        <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.01 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.08 24 18.09 24 12.07Z" />
      </svg>
    )
  if (p === 'instagram')
    return (
      <svg {...common}>
        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.95c-3.15 0-3.5.01-4.74.07-1.14.05-1.76.24-2.17.4-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.16.41-.35 1.03-.4 2.17-.06 1.24-.07 1.59-.07 4.74s.01 3.5.07 4.74c.05 1.14.24 1.76.4 2.17.21.55.47.94.88 1.35.41.41.8.67 1.35.88.41.16 1.03.35 2.17.4 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c1.14-.05 1.76-.24 2.17-.4.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.16-.41.35-1.03.4-2.17.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.05-1.14-.24-1.76-.4-2.17a3.6 3.6 0 0 0-.88-1.35 3.6 3.6 0 0 0-1.35-.88c-.41-.16-1.03-.35-2.17-.4-1.24-.06-1.59-.07-4.74-.07Zm0 3.32a6.57 6.57 0 1 1 0 13.14 6.57 6.57 0 0 1 0-13.14Zm0 10.84a4.27 4.27 0 1 0 0-8.54 4.27 4.27 0 0 0 0 8.54Zm8.36-11.08a1.54 1.54 0 1 1-3.07 0 1.54 1.54 0 0 1 3.07 0Z" />
      </svg>
    )
  if (p === 'tiktok')
    return (
      <svg {...common}>
        <path d="M16.6 5.82a4.28 4.28 0 0 1-1.05-2.82h-3.1v12.4a2.5 2.5 0 0 1-2.5 2.42 2.5 2.5 0 1 1 .7-4.9V9.74a5.62 5.62 0 0 0-.7-.05A5.6 5.6 0 1 0 15.55 15V8.9a7.34 7.34 0 0 0 4.27 1.37V7.16a4.28 4.28 0 0 1-3.22-1.34Z" />
      </svg>
    )
  if (p === 'google')
    return (
      <svg {...common}>
        <path d="M12 2.5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 9.5-9.5c0-.64-.06-1.25-.16-1.84H12v3.62h5.34A4.57 4.57 0 0 1 12 16.6a4.6 4.6 0 1 1 3-8.08l2.56-2.56A8.2 8.2 0 0 0 12 3.9 8.1 8.1 0 1 0 20.1 12 8.1 8.1 0 0 0 12 2.5Z" />
      </svg>
    )
  if (p === 'youtube')
    return (
      <svg {...common}>
        <path d="M23.5 6.5a3 3 0 0 0-2.12-2.12C19.5 3.87 12 3.87 12 3.87s-7.5 0-9.38.51A3 3 0 0 0 .5 6.5 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.5 3 3 0 0 0 2.12 2.12C4.5 20.13 12 20.13 12 20.13s7.5 0 9.38-.51a3 3 0 0 0 2.12-2.12A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.5ZM9.6 15.57V8.43L15.82 12 9.6 15.57Z" />
      </svg>
    )
  return null
}

interface FooterProps {
  locale: string
}

export default function Footer({ locale }: FooterProps) {
  const loc = toLocale(locale)
  const isAr = loc === 'ar'
  const links = footerLinks[loc]

  const contactLabel = isAr ? 'تواصل معنا' : 'Contact Us'
  const contactUrl = getWhatsAppUrl(
    isAr
      ? 'مرحباً، أريد التواصل مع عيادة سمايل ايلاند.'
      : 'Hello, I would like to get in touch with Smile Island Dental Clinic.'
  )

  const intro = isAr
    ? 'أطباء متخصصون، تقنيات حديثة، ورعاية لطيفة — كل ذلك في مكان واحد وبأسعار عادلة.'
    : 'Experienced specialists, modern technology, and gentle care — all in one place, at fair and honest pricing.'

  return (
    <footer className="bg-[#55402a] text-[#f7efe8] rounded-tl-[32px] rounded-tr-[32px] font-[family-name:var(--font-body)]">
      <div className="mx-auto max-w-[1312px] px-[24px] py-[56px] md:px-[40px] md:py-[80px]">
        {/* Centered CTA: logo · heading · subtitle · Contact button */}
        <div className="flex flex-col items-center gap-[24px] text-center">
          <img
            src="/images/logo/logo-footer.svg"
            alt="Smile Island Dental Clinic"
            className="h-[60px] w-auto md:h-[72px]"
          />
          <h2 className="max-w-[760px] font-[family-name:var(--font-heading)] leading-[1.2] text-[30px] md:text-[44px] lg:text-[52px] text-[#f7efe8]">
            {isAr ? (
              <>
                <span className="font-[family-name:var(--font-heading-accent)]">ابتسامتك،</span>{' '}
                <span>واحة عنايتنا.</span>
              </>
            ) : (
              <>
                <span className="font-[family-name:var(--font-heading-accent)] italic">Your smile,</span>{' '}
                <span>our island of care.</span>
              </>
            )}
          </h2>
          <p className="max-w-[600px] text-[15px] md:text-[16px] leading-[1.6] text-[#f7efe8]/85">
            {intro}
          </p>
          <a
            href={contactUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-[8px] inline-flex h-[48px] items-center justify-center gap-[10px] rounded-[800px] bg-[#f7efe8] px-[24px] text-[15px] md:text-[16px] font-medium text-[#352514] transition-all duration-200 hover:bg-white hover:-translate-y-0.5"
          >
            <WhatsAppIcon className="size-[18px]" />
            {contactLabel}
          </a>
        </div>

        {/* Divider */}
        <div className="my-[32px] md:my-[40px] h-px w-full bg-[#f7efe8]/20" />

        {/* Nav links */}
        <nav className="flex flex-wrap items-center justify-center gap-x-[28px] gap-y-[12px] md:gap-x-[40px]">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[14px] text-[#f7efe8]/90 transition-opacity hover:opacity-100 hover:text-[#f7efe8]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Credits: copyright + social icons */}
        <div className="mt-[32px] flex flex-col-reverse items-center justify-between gap-[20px] sm:flex-row">
          <p className="text-[13px] md:text-[14px] text-[#f7efe8]/70 text-center sm:text-start">
            {copyright[loc]}
          </p>
          <div className="flex items-center gap-[16px]">
            {siteSettings.social.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.platform}
                className="text-[#f7efe8]/80 transition-all duration-200 hover:text-[#f7efe8] hover:-translate-y-0.5"
              >
                <SocialIcon platform={s.platform} className="size-[22px]" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
