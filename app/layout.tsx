import type { Metadata } from 'next'
import { playfair, jakarta, thmanyahSans, thmanyahSerif } from '@/lib/fonts'
import { SITE_URL, SITE_NAME } from '@/lib/seo'
import './globals.css'

export const metadata: Metadata = {
  // Resolves all relative canonical / alternate / Open Graph URLs.
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description:
    'Professional dental care at fair pricing in Alexandria, Egypt.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      className={`${playfair.variable} ${jakarta.variable} ${thmanyahSans.variable} ${thmanyahSerif.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
