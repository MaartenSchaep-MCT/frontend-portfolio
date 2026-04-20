import { notFound } from "next/navigation";
import { getDictionary, hasLocale, locales } from "../dictionaries";
import { createReader } from "@keystatic/core/reader";
import { cacheLife } from "next/cache";
import keystaticConfig from "../../../keystatic.config";
import ProjectCard from "../components/ProjectCard";
import TechnologyCard from "../components/TechnologyCard";
import Markdoc from "@markdoc/markdoc";
import React from "react";
import Container from "../components/Container";
import cloudinaryLoader from "../cloudinaryLoader";
import Image from "next/image";
import ActionLink from "../components/ActionLink";

const reader = createReader(process.cwd(), keystaticConfig);
export async function generateStaticParams() {
  return locales.map((locale) => ({
    lang: locale,
  }));
}
async function getProjects(lang: string) {
  "use cache";
  cacheLife("days");
  const allProjects =
    lang === "nl"
      ? await reader.collections.projectsNL.all()
      : await reader.collections.projects.all();
  return allProjects.map((project) => {
    const { content, ...serializableEntry } = project.entry;
    return {
      slug: project.slug,
      entry: serializableEntry,
    };
  });
}
async function getTechnologies(lang: string) {
  "use cache";
  cacheLife("days");
  const allTechnologies =
    lang === "nl"
      ? await reader.collections.technologiesNL.all()
      : await reader.collections.technologies.all();

  const allProjects =
    lang === "nl"
      ? await reader.collections.projectsNL.all()
      : await reader.collections.projects.all();
  return Promise.all(
    allTechnologies.map(async (technology) => {
      const { experience, projects, ...serializableEntry } = technology.entry;
      const { node } = await technology.entry.experience();

      const renderable = Markdoc.transform(node);

      const populatedProjects = (projects || []).map((projectSlug) => {
        const project = allProjects.find((p) => p.slug === projectSlug);
        return {
          slug: projectSlug,
          title: project?.entry.title || projectSlug,
          description: project?.entry.description || null,
        };
      });

      return {
        slug: technology.slug,
        entry: {
          ...serializableEntry,
          projects: populatedProjects,
        },
        renderedExperience: JSON.parse(JSON.stringify(renderable)),
      };
    }),
  );
}
export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dictionary = await getDictionary(lang);
  const projects = await getProjects(lang);
  const technologies = await getTechnologies(lang);
  console.log(projects);
  return (
    <Container>
      <div className="py-13 flex items-center justify-center gap-09">
        <div className="flex flex-col justify-center gap-05">
          <div className="flex flex-col gap-04 justify-center ">
            <h1 className="font-sans leading-heading text-heading font-heading">
              {dictionary.hero.welcomeMessage}
            </h1>
            <p className="text-5 leading-07 font-normal">
              {dictionary.hero.welcomeDescription}
            </p>
          </div>
          <div className="flex gap-07 jsutify-center flex-wrap">
            <ActionLink
              text={dictionary.hero.downloadResume}
              href=""
              isExternal={true}
            />
            <ActionLink
              text={dictionary.hero.seeProjects}
              isCTA={true}
              href="#projects"
              isExternal={false}
            />
          </div>
        </div>
        <Image
          className="rounded-full"
          loader={cloudinaryLoader}
          src="https://res.cloudinary.com/dcejensy8/image/upload/q_auto/f_auto/v1776697005/maarten_yxeq4r.jpg"
          alt="Profile picture of Maarten"
          width={240}
          height={240}
          sizes="(max-width: 768px) 100vw, 768px"
          priority
        />
      </div>

      <div className="grid grid-cols-2">
        {technologies.map((technology) => (
          <TechnologyCard
            key={technology.slug}
            technology={technology.entry}
            lang={lang}
          >
            {Markdoc.renderers.react(technology.renderedExperience, React)}
          </TechnologyCard>
        ))}
      </div>
      <div className="grid grid-cols-2" id="projects">
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
    </Container>
  );
}
