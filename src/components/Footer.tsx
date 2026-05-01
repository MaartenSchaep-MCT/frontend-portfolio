import AnimatedLinkedInAction from '@/components/AnimatedActionLinks/AnimatedLinkedInAction'
import AnimatedMailAction from '@/components/AnimatedActionLinks/AnimatedMailAction'

export default function Footer() {
  return (
    <footer className="py-06 px-09 m-auto flex w-full justify-center">
      <AnimatedMailAction />
      <AnimatedLinkedInAction />
    </footer>
  )
}
