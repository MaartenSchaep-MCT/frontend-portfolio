import { notFound } from "next/navigation";
import { hasLocale } from "../dictionaries";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) {
    notFound();
  }

  return (
    <>
      <NavBar lang={lang} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
