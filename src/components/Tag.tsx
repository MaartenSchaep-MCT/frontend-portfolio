export default function Tag({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  return (
    <span
      className={`px-02 py-01 bg-layer3 text-2 text-light rounded-s font-mono font-normal ${className}`}
    >
      {text}
    </span>
  )
}
