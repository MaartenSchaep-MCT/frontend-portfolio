import Link from 'next/link'
import { Entry } from '@keystatic/core/reader'

import config from '../../../keystatic.config'
import type { Dictionary } from '../dictionaries'
import ActionLink from './ActionLink'
import Image from './Image'
import Tag from './Tag'

export default function ProjectCard({
  project,
  slug,
  lang,
  dictionary,
}: {
  project: Omit<Entry<typeof config.collections.projects>, 'content'>
  slug: string
  lang: string
  dictionary: Dictionary
}) {
  return (
    <div className="bg-layer2 p-06 gap-05 flex flex-col rounded-l">
      <Image
        format="webp"
        src={project.thumbnail.src}
        alt={project.title}
        width={project.thumbnail.width!}
        height={project.thumbnail.height!}
        sizes="(max-width: 768px) 300vw, 768px"
      />
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="gap-03 flex flex-wrap">
        {project.tags.map(tag => (
          <Tag key={tag} text={tag} />
        ))}
      </div>
      <ActionLink
        href={`/${lang}/projects/${slug}`}
        text={dictionary.projects.viewProject}
        isExternal={true}
        className="bg-layer3"
      />
    </div>
  )
}
