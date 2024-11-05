'use client'

import { ChangeEvent, useRef, useState } from 'react'
import { Input } from '../form/input'
import { Button, ButtonProps } from './button'

interface Props extends ButtonProps {
  acceptedFileType?: string
  maxFileSize?: number
  onFileChange: (file: File) => void
}

export function ButtonInputFile({
  acceptedFileType = 'image/*',
  maxFileSize = 5e6, // 5mb
  onFileChange,
  ...props
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string>()

  const handleClick = () => {
    inputRef?.current?.click()
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      if (file.size > maxFileSize) {
        setError(`file is too large! max size is ${maxFileSize / 1e6} mb`)
      } else {
        onFileChange(file)
      }
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <Button onClick={handleClick} {...props}>
        <Input
          ref={inputRef}
          type="file"
          onChange={handleFileChange}
          className="hidden"
          maxLength={maxFileSize}
          accept={acceptedFileType}
        />
        {props.children}
      </Button>
      {!!error && <p className="text-sm font-medium text-destructive">{error}</p>}
    </div>
  )
}
