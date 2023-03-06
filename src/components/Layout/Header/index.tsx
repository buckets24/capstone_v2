import { AppBar, Box, Stack, Toolbar, Typography } from '@mui/material'
import { useSessionContext } from '@supabase/auth-helpers-react'
import { Button } from 'components/Button/Button'
import { navigate } from 'utils/navigate'

function Header ({ role = 'developer' }: { role: string }) {
  const { supabaseClient } = useSessionContext()

  async function logoutUser () {
    const { error } = await supabaseClient.auth.signOut()

    if (!error) {
      navigate('/')
    }
  }

  return (
    <AppBar position='fixed'>
      <Toolbar>

        <Stack
          flexDirection='row'
          justifyContent='space-between'
          width='100%'
        >
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
              {`- ${role === 'developer' ? 'Developer' : 'Hiring Manager'}`}
            </Typography>
          </Box>

          <Box>
            <Button
              size='small'
              variant='outlined'
              label='Logout'
              onClick={() => logoutUser()}
            />
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Header
