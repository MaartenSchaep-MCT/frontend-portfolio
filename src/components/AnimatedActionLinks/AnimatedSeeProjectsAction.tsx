'use client'

import ActionLink from '@/components/ActionLink'
import useBoop from '@/hooks/use-boop'

export default function AnimatedSeeProjectsAction({ text }: { text: string }) {
  const [arrowStyle, arrowTrigger] = useBoop({
    x: 5,
  })
  return (
    <ActionLink
      text={text}
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
  )
}
