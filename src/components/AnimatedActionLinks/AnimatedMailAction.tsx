'use client'

import ActionLink from '@/components/ActionLink'
import useBoop from '@/hooks/use-boop'

export default function AnimatedMailAction() {
  const [mailStyle, mailTrigger] = useBoop({
    scaleY: 1.1,
    scaleX: 0.8,
  })
  return (
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
  )
}
