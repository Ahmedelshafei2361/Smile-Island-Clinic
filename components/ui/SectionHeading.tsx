import { toLocale } from '@/lib/locale'

interface SectionHeadingProps {
  title: string
  accent?: string
  accentFirst?: boolean
  locale?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
  align?: 'left' | 'center' | 'right'
  /** 'dark' = dark text on light bg (default); 'light' = cream text on dark bg. */
  tone?: 'dark' | 'light'
  /** When true, the accent word uses the title color instead of the gold accent. */
  accentInherit?: boolean
}

export default function SectionHeading({
  title,
  accent,
  accentFirst = false,
  locale = 'en',
  className = '',
  size = 'md',
  align = 'center',
  tone = 'dark',
  accentInherit = false,
}: SectionHeadingProps) {
  const isAr = toLocale(locale) === 'ar'

  const sizes: Record<string, string> = {
    sm: 'text-[26px] md:text-[40px]',
    md: 'text-[32px] md:text-[52px]',
    lg: 'text-[40px] md:text-[64px]',
  }

  const aligns: Record<string, string> = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  const toneClass = tone === 'light' ? 'text-[#f6efe8]' : 'text-[#352514]'

  // English accent = italic Playfair; Arabic accent = upright Thmanyah Serif.
  // Colour is gold by default, or inherits the title colour when accentInherit.
  const accentClass = `font-[family-name:var(--font-heading-accent)] ${
    isAr ? '' : 'italic'
  } ${accentInherit ? toneClass : 'text-[#9c673f]'}`

  return (
    <h2
      className={`font-[family-name:var(--font-heading)] font-medium leading-[1.2] ${sizes[size]} ${toneClass} ${aligns[align]} ${className}`}
    >
      {accentFirst && accent && (
        <>
          <span className={accentClass}>{accent}</span>{' '}
        </>
      )}
      {title}
      {!accentFirst && accent && (
        <>
          {' '}
          <span className={accentClass}>{accent}</span>
        </>
      )}
    </h2>
  )
}
