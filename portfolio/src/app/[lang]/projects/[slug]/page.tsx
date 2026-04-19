// You now have access to the current locale

import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";

// e.g. /en-US/products -> `lang` is "en-US"
export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dictionary = await getDictionary(lang);

  return (
    <div>
      <h1>{dictionary.general.welcomeMessage}</h1>
      <p>Projects</p>
    </div>
  );
}
