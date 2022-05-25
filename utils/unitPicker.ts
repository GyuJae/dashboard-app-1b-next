import { TDashBoardCategory } from 'types/dashBoardCategory'

export const unitPicker = (category: TDashBoardCategory | null): string => {
  if (!category) return ''
  if (category === 'roas') return '%'
  if (category === 'sales' || category === 'cost') return '원'
  return '회'
}
