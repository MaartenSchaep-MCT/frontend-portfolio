import { cacheLife, cacheTag } from 'next/cache'
import { createReader } from '@keystatic/core/reader'
import { createGitHubReader } from '@keystatic/core/reader/github'
import Markdoc from '@markdoc/markdoc'

import keystaticConfig from '../../keystatic.config'

export const reader =
  process.env.NODE_ENV === 'development'
    ? createReader(process.cwd(), keystaticConfig)
    : createGitHubReader(keystaticConfig, {
        repo: `${process.env.GITHUB_USER}/${process.env.GITHUB_REPO}`,
        token: process.env.KEYSTATIC_GITHUB_TOKEN,
      })
export async function getProjects(lang: string) {
  'use cache'
  // weeks is fine since app will be rebuilt when there is new content
  cacheLife('weeks')
  cacheTag('projects')
  const allProjects =
    lang === 'nl'
      ? await reader.collections.projectsNL.all()
      : await reader.collections.projects.all()

  return allProjects.map(project => {
    const { content, ...serializableEntry } = project.entry
    return {
      slug: project.slug,
      entry: serializableEntry,
    }
  })
}
export async function getAllProjectParams(locales: string[]) {
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
export async function getProject(lang: string, slug: string) {
  'use cache'
  // weeks is fine since app will be rebuilt when there is new content

  cacheLife('weeks')
  cacheTag('project')

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

export async function getTechnologies(lang: string) {
  'use cache'
  // weeks is fine since app will be rebuilt when there is new content

  cacheLife('weeks')
  cacheTag('technologies')

  const allTechnologies =
    lang === 'nl'
      ? await reader.collections.technologiesNL.all()
      : await reader.collections.technologies.all()

  const allProjects =
    lang === 'nl'
      ? await reader.collections.projectsNL.all()
      : await reader.collections.projects.all()

  return Promise.all(
    allTechnologies.map(async technology => {
      const { experience, projects, ...serializableEntry } = technology.entry
      const { node } = await technology.entry.experience()

      const renderable = Markdoc.transform(node)

      const populatedProjects = (projects || [])
        .map(projectSlug => {
          const project = allProjects.find(p => p.slug === projectSlug)
          if (!project) return null
          const { content, ...serializableProjectEntry } = project.entry
          return {
            slug: project.slug,
            ...serializableProjectEntry,
          }
        })
        .filter((p): p is NonNullable<typeof p> => p !== null)

      return {
        slug: technology.slug,
        ...serializableEntry,
        projects: populatedProjects,
        renderedExperience: JSON.parse(JSON.stringify(renderable)),
      }
    }),
  )
}
