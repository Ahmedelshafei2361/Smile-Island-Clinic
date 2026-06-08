import type { Metadata } from 'next'
import { playfair, jakarta } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Smile Island Dental Clinic',
  description:
    'Professional dental care at fair pricing in Alexandria, Egypt.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={`${playfair.variable} ${jakarta.variable}`}>
      <body>{children}</body>
    </html>
  )
}
