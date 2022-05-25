import cx from 'classnames'
import { useRecoilState, useRecoilValue } from 'recoil'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { service } from '@state/dashBoard'
import { serviceDropdown } from '@state/dropdown'
import styles from '@styles/components/_shared/LNB/lnb.module.scss'
import Dropdown from '@components/Dropdown'
import Image from 'next/image'
import LogoIcon from '@assets/svg/logo.svg'
import ManageADImage from '@assets/svg/manageAD.svg'
import DashboardImage from '@assets/svg/dashboard.svg'
import BulbIcon from '@assets/svg/bulb.svg'

const LNB = () => {
  const [selectedService, setSelectedService] = useRecoilState(service)
  const serviceList = useRecoilValue(serviceDropdown)
  const router = useRouter()
  return (
    <aside className={styles.gnbWrapper}>
      <div className={styles.top}>
        <div className={styles.logo}>
          <Image src={LogoIcon} alt='logo' width={124} height={30} />
        </div>

        <div className={styles.box}>
          <h3>서비스</h3>
          <Dropdown list={serviceList} action={setSelectedService} selected={selectedService} big />
        </div>

        <div className={styles.box}>
          <h3>광고센터</h3>
          <ul>
            <li className={cx({ [styles.isActive]: router.pathname === '/' })}>
              <Link href='/'>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a>
                  <Image src={DashboardImage} alt='dasgboard' width={40} height={40} />
                  대시보드
                </a>
              </Link>
            </li>
            <li className={cx({ [styles.isActive]: router.pathname === '/managing' })}>
              <Link href='/managing'>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a>
                  <Image src={ManageADImage} alt='ManageADImage' width={40} height={40} />
                  광고관리
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <button className={styles.guide} type='button'>
          <Image src={BulbIcon} alt='BulbIcon' width={40} height={40} />
          <div className={styles.message}>
            <p>레버 이용 가이드</p>
            <p>시작하기 전에 알아보기</p>
          </div>
        </button>

        <div className={styles.policy}>
          <p>레버는 함께 만들어갑니다.</p>
          <Link href='/'>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>이용약관</a>
          </Link>
        </div>
      </div>
    </aside>
  )
}

export default LNB
