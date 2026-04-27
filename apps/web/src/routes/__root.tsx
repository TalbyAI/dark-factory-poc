import type { ReactNode } from 'react'
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ThemeToggle } from '@dark-factory/ui'
import appCss from '../styles/app.css?url'

export const Route = createRootRoute({
  head: () => ({
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300..700&family=Space+Grotesk:wght@300..700&family=JetBrains+Mono:wght@400;500&display=swap',
      },
    ],
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <div className="fixed right-4 top-4 z-50">
          <ThemeToggle />
        </div>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function RootNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="max-w-md rounded-3xl border border-border bg-card/80 px-8 py-10 text-center shadow-card backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
          Route not found
        </p>
        <h1 className="mt-4 text-3xl font-semibold">Nothing lives here.</h1>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          The requested page does not exist in this prototype.
        </p>
      </div>
    </main>
  )
}
