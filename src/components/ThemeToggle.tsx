'use client'

export default function ThemeToggle() {
  const onClick = () => {
    if (typeof window !== 'undefined') {
      const currentTheme = document.documentElement.classList.contains('dark')
        ? 'dark'
        : 'light'
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
      if (!document.startViewTransition) {
        document.documentElement.classList.remove(currentTheme)
        document.documentElement.classList.add(newTheme)
        localStorage.setItem('theme', newTheme)
        return
      }
      document.startViewTransition(() => {
        document.documentElement.classList.remove(currentTheme)
        document.documentElement.classList.add(newTheme)
        localStorage.setItem('theme', newTheme)
      })
    }
  }

  return (
    <button
      className="p-03 bg-layer2 hover:bg-layer3 ease-normal flex cursor-pointer items-center overflow-hidden rounded-full transition-colors"
      onClick={onClick}
    >
      <span className="sr-only">Toggle theme</span>

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
        className="lucide lucide-moon-icon lucide-moon dark-icon icon hidden dark:block"
      >
        <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"></path>
      </svg>

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
        className="lucide lucide-sun-icon lucide-sun light-icon dark:hidden"
      >
        <circle cx="12" cy="12" r="4" className="circle"></circle>
        <path d="M12 2v2" className="path1"></path>
        <path d="M12 20v2" className="path2"></path>
        <path d="m4.93 4.93 1.41 1.41" className="path3"></path>
        <path d="m17.66 17.66 1.41 1.41" className="path4"></path>
        <path d="M2 12h2" className="path5"></path>
        <path d="M20 12h2" className="path6"></path>
        <path d="m6.34 17.66-1.41 1.41" className="path7"></path>
        <path d="m19.07 4.93-1.41 1.41" className="path8"></path>
      </svg>
    </button>
  )
}
