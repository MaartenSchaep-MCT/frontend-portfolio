'use client'

//use client because of mouseEnter
import { CldImage } from 'next-cloudinary'

export default function Image({
  src,
  alt,
  width,
  height,
  format,
  onMouseEnter,
  sizes,
  className,
  loading,
}: {
  src: string
  alt: string
  width: number
  height: number
  format?: string
  onMouseEnter?: () => void
  sizes?: string
  className?: string
  loading?: 'eager' | 'lazy'
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
    />
  )
}
