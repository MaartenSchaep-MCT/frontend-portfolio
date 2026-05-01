import { notFound } from 'next/navigation'

import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'
import { getDictionary, hasLocale } from '@/lib/dictionaries'

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
  const dictionary = await getDictionary(lang)

  return (
    <>
      <NavBar lang={lang} dictionary={dictionary} />
      <main className="flex flex-1">{children}</main>
      <Footer />
    </>
  )
}
