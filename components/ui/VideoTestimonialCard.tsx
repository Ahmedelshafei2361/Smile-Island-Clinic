'use client'

import { useEffect, useRef, useState } from 'react'
import type { VideoTestimonial } from '@/lib/data'

function PlayIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.79-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14Z" />
    </svg>
  )
}

function PauseIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M7 5.5A1.5 1.5 0 0 1 8.5 4h1A1.5 1.5 0 0 1 11 5.5v13A1.5 1.5 0 0 1 9.5 20h-1A1.5 1.5 0 0 1 7 18.5v-13ZM13 5.5A1.5 1.5 0 0 1 14.5 4h1A1.5 1.5 0 0 1 17 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-13Z" />
    </svg>
  )
}

function CloseIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M18 6 6 18" />
      <path d="M6 6l12 12" />
    </svg>
  )
}

function Stars({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex gap-[2px] text-[#f0a93c] ${className}`} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="size-[15px]">
          <path d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.9l-5.8 3.05 1.1-6.46-4.69-4.58 6.49-.94L12 2.5Z" />
        </svg>
      ))}
    </span>
  )
}

function youtubeId(url: string): string {
  const m = url.match(/(?:shorts\/|v=|youtu\.be\/|embed\/)([\w-]{11})/)
  return m ? m[1] : ''
}

function isMobileVideoTapBugRisk(): boolean {
  if (typeof window === 'undefined') return false

  return (
    window.innerWidth < 1024 ||
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(hover: none)').matches
  )
}

interface VideoTestimonialCardProps {
  item: VideoTestimonial
  locale: 'en' | 'ar'
}

export default function VideoTestimonialCard({ item, locale }: VideoTestimonialCardProps) {
  const isAr = locale === 'ar'
  const name = isAr ? item.nameAr : item.nameEn
  const tag = isAr ? item.tagAr : item.tagEn
  const aria = isAr ? `تشغيل شهادة ${name}` : `Play ${name}'s video testimonial`

  const iframeRef = useRef<HTMLIFrameElement | null>(null)

  const [playing, setPlaying] = useState(false)
  const [paused, setPaused] = useState(false)
  const [origin, setOrigin] = useState('')
  const [mobileSafeMode, setMobileSafeMode] = useState(false)

  const id = youtubeId(item.youtubeUrl)

  useEffect(() => {
    if (!playing) return

    const updateSafeMode = () => {
      setMobileSafeMode(isMobileVideoTapBugRisk())
    }

    updateSafeMode()
    window.addEventListener('resize', updateSafeMode)

    return () => {
      window.removeEventListener('resize', updateSafeMode)
    }
  }, [playing])

  function sendYoutubeCommand(command: 'playVideo' | 'pauseVideo' | 'stopVideo') {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({
        event: 'command',
        func: command,
        args: [],
      }),
      '*',
    )
  }

  function startVideo() {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin)
      setMobileSafeMode(isMobileVideoTapBugRisk())
    }

    setPaused(false)
    setPlaying(true)
  }

  function toggleMobilePause() {
    if (paused) {
      sendYoutubeCommand('playVideo')
      setPaused(false)
    } else {
      sendYoutubeCommand('pauseVideo')
      setPaused(true)
    }
  }

  function stopVideo() {
    sendYoutubeCommand('stopVideo')
    setPaused(false)
    setPlaying(false)
  }

  const embedSrc = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&controls=1&rel=0&playsinline=1&modestbranding=1&enablejsapi=1${
    origin ? `&origin=${encodeURIComponent(origin)}` : ''
  }`

  return (
    <div className="relative snap-center shrink-0 w-[252px] sm:w-[300px] lg:w-[416px] aspect-[416/560] rounded-[24px] overflow-hidden bg-card select-none">
      {playing ? (
        <div className="absolute inset-0 z-10 bg-black">
          <iframe
            ref={iframeRef}
            className={`absolute inset-0 z-10 h-full w-full border-0 ${
              mobileSafeMode ? 'pointer-events-none' : 'pointer-events-auto'
            }`}
            src={embedSrc}
            title={name}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            allowFullScreen
          />

          {mobileSafeMode ? (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  stopVideo()
                }}
                aria-label={isAr ? 'إغلاق الفيديو' : 'Close video'}
                className="
                  absolute end-[12px] top-[12px] z-30
                  grid size-[38px] place-items-center
                  rounded-full bg-black/45 text-white
                  ring-1 ring-white/20 backdrop-blur-md
                  transition-transform duration-200
                  active:scale-95
                "
              >
                <CloseIcon className="size-[18px]" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  toggleMobilePause()
                }}
                aria-label={paused ? (isAr ? 'استكمال الفيديو' : 'Resume video') : isAr ? 'إيقاف الفيديو مؤقتًا' : 'Pause video'}
                className="
                  absolute inset-0 z-20
                  grid place-items-center
                  bg-transparent
                  text-white
                  outline-none
                  focus-visible:ring-2 focus-visible:ring-[#9c673f] focus-visible:ring-inset
                "
              >
                <span
                  className={`
                    grid size-[68px] place-items-center
                    rounded-full bg-black/35
                    ring-1 ring-white/25 backdrop-blur-md
                    shadow-[0_4px_20px_rgba(0,0,0,0.25)]
                    transition-opacity duration-200
                    ${paused ? 'opacity-100' : 'opacity-0 active:opacity-100'}
                  `}
                >
                  {paused ? <PlayIcon className="size-[28px]" /> : <PauseIcon className="size-[28px]" />}
                </span>
              </button>
            </>
          ) : null}
        </div>
      ) : (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            startVideo()
          }}
          aria-label={aria}
          className="group absolute inset-0 h-full w-full cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#9c673f] focus-visible:ring-inset"
        >
          <img
            src={item.thumbnailImage}
            alt={name}
            loading="lazy"
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-105"
          />

          <div
            className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0"
            aria-hidden="true"
          />

          <span className="absolute inset-0 grid place-items-center">
            <span className="grid place-items-center size-[72px] lg:size-[96px] rounded-full bg-black/35 text-white ring-1 ring-white/25 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition-transform duration-300 ease-out motion-safe:group-hover:scale-110">
              <PlayIcon className="size-[28px] lg:size-[36px]" />
            </span>
          </span>

          <span className="block w-full text-right absolute inset-x-0 bottom-0 flex items-end justify-between gap-[8px] p-[16px]">
            <span className="flex flex-col gap-[6px] min-w-0">
              <span className="text-white font-semibold text-[15px] lg:text-[16px] leading-[1.3] drop-shadow truncate">
                {name}
              </span>
              <Stars />
            </span>

            <span className="shrink-0 rounded-[8px] bg-[#f1e4d9] px-[12px] py-[5px] text-[12px] font-semibold leading-[1.5] text-[#352514] whitespace-nowrap">
              {tag}
            </span>
          </span>
        </button>
      )}
    </div>
  )
}