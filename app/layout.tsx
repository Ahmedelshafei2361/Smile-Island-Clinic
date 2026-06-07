import type { Metadata } from 'next'
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
    <html>
      <body>{children}</body>
    </html>
  )
}
