import { client } from './client'
import { isSanityConfigured } from '../env'

/**
 * Editable hours for the 3 fixed Contact-section rows. Every field is optional;
 * the Contact section falls back to the local static value per field.
 */
export interface OfficeHoursContent {
  fridayHoursEn?: string
  fridayHoursAr?: string
  satWedThuHoursEn?: string
  satWedThuHoursAr?: string
  sunMonTueHoursEn?: string
  sunMonTueHoursAr?: string
}

const OFFICE_HOURS_QUERY = `*[_type == "officeHours" && _id == "officeHours"][0]{
  fridayHoursEn, fridayHoursAr,
  satWedThuHoursEn, satWedThuHoursAr,
  sunMonTueHoursEn, sunMonTueHoursAr
}`

/**
 * Fetch office hours. Returns null when Sanity is not configured, the fetch
 * fails, or no document exists — the Contact section then uses local hours.
 * Individual empty fields are simply omitted so the caller falls back per field.
 */
export async function getOfficeHours(): Promise<OfficeHoursContent | null> {
  if (!isSanityConfigured) return null

  try {
    const doc = await client.fetch<OfficeHoursContent | null>(
      OFFICE_HOURS_QUERY,
      {},
      { next: { revalidate: 30 } },
    )
    if (!doc) return null

    const content: OfficeHoursContent = {}
    for (const [key, value] of Object.entries(doc)) {
      if (typeof value === 'string' && value.trim()) {
        content[key as keyof OfficeHoursContent] = value
      }
    }

    return Object.keys(content).length > 0 ? content : null
  } catch {
    return null
  }
}
