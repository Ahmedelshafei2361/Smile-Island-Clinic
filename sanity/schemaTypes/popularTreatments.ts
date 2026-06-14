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
      validation: (rule) =>
        rule
          .required()
          .min(3)
          .max(6)
          .unique()
          .error('Choose between 3 and 6 services (no duplicates).'),
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
