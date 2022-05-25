import { useRecoilValue } from 'recoil'
import { dateState } from '@state/dashBoard'

import { DateRangePicker, RangeKeyDict } from 'react-date-range'
import { ko } from 'date-fns/locale'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

interface IProps {
  containerRef: React.RefObject<HTMLDivElement>
  handleChange: (range: RangeKeyDict) => void
  inView: boolean
}

const DateRange = ({ containerRef, handleChange, inView }: IProps) => {
  const dateRange = useRecoilValue(dateState)

  if (!inView) return null

  return (
    <div ref={containerRef}>
      <DateRangePicker
        locale={ko}
        onChange={handleChange}
        editableDateInputs={false}
        showMonthAndYearPickers={false}
        minDate={new Date('2022-02-01')}
        maxDate={new Date('2022-04-20')}
        ranges={[
          {
            startDate: new Date(dateRange.startDate),
            endDate: new Date(dateRange.endDate),
            key: 'selection',
          },
        ]}
        rangeColors={['#586CF5']}
        months={2}
        direction='horizontal'
        showDateDisplay={false}
        staticRanges={[]}
        inputRanges={[]}
      />
    </div>
  )
}

export default DateRange
