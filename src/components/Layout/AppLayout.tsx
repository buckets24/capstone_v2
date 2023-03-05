import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import useScreenSize from 'common/utils/useScreenSize'
import dynamic from 'next/dynamic'
import { FC, ReactNode } from 'react'
import { PageFooter } from '../Page/Footer'
import { PageHeader } from '../Page/Header'
import { PageSidebar } from '../Page/Sidebar'

const BottomNavigation = dynamic(() => import('../Page/BottomNavigation'))

interface LayoutProps {
  children: ReactNode
}

const AppLayout: FC<LayoutProps> = ({ children }) => {
  const { isMediumView, isLargeView } = useScreenSize()

  return (
    <div>
      <PageHeader />
      <Box
        id='app-layout-container'
        p={{ xs: 1.5, sm: 3 }}
        mt='56px'
      >
        <Stack
          flexDirection='row'
          alignContent='flex-start'
          gap={{ xs: 1.5, sm: 3 }}
        >
          {!isMediumView
            ? (
              <Stack
                justifyContent='space-between'
                height='100%'
                width='100%'
                maxWidth={168}
              >
                <PageSidebar />
              </Stack>
              )
            : null}
          <Box width='100%'>{children}</Box>
          {!isLargeView ? <BottomNavigation /> : null}
        </Stack>
      </Box>
      <PageFooter />
      <Box pb={10} />
    </div>
  )
}

export default AppLayout
