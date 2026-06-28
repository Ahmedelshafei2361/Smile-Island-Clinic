import { defineArrayMember, defineField, defineType } from 'sanity'

/**
 * Popular Treatments — singleton document (ID: popularTreatments).
 * A simple ordered list of references to Service documents. No duplicated
 * content; the chosen services supply their own name, description, and image.
 */
export const popularTreatments = defineType({
  name: 'popularTreatments',
  title: 'Popular Treatments',
  type: 'document',
  fields: [
    defineField({
      name: 'showSection',
      title: 'Show Popular Treatments section',
      description:
        'Turn this off to hide the Popular Treatments section on the homepage.',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'selectedServices',
      title: 'Choose Popular Treatments',
      type: 'array',
      description:
        'Choose 3 to 6 services to show in the Popular Treatments section. Recommended: 3 to 5. The order here controls the display order.',
      // Conditional: when the section is hidden (showSection === false) there are
      // no requirements at all — the list may be empty or missing and the
      // document still publishes. Only when the section is shown do we enforce
      // 3–6 unique services.
      validation: (rule) =>
        rule.custom((value, context) => {
          const show = (context.document as { showSection?: boolean } | undefined)
            ?.showSection
          if (show === false) return true

          const items = (value as { _ref?: string }[] | undefined) ?? []
          if (items.length < 3 || items.length > 6) {
            return 'Choose between 3 and 6 services (no duplicates).'
          }
          const refs = items.map((i) => i?._ref).filter(Boolean)
          if (new Set(refs).size !== refs.length) {
            return 'Choose between 3 and 6 services (no duplicates).'
          }
          return true
        }),
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'service' }],
          options: { filter: 'active == true' },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Popular Treatments' }
    },
  },
})
