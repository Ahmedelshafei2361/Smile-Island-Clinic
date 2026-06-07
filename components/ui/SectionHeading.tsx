interface SectionHeadingProps {
  title: string
  accent?: string
  accentFirst?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
  align?: 'left' | 'center' | 'right'
}

export default function SectionHeading({
  title,
  accent,
  accentFirst = false,
  className = '',
  size = 'md',
  align = 'center',
}: SectionHeadingProps) {
  const sizes: Record<string, string> = {
    sm: 'text-[32px]',
    md: 'text-[40px]',
    lg: 'text-[56px]',
  }

  const aligns: Record<string, string> = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <h2
      className={`font-[family-name:var(--font-heading)] font-medium leading-[1.2] ${sizes[size]} text-[#352514] ${aligns[align]} ${className}`}
    >
      {accentFirst && accent && (
        <>
          <em className="not-italic italic text-[#9c673f]">{accent}</em>{' '}
        </>
      )}
      {title}
      {!accentFirst && accent && (
        <>
          {' '}
          <em className="not-italic italic text-[#9c673f]">{accent}</em>
        </>
      )}
    </h2>
  )
}
