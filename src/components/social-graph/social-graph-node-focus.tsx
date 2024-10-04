import { Popover, PopoverAnchor, PopoverContent } from '../popover'

interface Props {
  children: React.ReactNode
  isOpen: boolean
}

export function SocialGraphNodeFocus({ children, isOpen }: Props) {
  return (
    <Popover open={isOpen}>
      <PopoverAnchor className="absolute bottom-3 right-3" />
      <PopoverContent
        // className="w-[300px] h-[218px] rounded-lg"
        className="w-[250px]"
        sideOffset={0}
        side="top"
        align="end"
        preventAutoFocus
      >
        {children}
      </PopoverContent>
    </Popover>
  )
}
