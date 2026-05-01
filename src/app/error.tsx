'use client'

import { useEffect } from 'react'

import ActionLink from '@/components/ActionLink'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
  return (
    <div className="gap-07 grid min-h-dvh place-content-center justify-center">
      <h2 className="text-heading font-mono">Something went wrong!</h2>
      <div className="gap-05 m-auto flex flex-col">
        <button
          onClick={() => reset()}
          className="ease-normal py-04 px-06 rounded-m gap-03 bg-brand text-cta hover:bg-brand-alt flex grow cursor-pointer items-center justify-center font-normal transition-colors md:grow-0"
        >
          Try again
        </button>
        <ActionLink
          text="Back to Home"
          href="/"
          isCTA={false}
          isExternal={false}
          className="w-fit self-center"
        />
      </div>
    </div>
  )
}
