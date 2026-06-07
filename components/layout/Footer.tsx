import Link from 'next/link'
import { toLocale, type Locale } from '@/lib/locale'
import { siteSettings } from '@/lib/data'

const footerLinks: Record<Locale, { label: string; href: string }[]> = {
  en: [
    { label: 'Home', href: '/en' },
    { label: 'Services', href: '/en#services' },
    { label: 'Testimonials', href: '/en#testimonials' },
    { label: 'Contact', href: '/en#contact' },
  ],
  ar: [
    { label: 'الرئيسية', href: '/ar' },
    { label: 'الخدمات', href: '/ar#services' },
    { label: 'آراء العملاء', href: '/ar#testimonials' },
    { label: 'تواصل معنا', href: '/ar#contact' },
  ],
}

const brandName: Record<Locale, string> = {
  en: 'Smile Island',
  ar: 'سمايل ايلاند',
}

const copyright: Record<Locale, string> = {
  en: '© 2026 Smile Island. All rights reserved.',
  ar: '© 2026 سمايل ايلاند. جميع الحقوق محفوظة.',
}

interface FooterProps {
  locale: string
}

export default function Footer({ locale }: FooterProps) {
  const loc = toLocale(locale)
  const links = footerLinks[loc]

  return (
    <footer className="bg-[#352514] text-[#f7efe8] py-[48px]">
      <div className="max-w-[1200px] mx-auto px-[24px]">
        <div className="flex flex-col items-center gap-[32px]">
          {/* Brand */}
          <Link
            href={`/${loc}`}
            className="font-[family-name:var(--font-heading)] italic text-[#9c673f] text-[24px] font-semibold"
          >
            {brandName[loc]}
          </Link>

          {/* Nav */}
          <nav className="flex items-center gap-[24px] flex-wrap justify-center">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[14px] text-[#f7efe8] opacity-80 hover:opacity-100 transition-opacity"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social links */}
          <div className="flex items-center gap-[20px] flex-wrap justify-center">
            {siteSettings.social.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-[#f7efe8] opacity-60 hover:opacity-100 transition-opacity"
              >
                {s.platform}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-[13px] text-[#f7efe8] opacity-40">
            {copyright[loc]}
          </p>
        </div>
      </div>
    </footer>
  )
}
