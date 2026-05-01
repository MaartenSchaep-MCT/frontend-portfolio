'use client'

//use client because of mouseEnter and because CldImage is a client component
import { CldImage } from 'next-cloudinary'

export default function Image({
  src,
  alt,
  width,
  height,
  format,
  onMouseEnterAction: onMouseEnter,
  sizes,
  className,
  loading,
  fetchPriority,
}: {
  src: string
  alt: string
  width: number
  height: number
  format?: string
  onMouseEnterAction?: () => void
  sizes?: string
  className?: string
  loading?: 'eager' | 'lazy'
  fetchPriority?: 'high' | 'low'
}) {
  return (
    <CldImage
      format={format}
      onMouseEnter={onMouseEnter}
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      className={className}
      loading={loading}
      fetchPriority={fetchPriority}
    />
  )
}
