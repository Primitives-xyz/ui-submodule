import { cn } from '../../utils/utils'

export function Heading1({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-2xl tracking-tight font-semibold mb-4',
        className,
      )}
    >
      {children}
    </h1>
  )
}

export function Heading2({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <h2 className={cn('scroll-m-20 text-xl tracking-tight mb-4', className)}>
      {children}
    </h2>
  )
}

export function Paragraph({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <p className={cn('leading-6 not-first:mt-3', className)}>
      {children}
    </p>
  )
}
