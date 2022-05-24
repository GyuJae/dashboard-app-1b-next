import { IDaily } from './daily'

interface IResponse {
  ok: boolean
  error?: string
}

export interface IDailyResponse extends IResponse {
  daily?: IDaily[]
}
