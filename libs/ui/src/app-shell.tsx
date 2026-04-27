import { type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode, useEffect, useState } from 'react'
import { MenuIcon, XIcon } from 'lucide-react'
import { Button, buttonVariants } from '#components/ui/button'
import { cn } from './cn'

export interface AppShellNavItem {
  readonly key: string
  readonly label: string
  readonly href?: string
  readonly icon?: ReactNode
  readonly badge?: ReactNode
  readonly active?: boolean
}

export interface AppShellNavSection {
  readonly key: string
  readonly title?: string
  readonly items: readonly AppShellNavItem[]
}

export type AppShellNavSectionConfig = AppShellNavSection

export interface AppShellProps {
  readonly brand: ReactNode
  readonly sections: readonly AppShellNavSection[]
  readonly sidebarFooter?: ReactNode
  readonly topbar?: ReactNode
  readonly children: ReactNode
  readonly className?: string
  readonly contentClassName?: string
}

type AppShellNavLinkProps = Omit<AppShellNavItem, 'key'> & {
  readonly onSelect?: () => void
}

export function AppShell({
  brand,
  sections,
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

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
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
          sections={sections}
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
  readonly sections: readonly AppShellNavSection[]
  readonly footer?: ReactNode
  readonly mobileOpen?: boolean
  readonly onClose?: () => void
  readonly className?: string
}

export function AppShellSidebar({
  brand,
  sections,
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
        <AppShellNav>
          {sections.map((section) => (
            <AppShellNavSection key={section.key} title={section.title}>
              {section.items.map(({ key, ...item }) => (
                <AppShellNavLink key={key} {...item} onSelect={onClose} />
              ))}
            </AppShellNavSection>
          ))}
        </AppShellNav>
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

export function AppShellNav({ children, className }: { readonly children: ReactNode; readonly className?: string }) {
  return <nav className={cn('grid gap-5', className)}>{children}</nav>
}

export function AppShellNavSection({
  title,
  children,
  className,
}: {
  readonly title?: string
  readonly children: ReactNode
  readonly className?: string
}) {
  return (
    <section className={cn('grid gap-3', className)}>
      {title ? (
        <p className="px-3 text-[0.69rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
          {title}
        </p>
      ) : null}
      <div className="grid gap-1.5">{children}</div>
    </section>
  )
}

export function AppShellNavLink({
  active,
  badge,
  href,
  icon,
  label,
  onSelect,
}: AppShellNavLinkProps) {
  const className = cn(
    buttonVariants({ variant: 'ghost' }),
    'h-auto w-full justify-start rounded-2xl px-3 py-3 text-left text-sm shadow-none',
    active
      ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground'
      : 'text-muted-foreground hover:bg-accent/80 hover:text-foreground',
  )

  const content = (
    <>
      <span
        className={cn(
          'flex size-9 shrink-0 items-center justify-center rounded-xl border text-current',
          active ? 'border-primary-foreground/20 bg-primary-foreground/10' : 'border-border/70 bg-background/70',
        )}
      >
        {icon ?? <span className="size-2 rounded-full bg-current/65" />}
      </span>
      <span className="min-w-0 flex-1 truncate font-medium">{label}</span>
      {badge ? <span className="text-xs font-semibold">{badge}</span> : null}
    </>
  )

  if (href) {
    return (
      <a className={className} href={href} onClick={onSelect}>
        {content}
      </a>
    )
  }

  return (
    <button className={className} type="button" onClick={onSelect}>
      {content}
    </button>
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

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>
type ButtonPropsBase = ButtonHTMLAttributes<HTMLButtonElement>

export type AppShellAnchorProps = AnchorProps
export type AppShellButtonProps = ButtonPropsBase