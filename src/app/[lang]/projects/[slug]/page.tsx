import React from 'react'
import Markdoc from '@markdoc/markdoc'

import ProjectDetail from '@/components/ProjectDetail'
import { getAllProjectParams, getProject } from '@/lib/data'
import { locales } from '@/lib/dictionaries'
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
  const project = await getProject(lang, slug)
  if (!project) {
    return <div className="m-auto w-full">No Project Found (slug: {slug})</div>
  }
  return (
    <ProjectDetail>
      <ProjectDetail.Image
        src={project.thumbnail.src}
        alt={project.title}
        width={project.thumbnail.width!}
        height={project.thumbnail.height!}
      />
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
