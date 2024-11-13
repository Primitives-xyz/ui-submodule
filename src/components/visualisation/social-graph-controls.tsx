import { useCamera } from '@react-sigma/core'
import { Maximize, Minus, Plus } from 'lucide-react'
import { Button } from '../button'

export function SocialGraphControls() {
  const { zoomIn, zoomOut, reset } = useCamera()

  return (
    <div className="absolute bottom-3 left-3 rounded bg-white/30 overflow-hidden">
      <Button
        isInvisible
        className="p-2 hover:bg-white/10"
        onClick={() => reset()}
      >
        <Maximize size={26} />
      </Button>
      <Button
        isInvisible
        className="p-2 hover:bg-white/10"
        onClick={() => zoomIn()}
      >
        <Plus size={26} />
      </Button>
      <Button
        isInvisible
        className="p-2 hover:bg-white/10"
        onClick={() => zoomOut()}
      >
        <Minus size={26} />
      </Button>
    </div>
  )
}
