/* eslint-disable multiline-ternary */
import { Box, CircularProgress, Container, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { GetServerSidePropsContext } from 'next'
import { useSessionContext } from '@supabase/auth-helpers-react'
import { CandidateType } from 'types/Candidate.type'
import Header from 'components/Layout/Header'
import { HiringManagerNav } from 'components/Nav/HiringManagerNav'
import { useRouter } from 'next/router'
import { Button } from 'components/Button/Button'
import { AddCircleRounded } from '@mui/icons-material'

interface Props {
  userId: string
}

function InterviewsPage ({ userId }: Props) {
  const { supabaseClient } = useSessionContext()
  const router = useRouter()

  const [jobs, setJobs] = useState<CandidateType[] | null>(null)
  const [loading, setLoading] = useState(false)

  const getUsers = async () => {
    setLoading(true)

    const { data } = await supabaseClient.from('jobs').select('*')

    setLoading(false)
    console.log(jobs)
    setJobs(data as unknown as CandidateType[])
  }

  useEffect(() => {
    if (userId) {
      getUsers()
    }
  }, [userId])

  return (
    <>
      <Header role='hiring-manager' />
      <Box display='flex' alignItems='center' py={10} mt={2}>
        <Container component='main' maxWidth='md'>
          <Stack alignItems='center'>
            {loading ? (
              <CircularProgress size={80} />
            ) : (
              <Stack width='100%' gap={3}>
                <Stack
                  flexDirection='row'
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <HiringManagerNav activeRoute={router?.pathname} />
                  <Box>
                    <Button
                      color='primary'
                      labelColor='primary'
                      variant='text'
                      label='Add Interview'
                      startIcon={<AddCircleRounded />}
                    />
                  </Box>
                </Stack>
                {/* {candidates?.map((candidate, index) => {
                    if (candidate?.first_name === null) {
                      return null
                    }

                    return (
                      <Box
                        key={index}
                        onClick={() => navigate(`/hiring-manager/developer/${candidate?.userId}`)}
                        sx={{ cursor: 'pointer' }}
                      >
                        <CandidateCard candidate={candidate} />
                      </Box>
                    )
                  })} */}
              </Stack>
            )}
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default InterviewsPage

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
