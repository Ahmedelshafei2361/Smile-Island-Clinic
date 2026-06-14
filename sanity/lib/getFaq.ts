import { client } from './client'
import { isSanityConfigured } from '../env'
import type { FAQ } from '@/lib/data'

const FAQ_QUERY = `*[_type == "faq" && _id == "faq"][0]{
  items[]{ questionEn, questionAr, answerEn, answerAr }
}`

interface RawFaqItem {
  questionEn?: string
  questionAr?: string
  answerEn?: string
  answerAr?: string
}

/**
 * Fetch FAQ items. Returns null when Sanity is not configured, the fetch fails,
 * the document is missing, or fewer than 3 valid items exist — callers fall
 * back to local static FAQs. Incomplete individual items are dropped.
 */
export async function getFaq(): Promise<FAQ[] | null> {
  if (!isSanityConfigured) return null

  try {
    const doc = await client.fetch<{ items?: RawFaqItem[] } | null>(
      FAQ_QUERY,
      {},
      { next: { revalidate: 30 } },
    )

    if (!doc || !Array.isArray(doc.items)) return null

    const valid: FAQ[] = []
    doc.items.forEach((item, i) => {
      if (
        item?.questionEn &&
        item?.questionAr &&
        item?.answerEn &&
        item?.answerAr
      ) {
        valid.push({
          id: `faq-${i + 1}`,
          questionEn: item.questionEn,
          questionAr: item.questionAr,
          answerEn: item.answerEn,
          answerAr: item.answerAr,
        })
      }
    })

    // Fewer than 3 valid items → use local fallback.
    return valid.length >= 3 ? valid : null
  } catch {
    return null
  }
}
