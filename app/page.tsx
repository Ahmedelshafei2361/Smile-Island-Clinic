import { redirect } from 'next/navigation'

// Fallback redirect — proxy.ts handles browser-language detection.
// This handles edge cases where proxy is bypassed.
export default function Root() {
  redirect('/en')
}
