'use client'

import { useState } from 'react'
import Link from 'next/link'

interface MobileMenuProps {
  links: { label: string; href: string }[]
  ctaLabel: string
  ctaHref: string
  altHref: string
  altLabel: string
  altLocale: 'en' | 'ar'
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

export default function MobileMenu({
  links,
  ctaLabel,
  ctaHref,
  altHref,
  altLabel,
  altLocale,
}: MobileMenuProps) {
  const [open, setOpen] = useState(false)

  const languageSwitcherFontFamily =
    altLocale === 'ar'
      ? 'var(--font-thmanyah-sans, "Thmanyah Sans", sans-serif)'
      : 'var(--font-dm-sans, "DM Sans", sans-serif)'

  return (
    <div className="lg:hidden">
      {/* Toggle */}
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-center size-[24px] text-[#352514] cursor-pointer"
      >
        {open ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="size-[22px]"
            aria-hidden
          >
            <line x1="5" y1="5" x2="19" y2="19" />
            <line x1="19" y1="5" x2="5" y2="19" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="size-[22px]"
            aria-hidden
          >
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="3" y1="15" x2="21" y2="15" />
          </svg>
        )}
      </button>

      {/* Backdrop */}
      {open && (
        <button
          type="button"
          tabIndex={-1}
          aria-hidden
          onClick={() => setOpen(false)}
          className="fixed inset-0 top-[80px] z-40 bg-black/10 cursor-default"
        />
      )}

      {/* Panel */}
      <div
        className={`absolute left-0 right-0 top-full z-50 origin-top transition-all duration-200 ${
          open
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <nav className="mx-[16px] mt-[8px] rounded-[16px] border border-[#e9cdb4] bg-white p-[12px] shadow-lg shadow-[#352514]/10 flex flex-col">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="px-[12px] py-[12px] rounded-[10px] text-[16px] text-[#352514] font-medium hover:bg-[#f7f2ed] transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-[8px] bg-[#352514] flex gap-[8px] items-center justify-center px-[20px] py-[12px] rounded-[800px] text-white text-[16px] font-medium transition-colors hover:bg-[#2a1d10]"
          >
            <WhatsAppIcon />
            {ctaLabel}
          </a>

          {/* Language switcher — secondary filled button */}
          <Link
            href={altHref}
            lang={altLocale}
            dir={altLocale === 'ar' ? 'rtl' : 'ltr'}
            onClick={() => setOpen(false)}
            style={{ fontFamily: languageSwitcherFontFamily }}
            className="mt-[8px] flex w-full items-center justify-center rounded-[800px] border border-transparent bg-[#f1e4d9] px-[20px] py-[12px] text-[16px] font-medium leading-[1.5] text-[#352514] whitespace-nowrap transition-colors hover:bg-[#ead7c8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#352514]/30"
          >
            {altLabel}
          </Link>
        </nav>
      </div>
    </div>
  )
} 