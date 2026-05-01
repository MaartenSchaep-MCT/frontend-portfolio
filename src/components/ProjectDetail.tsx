import { JSX } from 'react'

import ActionLink from '@/components/ActionLink'
import Container from '@/components/Container'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import Title from '@/components/Title'
import { ProjectLink } from '@/types/project-link'

const ProjectDetail = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <div className='text-left" mx-auto flex w-full max-w-3xl flex-col gap-4 py-6'>
        {children}
      </div>
    </Container>
  )
}

const ProjectImage = ({
  src,
  alt,
  width,
  height,
  loading,
  fetchPriority,
  preload,
  quality,
  blurUrl,
}: {
  src: string
  alt: string
  width: number
  height: number
  loading: 'lazy' | 'eager'
  fetchPriority: 'high' | 'low'
  preload: boolean
  quality: number
  blurUrl?: string
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes="(max-width: 768px) 100vw, 80rem"
      className="rounded-l"
      loading={loading}
      fetchPriority={fetchPriority}
      preload={preload}
      quality={quality}
      blurUrl={blurUrl}
    />
  )
}
const ProjectTitle = ({ children }: { children: JSX.Element | string }) => {
  return (
    <Title element="h1" level="headline">
      {children}
    </Title>
  )
}
const ProjectDescription = ({
  children,
}: {
  children: JSX.Element | string
}) => {
  return <p>{children}</p>
}
const ProjectTags = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map(tag => (
        <Tag key={tag} text={tag} className="bg-layer2"></Tag>
      ))}
    </div>
  )
}
const ProjectLinks = ({ links }: { links: ProjectLink[] }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {links.map(link => (
        <ActionLink
          isCTA={link.isCTA}
          key={link.url}
          href={link.url}
          isExternal={true}
          text={link.title}
        />
      ))}
    </div>
  )
}
const ProjectContent = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>
}

ProjectDetail.Image = ProjectImage
ProjectDetail.Title = ProjectTitle
ProjectDetail.Description = ProjectDescription
ProjectDetail.Tags = ProjectTags
ProjectDetail.Links = ProjectLinks
ProjectDetail.Content = ProjectContent

export default ProjectDetail
