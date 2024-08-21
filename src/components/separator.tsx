'use client'

import * as SeparatorPrimitive from '@radix-ui/react-separator'
import * as React from 'react'
import { cn } from '../utils'

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & {
    fadedEdges?: boolean
  }
>(
  (
    {
      className,
      orientation = 'horizontal',
      decorative = true,
      fadedEdges = false,
      ...props
    },
    ref,
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'shrink-0',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        {
          'bg-border': !fadedEdges,
          'bg-gradient-to-r from-transparent via-border to-transparent':
            fadedEdges,
        },
        className,
      )}
      {...props}
    />
  ),
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
