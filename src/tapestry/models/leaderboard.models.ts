import { IProfile } from './profiles.models'

export enum LeaderboardTypeValue {
  GLOBAL = 'global',
  FRIENDS = 'friends',
}

export interface IHighScore {
  position: number
  score: number
  profile: IProfile
}

export type IGetLeaderboardResponse = IHighScore[]

export interface ILeaderboardPosition {
  position: number
  score: number
  hasPlayerAbove: boolean
  hasPlayerBelow: boolean
  nearby: {
    username: string
    profileId: string
    score: string
  }[]
}

export interface ILeaderboardSuggestedProfile {
  profile: IProfile
  score: number
  position: number
}
