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
    <div className="gap-05 bg-layer2 py-04 px-06 rounded-m flex items-center text-left">
      <Image
        src={technology.icon}
        alt={technology.title}
        width={32}
        height={32}
      />
      <div className="flex flex-col">
        <h2>{technology.title}</h2>
        <span className="text-soft text-2 leading-05 font-normal">
          {technology.description}
        </span>
      </div>
      {/*{children}
      {technology.projects.map(project => (
        <div key={project.slug}>
          <p>{project.title}</p>
          <p>{project.description}</p>
          <Link href={`/${lang}/projects/${project.slug}`}>View project</Link>
        </div>
      ))}*/}
    </div>
  )
}
