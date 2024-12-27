import type { Metadata } from 'next'
import {  Montserrat  } from 'next/font/google'
import './globals.css'

const font = Montserrat({ subsets: ['latin'], weight:['400','700']})

export const metadata = {
  title: 'CapIA',
  description: 'Your fintech solution',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png', sizes: '192x192' },
    ],
    shortcut: '/favicon.ico',
    apple: { url: '/apple-touch-icon.png', sizes: '192x192' },
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}