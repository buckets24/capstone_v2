import { Box, CircularProgress } from '@mui/material'
import { Stack } from '@mui/system'
import { useSessionContext, useUser } from '@supabase/auth-helpers-react'
import LoginModule from 'modules/LoginModule'
import { useEffect, useState } from 'react'
import { useNavigate } from 'utils/navigate'
import { useUserStore } from 'stores/user.store'
import { CandidateType } from 'types/Candidate.type'

const Home = () => {
  const { isLoading, error } = useSessionContext()
  const user = useUser()
  const { supabaseClient } = useSessionContext()
  const { setCandidate } = useUserStore()
  const { navigate } = useNavigate()

  const [submitting, setSubmitting] = useState(false)

  const getUser = async () => {
    setSubmitting(true)

    const { data } = await supabaseClient
      .from('users')
      .select('*')
      .eq('email', user?.email)

    const candidate = data?.[0] as unknown as CandidateType
    setCandidate(candidate)

    if (candidate) {
      candidate?.role === 'developer'
        ? navigate('/developer')
        : navigate('/hiring-manager')
      return
    }

    navigate('/role-select')
  }

  useEffect(() => {
    if (user) {
      getUser()
    }
  }, [user])

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
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        <Stack width='100%' alignItems='center' pb={2}>
          <h1>Hiring Depot</h1>
        </Stack>
        {isLoading || submitting ? (
          <CircularProgress size={80} />
        ) : (
          <LoginModule />
        )}
      </Box>
    </Stack>
  )
}

export default Home
