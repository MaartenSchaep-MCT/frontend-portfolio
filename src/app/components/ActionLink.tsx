'use client'

import Link from 'next/link'

import useBoop from '../hooks/use-boop'

export default function ActionLink({
  text,
  isCTA,
  isTertiary,
  href,
  isExternal,
  icon,
  onMouseEnter,
  className,
  iconLeft,
}: {
  text: string
  isCTA?: boolean
  isTertiary?: boolean

  href: string
  isExternal?: boolean
  icon?: React.ReactNode
  onMouseEnter?: () => void
  className?: string
  iconLeft?: boolean
}) {
  const btnClass = `transition-colors flex grow md:grow-0 ease-normal py-04 px-06 rounded-m cursor-pointer flex gap-03 font-normal items-center justify-center ${isCTA ? 'bg-brand text-cta hover:bg-brand-alt' : 'bg-layer2 text-neutral hover:bg-layer3'} ${className ?? ''} ${isTertiary ? 'bg-transparent font-mono text-2 hover:underline hover:bg-transparent' : ''}`
  const [arrowStyle, arrowTrigger] = useBoop({
    x: 2,
    y: -2,
  })
  const [boxStyle, boxTrigger] = useBoop({
    scaleX: 0.9,
    scaleY: 0.9,
  })
  if (isExternal) {
    return (
      <a
        className={`${btnClass} ${iconLeft ? 'flex-row-reverse' : ''}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => {
          arrowTrigger()
          boxTrigger()
          onMouseEnter?.()
        }}
      >
        {text}

        <span className="overflow-visible">
          {icon ? (
            icon
          ) : !isTertiary ? (
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
              className="lucide lucide-external-link h-4 w-4 origin-center"
            >
              <path
                d="M15 3h6v6"
                style={arrowStyle}
                className="origin-center"
              />
              <path
                d="M10 14 21 3"
                style={arrowStyle}
                className="origin-center"
              />
              <path
                d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                style={boxStyle}
                className="origin-center"
              />
            </svg>
          ) : null}
        </span>
      </a>
    )
  }
  if (href.startsWith('#')) {
    return (
      <a
        className={`${btnClass} ${iconLeft ? 'flex-row-reverse' : ''}`}
        href={href}
        onMouseEnter={onMouseEnter}
      >
        {text}
        {icon && <span className="overflow-visible">{icon}</span>}
      </a>
    )
  }

  return (
    <Link
      href={href}
      className={`${btnClass} ${iconLeft ? 'flex-row-reverse' : ''}`}
      onMouseEnter={onMouseEnter}
    >
      {text}
      {icon && <span className="overflow-visible">{icon}</span>}
    </Link>
  )
}
