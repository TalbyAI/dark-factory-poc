import type { ReactNode } from 'react'
import { cn } from './cn'

export interface HeroCardProps {
  readonly title: string
  readonly eyebrow: string
  readonly children: ReactNode
  readonly className?: string
}

export function HeroCard({ title, eyebrow, children, className }: HeroCardProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-3xl border border-border bg-card/75 p-10 shadow-card backdrop-blur sm:p-12',
        className,
      )}
    >
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <p className="font-display text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
        {eyebrow}
      </p>
      <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        {title}
      </h1>
      <div className="mt-6 space-y-4 text-base leading-7 text-muted-foreground">
        {children}
      </div>
    </section>
  )
}