import type { ReactNode } from 'react'
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import appCss from '../styles/app.css?url'

export const Route = createRootRoute({
  head: () => ({
    links: [{ rel: 'stylesheet', href: appCss }],
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Dark Factory' },
    ],
  }),
  component: RootComponent,
  notFoundComponent: RootNotFound,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
      <TanStackRouterDevtools />
    </RootDocument>
  )
}

function RootDocument({ children }: { readonly children: ReactNode }) {
  return (
    <html lang="en" className="bg-slate-100">
      <head>
        <HeadContent />
      </head>
      <body>{children}<Scripts /></body>
    </html>
  )
}

function RootNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.15),transparent_35%),linear-gradient(180deg,#f8fafc_0%,#e2e8f0_100%)] px-6 py-16 text-slate-950">
      <div className="max-w-md rounded-4xl border border-slate-200 bg-white/80 px-8 py-10 text-center shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-700">
          Route not found
        </p>
        <h1 className="mt-4 text-3xl font-semibold">Nothing lives here.</h1>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          The requested page does not exist in this prototype.
        </p>
      </div>
    </main>
  )
}
