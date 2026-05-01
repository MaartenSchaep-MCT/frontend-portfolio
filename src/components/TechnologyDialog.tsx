import { useEffect, useRef } from 'react'
import Image from 'next/image'

import { Dictionary } from '@/lib/dictionaries'
import { Technology } from '@/types/technology'

import ProjectCard from './ProjectCard'
import Title from './Title'

export const TechnologyDialog = ({
  technology,
  isDialogOpen,
  onClose,
  dictionary,
  children,
  lang,
}: {
  technology: Technology
  isDialogOpen: boolean
  onClose: () => void
  dictionary: Dictionary
  children: React.ReactNode
  lang: string
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isDialogOpen) {
      if (!dialog.open) {
        dialog.showModal()
      }
    } else {
      if (dialog.open) {
        dialog.close()
      }
    }
  }, [isDialogOpen])
  return (
    <dialog
      closedby="any"
      ref={dialogRef}
      onClose={onClose}
      className="md:px-07 md:py-06 fixed mx-auto max-h-dvh w-full max-w-6xl transform overflow-hidden overscroll-contain bg-transparent p-0 backdrop:bg-black/80 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
    >
      <div className="scrollbar-wide text-neutral bg-layer1 py-06 px-07 max-h-dvh overflow-x-hidden overflow-y-auto overscroll-contain rounded-xl md:max-h-[90vh]">
        <div className="flex items-center justify-between">
          <div className="py-04 pr-06 rounded-m gap-05 flex items-center text-left">
            <Image
              src={technology.icon}
              alt={technology.title}
              width={32}
              height={32}
            />
            <div className="flex flex-col">
              <h2>{technology.title}</h2>
              <span className="text-soft text-2 leading-05 font-normal">
                {technology.description}
              </span>
            </div>
          </div>
          <form method="dialog">
            <button autoFocus={true} className="group cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x-icon lucide-x ease-normal transition-transform group-hover:scale-125"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </form>
        </div>
        <div className="pt-05 gap-03 flex flex-col">
          {children ? (
            <>
              <Title level="subheadline" element="h3">
                {dictionary.technologies.myExperience}
              </Title>
              {children}
            </>
          ) : null}
        </div>
        {technology.projects.length > 0 ? (
          <div className="pt-05 gap-03 flex flex-col">
            <Title level="subheadline" element="h3">
              {dictionary.technologies.featuredProjects}
            </Title>
            <div className="gap-06 grid grid-cols-1 md:grid-cols-3">
              {technology.projects.map(project => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  slug={project.slug ?? `unknown-project`}
                  lang={lang}
                  dictionary={dictionary}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </dialog>
  )
}
