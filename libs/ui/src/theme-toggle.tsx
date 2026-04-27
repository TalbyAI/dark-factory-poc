import { MoonStarIcon, SunMediumIcon } from 'lucide-react'
import { Button } from '#components/ui/button'
import { cn } from './cn'
import { useTheme } from './theme'

export function ThemeToggle({ className }: { readonly className?: string }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      onClick={toggleTheme}
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
