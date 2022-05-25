import dayjs from 'dayjs'

export const dateToKorean = (date: string, exceptYear?: boolean): string => {
  const year = dayjs(date).year()
  const month = dayjs(date).month() + 1
  const day = dayjs(date).date()

  return exceptYear ? `${month}월 ${day}일` : `${year}년 ${month}월 ${day}일`
}
