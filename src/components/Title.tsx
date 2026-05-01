import { JSX } from 'react'

export default function TypoHeader({
  element = 'h1',
  level = 'headline',
  children,
  className,
}: {
  element: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  level: 'headline' | 'headline-small' | 'subheadline'
  children: JSX.Element | string
  className?: string
}) {
  const Element = element

  const getClassName = () => {
    switch (level) {
      case 'headline':
        return 'leading-heading text-heading font-heading font-sans'
      case 'headline-small':
        return 'text-7 leading-07 font-medium'
      case 'subheadline':
        return 'text-5 leading-07 font-semibold'
    }
  }
  return (
    //custom html element according to the element prop
    <Element className={`${getClassName()} ${className}`}>{children}</Element>
  )
}
