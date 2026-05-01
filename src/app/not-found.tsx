import ActionLink from '@/components/ActionLink'

export default function NotFound() {
  return (
    <div className="gap-07 grid min-h-dvh place-content-center text-center">
      <h1 className="text-heading font-heading leading-heading font-mono">
        404 Not Found
      </h1>
      <p> Oops, we couldn&apos;t find the page you were looking for. </p>
      <ActionLink
        text="Back to Home"
        href="/"
        isCTA={false}
        isExternal={false}
        className="w-fit self-center justify-self-center"
      />
    </div>
  )
}
