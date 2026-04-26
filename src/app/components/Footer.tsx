import ActionLink from './ActionLink'

export default function Footer() {
  return (
    <footer className="py-06 px-09 m-auto flex w-full justify-center">
      <ActionLink
        href="mailto:contact@maartenschaep.com"
        isExternal={true}
        isTertiary={true}
        text="Mail"
      />
      <ActionLink
        href="https://www.linkedin.com/in/maartenschaep/"
        isExternal={true}
        isTertiary={true}
        text="LinkedIn"
      />
    </footer>
  )
}
