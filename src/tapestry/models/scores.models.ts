import { IHighScore } from './leaderboard.models'

export interface IGetScoresResponse {
  games: [
    {
      gameDetails: {
        gameId: string
        gameName: string
        appNamespace: string
        title: string
      }
      leaderboardEntry: IHighScore
    },
  ]
}
