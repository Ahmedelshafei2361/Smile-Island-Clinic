import localFont from 'next/font/local'

// Both fonts loaded locally — no Google Fonts.
// Applied on <body> in the root layout so the CSS variables exist at the
// top level, where --font-heading / --font-body (from @theme) compose them.
export const playfair = localFont({
  src: [
    {
      path: '../public/fonts/playfair-display/PlayfairDisplay-VariableFont_wght.ttf',
      weight: '400 900',
      style: 'normal',
    },
    {
      path: '../public/fonts/playfair-display/PlayfairDisplay-Italic-VariableFont_wght.ttf',
      weight: '400 900',
      style: 'italic',
    },
  ],
  variable: '--font-playfair',
  display: 'swap',
})

export const jakarta = localFont({
  src: [
    {
      path: '../public/fonts/plus-jakarta-sans/PlusJakartaSans-VariableFont_wght.ttf',
      weight: '200 800',
      style: 'normal',
    },
    {
      path: '../public/fonts/plus-jakarta-sans/PlusJakartaSans-Italic-VariableFont_wght.ttf',
      weight: '200 800',
      style: 'italic',
    },
  ],
  variable: '--font-jakarta',
  display: 'swap',
})

// Arabic fonts (static weights, woff2) — used only on /ar via locale-scoped
// CSS variables. Thmanyah Sans = body/nav/buttons/stats; Thmanyah Serif Text =
// expressive Arabic heading accent.
export const thmanyahSans = localFont({
  src: [
    {
      path: '../public/fonts/thmanyah-sans/woff2/thmanyahsans-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/thmanyah-sans/woff2/thmanyahsans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/thmanyah-sans/woff2/thmanyahsans-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/thmanyah-sans/woff2/thmanyahsans-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-thmanyah-sans',
  display: 'swap',
})

export const thmanyahSerif = localFont({
  src: [
    {
      path: '../public/fonts/thmanyah-serif/woff2/thmanyahseriftext-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/thmanyah-serif/woff2/thmanyahseriftext-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/thmanyah-serif/woff2/thmanyahseriftext-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-thmanyah-serif',
  display: 'swap',
})
