import { FC, ReactNode } from 'react'
import { PageFooter } from '../Page/Footer'

interface LayoutProps {
  children: ReactNode
}

const OnboardLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <div id='onboard-layout-container'>
      {children}
      <PageFooter />
    </div>
  )
}

export default OnboardLayout
