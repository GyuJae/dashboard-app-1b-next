import { useRecoilState } from 'recoil'
import { categoryState } from '@state/dashBoard'
import { cx } from 'styles'
import { TDashBoardCategory } from 'types/dashBoardCategory'
import { categoryDict, koreanToCategoryDict } from '../categoryDict'
import styles from '@styles/components/Dashboard/DataFilterButtons/DropdownList/dropdownList.module.scss'

interface IProps {
  inView: boolean
}

type TButton = 'ROAS' | '광고비' | '노출수' | '클릭수' | '전환수' | '매출'

const DATA_LIST: TButton[] = ['ROAS', '광고비', '노출수', '클릭수', '전환수', '매출']

const OneDropDownList = ({ inView }: IProps) => {
  const [{ oneSelectCategory, twoSelectCategory }, setCategory] = useRecoilState(categoryState)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const {
      currentTarget: { value },
    } = e
    setCategory((prev) => ({
      ...prev,
      oneSelectCategory: koreanToCategoryDict[value as TButton] as TDashBoardCategory,
    }))
  }

  if (!inView) return null
  return (
    <>
      {DATA_LIST.filter((item) => {
        if (!twoSelectCategory) return true
        return item !== categoryDict[twoSelectCategory] && item !== categoryDict[oneSelectCategory]
      }).map((data, index) => {
        const key = `dataItem-${index}`
        return (
          <li key={key}>
            <button type='button' className={cx(styles.listItem)} onMouseDown={handleClick} value={data}>
              {data}
            </button>
          </li>
        )
      })}
    </>
  )
}

export default OneDropDownList
