import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import Providers from './providers'
import "./globals.css"
import 'leaflet/dist/leaflet.css'

export const metadata: Metadata = {
  title: 'Oxxo Frontend',
  description: 'Administracion de Oxxo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}><Providers>{children}</Providers></body>
    </html>
  )
}
