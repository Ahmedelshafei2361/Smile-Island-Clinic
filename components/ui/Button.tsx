interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  href?: string
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit'
  target?: string
  rel?: string
}

export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  type = 'button',
  target,
  rel,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-[12px] rounded-[800px] font-medium transition-opacity hover:opacity-90 whitespace-nowrap cursor-pointer'

  const variants = {
    primary: 'bg-[#352514] text-[#f7efe8] px-[20px] py-[10px] text-[16px]',
    secondary: 'bg-[#efdfd2] text-[#352514] px-[24px] py-[12px] text-[16px]',
  }

  const classes = `${base} ${variants[variant]} ${className}`

  if (href) {
    const isExternal = href.startsWith('http')
    return (
      <a
        href={href}
        className={classes}
        target={target ?? (isExternal ? '_blank' : undefined)}
        rel={rel ?? (isExternal ? 'noopener noreferrer' : undefined)}
      >
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
