import React from 'react'
import { createReader } from '@keystatic/core/reader'
import Markdoc from '@markdoc/markdoc'

import ActionLink from '@/app/components/ActionLink'
import Image from '@/app/components/Image'
import Tag from '@/app/components/Tag'

import keystaticConfig from '../../../../../keystatic.config'
import { getDictionary, hasLocale, locales } from '../../../dictionaries'

export const dynamic = 'force-static'
export const revalidate = false

type ProjectData = {
  title: string
  description: string
  thumbnail: { src: string; width: number; height: number }
  tags: string[]
  links: { url: string; title: string; isCta: boolean }[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderable: any
}

// Module-level cache keyed by `lang/slug`
// eslint-disable-next-line prefer-const
let cachedProjects: Record<string, ProjectData> = {}

function getReader() {
  return createReader(process.cwd(), {
    ...keystaticConfig,
    storage: { kind: 'local' },
  })
}

export async function generateStaticParams() {
  const reader = getReader()
  const params = []

  for (const lang of locales) {
    const projects =
      lang === 'nl'
        ? await reader.collections.projectsNL.all()
        : await reader.collections.projects.all()

    for (const project of projects) {
      const { node } = await project.entry.content()
      const errors = Markdoc.validate(node)
      if (errors.length) {
        console.error(errors)
        throw new Error('Invalid content')
      }

      cachedProjects[`${lang}/${project.slug}`] = {
        title: project.entry.title,
        description: project.entry.description,
        thumbnail: {
          src: project.entry.thumbnail.src,
          width: project.entry.thumbnail.width ?? 800,
          height: project.entry.thumbnail.height ?? 600,
        },
        tags: [...project.entry.tags],
        links: project.entry.links.map(link => ({
          url: link.url,
          title: link.title,
          isCta: link.isCTA,
        })),
        renderable: JSON.parse(JSON.stringify(Markdoc.transform(node))),
      }

      params.push({ lang, slug: project.slug })
    }
  }

  return params
}

export default async function Project({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  const project = cachedProjects[`${lang}/${slug}`]

  if (!project) {
    return <div>No Project Found (slug: {slug})</div>
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 py-6 text-left">
      <Image
        src={project.thumbnail.src}
        alt={project.title}
        width={project.thumbnail.width!}
        height={project.thumbnail.height!}
        sizes="(max-width: 768px) 100vw, 768px"
        className="rounded-l"
      />
      <h1 className="text-12 font-medium">{project.title}</h1>
      <p>{project.description}</p>
      <div className="flex gap-2">
        {project.tags.map(tag => (
          <Tag key={tag} text={tag} className="bg-layer2" />
        ))}
      </div>
      <div className="[&>article>p]:mb-6 [&>p]:leading-relaxed">
        {Markdoc.renderers.react(project.renderable, React)}
      </div>
      <div className="flex gap-4">
        {project.links.map(link => (
          <ActionLink
            isCTA={link.isCta}
            key={link.url}
            href={link.url}
            isExternal={true}
            text={link.title}
          />
        ))}
      </div>
    </div>
  )
}
