import React from 'react'
import styles from '@styles/components/_shared/Header/header.module.scss'
// import { BellIcon, BellpointIcon, GearIcon, ProfileImage } from '@assets/svg'
import BellIcon from '@assets/svg/bell.svg'
import BellpointIcon from '@assets/svg/bellpoint.svg'
import GearIcon from '@assets/svg/gear.svg'
import ProfileImage from '@assets/svg/profile.svg'
import Image from 'next/image'

const Header: React.FC = () => {
  return (
    <header className={styles.headerWrapper}>
      <ul>
        <li>
          <button type='button' className={styles.bellIcon}>
            <Image src={BellIcon} width={22} height={22} alt='BellIcon' />
            <Image src={BellpointIcon} width={5} height={5} alt='BellpointIcon' />
          </button>
        </li>
        <li>
          <button type='button'>
            <Image src={GearIcon} width={22} height={22} alt='GearIcon' />
          </button>
        </li>
        <li>
          <button type='button' className={styles.profile}>
            <Image src={ProfileImage} width={40} height={40} alt='ProfileImage' />
            <span>사용자명</span>
          </button>
        </li>
      </ul>
    </header>
  )
}

export default Header
