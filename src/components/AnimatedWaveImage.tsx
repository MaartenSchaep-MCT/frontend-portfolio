'use client'

import Image from '@/components/Image'
import useBoop from '@/hooks/use-boop'

export default function AnimatedWaveImage({ blurUrl }: { blurUrl?: string }) {
  const [waveStyle, waveTrigger] = useBoop({
    timing: 2000,
    animation: 'hand-wave 2000ms cubic-bezier(0.25, 0.1, 0.25, 1)',
  })

  return (
    <div className="relative">
      <Image
        onMouseEnterAction={waveTrigger}
        className="relative z-2 max-w-3xs rounded-full"
        src="maarten_yxeq4r"
        alt="Profile picture of Maarten"
        width={240}
        height={240}
        sizes="240px"
        quality={85}
        loading="eager"
        preload={true}
        fetchPriority="high"
        blurUrl={blurUrl}
      />
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
        className="lucide lucide-hand-icon lucide-hand absolute top-[10%] right-[20%] h-10 w-10 origin-center opacity-0"
        style={waveStyle}
      >
        <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
        <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
        <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" />
        <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
      </svg>
    </div>
  )
}
