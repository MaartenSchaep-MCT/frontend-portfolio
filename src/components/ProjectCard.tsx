import ActionLink from '@/components/ActionLink'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import type { Dictionary } from '@/lib/dictionaries'
import { Project } from '@/types/project'

export default function ProjectCard({
  project,
  slug,
  lang,
  dictionary,
}: {
  project: Project
  slug: string
  lang: string
  dictionary: Dictionary
}) {
  return (
    <div className="bg-layer2 p-06 gap-05 flex flex-col rounded-xl">
      <div className="relative aspect-video">
        <Image
          src={project.thumbnail.src}
          alt={project.thumbnail.alt ? project.thumbnail.alt : project.title}
          width={project.thumbnail.width ?? 0}
          height={project.thumbnail.height ?? 0}
          fill
          quality={75}
          sizes="(max-width: 768px) 100vw, max-width(1024px) 50vw, 40rem"
          className="rounded-m object-cover"
        />
      </div>
      <div className="grow">
        <h3 className="text-large leading-07 font-heading">{project.title}</h3>
        <p className="font-normal">{project.description}</p>
      </div>
      <div className="gap-03 flex flex-wrap">
        {project.tags.map(tag => (
          <Tag key={tag} text={tag} />
        ))}
      </div>
      <ActionLink
        href={`/${lang}/projects/${slug}`}
        text={dictionary.projects.viewProject}
        isExternal={true}
        className="bg-layer3 hover:bg-layer4"
        ariaLabel={`${dictionary.projects.viewProject} ${project.title}`}
      />
    </div>
  )
}
