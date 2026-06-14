import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// In Next.js 16, Middleware was renamed to Proxy. File: proxy.ts
export function proxy(request: NextRequest) {
  const acceptLanguage = request.headers.get('accept-language') ?? ''
  const isArabic = acceptLanguage.toLowerCase().startsWith('ar')
  const locale = isArabic ? 'ar' : 'en'

  return NextResponse.redirect(new URL(`/${locale}`, request.url))
}

export const config = {
  // Match root and any path not already under a locale or system route
  matcher: [
    '/((?!en|ar|studio|_next|api|fonts|images|robots\\.txt|sitemap\\.xml|favicon\\.ico).*)',
  ],
}
