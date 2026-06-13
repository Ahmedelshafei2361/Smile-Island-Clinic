export type Locale = 'en' | 'ar'

export const LOCALES: Locale[] = ['en', 'ar']
export const DEFAULT_LOCALE: Locale = 'en'

export function getDir(locale: Locale): 'ltr' | 'rtl' {
  return locale === 'ar' ? 'rtl' : 'ltr'
}

export function isRTL(locale: Locale): boolean {
  return locale === 'ar'
}

export function toLocale(value: string): Locale {
  return value === 'ar' ? 'ar' : 'en'
}

/**
 * Build the equivalent path in the other locale, preserving the rest of the
 * route. `/en/services/x` ↔ `/ar/services/x`, `/en` ↔ `/ar`.
 * `pathname` should be the locale-prefixed path without hash (from usePathname).
 */
export function getAlternateLocalePath(pathname: string, target: Locale): string {
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length > 0 && (segments[0] === 'en' || segments[0] === 'ar')) {
    segments[0] = target
  } else {
    segments.unshift(target)
  }

  return '/' + segments.join('/')
}
