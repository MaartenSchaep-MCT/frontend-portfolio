'use client'

import ActionLink from '@/components/ActionLink'
import useBoop from '@/hooks/use-boop'

export default function AnimatedDownloadAction({
  lang,
  text,
}: {
  lang: string
  text: string
}) {
  const [downloadTrayStyle, downloadTrayTrigger] = useBoop({
    scaleX: 1.1,
    scaleY: 1.1,
  })
  const [downloadArrowStyle, downloadArrowTrigger] = useBoop({
    y: 3,
  })
  return (
    <ActionLink
      text={text}
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
          <path d="M12 15V3" className="arrow" style={downloadArrowStyle} />
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
  )
}
