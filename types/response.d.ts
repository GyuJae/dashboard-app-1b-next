import { IAdType } from './adType'
import { IDaily } from './daily'
import { IMedia } from './media'

interface IResponse {
  ok: boolean
  error?: string
}

export interface IDailyResponse extends IResponse {
  daily: IDaily[]
}

export interface IMediaResponse extends IResponse {
  media: IMedia[]
}

export interface IAdResponse extends IResponse {
  advertises: {
    counter: number
    ads: IAdType[]
  }
}
