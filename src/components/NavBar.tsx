import Link from 'next/link'

import { LanguageSelect } from '@/components/LanguageSelect'
import ThemeToggle from '@/components/ThemeToggle'
import { Dictionary } from '@/lib/dictionaries'

export default async function Navbar({
  lang,
  dictionary,
}: {
  lang: string
  dictionary: Dictionary
}) {
  return (
    <nav className="px-05 md:px-09 py-06 gap-05 flex flex-wrap items-center justify-between">
      <Link
        href={`/${lang}`}
        className="text-large font-large leading-large text-text-normal text-grey-95 dark:text-grey-5 font-mono hover:underline"
      >
        Home
      </Link>
      <div className="gap-05 flex items-center justify-center">
        <LanguageSelect
          defaultLang={lang}
          dictionary={dictionary}
        ></LanguageSelect>
        <ThemeToggle></ThemeToggle>
      </div>
    </nav>
  )
}
