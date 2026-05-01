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
  quality,
  sizes,
  className,
  loading,
  fetchPriority,
  preload,
  fill,
  blurUrl,
}: {
  src: string
  alt: string
  width: number
  height: number
  format?: string
  onMouseEnterAction?: () => void
  quality?: number
  sizes?: string
  className?: string
  loading?: 'eager' | 'lazy'
  fetchPriority?: 'high' | 'low'
  preload?: boolean
  fill?: boolean
  blurUrl?: string
}) {
  return (
    <CldImage
      format={format}
      onMouseEnter={onMouseEnter}
      src={src}
      alt={alt}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      sizes={sizes}
      className={className}
      loading={loading}
      fetchPriority={fetchPriority}
      preload={preload}
      placeholder={blurUrl ? 'blur' : undefined}
      blurDataURL={blurUrl}
      quality={quality}
    />
  )
}
