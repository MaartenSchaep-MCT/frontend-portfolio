import Image from 'next/image'
import Link from 'next/link'
import { Entry } from '@keystatic/core/reader'

import config from '../../../keystatic.config'

type Technology = Omit<
  Entry<typeof config.collections.technologies>,
  'experience' | 'projects'
> & {
  projects: {
    slug: string | null
    title: string | null
    description: string | null
  }[]
}
export default function TechnologyCard({
  technology,
  children,
  lang,
}: {
  technology: Technology
  children: React.ReactNode
  lang: string
}) {
  return (
    <div>
      <Image
        src={technology.icon}
        alt={technology.title}
        width={40}
        height={40}
      />
      <h2>{technology.title}</h2>
      <p>{technology.description}</p>
      {children}
      {technology.projects.map(project => (
        <div key={project.slug}>
          <p>{project.title}</p>
          <p>{project.description}</p>
          <Link href={`/${lang}/projects/${project.slug}`}>View project</Link>
        </div>
      ))}
    </div>
  )
}
