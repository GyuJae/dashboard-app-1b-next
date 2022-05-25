import { useRecoilState } from 'recoil'
import { categoryState } from '@state/dashBoard'
import { cx } from 'styles'
import styles from '@styles/components/Dashboard/DataFilterButtons/DropdownList/dropdownList.module.scss'

interface IProps {
  inView: boolean
}

const WeeklyDownList = ({ inView }: IProps) => {
  const [{ weekly }, setCategory] = useRecoilState(categoryState)

  const handleClick = () => {
    setCategory((prev) => ({
      ...prev,
      weekly: !prev.weekly,
    }))
  }

  if (!inView) return null
  return (
    <li>
      <button type='button' className={cx(styles.listItem)} onMouseDown={handleClick}>
        {weekly ? '일별' : '주간'}
      </button>
    </li>
  )
}

export default WeeklyDownList
