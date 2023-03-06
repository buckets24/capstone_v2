import { Box, CircularProgress, Container, Stack } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useEffect, useState } from 'react'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { GetServerSidePropsContext } from 'next'
import { useSessionContext } from '@supabase/auth-helpers-react'
import { CandidateType } from 'types/Candidate.type'
import Header from 'components/Layout/Header'
import { Button } from 'components/Button/Button'
import { navigate } from 'utils/navigate'
import { CandidateCardFull } from 'components/CandidateCard/CandidateCardFull'
import { useRouter } from 'next/router'

interface Props {
  userId: string
}

function Developer ({ userId }: Props) {
  const router = useRouter()

  const { supabaseClient } = useSessionContext()

  const [candidate, setCandidate] = useState<CandidateType | null>(null)
  const [loading, setLoading] = useState(false)

  const getUsers = async (userId: string) => {
    setLoading(true)

    const { data } = await supabaseClient
      .from('candidates')
      .select('*')
      .eq('userId', userId)

    setLoading(false)

    setCandidate(data?.[0] as unknown as CandidateType)
  }

  useEffect(() => {
    if (router.query?.userId) {
      getUsers(String(router.query?.userId))
    }
  }, [router.query?.userId])

  return (
    <>
      <Header role='hiring-manager' />
      <Box
        display='flex'
        alignItems='center'
        py={10}
        mt={2}
      >
        <Container
          component='main'
          maxWidth='md'
        >
          <Box
            width='100px'
            pb={3}
            onClick={() => navigate('/hiring-manager')}
          >
            <Button
              labelColor='primary'
              variant='text'
              label='Back'
              startIcon={<ArrowBackIcon color='primary' />}
            />
          </Box>
          <Stack alignItems='center'>
            {loading
              ? (
                <CircularProgress size={80} />
                )
              : (
                <Stack
                  width='100%'
                  gap={3}
                >
                  <CandidateCardFull candidate={candidate} />
                </Stack>
                )}
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
