import Link from 'next/link'
import Button from '@/components/ui/Button'
import { getBookingUrl } from '@/lib/whatsapp'
import { toLocale, type Locale } from '@/lib/locale'

const navLinks: Record<Locale, { label: string; href: string }[]> = {
  en: [
    { label: 'Home', href: '/en' },
    { label: 'Services', href: '/en#services' },
    { label: 'Testimonials', href: '/en#testimonials' },
    { label: 'Contact details', href: '/en#contact' },
  ],
  ar: [
    { label: 'الرئيسية', href: '/ar' },
    { label: 'الخدمات', href: '/ar#services' },
    { label: 'آراء العملاء', href: '/ar#testimonials' },
    { label: 'تواصل معنا', href: '/ar#contact' },
  ],
}

const ctaLabel: Record<Locale, string> = {
  en: 'Contact Us',
  ar: 'تواصل معنا',
}

interface HeaderProps {
  locale: string
}

export default function Header({ locale }: HeaderProps) {
  const loc = toLocale(locale)
  const links = navLinks[loc]
  const whatsappUrl = getBookingUrl({ locale: loc })

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-[64px] py-[20px]">
        {/* Logo — placeholder until logo SVG is provided */}
        <Link href={`/${loc}`} className="shrink-0 flex items-center gap-[8px]">
          <span
            className="font-[family-name:var(--font-heading)] italic text-[#9c673f] text-[20px] font-semibold leading-none"
            aria-label="Smile Island Dental Clinic"
          >
            Smile Island
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-[24px]">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[16px] text-[#352514] hover:text-[#9c673f] transition-colors font-normal"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA button */}
        <Button href={whatsappUrl} variant="primary">
          {ctaLabel[loc]}
        </Button>
      </div>
    </header>
  )
}
