import { notFound } from 'next/navigation'

import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import { hasLocale } from '../dictionaries'

export const revalidate = false
export const dynamic = 'force-static'

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) {
    notFound()
  }

  return (
    <>
      <NavBar lang={lang} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}
