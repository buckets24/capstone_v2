import { Box, Container, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { GetServerSidePropsContext } from 'next'
import { useSessionContext } from '@supabase/auth-helpers-react'
import { CandidateType } from 'types/Candidate.type'
import DeveloperMainInfo from 'modules/Developer/MainInfo'
import DeveloperAboutInfo from 'modules/Developer/About'
import DeveloperWorkingExperience from 'modules/Developer/WorkingExperience'
import DeveloperEducation from 'modules/Developer/Education'
import Header from 'components/Layout/Header'
import { Button } from 'components/Button/Button'
import { navigate } from 'utils/navigate'
import { useUserStore } from 'stores/user.store'

interface Props {
  userId: string
}

function Developer ({ userId }: Props) {
  const { supabaseClient } = useSessionContext()
  const [user, setUser] = useState<CandidateType | null>(null)
  const { setCandidate } = useUserStore()

  const getUser = async () => {
    const { data } = await supabaseClient
      .from('users')
      .select('*')
      .eq('userId', userId)
    if (data) {
      setUser(data?.[0] as unknown as CandidateType)
      setCandidate(data?.[0] as unknown as CandidateType)
    }
  }

  useEffect(() => {
    if (userId) {
      getUser()
    }
  }, [userId])

  return (
    <>
      <Header role='developer' />
      <Box display='flex' alignItems='center' py={10} mt={2}>
        <Container component='main' maxWidth='md'>
          <Stack gap={3}>
            <Stack flexDirection='row' gap={1} justifyContent='flex-end'>
              <Box>
                <Button
                  label='Main Info'
                  color='primary'
                  onClick={() => navigate('/developer')}
                />
              </Box>
              <Box>
                <Button
                  label='Interview Questions'
                  variant='outlined'
                  color='primary'
                  labelColor='primary'
                  onClick={() => navigate('/developer/questions')}
                />
              </Box>
            </Stack>
            <DeveloperMainInfo user={user} />
            <DeveloperAboutInfo user={user} />
            <DeveloperWorkingExperience user={user} />
            <DeveloperEducation user={user} />
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default Developer

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
