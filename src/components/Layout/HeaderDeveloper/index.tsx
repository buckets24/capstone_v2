import { AppBar, Box, Toolbar, Typography } from '@mui/material'

function HeaderDeveloper () {
  return (
    <AppBar position='fixed'>
      <Toolbar>
        <Box
          mr={2}
          display='flex'
          alignItems='center'
          gap={1}
        >
          <Typography
            variant='BodyText1'
            fontWeight={700}
            color='ink.100'
          >
            Hiring Depot
          </Typography>
          <Typography
            variant='Caption1'
            fontWeight={100}
            color='ink.100'
          >
            - Developer
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default HeaderDeveloper
