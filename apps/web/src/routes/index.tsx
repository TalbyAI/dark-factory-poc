import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { buildFactorySnapshot } from '@dark-factory/domain'
import {
  AppShell,
  AppShellNavigation,
  AppShellPromoCard,
  type AppShellNavSectionConfig,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  FormField,
  HeroCard,
  Input,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  ThemeToggle,
  Textarea,
  buttonVariants,
  cn,
} from '@dark-factory/ui'

const getFactorySnapshot = createServerFn({ method: 'GET' }).handler(async () => {
  return buildFactorySnapshot()
})

const shellSections: AppShellNavSectionConfig[] = [
  {
    key: 'dashboards',
    title: 'Dashboards',
    items: [
      { key: 'analytics', label: 'Analytics', href: '/', active: true, badge: 'Live' },
      { key: 'crm', label: 'CRM shell', href: '#', badge: 'Soon' },
    ],
  },
  {
    key: 'pages',
    title: 'Pages',
    items: [
      { key: 'tables', label: 'Tables', href: '#' },
      { key: 'forms', label: 'Forms', href: '#' },
      { key: 'profile', label: 'User profile', href: '#' },
    ],
  },
  {
    key: 'apps',
    title: 'Apps',
    items: [
      { key: 'notes', label: 'Notes', href: '#' },
      { key: 'tickets', label: 'Tickets', href: '#' },
      { key: 'blogs', label: 'Blogs', href: '#' },
    ],
  },
  {
    key: 'widgets',
    title: 'Widgets',
    items: [
      { key: 'cards', label: 'Cards', href: '#' },
      { key: 'banners', label: 'Banners', href: '#' },
      { key: 'charts', label: 'Charts', href: '#' },
    ],
  },
]

export const Route = createFileRoute('/')({
  loader: async () => getFactorySnapshot(),
  component: HomePage,
})

function HomePage() {
  const snapshot = Route.useLoaderData()
  const [notes, setNotes] = useState('Carry one landing-page refactor through real app integration before expanding the registry.')
  const [lineName, setLineName] = useState('Night Shift')
  const [rolloutLane, setRolloutLane] = useState('pilot')

  return (
    <AppShell
      brand={
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-primary text-sm font-semibold uppercase tracking-[0.3em] text-primary-foreground shadow-soft">
              DF
            </div>
            <div>
              <p className="text-[0.69rem] font-semibold uppercase tracking-[0.32em] text-muted-foreground">
                Dark Factory
              </p>
              <h1 className="mt-1 font-display text-lg font-semibold tracking-tight text-foreground">
                Analytics shell
              </h1>
            </div>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">
            Shared shell primitives live in the UI package. Route data and state stay in the app.
          </p>
        </div>
      }
      navigation={({ onNavigate }) => (
        <AppShellNavigation sections={shellSections} onNavigate={onNavigate} />
      )}
      sidebarFooter={
        <AppShellPromoCard
          eyebrow="Foundation"
          title="Grab the shared shell"
          description="The sidebar, header, and layout chrome now ship from the UI package so new routes can reuse the same frame."
          action={<Button className="w-full">Promote shell</Button>}
        />
      }
      topbar={
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-[0.69rem] font-semibold uppercase tracking-[0.32em] text-primary">
              Dashboard shell 01
            </p>
            <h2 className="mt-2 truncate font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Analytics Dashboard
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:justify-end">
            <div className="rounded-2xl border border-border/70 bg-background/80 px-4 py-2 text-sm text-muted-foreground shadow-soft">
              Shell only. Content stays app-specific.
            </div>
            <ThemeToggle />
          </div>
        </div>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(21rem,0.8fr)]">
        <HeroCard
          eyebrow="UI foundation"
          title={snapshot.headline}
          actions={
            <>
              <Button>Ship first slice</Button>
              <Popover>
                <PopoverTrigger className={cn(buttonVariants({ variant: 'outline' }))}>
                  Why this split
                </PopoverTrigger>
                <PopoverContent align="end" className="w-72">
                  <PopoverTitle>Package boundary stays intact</PopoverTitle>
                  <PopoverDescription>
                    Shared shell primitives live in the UI package. Route composition, nav data, and screen state stay app-local.
                  </PopoverDescription>
                </PopoverContent>
              </Popover>
            </>
          }
        >
          <p>{snapshot.summary}</p>
          <ul className="grid gap-3 pt-2 text-sm sm:grid-cols-3">
            {snapshot.pillars.map((pillar) => (
              <li
                key={pillar}
                className="rounded-xl border border-border bg-muted px-4 py-3 text-muted-foreground"
              >
                {pillar}
              </li>
            ))}
          </ul>
        </HeroCard>

        <section className="rounded-[1.75rem] border border-border bg-card/85 p-6 shadow-card backdrop-blur sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-display text-xs font-semibold uppercase tracking-[0.35em] text-primary">
                Reference form slice
              </p>
              <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight text-foreground">
                Landing page now exercises the shared primitives.
              </h2>
            </div>

            <Popover>
              <PopoverTrigger className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'rounded-xl')} aria-label="Show implementation note">
                ?
              </PopoverTrigger>
              <PopoverContent align="end" className="w-64">
                <PopoverTitle>Validation bar</PopoverTitle>
                <PopoverDescription>
                  The shell chrome is reusable UI. This form remains the app-level proof that composition and state stay outside the package.
                </PopoverDescription>
              </PopoverContent>
            </Popover>
          </div>

          <div className="mt-8 grid gap-5">
            <FormField
              id="line-name"
              label="Line name"
              description="Keep the naming in the app layer. The field pattern only owns presentation and accessible copy placement."
            >
              {(controlProps) => (
                <Input
                  {...controlProps}
                  value={lineName}
                  onChange={(event) => setLineName(event.target.value)}
                />
              )}
            </FormField>

            <FormField
              id="rollout-lane"
              label="Rollout lane"
              description="The select content stays replaceable while label and help text spacing stay consistent."
            >
              {(controlProps) => (
                <Select value={rolloutLane} onValueChange={(value) => setRolloutLane(value ?? 'pilot')}>
                  <SelectTrigger {...controlProps} placeholder="Choose a rollout lane" />
                <SelectContent>
                  <SelectItem value="pilot">Pilot</SelectItem>
                  <SelectItem value="shadow">Shadow deploy</SelectItem>
                  <SelectItem value="wide">Wide release</SelectItem>
                </SelectContent>
              </Select>
              )}
            </FormField>

            <FormField
              id="operator-notes"
              label="Operator notes"
              description="Future field errors can land below this control without each form relearning the stack order."
            >
              {(controlProps) => (
                <Textarea
                  {...controlProps}
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                />
              )}
            </FormField>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Dialog>
              <DialogTrigger className={cn(buttonVariants())}>Review slice</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>First vertical slice is live</DialogTitle>
                  <DialogDescription>
                    The shared package now owns theme tokens, shared primitives, and the analytics shell frame.
                  </DialogDescription>
                </DialogHeader>

                <dl className="mt-6 grid gap-4 rounded-xl border border-border bg-muted/60 p-4 text-sm">
                  <div className="grid gap-1">
                    <dt className="font-medium text-foreground">Server loader</dt>
                    <dd className="text-muted-foreground">GET / -&gt; createServerFn -&gt; @dark-factory/domain</dd>
                  </div>
                  <div className="grid gap-1">
                    <dt className="font-medium text-foreground">Reference form</dt>
                    <dd className="text-muted-foreground">{lineName} / {rolloutLane}</dd>
                  </div>
                  <div className="grid gap-1">
                    <dt className="font-medium text-foreground">Current note</dt>
                    <dd className="text-muted-foreground">{notes}</dd>
                  </div>
                </dl>

                <DialogFooter>
                  <DialogClose className={cn(buttonVariants({ variant: 'outline' }))}>Keep editing</DialogClose>
                  <Button>Promote foundation</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button variant="outline">Inspect tokens</Button>
          </div>
        </section>
      </div>
    </AppShell>
  )
}
