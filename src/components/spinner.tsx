import { LoaderCircle } from 'lucide-react'
import { cn } from '../utils'

export function Spinner({ large = false, className }: { large?: boolean; className?: string }) {
  return <LoaderCircle size={large ? 32 : undefined} className={cn('animate-spin', className)} />
}

export function FullPageSpinner({ className }: { className?: string }) {
  return (
    <div className={cn('min-h-screen flex items-center justify-center', className)}>
      <Spinner large />
    </div>
  )
}
