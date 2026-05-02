import type { Metadata } from 'next'
import { Google_Sans_Code, Google_Sans_Flex } from 'next/font/google'

import './globals.css'

const googleSansCode = Google_Sans_Code({
  variable: '--font-google-sans-code',
  subsets: ['latin'],
  fallback: ['monospace'],
})

const googleSansFlex = Google_Sans_Flex({
  variable: '--font-google-sans-flex',
  subsets: ['latin'],
  fallback: ['sans-serif'],
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
    // html:has(dialog[open]) {
    //   overflow: hidden;
    //   scrollbar-gutter: stable;
    // }

    <html
      lang="en"
      className={`${googleSansCode.variable} ${googleSansFlex.variable} scroll-py-07 h-full scroll-smooth antialiased has-[dialog[open]]:overflow-hidden has-[dialog[open]]:[scrollbar-gutter:stable]`}
      suppressHydrationWarning
    >
      <head>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{ __html: themeCode }}
        />
      </head>
      <body className="bg-layer1 text-neutral flex min-h-full flex-col font-sans font-normal">
        {children}
      </body>
    </html>
  )
}
