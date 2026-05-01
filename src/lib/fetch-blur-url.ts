import { getCldImageUrl } from 'next-cloudinary'
import { cacheLife } from 'next/cache'

export async function fetchBlurUrl(src: string): Promise<string | undefined> {
  'use cache'
  cacheLife('days')
  try {
    const imageUrl = getCldImageUrl({
      src: src,
      width: 100,
      quality: 'low',
      effects: [{ blur: '1000' }],
    })

    const response = await fetch(imageUrl)
    const arrayBuffer = await response.arrayBuffer()

    const bytes = new Uint8Array(arrayBuffer)
    let binary = ''
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i])
    }
    const base64 = btoa(binary)

    const mimeType = response.headers.get('content-type') || 'image/jpeg'

    return `data:${mimeType};base64,${base64}`
  } catch (error) {
    if (error instanceof Error) {
      return undefined
    }
    console.error('Failed to fetch blur URL:', error)
    return undefined
  }
}
