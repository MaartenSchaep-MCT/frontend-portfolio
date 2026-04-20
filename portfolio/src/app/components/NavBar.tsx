import Link from "next/link";
import { LanguageSelect } from "./LanguageSelect";
import ThemeToggle from "./ThemeToggle";

export default async function Navbar({ lang }: { lang: string }) {
  return (
    <nav className="flex justify-between px-09 py-06 items-center gap-05 flex-wrap">
      <Link
        href={`/${lang}`}
        className="hover:underline text-large font-mono font-large leading-large text-text-normal text-grey-95 dark:text-grey-5"
      >
        Home
      </Link>
      <div className="flex gap-05 items-center justify-center">
        <LanguageSelect defaultLang={lang}></LanguageSelect>
        <ThemeToggle></ThemeToggle>
      </div>
    </nav>
  );
}
