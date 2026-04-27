import { type ReactNode, useEffect, useState } from 'react'
import { MenuIcon, XIcon } from 'lucide-react'
import { Button } from '#components/ui/button'
import { cn } from './cn'

export interface AppShellNavigationRenderProps {
  readonly onNavigate?: () => void
}

export type AppShellNavigationSlot =
  | ReactNode
  | ((props: AppShellNavigationRenderProps) => ReactNode)

export interface AppShellProps {
  readonly brand: ReactNode
  readonly navigation: AppShellNavigationSlot
  readonly sidebarFooter?: ReactNode
  readonly topbar?: ReactNode
  readonly children: ReactNode
  readonly className?: string
  readonly contentClassName?: string
}

export function AppShell({
  brand,
  navigation,
  sidebarFooter,
  topbar,
  children,
  className,
  contentClassName,
}: AppShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (!mobileOpen) return undefined

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }

    globalThis.addEventListener('keydown', handleKeyDown)
    return () => globalThis.removeEventListener('keydown', handleKeyDown)
  }, [mobileOpen])

  return (
    <div className={cn('min-h-screen px-3 py-3 sm:px-4 sm:py-4', className)}>
      <div className="mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-[1600px] gap-4 lg:gap-5">
        <button
          type="button"
          aria-hidden={!mobileOpen}
          tabIndex={mobileOpen ? 0 : -1}
          className={cn(
            'fixed inset-0 z-40 bg-foreground/35 backdrop-blur-sm transition-opacity lg:hidden',
            mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
          )}
          onClick={() => setMobileOpen(false)}
        />

        <AppShellSidebar
          brand={brand}
          navigation={navigation}
          footer={sidebarFooter}
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />

        <div className="relative flex min-w-0 flex-1 flex-col rounded-[2rem] border border-border/70 bg-card/70 shadow-card backdrop-blur-xl">
          <AppShellHeader>
            <Button
              className="lg:hidden"
              size="icon"
              variant="outline"
              aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? <XIcon /> : <MenuIcon />}
            </Button>
            <div className="min-w-0 flex-1">{topbar}</div>
          </AppShellHeader>
          <AppShellContent className={contentClassName}>{children}</AppShellContent>
        </div>
      </div>
    </div>
  )
}

interface AppShellSidebarProps {
  readonly brand: ReactNode
  readonly navigation: AppShellNavigationSlot
  readonly footer?: ReactNode
  readonly mobileOpen?: boolean
  readonly onClose?: () => void
  readonly className?: string
}

export function AppShellSidebar({
  brand,
  navigation,
  footer,
  mobileOpen = false,
  onClose,
  className,
}: AppShellSidebarProps) {
  return (
    <aside
      className={cn(
        'fixed inset-y-3 left-3 z-50 flex w-[min(21rem,calc(100vw-1.5rem))] flex-col rounded-[2rem] border border-border/70 bg-card/88 p-3 shadow-elevated backdrop-blur-xl transition-transform duration-200 lg:static lg:z-auto lg:w-80 lg:translate-x-0 lg:shadow-card',
        mobileOpen ? 'translate-x-0' : '-translate-x-[calc(100%+1rem)] lg:translate-x-0',
        className,
      )}
    >
      <AppShellBrand>{brand}</AppShellBrand>
      <div className="mt-6 flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto pr-1">
        {renderAppShellNavigation(navigation, onClose)}
        {footer ? <div className="mt-auto">{footer}</div> : null}
      </div>
    </aside>
  )
}

export function AppShellBrand({ children, className }: { readonly children: ReactNode; readonly className?: string }) {
  return (
    <div
      className={cn(
        'rounded-[1.6rem] border border-border/70 bg-linear-to-br from-background via-background to-accent/30 px-4 py-4 shadow-soft',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function AppShellHeader({ children, className }: { readonly children: ReactNode; readonly className?: string }) {
  return (
    <header
      className={cn(
        'sticky top-0 z-30 flex items-center gap-3 rounded-t-[2rem] border-b border-border/60 bg-card/78 px-4 py-4 backdrop-blur-xl sm:px-6',
        className,
      )}
    >
      {children}
    </header>
  )
}

export function AppShellContent({ children, className }: { readonly children: ReactNode; readonly className?: string }) {
  return <main className={cn('min-w-0 flex-1 p-4 sm:p-6 lg:p-8', className)}>{children}</main>
}

export function AppShellPromoCard({
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  readonly eyebrow: string
  readonly title: string
  readonly description: string
  readonly action?: ReactNode
  readonly className?: string
}) {
  return (
    <section
      className={cn(
        'overflow-hidden rounded-[1.75rem] border border-border/70 bg-linear-to-br from-primary/10 via-accent/35 to-background px-4 py-5 shadow-soft',
        className,
      )}
    >
      <p className="text-[0.69rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
        {eyebrow}
      </p>
      <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </section>
  )
}

function renderAppShellNavigation(navigation: AppShellNavigationSlot, onNavigate?: () => void) {
  if (typeof navigation === 'function') {
    return navigation({ onNavigate })
  }

  return navigation
}