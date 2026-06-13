'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getBookingUrl } from '@/lib/whatsapp'
import { toLocale, type Locale } from '@/lib/locale'
import MobileMenu from './MobileMenu'

const navLinks: Record<Locale, { label: string; href: string }[]> = {
  en: [
    { label: 'Home', href: '/en' },
    { label: 'Services', href: '/en#services' },
    { label: 'Testimonials', href: '/en#testimonials' },
    { label: 'Contact details', href: '/en#contact' },
  ],
  ar: [
    { label: 'الرئيسية', href: '/ar' },
    { label: 'خدمات', href: '/ar#services' },
    { label: 'اراء العملاء', href: '/ar#testimonials' },
    { label: 'تواصل معنا', href: '/ar#contact' },
  ],
}

const ctaLabel: Record<Locale, string> = {
  en: 'Contact Us',
  ar: 'تواصل معنا',
}

const SECTION_IDS = ['services', 'testimonials', 'contact']

function hashOf(href: string): string {
  return href.includes('#') ? href.split('#')[1] : ''
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="shrink-0 size-[18px]"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

interface HeaderProps {
  locale: string
}

export default function Header({ locale }: HeaderProps) {
  const loc = toLocale(locale)
  const links = navLinks[loc]
  const whatsappUrl = getBookingUrl({ locale: loc })

  const pathname = usePathname()
  const isHome = pathname === `/${loc}` || pathname === `/${loc}/`

  const [scrolled, setScrolled] = useState(false)
  // '' = top/home, or a section id. Only meaningful on the homepage.
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      setScrolled(window.scrollY > 64)
      if (!isHome) return
      const offset = 120
      let current = ''
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= offset) current = id
      }
      setActiveId(current)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [isHome])

  const isActive = (href: string) => isHome && hashOf(href) === activeId

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-[600ms] ease-out ${
          scrolled
            ? 'bg-[rgba(254,252,251,0.9)] backdrop-blur-md border-b border-[#e9cdb4]/40 shadow-[0_4px_24px_rgba(53,37,20,0.06)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="flex items-center justify-between p-[20px] lg:px-[64px] lg:py-[20px]">
          {/* Logo */}
          <Link
            href={`/${loc}`}
            className="shrink-0 h-[40px] w-[111px] lg:h-[51px] lg:w-[142px] relative overflow-hidden block"
          >
            <img
              alt="Smile Island Dental Clinic"
              className="absolute h-[230.56%] max-w-none"
              style={{ left: '-11.27%', top: '-58.2%', width: '119.01%' }}
              src="/images/logo/logo.png"
            />
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-[24px]">
            {links.map((link) => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={`text-[16px] leading-[1.5] whitespace-nowrap transition-colors ${
                    active
                      ? 'text-[#9c673f] font-medium'
                      : 'text-[#352514] font-normal hover:text-[#9c673f]'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Desktop Contact Us CTA */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex bg-[#352514] gap-[8px] items-center justify-center px-[20px] py-[10px] rounded-[800px] text-white text-[16px] font-medium leading-[1.5] whitespace-nowrap transition-all duration-200 hover:bg-[#2a1d10] hover:-translate-y-0.5"
          >
            <WhatsAppIcon />
            {ctaLabel[loc]}
          </a>

          {/* Mobile menu */}
          <MobileMenu links={links} ctaLabel={ctaLabel[loc]} ctaHref={whatsappUrl} />
        </div>
      </header>

      {/* Mobile-only spacer — the fixed header used to sit in flow on mobile. */}
      <div aria-hidden className="h-[80px] lg:hidden" />
    </>
  )
}
