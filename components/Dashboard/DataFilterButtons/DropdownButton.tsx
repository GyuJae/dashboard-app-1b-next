import { useState } from 'react'
import cx from 'classnames'

import styles from '@styles/components/Dashboard/DataFilterButtons/dropdownButton.module.scss'
import DropdownList from './DropdownList'
import ArrowIcon from '@assets/svg/arrow.svg'
import Image from 'next/image'

interface IProps {
  buttonType: 'dataBtn1' | 'dataBtn2' | 'dateBtn'
  buttonName: string
}

const DropdownButton = ({ buttonType, buttonName }: IProps) => {
  const [showList, setShowList] = useState(false)

  const handleClickBtn = () => {
    setShowList((pre) => !pre)
  }
  const handleOnBlur = () => {
    setShowList(false)
  }

  return (
    <div className={styles.dropdownCont} onBlur={handleOnBlur}>
      <button
        type='button'
        className={cx(styles.dropdownButton, styles[buttonType], styles[buttonName], { [styles.clicked]: showList })}
        onClick={handleClickBtn}
      >
        {buttonName}
        <div className={styles.imgContainer}>
          <Image src={ArrowIcon} width={12} height={12} alt='ArrowIcon' />
        </div>
      </button>
      {showList && <DropdownList buttonType={buttonType} />}
    </div>
  )
}

export default DropdownButton
