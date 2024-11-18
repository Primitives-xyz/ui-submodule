import { User } from 'lucide-react'
import Image from 'next/image'
import { cn } from '../../../utils'

interface Props {
  image: string
  className?: string
}

export function Avatar({ image, className }: Props) {
  return (
    <div
      className={cn(
        'w-11 h-11 bg-muted shrink-0 flex items-center justify-center rounded-full relative',
        className,
      )}
    >
      {image ? (
        <>
          <Image
            alt=""
            src={image}
            width={50}
            height={50}
            className="rounded-full object-cover w-full h-full"
          />
        </>
      ) : (
        <User />
      )}
    </div>
  )
}
