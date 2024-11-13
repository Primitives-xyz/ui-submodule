import { Check, Copy } from 'lucide-react'
import useClipboard from 'react-use-clipboard'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../tooltip'
import { Button, ButtonProps } from './button'

interface Props extends ButtonProps {
  textToCopy: string
}

export function CopyToClipboardButton({
  textToCopy,
  children,
  ...props
}: Props) {
  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 2000,
  })

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button {...props} onClick={setCopied}>
            {!!children ? (
              children
            ) : (
              <>
                {isCopied ? (
                  <Check className="icon-text-size" />
                ) : (
                  <Copy className="icon-text-size" />
                )}
              </>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">Copy to clipboard</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
