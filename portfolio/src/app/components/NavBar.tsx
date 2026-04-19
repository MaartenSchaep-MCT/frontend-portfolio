import Link from "next/link";
import { LanguageSelect } from "./LanguageSelect";

export default async function Navbar({ lang }: { lang: string }) {
  return (
    <nav className="flex justify-between">
      <Link href={`/${lang}`}>Home</Link>
      <LanguageSelect defaultLang={lang}></LanguageSelect>
    </nav>
  );
}
