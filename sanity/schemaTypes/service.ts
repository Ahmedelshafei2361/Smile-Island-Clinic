import { defineArrayMember, defineField, defineType } from 'sanity'

/**
 * Service — the single source of truth for every dental service.
 * The same name, description, and image are reused across Popular Treatments,
 * All Services, and the service detail page. No duplicated content fields.
 */
export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'nameEn',
      title: 'English service name',
      type: 'string',
      validation: (rule) =>
        rule.required().max(60).error('Required. Keep under 60 characters.'),
    }),

    defineField({
      name: 'nameAr',
      title: 'Arabic service name',
      type: 'string',
      validation: (rule) =>
        rule.required().max(60).error('Required. Keep under 60 characters.'),
    }),

    defineField({
      name: 'slug',
      title: 'Slug / URL',
      type: 'slug',
      description:
        'The web address for this service. Generated from the English name. Changing it after the page is live will break existing links — avoid editing unless necessary.',
      options: { source: 'nameEn', maxLength: 96 },
      validation: (rule) => rule.required().error('A slug is required.'),
    }),

    defineField({
      name: 'shortDescriptionEn',
      title: 'English short description',
      type: 'text',
      rows: 3,
      description:
        'Used in All Services, Popular Treatments, and the service page subtitle.',
      validation: (rule) =>
        rule.required().max(180).error('Required. Keep under 180 characters.'),
    }),

    defineField({
      name: 'shortDescriptionAr',
      title: 'Arabic short description',
      type: 'text',
      rows: 3,
      description:
        'Used in All Services, Popular Treatments, and the service page subtitle.',
      validation: (rule) =>
        rule.required().max(180).error('Required. Keep under 180 characters.'),
    }),

    defineField({
      name: 'image',
      title: 'Service image',
      type: 'image',
      options: { hotspot: true },
      description:
        'Upload one landscape image for this service. This image is used in Popular Treatments, All Services, and the service page. Recommended: 1600×1200 or similar. Avoid portrait, tiny, or blurry images.',
      // Warning, not error, so it never blocks publishing. Brand-new services
      // need an image to appear on the site; seeded services fall back to their
      // existing built-in image until one is uploaded here.
      validation: (rule) =>
        rule
          .required()
          .warning(
            'Add a service image. A new service needs one to appear on the website; seeded services use their existing image until you upload one.',
          ),
    }),

    defineField({
      name: 'active',
      title: 'Active / visible on website',
      type: 'boolean',
      description:
        'Turn off to hide this service from the website without deleting it.',
      initialValue: true,
    }),

    defineField({
      name: 'displayOrder',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers appear first in All Services.',
      validation: (rule) =>
        rule.required().min(1).error('Required. Use a number like 1, 2, 3…'),
    }),

    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      description:
        'Add the service process steps in order. The website will number them automatically. Use 2 to 4 steps.',
      validation: (rule) =>
        rule.required().min(2).max(4).error('Add between 2 and 4 steps.'),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'step',
          title: 'Step',
          fields: [
            defineField({
              name: 'stepEn',
              title: 'English step text',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'stepAr',
              title: 'Arabic step text',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: 'stepEn', subtitle: 'stepAr' },
          },
        }),
      ],
    }),

    defineField({
      name: 'sliderCases',
      title: 'Service page before/after slider',
      type: 'array',
      description:
        'Optional. Add up to 3 before/after slider cases for this service page. Leave empty if this service has no before/after cases yet.',
      validation: (rule) => rule.max(3).error('Maximum 3 before/after cases.'),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'sliderCase',
          title: 'Before / After case',
          fields: [
            defineField({
              name: 'beforeImage',
              title: 'Before image',
              type: 'image',
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'afterImage',
              title: 'After image',
              type: 'image',
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { media: 'afterImage' },
            prepare({ media }) {
              return { title: 'Before / After case', media }
            },
          },
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'displayOrderAsc',
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'nameEn', subtitle: 'nameAr', media: 'image', active: 'active' },
    prepare({ title, subtitle, media, active }) {
      return {
        title: title || 'Untitled service',
        subtitle: active === false ? `${subtitle} — hidden` : subtitle,
        media,
      }
    },
  },
})
