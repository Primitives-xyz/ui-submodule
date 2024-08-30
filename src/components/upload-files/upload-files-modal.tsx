import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../dialog'
import { UploadFileEntry } from './upload-file-entry'
import { IUploadedFilesUrls, IUploadFile } from './upload-files.models'

interface Props {
  isOpen: boolean
  filesToUpload: IUploadFile[]
  setIsOpen: (value: boolean) => void
  onUploadSuccess: (uploadedFile: IUploadedFilesUrls) => void
  getUploadUrl: (file: File) => Promise<string>
}

export default function UploadFilesModal({
  isOpen,
  filesToUpload,
  setIsOpen,
  onUploadSuccess,
  getUploadUrl,
}: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="loading-dots">
            {filesToUpload?.length > 1
              ? 'Uploading your files'
              : 'Uploading your file'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          {filesToUpload.map((file, index) => (
            <UploadFileEntry
              key={index}
              file={file}
              onUploadSuccess={onUploadSuccess}
              getUploadUrl={getUploadUrl}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
