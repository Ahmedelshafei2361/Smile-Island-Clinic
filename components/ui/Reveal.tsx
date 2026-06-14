'use client'

import {
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'

type RevealOwnProps = {
  children: ReactNode
  as?: ElementType
  className?: string
  delay?: number
  duration?: number
  y?: number
  once?: boolean
  staggerChildren?: boolean
  staggerDelay?: number
  staggerStart?: number
  childDuration?: number
  childY?: number
}

// Extra HTML attributes (dir, id, aria-*, etc.) pass through to the element.
type RevealProps = RevealOwnProps &
  Omit<HTMLAttributes<HTMLElement>, keyof RevealOwnProps | 'style'>

type RevealStyle = CSSProperties & {
  '--reveal-child-y'?: string
  '--reveal-child-duration'?: string
  '--reveal-child-delay-1'?: string
  '--reveal-child-delay-2'?: string
  '--reveal-child-delay-3'?: string
  '--reveal-child-delay-4'?: string
  '--reveal-child-delay-5'?: string
  '--reveal-child-delay-6'?: string
  '--reveal-child-delay-7'?: string
  '--reveal-child-delay-8'?: string
  '--reveal-child-delay-9'?: string
  '--reveal-child-delay-10'?: string
  '--reveal-child-delay-11'?: string
  '--reveal-child-delay-12'?: string
}

export default function Reveal({
  children,
  as: Component = 'div',
  className = '',
  delay = 0,
  duration = 2300,
  y = 30,
  once = true,
  staggerChildren = false,
  staggerDelay = 260,
  staggerStart = 220,
  childDuration = 2300,
  childY = 26,
  ...htmlProps
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const timeoutRef = useRef<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (timeoutRef.current !== null) return

          timeoutRef.current = window.setTimeout(() => {
            setIsVisible(true)
            timeoutRef.current = null

            if (once) {
              observer.unobserve(entry.target)
            }
          }, Math.max(0, delay))
        } else if (!once) {
          if (timeoutRef.current !== null) {
            window.clearTimeout(timeoutRef.current)
            timeoutRef.current = null
          }

          setIsVisible(false)
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -14% 0px',
      },
    )

    observer.observe(element)

    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current)
      }

      observer.disconnect()
    }
  }, [delay, once])

  const style: RevealStyle = staggerChildren
    ? {
        '--reveal-child-y': `${childY}px`,
        '--reveal-child-duration': `${childDuration}ms`,
        '--reveal-child-delay-1': `${staggerStart + staggerDelay * 0}ms`,
        '--reveal-child-delay-2': `${staggerStart + staggerDelay * 1}ms`,
        '--reveal-child-delay-3': `${staggerStart + staggerDelay * 2}ms`,
        '--reveal-child-delay-4': `${staggerStart + staggerDelay * 3}ms`,
        '--reveal-child-delay-5': `${staggerStart + staggerDelay * 4}ms`,
        '--reveal-child-delay-6': `${staggerStart + staggerDelay * 5}ms`,
        '--reveal-child-delay-7': `${staggerStart + staggerDelay * 6}ms`,
        '--reveal-child-delay-8': `${staggerStart + staggerDelay * 7}ms`,
        '--reveal-child-delay-9': `${staggerStart + staggerDelay * 8}ms`,
        '--reveal-child-delay-10': `${staggerStart + staggerDelay * 9}ms`,
        '--reveal-child-delay-11': `${staggerStart + staggerDelay * 10}ms`,
        '--reveal-child-delay-12': `${staggerStart + staggerDelay * 11}ms`,
      }
    : {
        transitionProperty: 'opacity, transform',
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: '0ms',
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? 'translate3d(0, 0, 0)'
          : `translate3d(0, ${y}px, 0)`,
        willChange: isVisible ? 'auto' : 'opacity, transform',
      }

  return (
    <Component
      ref={ref}
      className={className}
      style={style}
      data-reveal
      data-reveal-visible={isVisible ? 'true' : 'false'}
      data-reveal-stagger={staggerChildren ? 'true' : undefined}
      {...htmlProps}
    >
      {children}
    </Component>
  )
}