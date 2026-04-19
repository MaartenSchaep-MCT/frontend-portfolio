import { notFound } from "next/navigation";
import { getDictionary, hasLocale, locales } from "../dictionaries";
import { createReader } from "@keystatic/core/reader";
import { cacheLife } from "next/cache";
import keystaticConfig from "../../../keystatic.config";
import ProjectCard from "../components/ProjectCard";

const reader = createReader(process.cwd(), keystaticConfig);
export async function generateStaticParams() {
  return locales.map((locale) => ({
    lang: locale,
  }));
}
async function getProjects(lang: string) {
  "use cache";
  cacheLife("days");
  const allProjects = await reader.collections.projects.all();
  return allProjects
    .filter((project) => project.entry.language === lang)
    .map((project) => {
      const { content, ...serializableEntry } = project.entry;
      return {
        slug: project.slug,
        entry: serializableEntry,
      };
    });
}
export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dictionary = await getDictionary(lang);
  const projects = await getProjects(lang);
  console.log(projects);
  return (
    <div>
      <h1>{dictionary.general.welcomeMessage}</h1>

      {projects.map((project) => (
        <ProjectCard
          key={project.slug}
          project={project.entry}
          slug={project.slug}
          lang={lang}
          dictionary={dictionary}
        />
      ))}
    </div>
  );
}
