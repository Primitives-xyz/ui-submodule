import { cn } from '../../utils'
import { Skeleton } from '../skeleton'
import { ButtonProps, buttonVariants } from './button'

export function ButtonSkeleton(props: ButtonProps) {
  return (
    <Skeleton
      className={buttonVariants({
        variant: props.variant,
        size: props.size,
        className: cn('bg-muted duration-1000', props.className),
      })}
    />
  )
}
