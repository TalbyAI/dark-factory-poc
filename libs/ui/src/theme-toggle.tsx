import { useEffect, useState } from 'react'
import { MoonStarIcon, SunMediumIcon } from 'lucide-react'
import { Button } from '#components/ui/button'
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
    <Button
      onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
      size="icon"
      variant="outline"
      className={cn(
        'relative rounded-xl bg-card/90 text-foreground shadow-soft backdrop-blur',
        className,
      )}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <SunMediumIcon className="size-4 rotate-0 scale-100 transition-transform dark:rotate-90 dark:scale-0" />
      <MoonStarIcon className="absolute size-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
