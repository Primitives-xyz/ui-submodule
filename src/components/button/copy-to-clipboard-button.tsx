import { Check, Copy } from 'lucide-react'
import useClipboard from 'react-use-clipboard'
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
  )
}
