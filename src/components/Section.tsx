import { JSX } from 'react'

import Title from '@/components/Title'

const getGridColsClass = (cols: number = 1): string => {
  const colsMap: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  }
  return colsMap[cols] || 'grid-cols-1'
}

const getMediumColsClass = (cols: number = 2): string => {
  const colsMap: Record<number, string> = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
    5: 'md:grid-cols-5',
    6: 'md:grid-cols-6',
  }
  return colsMap[cols] || 'md:grid-cols-2'
}

const getLargeColsClass = (cols: number = 4): string => {
  const colsMap: Record<number, string> = {
    1: 'lg:grid-cols-1',
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
    5: 'lg:grid-cols-5',
    6: 'lg:grid-cols-6',
  }
  return colsMap[cols] || 'lg:grid-cols-4'
}

const Section = ({ children }: { children: React.ReactNode }) => {
  return <div className="gap-05 flex flex-col">{children}</div>
}

const SectionTitle = ({ children }: { children: JSX.Element | string }) => {
  return (
    <Title element="h2" level="headline-small">
      {children}
    </Title>
  )
}
const SectionGrid = ({
  children,
  id,
  cols,
  colsMedium,
  colsLarge,
}: {
  children: React.ReactNode
  id?: string
  cols?: number
  colsMedium?: number
  colsLarge?: number
}) => {
  return (
    <div
      className={`gap-06 grid ${getGridColsClass(cols)} ${getMediumColsClass(colsMedium)} ${getLargeColsClass(colsLarge)}`}
      id={id}
    >
      {children}
    </div>
  )
}

Section.Title = SectionTitle
Section.Grid = SectionGrid

export default Section
