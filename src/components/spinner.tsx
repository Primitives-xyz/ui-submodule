import { LoaderCircle } from 'lucide-react'
import { cn } from '../utils'

interface Props {
  large?: boolean
  className?: string
}

export function Spinner({ large = false, className }: Props) {
  return (
    <LoaderCircle
      size={large ? 32 : undefined}
      className={cn('animate-spin', className)}
    />
  )
}
