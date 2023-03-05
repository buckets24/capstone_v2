import { Box, Stack } from '@mui/material'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useSessionContext } from '@supabase/auth-helpers-react'
import { Button } from 'components/Button/Button'
import { GetServerSidePropsContext } from 'next'
import { useEffect } from 'react'
import { useUserStore } from 'stores/user.store'
import { CandidateType } from 'types/Candidate.type'
import { navigate } from 'utils/navigate'

export default function RoleSelectPage ({ userId }: { userId: string }) {
  const { supabaseClient } = useSessionContext()
  const { setCandidate } = useUserStore()

  const getUser = async () => {
    const { data } = await supabaseClient
      .from('candidates')
      .select('*')
      .eq('userId', userId)
    const candidate = data?.[0] as unknown as CandidateType

    setCandidate(candidate)

    if (candidate) {
      candidate?.job_title !== 'Hiring Manager'
        ? navigate('/developer')
        : navigate('/hiring-manager')
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <Stack
      width='100vw'
      height='100vh'
      justifyContent='center'
      alignItems='center'
    >
      <Box
        width='40%'
        height='300px'
      >
        <Stack
          width='100%'
          alignItems='center'
        >
          <h1>Role Select</h1>
        </Stack>
        <Stack
          flexDirection={{ xs: 'column', sm: 'row' }}
          gap='10px'
        >
          <Button
            label='Software Engineer'
            color='primary'
            onClick={() => navigate('/developer')}
          />
          <Button
            label='Hiring Manager'
            color='primary'
            variant='outlined'
            labelColor='orange.main'
            onClick={() => navigate('/developer')}
          />
        </Stack>
      </Box>
    </Stack>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx)
  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      userId: session.user?.id
    }
  }
}
