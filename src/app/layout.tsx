import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'CC101 — Claude Code 한국어 입문 가이드',
  description:
    'Claude Code 설치부터 CLAUDE.md, MCP, Skills, Hooks까지 — 공식 문서 기반으로 쉽게 정리한 한국어 입문 가이드',
  keywords: 'Claude Code, Claude Code 한국어, AI 코딩, 입문 가이드, Claude, Anthropic',
  authors: [{ name: 'CC101', url: 'https://cc101.axwith.com' }],
  openGraph: {
    title: 'CC101 — Claude Code 한국어 입문 가이드',
    description: 'Claude Code를 가장 쉽게 시작하는 한국어 가이드',
    url: 'https://cc101.axwith.com',
    siteName: 'CC101',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: 'https://cc101.axwith.com/og.png',
        width: 1200,
        height: 630,
        alt: 'CC101 — Claude Code 한국어 입문 가이드',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CC101 — Claude Code 한국어 입문 가이드',
    description: 'Claude Code를 가장 쉽게 시작하는 한국어 가이드',
    images: ['https://cc101.axwith.com/og.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <Script src="/theme-init.js" strategy="beforeInteractive" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {/* Google Analytics 4 — only on production domain */}
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            if (location.hostname === 'cc101.axwith.com') {
              var s = document.createElement('script');
              s.src = 'https://www.googletagmanager.com/gtag/js?id=G-DXL98QN89J';
              s.async = true;
              document.head.appendChild(s);
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-DXL98QN89J');
            }
          `}
        </Script>
      </body>
    </html>
  )
}
