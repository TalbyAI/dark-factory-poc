import type * as React from 'react'
import { Popover as PopoverPrimitive } from '@base-ui-components/react/popover'
import { cn } from '#lib/utils'

export const Popover = PopoverPrimitive.Root
export const PopoverTrigger = PopoverPrimitive.Trigger
export const PopoverClose = PopoverPrimitive.Close

export function PopoverContent({ className, sideOffset = 10, children, ...props }: React.ComponentProps<typeof PopoverPrimitive.Positioner>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner sideOffset={sideOffset} {...props}>
        <PopoverPrimitive.Popup
          className={cn(
            'z-50 w-80 rounded-xl border border-border bg-popover p-4 text-popover-foreground shadow-card outline-none data-ending-style:animate-fade-out data-starting-style:animate-scale-in',
            className,
          )}
        >
          {children}
          <PopoverPrimitive.Arrow className="fill-popover stroke-border" />
        </PopoverPrimitive.Popup>
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  )
}

export function PopoverTitle({ className, ...props }: React.ComponentProps<typeof PopoverPrimitive.Title>) {
  return <PopoverPrimitive.Title className={cn('text-sm font-semibold text-foreground', className)} {...props} />
}

export function PopoverDescription({ className, ...props }: React.ComponentProps<typeof PopoverPrimitive.Description>) {
  return <PopoverPrimitive.Description className={cn('mt-2 text-sm leading-6 text-muted-foreground', className)} {...props} />
}