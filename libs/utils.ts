import BigNumber from 'bignumber.js'
import classNames from 'classnames'

interface IDaily {
  imp: number // 노출
  click: number // 클릭
  cost: number // 광고비
  conv: number // 전환수
  convValue: number // 전환비용
  ctr: number // 클릭률
  cvr: number // 전환률
  cpc: number // click per click
  cpa: number // click per action
  roas: number // 광고 지출 대비 수익률
  date: string // 날짜
}

// 매출/ 광고비 * 100
interface IGetDailyMeanResult {
  roas: number
  cost: number
  imp: number
  click: number
  conv: number
  sales: number
}

export const getDailyMean = (daily: IDaily[]): IGetDailyMeanResult => {
  const result = {
    roas: new BigNumber(0),
    cost: new BigNumber(0),
    imp: new BigNumber(0),
    click: new BigNumber(0),
    conv: new BigNumber(0),
    sales: new BigNumber(0),
  }

  daily.forEach((day) => {
    result.roas = result.roas.plus(day.roas)
    result.cost = result.cost.plus(day.cost)
    result.imp = result.imp.plus(day.imp)
    result.click = result.click.plus(day.click)
    result.conv = result.conv.plus(day.conv)
  })

  result.roas = result.roas.dividedBy(daily.length)
  result.cost = result.cost.dividedBy(daily.length)
  result.imp = result.imp.dividedBy(daily.length)
  result.click = result.click.dividedBy(daily.length)
  result.conv = result.conv.dividedBy(daily.length)
  result.sales = result.cost.dividedBy(100).multipliedBy(result.roas)

  return {
    roas: result.roas.toNumber(),
    cost: result.cost.toNumber(),
    imp: result.imp.toNumber(),
    click: result.click.toNumber(),
    conv: result.conv.toNumber(),
    sales: result.sales.toNumber(),
  }
}

interface INumberToDot {
  num: number
  fixed?: number
}

export const numberToDot = ({ num, fixed = 0 }: INumberToDot): string => (+num.toFixed(fixed)).toLocaleString('ko-KR')

export const cx = classNames
