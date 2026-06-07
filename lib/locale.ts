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
