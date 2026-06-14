import { defineField, defineType } from 'sanity'

/**
 * Office Hours — singleton document (ID: officeHours).
 * Mirrors the 3 fixed rows shown in the Contact section. Day labels live in
 * code; only the hours text is editable, in English and Arabic. Any field left
 * empty falls back to the local static value for that row only.
 */
const HELP =
  'Edit the clinic opening hours shown in the Contact section. Day names are fixed by the website. Use one line for each time period.'

export const officeHours = defineType({
  name: 'officeHours',
  title: 'Office Hours',
  type: 'document',
  fields: [
    defineField({
      name: 'fridayHoursEn',
      title: 'Friday — English hours',
      type: 'string',
      description: HELP,
      initialValue: 'Closed',
      validation: (rule) => rule.max(80).error('Keep under 80 characters.'),
    }),
    defineField({
      name: 'fridayHoursAr',
      title: 'Friday — Arabic hours',
      type: 'string',
      initialValue: 'إجازة',
      validation: (rule) => rule.max(80).error('Keep under 80 characters.'),
    }),

    defineField({
      name: 'satWedThuHoursEn',
      title: 'Saturday / Wednesday / Thursday — English hours',
      type: 'string',
      initialValue: '5 PM – 10 PM',
      validation: (rule) => rule.max(80).error('Keep under 80 characters.'),
    }),
    defineField({
      name: 'satWedThuHoursAr',
      title: 'Saturday / Wednesday / Thursday — Arabic hours',
      type: 'string',
      initialValue: '٥ م - ١٠ م',
      validation: (rule) => rule.max(80).error('Keep under 80 characters.'),
    }),

    defineField({
      name: 'sunMonTueHoursEn',
      title: 'Sunday / Monday / Tuesday — English hours',
      type: 'string',
      initialValue: '1 PM – 4 PM · 5 PM – 10 PM',
      validation: (rule) => rule.max(80).error('Keep under 80 characters.'),
    }),
    defineField({
      name: 'sunMonTueHoursAr',
      title: 'Sunday / Monday / Tuesday — Arabic hours',
      type: 'string',
      initialValue: '١ ظ - ٤ ع · ٥ م - ١٠ م',
      validation: (rule) => rule.max(80).error('Keep under 80 characters.'),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Office Hours' }
    },
  },
})
