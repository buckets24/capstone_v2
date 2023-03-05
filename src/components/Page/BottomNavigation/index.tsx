import { Paper, Typography } from '@mui/material'
import Box from '@mui/system/Box'
import Stack from '@mui/system/Stack'
import { menuNavigation } from 'config/menuNavigation'
import { useRouter } from 'next/router'

const MobileBottomNavigation = () => {
  const router = useRouter()
  const { pathname } = router

  const goToPage = (link: string) => {
    router.push(link)
  }

  return (
    <Paper
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, borderRadius: 0 }}
      elevation={3}
    >
      <Stack
        flexDirection='row'
        justifyContent='space-evenly'
        alignItems='center'
        height={62}
      >
        {menuNavigation?.map((item) => {
          const isActiveRoute =
            pathname === item?.link || pathname.includes(item?.link)
          return (
            <Box
              minWidth={73}
              minHeight={46}
              key={item?.name}
              bgcolor={isActiveRoute ? 'orange.100' : 'transparent'}
              borderRadius={1}
              display='flex'
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              sx={{
                '& > *': {
                  color: isActiveRoute
                    ? 'orange.ohmyhome'
                    : 'rgba(0, 0, 0, 0.56)'
                }
              }}
              onClick={() => goToPage(item?.link)}
            >
              {item?.icon}
              <Typography
                color={
                  isActiveRoute ? 'orange.ohmyhome' : 'rgba(0, 0, 0, 0.56)'
                }
                fontSize={10}
                fontWeight={500}
              >
                {item?.name}
              </Typography>
            </Box>
          )
        })}
      </Stack>
      {/* <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
      >
        {menuNavigation?.map(item => (
          <BottomNavigationAction
            key={item?.name}
            label={item?.name}
            icon={item?.icon}
          />
        ))}
      </BottomNavigation> */}
    </Paper>
  )
}

export default MobileBottomNavigation
