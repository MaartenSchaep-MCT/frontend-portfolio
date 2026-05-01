import AnimatedDownloadAction from '@/components/AnimatedActionLinks/AnimatedDownloadAction'
import AnimatedSeeProjectsAction from '@/components/AnimatedActionLinks/AnimatedSeeProjectsAction'
import AnimatedWaveImage from '@/components/AnimatedWaveImage'
import Title from '@/components/Title'
import type { Dictionary } from '@/lib/dictionaries'
import { fetchBlurUrl } from '@/lib/fetch-blur-url'

export const Hero = async ({
  dictionary,
  lang,
}: {
  dictionary: Dictionary
  lang: string
}) => {
  let blurUrl: string | undefined
  try {
    blurUrl = await fetchBlurUrl('maarten_yxeq4r')
  } catch (e) {
    console.error(e)
  }
  return (
    <section className="gap-09 py-07 flex flex-col-reverse items-center justify-center md:flex-row md:py-13">
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
      <AnimatedWaveImage blurUrl={blurUrl} />
    </section>
  )
}
