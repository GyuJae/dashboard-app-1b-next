import { useEffect, useState } from 'react'
import styles from '@styles/components/LoadingPage/loadingPage.module.scss'
import SpinnerIcon from '@assets/svg/spinner.svg'
import { useRouter } from 'next/router'
import Image from 'next/image'

const LoadingPage = () => {
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const { pathname } = useRouter()
  useEffect(() => {
    setIsFetching(true)

    setTimeout(() => {
      setIsFetching(false)
    }, 2000)
  }, [pathname])

  if (!isFetching) return null

  return (
    <div className={styles.wrapper}>
      <div>
        <Image src={SpinnerIcon} width={50} height={50} alt='SpinnerIcon' />
      </div>
    </div>
  )
}

export default LoadingPage
