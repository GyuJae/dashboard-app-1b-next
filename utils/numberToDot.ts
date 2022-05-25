interface INumberToDot {
  num: number
  fixed?: number
}

export const numberToDot = ({ num, fixed = 0 }: INumberToDot): string => (+num.toFixed(fixed)).toLocaleString('ko-KR')
