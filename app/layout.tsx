import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { ThemeProvider } from './components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Himanshu Mishra - Full-Stack Developer',
  description: 'Full-Stack Developer from India specializing in React, Node.js, and modern web technologies.',
  keywords: ['Full-Stack Developer', 'React', 'Node.js', 'JavaScript', 'TypeScript', 'MongoDB', 'Web Development'],
  authors: [{ name: 'Himanshu Mishra' }],
  creator: 'Himanshu Mishra',
  publisher: 'Himanshu Mishra',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://himanshu-mishra.vercel.app',
    title: 'Himanshu Mishra - Full-Stack Developer',
    description: 'Full-Stack Developer from India specializing in React, Node.js, and modern web technologies.',
    siteName: 'Himanshu Mishra Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Himanshu Mishra - Full-Stack Developer',
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}