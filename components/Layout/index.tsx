import dynamic from 'next/dynamic'
import styles from '@styles/components/Layout/layout.module.scss'

const LNB = dynamic(() => import('components/_shared/LNB'))
const Header = dynamic(() => import('@components/_shared/Header'))

interface IProps {
  children: React.ReactNode
}

const Layout = ({ children }: IProps) => {
  return (
    <div className={styles.appWrapper}>
      <LNB />
      <div className={styles.container}>
        <Header />
        {children}
      </div>
    </div>
  )
}

export default Layout
