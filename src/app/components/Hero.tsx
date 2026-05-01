import AnimatedDownloadAction from '@/app/components/AnimatedActionLinks/AnimatedDownloadAction'
import AnimatedSeeProjectsAction from '@/app/components/AnimatedActionLinks/AnimatedSeeProjectsAction'
import AnimatedWaveImage from '@/app/components/AnimatedWaveImage'
import Title from '@/app/components/Title'

import type { Dictionary } from '../dictionaries'

export const Hero = ({
  dictionary,
  lang,
}: {
  dictionary: Dictionary
  lang: string
}) => {
  return (
    <div className="gap-09 py-07 flex flex-col-reverse items-center justify-center md:flex-row md:py-13">
      <div className="gap-05 flex flex-col justify-center">
        <div className="gap-04 flex flex-col justify-center">
          <Title element="h1" level="headline">
            {dictionary.hero.welcomeMessage}
          </Title>
          <p className="text-5 leading-07 font-normal">
            {dictionary.hero.welcomeDescription}
          </p>
        </div>
        <div className="gap-07 jsutify-center flex flex-wrap">
          <AnimatedDownloadAction
            text={dictionary.hero.downloadResume}
            lang={lang}
          />
          <AnimatedSeeProjectsAction text={dictionary.hero.seeProjects} />
        </div>
      </div>
      <AnimatedWaveImage />
    </div>
  )
}
