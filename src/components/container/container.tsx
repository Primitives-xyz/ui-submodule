import { ReactNode } from 'react'
import { cn } from '../../utils'
import { ContainerSize } from './container.models'

interface Props {
  children: ReactNode
  className?: string
  size?: ContainerSize
}

export function Container({
  children,
  className,
  size = ContainerSize.REGULAR,
}: Props) {
  return (
    <div
      className={cn(
        'relative mx-auto w-full px-2',
        {
          'max-w-7xl': size === ContainerSize.LARGE,
          'max-w-screen-lg': size === ContainerSize.REGULAR,
          'max-w-2xl': size === ContainerSize.SMALL,
        },
        className,
      )}
    >
      {children}
    </div>
  )
}
