import { defineField, defineType } from 'sanity'

/**
 * Before & After section — one document per locale ('en' / 'ar').
 * All fields optional so a partial or missing document never blanks the site;
 * the Next app fills gaps from local static content.
 */
export const beforeAfterSection = defineType({
  name: 'beforeAfterSection',
  title: 'Before & After',
  type: 'document',
  fields: [
    defineField({
      name: 'locale',
      title: 'Locale',
      type: 'string',
      options: {
        list: [
          { title: 'English', value: 'en' },
          { title: 'Arabic', value: 'ar' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'sectionTitle',
      title: 'Section Title (plain part)',
      type: 'string',
      description: 'e.g. "Before" or "قبل"',
    }),

    defineField({
      name: 'sectionAccent',
      title: 'Section Title (accent part)',
      type: 'string',
      description: 'e.g. "& After" or "وبعد"',
    }),

    defineField({
      name: 'sectionSubtitle',
      title: 'Section Subtitle',
      type: 'text',
      rows: 2,
    }),

    defineField({
      name: 'cases',
      title: 'Cases',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'beforeAfterCase',
          title: 'Case',
          fields: [
            defineField({
              name: 'title',
              title: 'Case Title',
              type: 'string',
              description: 'e.g. "Laser Whitening" or "التبييض بالليزر"',
            }),
            defineField({
              name: 'category',
              title: 'Category / Treatment (optional)',
              type: 'string',
              description: 'Optional treatment type for filtering later.',
            }),
            defineField({
              name: 'image',
              title: 'Combined Before & After Image',
              type: 'image',
              options: { hotspot: true },
              description:
                'Single image showing both before and after side by side (used on the homepage gallery).',
            }),
            defineField({
              name: 'beforeImage',
              title: 'Before Image (separate)',
              type: 'image',
              options: { hotspot: true },
              description: 'Separate "before" photo (used for interactive comparison sliders).',
            }),
            defineField({
              name: 'afterImage',
              title: 'After Image (separate)',
              type: 'image',
              options: { hotspot: true },
              description: 'Separate "after" photo (used for interactive comparison sliders).',
            }),
            defineField({
              name: 'altText',
              title: 'Alt Text (optional)',
              type: 'string',
              description: 'Custom alt text for accessibility. Falls back to a generic description.',
            }),
            defineField({
              name: 'serviceSlug',
              title: 'Service Slug (optional)',
              type: 'string',
              description: 'Link to a service page, e.g. "laser-whitening".',
            }),
            defineField({
              name: 'order',
              title: 'Display Order',
              type: 'number',
              initialValue: 0,
            }),
            defineField({
              name: 'isActive',
              title: 'Active',
              type: 'boolean',
              initialValue: true,
              description: 'Set to false to hide this case without deleting it.',
            }),
          ],
          preview: {
            select: { title: 'title', media: 'image', active: 'isActive' },
            prepare({ title, media, active }) {
              return {
                title: title || 'Untitled case',
                subtitle: active === false ? '🚫 Inactive' : '✅ Active',
                media,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { locale: 'locale', cases: 'cases' },
    prepare({ locale, cases }) {
      const count = Array.isArray(cases) ? cases.length : 0
      return {
        title: `Before & After — ${locale === 'ar' ? 'Arabic' : 'English'}`,
        subtitle: `${count} case${count !== 1 ? 's' : ''}`,
      }
    },
  },
})
