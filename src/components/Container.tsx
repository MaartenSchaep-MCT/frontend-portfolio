export default function Container({ children }: { children: React.ReactNode }) {
  return <div className="md:px-07 px-06 mx-auto max-w-7xl">{children}</div>
}
