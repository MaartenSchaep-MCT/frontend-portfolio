'use client'

import useBoop from '../hooks/use-boop'
import ActionLink from './ActionLink'

export default function Footer() {
  const [iStyle, iTrigger] = useBoop({
    animation: 'i-base 600ms cubic-bezier(0.25, 0.1, 0.25, 1)',
    timing: 600,
  })
  const [iCircleStyle, iCircleTrigger] = useBoop({
    animation: 'i-circle 600ms cubic-bezier(0.25, 0.1, 0.25, 1)',
    timing: 600,
  })
  const [nStyle, nTrigger] = useBoop({
    animation: 'n 600ms cubic-bezier(0.25, 0.1, 0.25, 1)',
    timing: 600,
  })
  const [mailStyle, mailTrigger] = useBoop({
    scaleY: 1.1,
    scaleX: 0.8,
  })
  return (
    <footer className="py-06 px-09 m-auto flex w-full justify-center">
      <ActionLink
        href="mailto:contact@maartenschaep.com"
        isExternal={true}
        isTertiary={true}
        text="Mail"
        iconLeft={true}
        onMouseEnter={mailTrigger}
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
            style={mailStyle}
            className="lucide lucide-mail-icon lucide-mail h-4 w-4 origin-bottom overflow-visible"
          >
            <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
            <rect x="2" y="4" width="20" height="16" rx="2" />
          </svg>
        }
      />
      <ActionLink
        href="https://www.linkedin.com/in/maartenschaep/"
        isExternal={true}
        isTertiary={true}
        text="LinkedIn"
        iconLeft={true}
        onMouseEnter={() => {
          iTrigger()
          iCircleTrigger()
          nTrigger()
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
            className="lucide lucide-linkedin-icon lucide-linkedin icon h-4 w-4 origin-bottom overflow-visible"
          >
            <path
              d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
              className="n origin-bottom overflow-visible"
              style={nStyle}
            ></path>
            <rect
              width="4"
              height="12"
              x="2"
              y="9"
              className="i-base origin-bottom overflow-visible"
              style={iStyle}
            ></rect>
            <circle
              cx="4"
              cy="4"
              r="2"
              className="i-circle origin-bottom overflow-visible"
              style={iCircleStyle}
            ></circle>
          </svg>
        }
      />
    </footer>
  )
}
