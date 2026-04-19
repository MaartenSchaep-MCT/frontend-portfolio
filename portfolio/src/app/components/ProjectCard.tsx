import Image from "next/image";
import cloudinaryLoader from "../cloudinaryLoader";
import { Entry } from "@keystatic/core/reader";
import config from "../../../keystatic.config";
import type { Dictionary } from "../dictionaries";
import Link from "next/link";

export default function ProjectCard({
  project,
  slug,
  lang,
  dictionary,
}: {
  project: Omit<Entry<(typeof config.collections.projects)>, "content">;
  slug: string;
  lang: string;
  dictionary: Dictionary;
}) {
  return (
    <div>
      <Image
        loader={cloudinaryLoader}
        src={project.thumbnail.src}
        alt={project.title}
        width={project.thumbnail.width!}
        height={project.thumbnail.height!}
        sizes="(max-width: 768px) 100vw, 768px"
        priority
      />
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div>
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <Link href={`/${lang}/projects/${slug}`}>
        {dictionary.projects.viewProject}
      </Link>
    </div>
  );
}
