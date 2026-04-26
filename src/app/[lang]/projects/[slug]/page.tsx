import React from 'react'
import { cacheLife } from 'next/cache'
import { createReader } from '@keystatic/core/reader'
import Markdoc from '@markdoc/markdoc'

import ActionLink from '@/app/components/ActionLink'
import Image from '@/app/components/Image'
import Tag from '@/app/components/Tag'

import keystaticConfig from '../../../../../keystatic.config'
import { getDictionary, hasLocale, locales } from '../../../dictionaries'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'
const reader = createReader(process.cwd(), keystaticConfig)
export async function generateStaticParams() {
  const params = []

  for (const lang of locales) {
    const projects =
      lang === 'nl'
        ? await reader.collections.projectsNL.all()
        : await reader.collections.projects.all()

    for (const project of projects) {
      params.push({
        lang,
        slug: project.slug,
      })
    }
  }

  return params
}

async function getProject(lang: string, slug: string) {
  // 'use cache'
  // cacheLife('days')
  console.log('getting project from file system')

  const project =
    lang === 'nl'
      ? await reader.collections.projectsNL.read(slug)
      : await reader.collections.projects.read(slug)
  if (!project) return null

  const { node } = await project.content()
  const errors = Markdoc.validate(node)
  if (errors.length) {
    console.error(errors)
    throw new Error('Invalid content')
  }

  const renderable = Markdoc.transform(node)
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
    links: project.links.map(link => ({
      url: link.url,
      title: link.title,
      isCta: link.isCTA,
    })),
    renderable: JSON.parse(JSON.stringify(renderable)),
  }
}

export default async function Project({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  const project = await getProject(lang, slug)
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
          <Tag key={tag} text={tag} className="bg-layer2"></Tag>
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
