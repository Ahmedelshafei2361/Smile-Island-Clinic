import { defineField, defineType } from 'sanity'

/**
 * Before & After Images — singleton document (ID: beforeAfterImages).
 * Contains an ordered list of combined before/after images used on both
 * the English and Arabic homepages.
 */
export const beforeAfterSection = defineType({
  name: 'beforeAfterSection',
  title: 'Before & After Images',
  type: 'document',
  fields: [
    defineField({
      name: 'images',
      title: 'Before & After images',
      type: 'array',
      description: 'Recommended: 3 to 12 images.',
      validation: (rule) =>
        rule
          .required()
          .min(1)
          .max(12)
          .error('Add at least 1 image (maximum 12).'),
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          description:
            'Upload one combined before/after image. The image should already show before and after side by side. Recommended size: around 1600×1000px or similar landscape ratio. Avoid tiny, blurry, or portrait images.',
        },
      ],
    }),
  ],
  preview: {
    select: { images: 'images' },
    prepare({ images }) {
      const count = Array.isArray(images) ? images.length : 0
      return {
        title: 'Before & After Images',
        subtitle: `${count} image${count !== 1 ? 's' : ''}`,
      }
    },
  },
})
