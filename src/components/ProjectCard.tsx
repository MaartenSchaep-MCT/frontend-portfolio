import type { Dictionary } from '@/lib/dictionaries'
import { Project } from '@/types/project'

import ActionLink from './ActionLink'
import Image from './Image'
import Tag from './Tag'

export default function ProjectCard({
  project,
  slug,
  lang,
  dictionary,
}: {
  project: Project
  slug: string
  lang: string
  dictionary: Dictionary
}) {
  return (
    <div className="bg-layer2 p-06 gap-05 flex flex-col rounded-xl">
      <div className="relative aspect-video">
        <Image
          format="webp"
          src={project.thumbnail.src}
          alt={project.thumbnail.alt ? project.thumbnail.alt : project.title}
          width={project.thumbnail.width ?? 0}
          height={project.thumbnail.height ?? 0}
          fill
          sizes="(max-width: 768px) 100vw, max-width(1024px) 50vw, 40rem"
          className="rounded-m object-cover"
        />
      </div>
      <div className="grow">
        <h3 className="text-large leading-07 font-heading">{project.title}</h3>
        <p className="font-normal">{project.description}</p>
      </div>
      <div className="gap-03 flex flex-wrap">
        {project.tags.map(tag => (
          <Tag key={tag} text={tag} />
        ))}
      </div>
      <ActionLink
        href={`/${lang}/projects/${slug}`}
        text={dictionary.projects.viewProject}
        isExternal={true}
        className="bg-layer3 hover:bg-layer4"
      />
    </div>
  )
}
