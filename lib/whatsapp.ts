// Egyptian international format: 20 + local number without leading 0
const WHATSAPP_NUMBER = '201556955994'
const PHONE_NUMBER = '201553055302'

export { PHONE_NUMBER }

export function getWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`
}

export function getBookingUrl(options?: {
  serviceEn?: string
  serviceAr?: string
  locale?: string
}): string {
  const locale = options?.locale ?? 'en'

  if (options?.serviceEn && locale === 'en') {
    return getWhatsAppUrl(
      `Hello, I want to book an appointment for ${options.serviceEn} at Smile Island Dental Clinic.`
    )
  }

  if (options?.serviceAr && locale === 'ar') {
    return getWhatsAppUrl(
      `مرحباً، أريد حجز موعد لخدمة ${options.serviceAr} في عيادة سمايل ايلاند.`
    )
  }

  if (locale === 'ar') {
    return getWhatsAppUrl('مرحباً، أريد حجز موعد في عيادة سمايل ايلاند.')
  }

  return getWhatsAppUrl(
    'Hello, I want to book an appointment at Smile Island Dental Clinic.'
  )
}
