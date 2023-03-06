import { Box, CircularProgress, Container, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { GetServerSidePropsContext } from 'next'
import { useSessionContext } from '@supabase/auth-helpers-react'
import { CandidateType } from 'types/Candidate.type'
import Header from 'components/Layout/Header'
import { navigate } from 'utils/navigate'
import { CandidateCard } from 'components/CandidateCard'

interface Props {
  userId: string
}

function Developer ({ userId }: Props) {
  const { supabaseClient } = useSessionContext()

  const [candidates, setCandidates] = useState<CandidateType[] | null>(null)
  const [loading, setLoading] = useState(false)

  const getUsers = async () => {
    setLoading(true)

    const { data } = await supabaseClient
      .from('users')
      .select('*')

    setLoading(false)

    setCandidates(data as unknown as CandidateType[])
  }

  // const searchCandidate = async () => {
  //   setLoading(true)

  //   const { data } = await supabaseClient
  //     .from('users')
  //     .select()
  //     .like('first_name', `%${searchText}%`)
  //     .like('last_name', `%${searchText}%`)

  //   setLoading(false)

  //   setCandidates(data as unknown as CandidateType[])
  // }

  useEffect(() => {
    if (userId) {
      getUsers()
    }
  }, [userId])

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
                  {/* <Stack
                    flexDirection='row'
                    justifyContent='flex-end'
                    alignItems='flex-start'
                    gap={1}
                  >
                    <Box width='40%'>
                      <FormTextField
                        name='company'
                        value={searchText}
                        fullWidth
                        placeholder='Search'
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                          return setSearchText(event?.target?.value)
                        }}
                        helperText='**Case Sensitive**'
                      />
                    </Box>
                    <Box
                      maxWidth='100px'
                    >
                      <Button
                        color='primary'
                        labelColor='primary'
                        variant='outlined'
                        label='Search'
                        onClick={() => searchCandidate()}
                      />
                    </Box>
                  </Stack> */}
                  {candidates?.map((candidate, index) => {
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
