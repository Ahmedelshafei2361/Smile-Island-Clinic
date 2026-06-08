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
