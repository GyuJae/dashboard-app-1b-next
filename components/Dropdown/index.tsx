import { useClickAway } from 'react-use'
import { useRef, useState, MouseEvent, ChangeEvent } from 'react'
import cx from 'classnames'

import { useSetRecoilState } from 'recoil'
import { serviceDropdown } from '@state/dropdown'

import styles from '@styles/components/Dropdown/dropdown.module.scss'
import Image from 'next/image'
import ArrowIcon from '@assets/svg/arrow.svg'

interface Props {
  list: string[]
  action: Function
  selected: string
  big?: boolean
}

const Dropdown = ({ list, action, selected, big }: Props) => {
  const [openState, setOpenState] = useState(false)
  const [display, setDisplay] = useState(selected)

  const setServiceList = useSetRecoilState(serviceDropdown)
  const [newService, setNewService] = useState('')

  const dropdownRef = useRef(null)

  const changeOpenStateHandler = () => {
    setOpenState((prev) => !prev)
  }

  const changeDisplayHandler = (e: MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget
    setDisplay(value)
    action(value)
    setOpenState(false)
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewService(e.currentTarget.value)
  }

  const createServiceHandler = () => {
    setServiceList((prev) => [...prev, newService])
    setNewService('')
  }

  useClickAway(dropdownRef, () => setOpenState(false))

  return (
    <div className={cx({ [styles.big]: big }, styles.dropdown)} ref={dropdownRef}>
      <button
        type='button'
        className={cx({ [styles.displayActive]: openState }, styles.display)}
        onClick={changeOpenStateHandler}
      >
        {display}
        <Image src={ArrowIcon} alt='ArrowIcon' width={12} height={12} />
      </button>

      <ul className={cx({ [styles.isActive]: openState }, styles.list)}>
        {list.map((item) => (
          <li key={item}>
            <button type='button' className={styles.listItem} value={item} onClick={changeDisplayHandler}>
              {item}
            </button>
          </li>
        ))}
        {big && (
          <li className={styles.createService}>
            <input type='text' value={newService} onChange={onChangeHandler} placeholder='서비스명을 입력해주세요.' />
            <button type='button' onClick={createServiceHandler}>
              등록
            </button>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Dropdown
