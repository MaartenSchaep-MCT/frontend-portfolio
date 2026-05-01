'use client'

import { useState } from 'react'
import Image from 'next/image'

import { TechnologyDialog } from '@/components/TechnologyDialog'
import { Dictionary } from '@/lib/dictionaries'
import { Technology } from '@/types/technology'

export default function TechnologyCard({
  technology,
  children,
  lang,
  dictionary,
}: {
  technology: Technology
  children: React.ReactNode
  lang: string
  dictionary: Dictionary
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsDialogOpen(true)}
        className="gap-05 bg-layer2 py-04 px-06 rounded-m hover:bg-layer3 ease-normal flex cursor-pointer items-center text-left transition-colors"
      >
        <Image
          src={technology.icon}
          alt={technology.title}
          width={32}
          height={32}
          quality={100}
        />
        <div className="flex flex-col">
          <h2>{technology.title}</h2>
          <span className="text-soft text-2 leading-05 font-normal">
            {technology.description}
          </span>
        </div>
      </button>
      <TechnologyDialog
        technology={technology}
        lang={lang}
        dictionary={dictionary}
        isDialogOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      >
        {children}
      </TechnologyDialog>
    </>
  )
}
