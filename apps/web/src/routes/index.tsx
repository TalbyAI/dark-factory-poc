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
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.15),_transparent_35%),linear-gradient(180deg,_#f8fafc_0%,_#e2e8f0_100%)] px-6 py-16 text-slate-950 sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(20rem,0.8fr)]">
        <HeroCard eyebrow="Monorepo bootstrap" title={snapshot.headline}>
          <p>{snapshot.summary}</p>
          <ul className="grid gap-3 pt-2 text-sm text-slate-600 sm:grid-cols-3">
            {snapshot.pillars.map((pillar) => (
              <li
                key={pillar}
                className="rounded-2xl border border-slate-200 bg-white/70 px-4 py-3"
              >
                {pillar}
              </li>
            ))}
          </ul>
        </HeroCard>

        <aside className="rounded-[2rem] border border-slate-200/80 bg-slate-950 px-6 py-8 text-slate-50 shadow-[0_24px_80px_rgba(15,23,42,0.2)]">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">
            Included backend
          </p>
          <h2 className="mt-4 text-2xl font-semibold">Server function live</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            This page is loaded from a TanStack Start server function that pulls
            its response from the shared domain package.
          </p>
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 font-mono text-sm text-cyan-100">
            GET / (loader) -&gt; createServerFn -&gt; @dark-factory/domain
          </div>
        </aside>
      </div>
    </main>
  )
}
