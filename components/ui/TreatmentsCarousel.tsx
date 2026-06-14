'use client'

import { useEffect, useRef } from 'react'

/**
 * Infinite treatments carousel.
 * - Slow automatic leftward drift (calm marquee feel), identical in EN/AR.
 * - Seamless loop: one card set is duplicated; the offset wraps by one set's
 *   exact pixel stride (measured live, so it survives responsive resizes).
 * - Direct mouse-drag / touch-swipe with light momentum so users can flick to
 *   a treatment quickly, then the slow auto-drift resumes.
 * - Pauses on hover; respects prefers-reduced-motion (no auto drift / momentum,
 *   manual drag still works).
 *
 * The viewport is forced dir="ltr" so the transform math is direction-agnostic;
 * each card carries its own dir for correct RTL content + button mirroring.
 */
export default function TreatmentsCarousel({
  children,
  reverse = false,
  auto = true,
}: {
  children: React.ReactNode
  /** Drift rightward instead of leftward (used for Arabic / RTL). */
  reverse?: boolean
  /** Auto-drift continuously. When false, the carousel is drag/swipe-only. */
  auto?: boolean
}) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const setARef = useRef<HTMLDivElement>(null)
  const setBRef = useRef<HTMLDivElement>(null)

  const offset = useRef(0)
  const setWidth = useRef(1)
  const dragging = useRef(false)
  const moved = useRef(false)
  const lastX = useRef(0)
  const downX = useRef(0)
  const velocity = useRef(0)
  const hovered = useRef(false)
  const reduce = useRef(false)
  const activePointerId = useRef<number | null>(null)
  const captured = useRef(false)

  useEffect(() => {
    reduce.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const measure = () => {
      const a = setARef.current
      const b = setBRef.current
      if (a && b) setWidth.current = b.offsetLeft - a.offsetLeft || a.offsetWidth
      else if (a) setWidth.current = a.offsetWidth
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (setARef.current) ro.observe(setARef.current)

    const AUTO = 38 // px/sec — calm drift
    const autoSign = reverse ? -1 : 1 // LTR drifts left; RTL drifts right
    let raf = 0
    let last = performance.now()

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const w = setWidth.current || 1

      if (!dragging.current) {
        const floor = auto ? AUTO : 6
        if (Math.abs(velocity.current) > floor && !reduce.current) {
          offset.current += velocity.current * dt
          velocity.current *= 0.92 // decay flick (into slow drift, or to a stop)
        } else if (auto && !hovered.current && !reduce.current) {
          offset.current += AUTO * autoSign * dt
        }
      }

      offset.current = ((offset.current % w) + w) % w
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${-offset.current}px,0,0)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [reverse, auto])

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true
    moved.current = false
    captured.current = false
    activePointerId.current = e.pointerId
    lastX.current = e.clientX
    downX.current = e.clientX
    velocity.current = 0
    // Do NOT call setPointerCapture here. Calling it on every pointerdown causes
    // the browser to dispatch the subsequent click event to this viewport div
    // (the capture element) instead of the actual <a> button under the cursor,
    // so button clicks silently do nothing on desktop. Capture is set only after
    // the drag threshold is crossed in onPointerMove, ensuring simple clicks
    // always reach the intended anchor/button element.
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return
    const dx = e.clientX - lastX.current
    lastX.current = e.clientX
    offset.current -= dx
    // px/sec, clamped so a hard flick stays smooth (not janky)
    velocity.current = Math.max(-2600, Math.min(2600, (-dx / 0.016) * 1))
    if (Math.abs(e.clientX - downX.current) > 5) {
      moved.current = true
      // Capture only after drag is confirmed so out-of-viewport drags stay smooth.
      if (!captured.current && activePointerId.current !== null) {
        captured.current = true
        try { viewportRef.current?.setPointerCapture(activePointerId.current) } catch {}
      }
    }
  }

  const endDrag = (e: React.PointerEvent) => {
    if (!dragging.current) return
    dragging.current = false
    captured.current = false
    activePointerId.current = null
    try {
      viewportRef.current?.releasePointerCapture(e.pointerId)
    } catch {}
  }

  // Swallow the click that ends a drag so a swipe never triggers navigation /
  // WhatsApp.
  const onClickCapture = (e: React.MouseEvent) => {
    if (moved.current) {
      e.preventDefault()
      e.stopPropagation()
      moved.current = false
    }
  }

  return (
    <div
      ref={viewportRef}
      dir="ltr"
      className="overflow-hidden cursor-grab active:cursor-grabbing"
      style={{ touchAction: 'pan-y' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onMouseEnter={() => (hovered.current = true)}
      onMouseLeave={() => (hovered.current = false)}
      onClickCapture={onClickCapture}
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        <div ref={setARef} className="flex">
          {children}
        </div>
        <div ref={setBRef} className="flex" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  )
}
