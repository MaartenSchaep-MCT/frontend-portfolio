import type { Metadata } from 'next'
import { Google_Sans_Code, Google_Sans_Flex } from 'next/font/google'

import './globals.css'

import Script from 'next/script'

const googleSansCode = Google_Sans_Code({
  variable: '--font-google-sans-code',
  subsets: ['latin'],
})

const googleSansFlex = Google_Sans_Flex({
  variable: '--font-google-sans-flex',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Maarten Schaep - Portfolio',
  description:
    'Portfolio website of Maarten Schaep, a 2nd year MCT student specializing in full-stack development, based in Belgium. I have experience in both frontend and backend, mainly focused around .NET, React, Figma and Flutter.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const themeCode = `
      (function() {
        try {
        document.documentElement.classList.toggle(
          "dark",
          localStorage.theme === "dark" ||
            (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
        );
        } catch (e) {console.error(e);}
      })();
    `
  return (
    <html
      lang="en"
      className={`${googleSansCode.variable} ${googleSansFlex.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{ __html: themeCode }}
        />
      </head>
      <body className="font-heading bg-layer1 text-neutral flex min-h-full flex-col">
        {children}
      </body>
    </html>
  )
}
