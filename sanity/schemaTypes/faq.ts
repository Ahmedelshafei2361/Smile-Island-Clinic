import { defineArrayMember, defineField, defineType } from 'sanity'

/**
 * FAQ — singleton document (ID: faq).
 * A single ordered list of bilingual questions/answers. Max is the current
 * static FAQ count (6); min 3. No category, icon, image, slug, or active flag.
 */
export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      title: 'FAQ items',
      type: 'array',
      description:
        'Add the questions shown in the FAQ section. Keep answers short and clear. The website will use English fields on the English page and Arabic fields on the Arabic page.',
      validation: (rule) =>
        rule
          .required()
          .min(3)
          .max(6)
          .error('Add between 3 and 6 FAQ items.'),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faqItem',
          title: 'FAQ item',
          fields: [
            defineField({
              name: 'questionEn',
              title: 'English question',
              type: 'string',
              validation: (rule) =>
                rule.required().max(120).error('Required. Keep under 120 characters.'),
            }),
            defineField({
              name: 'questionAr',
              title: 'Arabic question',
              type: 'string',
              validation: (rule) =>
                rule.required().max(120).error('Required. Keep under 120 characters.'),
            }),
            defineField({
              name: 'answerEn',
              title: 'English answer',
              type: 'text',
              rows: 3,
              validation: (rule) =>
                rule.required().max(350).error('Required. Keep under 350 characters.'),
            }),
            defineField({
              name: 'answerAr',
              title: 'Arabic answer',
              type: 'text',
              rows: 3,
              validation: (rule) =>
                rule.required().max(350).error('Required. Keep under 350 characters.'),
            }),
          ],
          preview: {
            select: { title: 'questionEn', subtitle: 'questionAr' },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'FAQ' }
    },
  },
})
