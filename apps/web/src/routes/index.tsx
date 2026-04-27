import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { buildFactorySnapshot } from '@dark-factory/domain'
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  HeroCard,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  Textarea,
  buttonVariants,
  cn,
} from '@dark-factory/ui'

const getFactorySnapshot = createServerFn({ method: 'GET' }).handler(async () => {
  return buildFactorySnapshot()
})

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
    <main className="min-h-screen px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(20rem,0.8fr)]">
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
                    Primitives and reusable patterns live in the shared package. Route composition and form state stay in the app.
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
                  This form is the real integration proof for the first component slice. State stays app-local by design.
                </PopoverDescription>
              </PopoverContent>
            </Popover>
          </div>

          <div className="mt-8 grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="line-name">Line name</Label>
              <Input id="line-name" value={lineName} onChange={(event) => setLineName(event.target.value)} />
            </div>

            <div className="grid gap-2">
              <Label>Rollout lane</Label>
              <Select value={rolloutLane} onValueChange={(value) => setRolloutLane(value ?? 'pilot')}>
                <SelectTrigger placeholder="Choose a rollout lane" />
                <SelectContent>
                  <SelectItem value="pilot">Pilot</SelectItem>
                  <SelectItem value="shadow">Shadow deploy</SelectItem>
                  <SelectItem value="wide">Wide release</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="operator-notes">Operator notes</Label>
              <Textarea
                id="operator-notes"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
              />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Dialog>
              <DialogTrigger className={cn(buttonVariants())}>Review slice</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>First vertical slice is live</DialogTitle>
                  <DialogDescription>
                    The shared package now owns theme tokens, shared primitives, and the landing-page pattern shell.
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
    </main>
  )
}
