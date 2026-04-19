import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "./dictionaries";
import Link from "next/link";
import { LanguageSelect } from "../components/LanguageSelect";

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dictionary = await getDictionary(lang);

  return (
    <div>
      <h1>{dictionary.general.welcomeMessage}</h1>
      <LanguageSelect defaultLang={lang} />
      <div></div>
      <Link href="./projects">Projects</Link>
    </div>
  );
}
