'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { toLocale } from '@/lib/locale'
import { getConsent, setConsent } from '@/lib/consent'

const SHOW_DELAY_MS = 2000
const FADE_DURATION_MS = 500

const copy = {
  en: {
    text: 'We use cookies to understand how visitors use our site and improve your experience. You can accept or reject non-essential cookies.',
    privacy: 'Privacy Policy',
    accept: 'Accept',
    reject: 'Reject',
    aria: 'Cookie consent',
  },
  ar: {
    text: 'نستخدم ملفات تعريف الارتباط لفهم طريقة استخدام الزوار للموقع وتحسين تجربتك. يمكنك قبول أو رفض ملفات تعريف الارتباط غير الضرورية.',
    privacy: 'سياسة الخصوصية',
    accept: 'قبول',
    reject: 'رفض',
    aria: 'موافقة ملفات تعريف الارتباط',
  },
}

interface CookieConsentProps {
  locale: string
}

/**
 * Global cookie-consent banner.
 *
 * Shows only until the visitor makes a choice.
 * It waits until the page finishes loading, then appears after a short delay.
 * It does NOT load any analytics — it only records the decision so future
 * scripts can gate on `hasAcceptedConsent()`.
 */
export default function CookieConsent({ locale }: CookieConsentProps) {
  const loc = toLocale(locale)
  const isAr = loc === 'ar'
  const t = copy[loc]

  const [visible, setVisible] = useState(false)
  const [shown, setShown] = useState(false)

  const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (getConsent() !== null) return

    const showBanner = () => {
      showTimerRef.current = setTimeout(() => {
        setVisible(true)

        requestAnimationFrame(() => {
          setShown(true)
        })
      }, SHOW_DELAY_MS)
    }

    if (document.readyState === 'complete') {
      showBanner()
    } else {
      window.addEventListener('load', showBanner, { once: true })
    }

    return () => {
      window.removeEventListener('load', showBanner)

      if (showTimerRef.current) {
        clearTimeout(showTimerRef.current)
      }

      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current)
      }
    }
  }, [])

  if (!visible) return null

  const choose = (value: 'accepted' | 'rejected') => {
    setConsent(value)
    setShown(false)

    hideTimerRef.current = setTimeout(() => {
      setVisible(false)
    }, FADE_DURATION_MS)
  }

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      role="dialog"
      aria-label={t.aria}
      className={`fixed inset-x-0 bottom-0 z-[60] px-[16px] pb-[16px] font-[family-name:var(--font-body)] transition-all duration-500 ease-out sm:px-[24px] sm:pb-[24px] md:left-auto md:right-[32px] md:bottom-[32px] md:w-[420px] md:px-0 md:pb-0 ${
        shown
          ? 'translate-y-0 opacity-100'
          : 'translate-y-[10px] opacity-0'
      }`}
    >
      <div className="mx-auto flex max-w-[1100px] flex-col gap-[16px] rounded-[20px] border-2 border-white bg-[#F4EAE1] p-[18px] shadow-[0_12px_40px_rgba(53,37,20,0.18)] sm:p-[22px] md:mx-0 md:max-w-none md:gap-[14px] md:p-[18px]">
        <p className="flex-1 text-[13px] leading-[1.6] text-[#5b4a3a] md:text-[13px]">
          {t.text}{' '}
          <Link
            href={`/${loc}/privacy-policy`}
            className="font-medium text-[#9c673f] underline underline-offset-2 transition-colors hover:text-[#352514]"
          >
            {t.privacy}
          </Link>
        </p>

        <div className="flex shrink-0 items-center gap-[10px] md:justify-end">
          <button
            type="button"
            onClick={() => choose('rejected')}
            className="h-[42px] whitespace-nowrap rounded-[800px] bg-white px-[20px] text-[14px] font-medium text-[#352514] transition-transform duration-200 hover:-translate-y-0.5 md:h-[38px] md:px-[18px] md:text-[13px]"
          >
            {t.reject}
          </button>

          <button
            type="button"
            onClick={() => choose('accepted')}
            className="h-[42px] whitespace-nowrap rounded-[800px] bg-[#352514] px-[22px] text-[14px] font-medium text-[#f7efe8] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#2a1d10] md:h-[38px] md:px-[20px] md:text-[13px]"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  )
}