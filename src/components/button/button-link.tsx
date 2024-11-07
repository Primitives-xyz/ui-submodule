'use client'

import { Link } from '@remix-run/react'

interface Props {
  href: string
  newTab?: boolean
  children: React.ReactNode
}

export function ButtonLink({ href, newTab, children }: Props) {
  // const [Link, setLink] = useState<any>(null)

  // useEffect(() => {
  //   async function loadLink() {
  //     try {
  //       // const { default: NextLink } = await import('next/link')
  //       // setLink(() => NextLink)
  //     } catch {
  //       console.log('next/link is not available.')
  //     }
  //   }
  //   loadLink()
  // }, [])

  // return (
  //   <>
  //     {Link ? (
  //       <Link href={href} target={newTab ? '_blank' : undefined}>
  //         {children}
  //       </Link>
  //     ) : (
  //       <a href={href} target={newTab ? '_blank' : undefined}>
  //         {children}
  //       </a>
  //     )}
  //   </>
  // )

  return (
    <Link to={href} target={newTab ? '_blank' : undefined}>
      {children}
    </Link>
  )
}
