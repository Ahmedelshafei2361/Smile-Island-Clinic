import { toLocale } from '@/lib/locale'

interface SectionHeadingProps {
  title: string
  accent?: string
  accentFirst?: boolean
  locale?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
  align?: 'left' | 'center' | 'right'
}

export default function SectionHeading({
  title,
  accent,
  accentFirst = false,
  locale = 'en',
  className = '',
  size = 'md',
  align = 'center',
}: SectionHeadingProps) {
  const isAr = toLocale(locale) === 'ar'

  const sizes: Record<string, string> = {
    sm: 'text-[24px] md:text-[32px]',
    md: 'text-[28px] md:text-[40px]',
    lg: 'text-[40px] md:text-[56px]',
  }

  const aligns: Record<string, string> = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  // English accent = italic Playfair; Arabic accent = upright Thmanyah Serif.
  const accentClass = `font-[family-name:var(--font-heading-accent)] ${
    isAr ? '' : 'italic'
  } text-[#9c673f]`

  return (
    <h2
      className={`font-[family-name:var(--font-heading)] font-medium leading-[1.2] ${sizes[size]} text-[#352514] ${aligns[align]} ${className}`}
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
