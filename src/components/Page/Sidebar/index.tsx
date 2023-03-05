import Paper from '@mui/material/Paper'
import { Box, Stack } from '@mui/material'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'

import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import { menuNavigation } from 'config/menuNavigation'

const PageSidebar = () => {
  const router = useRouter()
  const { pathname } = router

  const goToPage = (link: string) => {
    router.push(link)
  }

  return (
    <Stack
      position='fixed'
      top={80}
      maxWidth={168}
      height='calc(100vh - 104px)'
    >
      <Paper
        sx={{
          width: '100%',
          maxWidth: '100%',
          height: '100%'
        }}
      >
        <Stack
          justifyContent='space-between'
          height='100%'
        >
          <Box
            py={1}
            px={2}
          >
            <MenuList>
              {menuNavigation?.map((item) => {
                const isActiveRoute =
                  pathname === item?.link || pathname.includes(item?.link)

                return (
                  <MenuItem
                    key={item?.name}
                    onClick={() => goToPage(item?.link)}
                    sx={{
                      my: 1,
                      borderRadius: 16,
                      bgcolor: isActiveRoute ? 'orange.100' : 'transparent',
                      '& > *': {
                        color: isActiveRoute
                          ? 'orange.ohmyhome'
                          : 'rgba(0, 0, 0, 0.56)'
                      },
                      '&:hover': {
                        bgcolor: 'orange.100'
                      },
                      '&:hover > *': {
                        color: 'orange.ohmyhome'
                      }
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: isActiveRoute
                          ? 'orange.ohmyhome'
                          : 'rgba(0, 0, 0, 0.56)'
                      }}
                    >
                      {item?.icon}
                    </ListItemIcon>
                    <Typography
                      fontSize={13}
                      fontWeight={600}
                      sx={{
                        color: isActiveRoute ? 'orange.ohmyhome' : 'inherit',
                        '&:hover': {
                          color: 'orange.ohmyhome'
                        }
                      }}
                    >
                      {item?.name}
                    </Typography>
                  </MenuItem>
                )
              })}
            </MenuList>
          </Box>
        </Stack>
      </Paper>
    </Stack>
  )
}

export { PageSidebar }
