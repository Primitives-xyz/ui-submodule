import { Pattern } from './icons/Pattern'

export function BackgroundPattern() {
  return (
    <div className="absolute inset-0 z-0">
      <Pattern className="w-full object-cover" />
    </div>
  )
}
