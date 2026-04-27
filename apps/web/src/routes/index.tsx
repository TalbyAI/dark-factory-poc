import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { buildFactorySnapshot } from '@dark-factory/domain'
import { HeroCard } from '@dark-factory/ui'

const getFactorySnapshot = createServerFn({ method: 'GET' }).handler(async () => {
  return buildFactorySnapshot()
})

export const Route = createFileRoute('/')({
  loader: async () => getFactorySnapshot(),
  component: HomePage,
})

function HomePage() {
  const snapshot = Route.useLoaderData()

  return (
    <main className="min-h-screen px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(20rem,0.8fr)]">
        <HeroCard eyebrow="Monorepo bootstrap" title={snapshot.headline}>
          <p>{snapshot.summary}</p>
          <ul className="grid gap-3 pt-2 text-sm sm:grid-cols-3">
            {snapshot.pillars.map((pillar) => (
              <li
                key={pillar}
                className="rounded-2xl border border-border bg-surface px-4 py-3 text-surface-foreground"
              >
                {pillar}
              </li>
            ))}
          </ul>
        </HeroCard>

        <aside className="rounded-3xl border border-border bg-foreground px-6 py-8 text-background shadow-elevated dark:bg-surface dark:text-surface-foreground dark:border-primary/20">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.35em] text-primary">
            Included backend
          </p>
          <h2 className="mt-4 font-display text-2xl font-semibold">Server function live</h2>
          <p className="mt-4 text-sm leading-7 opacity-70">
            This page is loaded from a TanStack Start server function that pulls
            its response from the shared domain package.
          </p>
          <div className="mt-8 rounded-2xl border border-current/10 bg-current/5 p-4 font-mono text-sm text-primary">
            GET / (loader) -&gt; createServerFn -&gt; @dark-factory/domain
          </div>
        </aside>
      </div>
    </main>
  )
}
