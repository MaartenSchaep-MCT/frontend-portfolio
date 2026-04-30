import React from 'react'
import { cacheLife } from 'next/cache'
import { notFound } from 'next/navigation'
import { createReader } from '@keystatic/core/reader'
import { createGitHubReader } from '@keystatic/core/reader/github'
import Markdoc from '@markdoc/markdoc'

import keystaticConfig from '../../../keystatic.config'
import Container from '../components/Container'
import { Hero } from '../components/Hero'
import ProjectCard from '../components/ProjectCard'
import TechnologyCard from '../components/TechnologyCard'
import { getDictionary, hasLocale, locales } from '../dictionaries'

if (typeof window === 'undefined') {
  const originalFetch = globalThis.fetch

  globalThis.fetch = (url, init) => {
    const headers = new Headers(init?.headers)

    // GitHub API requires a User-Agent. Cloudflare doesn't always provide one.
    if (!headers.has('User-Agent')) {
      headers.set('User-Agent', 'Keystatic-App/1.0.0')
    }

    return originalFetch(url, {
      ...init,
      headers,
    })
  }
}
const BUILT_AT = new Date().toISOString()
const reader =
  process.env.NODE_ENV === 'development'
    ? createReader(process.cwd(), keystaticConfig)
    : createGitHubReader(keystaticConfig, {
        repo: `${process.env.GITHUB_USER}/${process.env.GITHUB_REPO}`,
        token: process.env.KEYSTATIC_GITHUB_TOKEN,
      })
export async function generateStaticParams() {
  return locales.map(locale => ({
    lang: locale,
  }))
}
async function getProjects(lang: string) {
  'use cache'
  cacheLife('weeks')

  const allProjects =
    lang === 'nl'
      ? await reader.collections.projectsNL.all()
      : await reader.collections.projects.all()
  console.log('projects read:', allProjects.length)
  return allProjects.map(project => {
    const { content, ...serializableEntry } = project.entry
    return {
      slug: project.slug,
      entry: serializableEntry,
    }
  })
}
async function getTechnologies(lang: string) {
  // 'use cache'
  // cacheLife('days')
  console.log('--- Debugging GitHub Request TECHNOLOGIES ---')
  console.log(
    'Repo String:',
    `${process.env.GITHUB_USER}/${process.env.GITHUB_REPO}`,
  )
  // Check if token exists (don't log the whole thing for security, just the length)
  console.log('Token defined:', !!process.env.KEYSTATIC_GITHUB_TOKEN)
  console.log('getTechnologies')

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

      const populatedProjects = (projects || []).map(projectSlug => {
        const project = allProjects.find(p => p.slug === projectSlug)
        return {
          slug: projectSlug,
          title: project?.entry.title || projectSlug,
          description: project?.entry.description || null,
        }
      })

      return {
        slug: technology.slug,
        entry: {
          ...serializableEntry,
          projects: populatedProjects,
        },
        renderedExperience: JSON.parse(JSON.stringify(renderable)),
      }
    }),
  )
}
export default async function Page({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params

  if (!hasLocale(lang)) {
    notFound()
  }

  const dictionary = await getDictionary(lang)
  const projects = await getProjects(lang)
  const technologies = await getTechnologies(lang)

  console.log(projects)
  return (
    <Container>
      <p>Built at: {BUILT_AT}</p>
      <div>Amount of projects: {projects.length}</div>
      <Hero dictionary={dictionary} lang={lang} />

      <div className="gap-09 flex flex-col">
        <section className="gap-05 flex flex-col">
          <h2 className="text-7 leading-07 font-medium">
            {dictionary.technologies.technologies}
          </h2>
          <div className="gap-06 grid grid-cols-4">
            {technologies.map(technology => (
              <TechnologyCard
                key={technology.slug}
                technology={technology.entry}
                lang={lang}
              >
                {Markdoc.renderers.react(technology.renderedExperience, React)}
              </TechnologyCard>
            ))}
          </div>
        </section>
        <section className="gap-05 flex flex-col">
          <h2 className="text-7 leading-07 font-medium">
            {dictionary.projects.projects}
          </h2>
          <div className="grid grid-cols-2" id="projects">
            {projects.map(project => (
              <ProjectCard
                key={project.slug}
                project={project.entry}
                slug={project.slug}
                lang={lang}
                dictionary={dictionary}
              />
            ))}
          </div>
        </section>
      </div>
    </Container>
  )
}
