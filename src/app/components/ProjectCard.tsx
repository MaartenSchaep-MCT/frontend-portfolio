import Link from 'next/link'
import { Entry } from '@keystatic/core/reader'

import config from '../../../keystatic.config'
import type { Dictionary } from '../dictionaries'
import Image from './Image'

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
    <div>
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
      <div>
        {project.tags.map(tag => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <Link href={`/${lang}/projects/${slug}`}>
        {dictionary.projects.viewProject}
      </Link>
    </div>
  )
}
