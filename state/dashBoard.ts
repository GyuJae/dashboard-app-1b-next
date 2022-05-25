import dayjs from 'dayjs'
import { atom, selector } from 'recoil'
import { TDashBoardCategory } from 'types/dashBoardCategory'

export const service = atom<string>({
  key: '#service',
  default: '매드업',
})

interface IDate {
  startDate: string
  endDate: string
}

export const dateState = atom<IDate>({
  key: '#date',
  default: {
    startDate: '2022-02-01',
    endDate: '2022-02-07',
  },
})

interface IPrevDate {
  prevStartDate: string
  prevEndDate: string
}

export const datePrevSelector = selector<IPrevDate>({
  key: '#date/prev',
  get: ({ get }) => {
    const { endDate, startDate } = get(dateState)
    const diff = dayjs(endDate).diff(startDate, 'day') + 1
    const prevStartDate = dayjs(startDate).subtract(diff, 'day').format('YYYY-MM-DD')
    const prevEndDate = dayjs(prevStartDate)
      .add(diff - 1, 'day')
      .format('YYYY-MM-DD')
    return {
      prevStartDate,
      prevEndDate,
    }
  },
})

interface ICategory {
  oneSelectCategory: TDashBoardCategory
  twoSelectCategory: TDashBoardCategory | null
  weekly: boolean
}

export const categoryState = atom<ICategory>({
  key: '#category',
  default: {
    oneSelectCategory: 'sales',
    twoSelectCategory: 'click',
    weekly: false,
  },
})

export const adStatus = atom<string>({
  key: '#adStatus',
  default: '전체 광고',
})
