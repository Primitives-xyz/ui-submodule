import { IPaginatedResponse } from './common.models'

export enum BLOCKCHAIN {
  SOLANA = 'SOLANA',
  ETH = 'ETH',
}

export interface INameSpace {
  id: number
  name: string
  readableName: string
  faviconURL: string
  createdAt: string
  updatedAt: string
  isDefault: boolean
  team_id: number
}

export interface IProfile {
  id: string
  created_at: number
  username: string
  bio: string
  image: string
  namespace: string
  blockchain: BLOCKCHAIN
}

// POST /profiles/findOrCreate

export interface IFindOrCreateProfileInput {
  username: string
  blockchain: BLOCKCHAIN
  // execution: string
  walletAddress: string
  id?: string
  image?: string
  bio?: string
  phoneNumber?: string
}

export interface IFindOrCreateProfileResponse {
  profile: IProfile
  walletAddress: string
}

// GET /profiles

export interface IGetProfilesResponse extends IPaginatedResponse {
  profiles: {
    namespace: INameSpace
    profile: IProfile
    wallet: {
      address: string
    }
  }[]
}

// GET /profiles/:id

export interface IGetProfileResponse {
  profile: IProfile
  walletAddress: string
  socialCounts: ISocialCounts
}

export interface ISocialCounts {
  followers: number
  following: number
}

// PUT /profiles/:id

export interface IUpdateProfileInput {
  username: string
  bio: string
  image: string
  execution: string
}

export type IUpdateProfileResponse = IProfile

// GET /profiles/:id/followers

export interface IGetSocialResponse extends IPaginatedResponse {
  profiles: IProfile[]
}

export interface ISuggestedProfile {
  namespaces: {
    name: string
    readableName: string
    faviconURL: string
  }[]
  profile: {
    blockchain: string
    namespace: string
    id: string
    username: string
    image: string
  }
  wallet: { address: string }
}

export interface ISuggestedProfiles {
  [key: string]: ISuggestedProfile
}
