import styles from '@styles/components/ADmanaging/admanaging.module.scss'
import { useMemo } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { adStatus } from '@state/dashBoard'
import { adManagingDropdown } from '@state/dropdown'
import useSWR, { SWRConfig } from 'swr'
import type { NextPage } from 'next'
import { IAdResponse } from 'types/response'
import { getMediaApi } from 'services'
import { statusKrToEn } from '@utils/formatConversion'
import dynamic from 'next/dynamic'

// const Dropdown = dynamic(() => import('@components/Dropdown'))
const Card = dynamic(() => import('@components/ADmanaging/Card'))

interface IProps {
  data: IAdResponse
}

const ADmanaging: NextPage = () => {
  const { data } = useSWR<IAdResponse>('advertise')

  const [adState, setAdState] = useRecoilState(adStatus)
  const adList = useRecoilValue(adManagingDropdown)

  const filterData = useMemo(() => {
    const state = statusKrToEn(adState)
    if (state === 'all') {
      return data?.advertises.ads
    }
    return data?.advertises.ads.filter((item) => item.status === state)
  }, [adState, data?.advertises.ads])

  return (
    <div className={styles.managing}>
      <h1 className={styles.h1}>광고관리</h1>

      <div className={styles.cardContainer}>
        <div className={styles.categoryBox}>
          {/* <Dropdown list={adList} action={setAdState} selected={adState} /> */}
          <button className={styles.createBtn} type='button'>
            광고 만들기
          </button>
        </div>

        <ul className={styles.adList}>
          {filterData?.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </ul>
      </div>
    </div>
  )
}
const Page: NextPage<IProps> = ({ data }) => {
  return (
    <SWRConfig
      value={{
        fallback: {
          media: data,
        },
      }}
    >
      <ADmanaging />
    </SWRConfig>
  )
}

export async function getServerSideProps() {
  const data = await getMediaApi()
  return {
    props: {
      data,
    },
  }
}

export default Page
