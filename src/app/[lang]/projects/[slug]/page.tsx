import React from 'react'
import { notFound } from 'next/navigation'
import Markdoc from '@markdoc/markdoc'

import ActionLink from '@/components/ActionLink'
import ProjectDetail from '@/components/ProjectDetail'
import { getAllProjectParams, getProject } from '@/lib/data'
import { getDictionary, hasLocale, locales } from '@/lib/dictionaries'
import { fetchBlurUrl } from '@/lib/fetch-blur-url'
import { setupFetchWithUserAgent } from '@/lib/fetch-setup'

setupFetchWithUserAgent()

export async function generateStaticParams() {
  return await getAllProjectParams(locales)
}

export default async function Project({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  if (!hasLocale(lang)) {
    notFound()
  }

  const dictionary = await getDictionary(lang)
  const project = await getProject(lang, slug)
  if (!project) {
    return (
      <div className="gap-05 m-auto flex h-full min-h-full w-full grow flex-col text-center">
        {dictionary.projects.notFound}
        <ActionLink
          text="Back to Home"
          href={`/${lang}`}
          isCTA={false}
          isExternal={false}
          className="w-fit self-center justify-self-center"
        />
      </div>
    )
  }
  let blurUrl: string | undefined
  try {
    blurUrl = await fetchBlurUrl(project.thumbnail.src)
  } catch (e) {
    console.error(e)
  }
  return (
    <ProjectDetail>
      {project.thumbnail?.src ? (
        <ProjectDetail.Image
          src={project.thumbnail.src}
          alt={project.thumbnail.alt ? project.thumbnail.alt : project.title}
          width={project.thumbnail.width ?? 0}
          height={project.thumbnail.height ?? 0}
          preload={true}
          loading="eager"
          fetchPriority="high"
          blurUrl={blurUrl}
        />
      ) : null}
      <ProjectDetail.Title>{project.title}</ProjectDetail.Title>
      <ProjectDetail.Description>
        {project.description}
      </ProjectDetail.Description>
      <ProjectDetail.Tags tags={Array.from(project.tags)} />
      <ProjectDetail.Content>
        <div className="[&>article>p]:mb-6 [&>article>ul]:list-outside [&>article>ul]:list-disc [&>article>ul]:pl-5 [&>p]:leading-relaxed">
          {Markdoc.renderers.react(project.renderable, React)}
        </div>
      </ProjectDetail.Content>
      <ProjectDetail.Links links={Array.from(project.links)} />
    </ProjectDetail>
  )
}
