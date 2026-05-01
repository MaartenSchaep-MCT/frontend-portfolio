import { cacheLife, cacheTag } from 'next/cache'
import { createReader } from '@keystatic/core/reader'
import { createGitHubReader } from '@keystatic/core/reader/github'
import Markdoc, { RenderableTreeNodes } from '@markdoc/markdoc'

import { Project } from '@/types/project'
import { ProjectDetail } from '@/types/project-detail'
import { ProjectParam } from '@/types/project-param'
import { ProjectWithSlug } from '@/types/project-with-slug'
import { TechnologyWithDetails } from '@/types/technology-with-details'

import keystaticConfig from '../../keystatic.config'

export const reader =
  process.env.NODE_ENV === 'development'
    ? createReader(process.cwd(), keystaticConfig)
    : createGitHubReader(keystaticConfig, {
        repo: `${process.env.GITHUB_USER}/${process.env.GITHUB_REPO}`,
        token: process.env.KEYSTATIC_GITHUB_TOKEN,
      })
export async function getProjects(lang: string): Promise<ProjectWithSlug[]> {
  'use cache'
  // weeks is fine since app will be rebuilt when there is new content
  cacheLife('weeks')
  cacheTag('projects')
  try {
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
  } catch (error) {
    console.error(error)
    return []
  }
}
export async function getAllProjectParams(
  locales: string[],
): Promise<ProjectParam[]> {
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
export async function getProject(
  lang: string,
  slug: string,
): Promise<ProjectDetail | null> {
  'use cache'
  // weeks is fine since app will be rebuilt when there is new content

  cacheLife('weeks')
  cacheTag('project')

  try {
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
    const { content, ...serializableEntry } = project
    // not returning entire object because classes and functions aren't supported in use cache
    return {
      ...(serializableEntry as Project),
      renderable: JSON.parse(JSON.stringify(renderable)),
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function getTechnologies(
  lang: string,
): Promise<TechnologyWithDetails[]> {
  'use cache'
  // weeks is fine since app will be rebuilt when there is new content

  cacheLife('weeks')
  cacheTag('technologies')
  try {
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

        const renderable = Markdoc.transform(node) as RenderableTreeNodes

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
  } catch (error) {
    console.error(error)
    return []
  }
}
