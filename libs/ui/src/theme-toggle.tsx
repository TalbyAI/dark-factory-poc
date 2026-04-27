import { useEffect, useState } from 'react'
import { cn } from './cn'

type Theme = 'light' | 'dark'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const stored = localStorage.getItem('theme') as Theme | null
  if (stored) return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export function ThemeToggle({ className }: { readonly className?: string }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <button
      type="button"
      onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
      className={cn(
        'inline-flex size-10 items-center justify-center rounded-xl',
        'border border-border bg-card text-foreground',
        'transition-colors hover:bg-secondary',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className,
      )}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Sun icon */}
      <svg
        className="size-5 rotate-0 scale-100 transition-transform dark:rotate-90 dark:scale-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
      {/* Moon icon */}
      <svg
        className="absolute size-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>
    </button>
  )
}
