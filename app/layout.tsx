import type { Metadata } from 'next'
import { Manjari, Dancing_Script } from 'next/font/google'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const manjari = Manjari({
  subsets: ['latin'],
  weight: ['100', '400', '700'],
  variable: '--font-manjari',
  display: 'swap',
})

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dancing',
  display: 'swap',
})

const ttMilksScript = localFont({
  src: [
    {
      path: '../public/fonts/TT Milks Script Trial ExtraLight.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../public/fonts/TT Milks Script Trial Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/TT Milks Script Trial Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/TT Milks Script Trial Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/TT Milks Script Trial ExtraBold.otf',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-tt-milks-script',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'True Joy - A la mesa con Jesús',
  description: 'Juegos cristianos para toda la familia. Gózate en la Palabra de Dios con nuestros juegos de mesa.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${manjari.variable} ${dancingScript.variable} ${ttMilksScript.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
