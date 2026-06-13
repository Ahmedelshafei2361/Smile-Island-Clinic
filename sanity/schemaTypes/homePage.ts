import { defineField, defineType } from 'sanity'

/**
 * Home Page Hero — singleton document (ID: homePageHero).
 * One bilingual form. 8 fields total.
 */
export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitleAccentEn',
      title: 'English title — colored first part',
      type: 'string',
      description:
        'Example: Exceptional Smile. This is the colored/italic first part of the English title.',
      initialValue: 'Exceptional Smile',
      validation: (rule) =>
        rule
          .required()
          .max(35)
          .error('Keep under 35 characters so it fits the design.'),
    }),

    defineField({
      name: 'heroTitleNormalEn',
      title: 'English title — normal second part',
      type: 'string',
      description:
        'Example: Fairly Priced. This is the normal second part of the English title.',
      initialValue: 'Fairly Priced',
      validation: (rule) =>
        rule
          .required()
          .max(35)
          .error('Keep under 35 characters so it fits the design.'),
    }),

    defineField({
      name: 'heroTitleNormalAr',
      title: 'Arabic title — normal first part',
      type: 'string',
      description: 'مثال: ابتسامة استثنائية. هذا هو أول جزء من العنوان العربي.',
      initialValue: 'ابتسامة استثنائية',
      validation: (rule) =>
        rule
          .required()
          .max(35)
          .error('Keep under 35 characters so it fits the design.'),
    }),

    defineField({
      name: 'heroTitleAccentAr',
      title: 'Arabic title — colored second part',
      type: 'string',
      description: 'مثال: بأسعار معقولة. هذا هو الجزء المميز/الملون من العنوان العربي.',
      initialValue: 'بأسعار معقولة',
      validation: (rule) =>
        rule
          .required()
          .max(35)
          .error('Keep under 35 characters so it fits the design.'),
    }),

    defineField({
      name: 'heroSubtitleEn',
      title: 'English subtitle',
      type: 'text',
      rows: 3,
      description: 'A short description below the English hero title.',
      initialValue:
        'Restore your smile with experienced dentists providing quality care at fair pricing.',
      validation: (rule) =>
        rule
          .required()
          .max(180)
          .error('Keep under 180 characters so it does not overflow.'),
    }),

    defineField({
      name: 'heroSubtitleAr',
      title: 'Arabic subtitle',
      type: 'text',
      rows: 3,
      description: 'A short description below the Arabic hero title.',
      initialValue:
        'استعد ابتسامتك مع أطباء أسنان ذوي خبرة يقدمون رعاية عالية الجودة بأسعار عادلة.',
      validation: (rule) =>
        rule
          .required()
          .max(180)
          .error('Keep under 180 characters so it does not overflow.'),
    }),

    defineField({
      name: 'reviewCounterEn',
      title: 'English review counter',
      type: 'string',
      description: 'Examples: 200+, 450+, 4.9',
      initialValue: '120+',
      validation: (rule) =>
        rule
          .required()
          .max(12)
          .error('Keep the review counter short, for example 200+ or 4.9.'),
    }),

    defineField({
      name: 'reviewCounterAr',
      title: 'Arabic review counter',
      type: 'string',
      description: 'Examples: 200+, 450+, 4.9',
      initialValue: '120+',
      validation: (rule) =>
        rule
          .required()
          .max(12)
          .error('Keep the review counter short, for example 200+ or 4.9.'),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Home Page Hero' }
    },
  },
})
