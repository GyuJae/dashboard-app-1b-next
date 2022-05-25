import { atom } from 'recoil'

export const serviceDropdown = atom<string[]>({
  key: '#serviceDropdown',
  default: ['매드업'],
})

export const adManagingDropdown = atom<string[]>({
  key: '#adManagingDropdown',
  default: ['전체 광고', '진행중', '중단됨'],
})
