import { Box } from '@mui/material'
import { Stack } from '@mui/system'
import { useSessionContext, useUser } from '@supabase/auth-helpers-react'
import LoginModule from 'modules/LoginModule'
import { useEffect } from 'react'
import { navigate } from 'utils/navigate'

const Home = () => {
  const { isLoading, session, error } = useSessionContext()
  const user = useUser()

  useEffect(() => {
    if (session) {
      navigate('/role-select')
    }
  }, [session, user])

  if (error) {
    return <p>{error.message}</p>
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <Stack
      width='100vw'
      height='100vh'
      justifyContent='center'
      alignItems='center'
    >
      <Box
        width='30%'
        height='300px'
      >
        <LoginModule />
      </Box>
    </Stack>
  )
}

export default Home
