import { IPaginatedResponse, ISocialCounts } from './common.models'
import { IRequestingProfileSocialInfo } from './contents.models'
import { IProfile } from './profiles.models'

export interface IComments {
  comment: {
    id: string
    created_at: number
    text: string
  }
  contentId: string
  author: IProfile
  socialCounts: ISocialCounts
  requestingProfileSocialInfo: IRequestingProfileSocialInfo
}

export interface IGetCommentsResponse extends IPaginatedResponse {
  comments: IComments[]
}
