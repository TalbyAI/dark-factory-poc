import type { ReactNode } from 'react'

export interface HeroCardProps {
  readonly title: string
  readonly eyebrow: string
  readonly children: ReactNode
}

export function HeroCard({ title, eyebrow, children }: HeroCardProps) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/50 bg-white/75 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur">
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-slate-400/60 to-transparent" />
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
        {eyebrow}
      </p>
      <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
        {title}
      </h1>
      <div className="mt-6 space-y-4 text-base leading-7 text-slate-700">
        {children}
      </div>
    </section>
  )
}