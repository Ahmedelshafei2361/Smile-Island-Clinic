import { defineField, defineType } from 'sanity'

/**
 * Homepage Hero content — first (and currently only) schema.
 * One document per locale ('en' / 'ar'). All fields optional so a partial
 * document never blanks the site; the Next app fills gaps from local content.
 */
export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page (Hero)',
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

    defineField({ name: 'heroEyebrow', title: 'Hero Eyebrow (optional)', type: 'string' }),

    defineField({ name: 'heroTitleLine1', title: 'Hero Title — Line 1', type: 'string' }),
    defineField({ name: 'heroTitleAccent1', title: 'Hero Title — Accent 1 (gold italic)', type: 'string' }),
    defineField({ name: 'heroTitleLine2', title: 'Hero Title — Line 2', type: 'string' }),
    defineField({ name: 'heroTitleAccent2', title: 'Hero Title — Accent 2 (gold italic)', type: 'string' }),

    defineField({ name: 'heroSubtitle', title: 'Hero Subtitle', type: 'text', rows: 3 }),

    defineField({ name: 'primaryCtaLabel', title: 'Primary CTA Label', type: 'string' }),
    defineField({ name: 'secondaryCtaLabel', title: 'Secondary CTA Label', type: 'string' }),
    defineField({
      name: 'primaryCtaMessage',
      title: 'Primary CTA WhatsApp Message (optional)',
      type: 'text',
      rows: 2,
    }),

    defineField({
      name: 'heroImage',
      title: 'Hero Image (optional — overrides local team photo)',
      type: 'image',
      options: { hotspot: true },
    }),

    defineField({
      name: 'stats',
      title: 'Stats Card',
      type: 'object',
      fields: [
        { name: 'healthySmileLabel', title: 'Healthy Smile Label', type: 'string' },
        { name: 'healthySmileSubtext', title: 'Healthy Smile Subtext', type: 'string' },
        { name: 'satisfactionValue', title: 'Satisfaction Value', type: 'string' },
        { name: 'satisfactionLabel', title: 'Satisfaction Label', type: 'string' },
        { name: 'ratingValue', title: 'Rating Value', type: 'string' },
        { name: 'ratingLabel', title: 'Rating Label', type: 'string' },
        { name: 'reviewsValue', title: 'Reviews Value', type: 'string' },
        { name: 'reviewsLabel', title: 'Reviews Label', type: 'string' },
      ],
    }),
  ],
  preview: {
    select: { locale: 'locale', title: 'heroTitleAccent1' },
    prepare({ locale, title }) {
      return {
        title: `Home Page — ${locale === 'ar' ? 'Arabic' : 'English'}`,
        subtitle: title || 'Hero',
      }
    },
  },
})
