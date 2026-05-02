import React from 'react'
import { notFound } from 'next/navigation'
import Markdoc from '@markdoc/markdoc'

import Container from '@/components/Container'
import { Hero } from '@/components/Hero'
import ProjectCard from '@/components/ProjectCard'
import Section from '@/components/Section'
import TechnologyCard from '@/components/TechnologyCard'
import { getProjects, getTechnologies } from '@/lib/data'
import { getDictionary, hasLocale, locales } from '@/lib/dictionaries'
import { setupFetchWithUserAgent } from '@/lib/fetch-setup'

setupFetchWithUserAgent()

export async function generateStaticParams() {
  return locales.map(locale => ({
    lang: locale,
  }))
}

export default async function Page({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params
  if (!hasLocale(lang)) {
    notFound()
  }

  const dictionary = await getDictionary(lang)
  const projects = await getProjects(lang)
  const technologies = await getTechnologies(lang)

  return (
    <Container>
      <Hero dictionary={dictionary} lang={lang} />
      <div className="flex flex-col gap-10">
        <Section>
          <Section.Title>{dictionary.technologies.technologies}</Section.Title>
          {technologies.length === 0 ? (
            <p>{dictionary.technologies.noTechnologies}</p>
          ) : (
            <Section.Grid cols={1} colsLarge={4}>
              {technologies.map(technology => (
                <TechnologyCard
                  dictionary={dictionary}
                  key={technology.slug}
                  technology={technology}
                  lang={lang}
                >
                  {Markdoc.renderers.react(
                    technology.renderedExperience,
                    React,
                  )}
                </TechnologyCard>
              ))}
            </Section.Grid>
          )}
        </Section>
        <Section>
          <Section.Title>{dictionary.projects.projects}</Section.Title>
          {projects.length === 0 ? (
            <p>{dictionary.projects.noProjects}</p>
          ) : (
            <Section.Grid id="projects" cols={1} colsMedium={2} colsLarge={2}>
              {projects.map(project => (
                <ProjectCard
                  key={project.slug}
                  project={project.entry}
                  slug={project.slug}
                  lang={lang}
                  dictionary={dictionary}
                />
              ))}
            </Section.Grid>
          )}
        </Section>
      </div>
    </Container>
  )
}
