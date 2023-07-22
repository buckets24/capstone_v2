import { Box, CircularProgress, Container, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { GetServerSidePropsContext } from 'next'
import { useSessionContext } from '@supabase/auth-helpers-react'
import { CandidateType } from 'types/Candidate.type'
import Header from 'components/Layout/Header'
import { useNavigate } from 'utils/navigate'
import { CandidateCard } from 'components/CandidateCard'
import { HiringManagerNav } from 'components/Nav/HiringManagerNav'
import { useRouter } from 'next/router'

interface Props {
  userId: string
}

function Developer ({ userId }: Props) {
  const { supabaseClient } = useSessionContext()
  const router = useRouter()

  const [candidates, setCandidates] = useState<CandidateType[] | null>(null)
  const [loading, setLoading] = useState(false)
  // const [queryText] = useState('')
  const { navigate } = useNavigate()

  const getUsers = async () => {
    setLoading(true)
    const { data } = await supabaseClient.from('users').select('*')
    setLoading(false)
    setCandidates(data as unknown as CandidateType[])
  }

  const getJobs = async () => {
    setLoading(true)

    await supabaseClient
      .from('jobs')
      .select('*')
      .order('id', { ascending: false })

    setLoading(false)
  }

  // const searchUsers = async () => {
  //   const { data } = await supabaseClient
  //     .from('users')
  //     .select('*')
  //     .textSearch('first_name', `"${queryText}"`)
  //   console.log(data, 'data')
  // }

  useEffect(() => {
    if (userId) {
      getUsers()
      getJobs()
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
                <Stack flexDirection='row' justifyContent='space-between'>
                  <HiringManagerNav activeRoute={router?.pathname} />
                  {/* <SearchField
                    onChange={(event: { target: { value: SetStateAction<string> } }) => setQueryText(event.target.value)}
                    onBlur={searchUsers}
                  /> */}
                </Stack>
                {candidates?.map((candidate, index) => {
                  if (candidate?.first_name === null) {
                    return null
                  }

                  return (
                    <Box
                      key={index}
                      onClick={() =>
                        navigate(
                          `/hiring-manager/developer/${candidate?.userId}`
                        )}
                      sx={{ cursor: 'pointer' }}
                    >
                      <CandidateCard candidate={candidate} />
                    </Box>
                  )
                })}
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
