import type * as React from 'react'
import { Select as SelectPrimitive } from '@base-ui-components/react/select'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { cn } from '#lib/utils'

export const Select = SelectPrimitive.Root
export const SelectValue = SelectPrimitive.Value
export const SelectGroup = SelectPrimitive.Group
export const SelectLabel = SelectPrimitive.GroupLabel

type SelectTriggerProps = React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  readonly placeholder?: string
}

export function SelectTrigger({ className, children, placeholder = 'Select an option', ...props }: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-soft transition-colors disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className,
      )}
      {...props}
    >
      {children ?? (
        <SelectPrimitive.Value>
          {(value) =>
            value == null || value === '' ? <span className="text-muted-foreground">{placeholder}</span> : String(value)
          }
        </SelectPrimitive.Value>
      )}
      <SelectPrimitive.Icon className="text-muted-foreground">
        <ChevronsUpDownIcon />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

export function SelectContent({ className, sideOffset = 8, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Positioner>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner align="start" sideOffset={sideOffset} {...props}>
        <SelectPrimitive.Popup
          className={cn(
            'z-50 min-w-[var(--anchor-width)] overflow-hidden rounded-xl border border-border bg-popover p-1 text-popover-foreground shadow-card outline-none data-ending-style:animate-fade-out data-starting-style:animate-scale-in',
            className,
          )}
        >
          <SelectPrimitive.List className="max-h-72 overflow-y-auto">{children}</SelectPrimitive.List>
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

export function SelectItem({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      className={cn(
        'relative flex cursor-default select-none items-center rounded-lg py-2 pl-8 pr-3 text-sm outline-none transition-colors data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center text-primary">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}