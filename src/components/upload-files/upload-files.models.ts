export enum MEDIA_TYPE_VALUES {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
}

export interface IUploadFile {
  file: File
  mediaType?: MEDIA_TYPE_VALUES
  label?: string
  subLabel?: string
}

export interface IUploadedFilesUrls {
  file: IUploadFile
  postUrl: string
}
