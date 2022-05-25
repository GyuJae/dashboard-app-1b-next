export interface IDaily {
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
