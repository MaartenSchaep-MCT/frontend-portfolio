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
    <div className="bg-layer2 p-06 gap-05 flex flex-col rounded-xl">
      <Image
        format="webp"
        src={project.thumbnail.src}
        alt={project.title}
        width={project.thumbnail.width!}
        height={project.thumbnail.height!}
        sizes="(max-width: 768px) 300vw, 768px"
        className="rounded-m"
      />
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
