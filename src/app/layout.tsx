import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/providers/themeProvider'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { DynamicBreadcrumb } from '@/components/layout/breadcrumb'
import { ConsoleCredit } from '@/components/layout/console-credit'
import { ScrollToTop } from '@/components/layout/scroll-to-top'
import { AnnouncementBanner } from '@/components/layout/announcement-banner'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'UI Works',
  description: 'Frontend Challenges',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <AnnouncementBanner />
          <ScrollToTop />
          <Header />
          <DynamicBreadcrumb />
          <main className='flex-1'>{children}</main>
          <Footer />
          <ConsoleCredit />
        </ThemeProvider>
      </body>
    </html>
  )
}
