'use client'

import type { Dictionary } from '../dictionaries'
import useBoop from '../hooks/use-boop'
import ActionLink from './ActionLink'
import Image from './Image'

export const Hero = ({
  dictionary,
  lang,
}: {
  dictionary: Dictionary
  lang: string
}) => {
  const [downloadTrayStyle, downloadTrayTrigger] = useBoop({
    scale: 1.1,
  })
  const [downloadArrowStyle, downloadArrowTrigger] = useBoop({
    y: 3,
  })
  const [arrowStyle, arrowTrigger] = useBoop({
    x: 5,
  })
  const [waveStyle, waveTrigger] = useBoop({
    timing: 2000,
    animation: 'hand-wave 2000ms cubic-bezier(0.25, 0.1, 0.25, 1)',
  })
  return (
    <div className="gap-09 flex items-center justify-center py-13">
      <div className="gap-05 flex flex-col justify-center">
        <div className="gap-04 flex flex-col justify-center">
          <h1 className="leading-heading text-heading font-heading font-sans">
            {dictionary.hero.welcomeMessage}
          </h1>
          <p className="text-5 leading-07 font-normal">
            {dictionary.hero.welcomeDescription}
          </p>
        </div>
        <div className="gap-07 jsutify-center flex flex-wrap">
          <ActionLink
            text={dictionary.hero.downloadResume}
            href={`/resume/${lang}/resume_public.pdf`}
            isExternal={true}
            onMouseEnter={() => {
              downloadTrayTrigger()
              downloadArrowTrigger()
            }}
            icon={
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
                className="lucide lucide-download-icon lucide-download h-4 w-4 overflow-visible"
              >
                <path
                  d="M12 15V3"
                  className="arrow"
                  style={downloadArrowStyle}
                />
                <path
                  d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                  className="tray origin-bottom"
                  style={downloadTrayStyle}
                />
                <path
                  d="m7 10 5 5 5-5"
                  className="arrow-head"
                  style={downloadArrowStyle}
                />
              </svg>
            }
          />
          <ActionLink
            text={dictionary.hero.seeProjects}
            isCTA={true}
            href="#projects"
            isExternal={false}
            onMouseEnter={() => {
              arrowTrigger()
            }}
            icon={
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
                className="lucide lucide-arrow-right-icon lucide-arrow-right h-4 w-4 overflow-visible"
              >
                <path d="M5 12h14" style={arrowStyle} />
                <path d="m12 5 7 7-7 7" style={arrowStyle} />
              </svg>
            }
          />
        </div>
      </div>
      <div className="relative">
        <Image
          onMouseEnter={waveTrigger}
          format="webp"
          className="relative z-2 max-w-3xs rounded-full"
          src="maarten_yxeq4r"
          alt="Profile picture of Maarten"
          width={240}
          height={240}
          sizes="(max-width: 768px) 100vw, 768px"
          loading="eager"
          fetchPriority="high"
        />
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
          className="lucide lucide-hand-icon lucide-hand absolute top-[10%] right-[20%] h-10 w-10 origin-center opacity-0"
          style={waveStyle}
        >
          <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
          <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
          <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" />
          <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
        </svg>
      </div>
    </div>
  )
}
