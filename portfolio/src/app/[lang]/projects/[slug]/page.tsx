import { createReader } from "@keystatic/core/reader";
import React from "react";
import Markdoc from "@markdoc/markdoc";
import Image from "next/image";
import { cacheLife } from "next/cache";
import cloudinaryLoader from "@/app/cloudinaryLoader";
import { getDictionary, hasLocale, locales } from "../../../dictionaries";

import keystaticConfig from "../../../../../keystatic.config";
const reader = createReader(process.cwd(), keystaticConfig);
export async function generateStaticParams() {
  const params = [];

  for (const lang of locales) {
    const projects =
      lang === "nl"
        ? await reader.collections.projectsNL.all()
        : await reader.collections.projects.all();

    for (const project of projects) {
      params.push({
        lang,
        slug: project.slug,
      });
    }
  }

  return params;
}

async function getProject(lang: string, slug: string) {
  "use cache";
  cacheLife("days");
  console.log("getting project from file system");

  const project =
    lang === "nl"
      ? await reader.collections.projectsNL.read(slug)
      : await reader.collections.projects.read(slug);
  if (!project) return null;

  const { node } = await project.content();
  const errors = Markdoc.validate(node);
  if (errors.length) {
    console.error(errors);
    throw new Error("Invalid content");
  }

  const renderable = Markdoc.transform(node);
  // not returning entire object because classes and functions aren't supported in use cache
  return {
    title: project.title,
    description: project.description,
    thumbnail: {
      src: project.thumbnail.src,
      width: project.thumbnail.width,
      height: project.thumbnail.height,
    },
    tags: [...project.tags],
    links: project.links.map((link) => ({ url: link.url, title: link.title })),
    renderable: JSON.parse(JSON.stringify(renderable)),
  };
}

export default async function Project({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const project = await getProject(lang, slug);
  if (!project) {
    return <div>No Project Found (slug: {slug})</div>;
  }
  return (
    <div className="max-w-3xl mx-auto py-6 text-left w-full flex flex-col gap-4">
      <Image
        loader={cloudinaryLoader}
        src={project.thumbnail.src}
        alt={project.title}
        width={project.thumbnail.width!}
        height={project.thumbnail.height!}
        sizes="(max-width: 768px) 100vw, 768px"
        priority
      />
      <h1 className="text-4xl font-bold">{project.title}</h1>
      <div className="flex gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="p-2 bg-gray-900 rounded">
            {tag}
          </span>
        ))}
      </div>
      <p>{project.description}</p>
      <div className="flex gap-4">
        {project.links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            className="hover:underline py-4 px-6 bg-gray-800 block rounded"
          >
            {link.title}
          </a>
        ))}
      </div>
      <div className="[&>article>p]:mb-6 [&>p]:leading-relaxed">
        {Markdoc.renderers.react(project.renderable, React)}
      </div>
    </div>
  );
}
