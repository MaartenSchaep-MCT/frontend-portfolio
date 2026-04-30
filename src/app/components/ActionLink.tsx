import Link from 'next/link'

export default function ActionLink({
  text,
  isCTA,
  isTertiary,
  href,
  isExternal,
  icon,
  onMouseEnter,
  className,
}: {
  text: string
  isCTA?: boolean
  isTertiary?: boolean

  href: string
  isExternal?: boolean
  icon?: React.ReactNode
  onMouseEnter?: () => void
  className?: string
}) {
  const btnClass = `transition-colors grow md:grow-0 ease-normal py-04 px-06 rounded-m cursor-pointer flex gap-03 font-normal items-center justify-center ${isCTA ? 'bg-brand text-cta hover:bg-brand-alt' : 'bg-layer2 text-neutral hover:bg-layer3'} ${className ?? ''} ${isTertiary ? 'bg-transparent font-mono text-2 hover:underline hover:bg-transparent' : ''}`

  if (isExternal) {
    return (
      <a
        className={`${btnClass} `}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={onMouseEnter}
      >
        {text}
        {icon && <span className="overflow-visible">{icon}</span>}
      </a>
    )
  }
  if (href.startsWith('#')) {
    return (
      <a className={btnClass} href={href} onMouseEnter={onMouseEnter}>
        {text}
        {icon && <span className="overflow-visible">{icon}</span>}
      </a>
    )
  }

  return (
    <Link href={href} className={btnClass} onMouseEnter={onMouseEnter}>
      {text}
      {icon && <span className="overflow-visible">{icon}</span>}
    </Link>
  )
}
