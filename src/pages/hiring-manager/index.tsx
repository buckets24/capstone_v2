import { Box, CircularProgress, Container, Stack } from '@mui/material'
import { SetStateAction, useEffect, useState } from 'react'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { GetServerSidePropsContext } from 'next'
import { useSessionContext } from '@supabase/auth-helpers-react'
import { CandidateType } from 'types/Candidate.type'
import { JobType } from 'types/Jobs.type'
import Header from 'components/Layout/Header'
import { HiringManagerNav } from 'components/Nav/HiringManagerNav'
import { Candidates } from 'modules/HiringManager/Candidates'
import { Jobs } from 'modules/HiringManager/Jobs'
import { Questions } from 'modules/HiringManager/Questions'
import { QuestionType } from 'types/Question.type'
import { SearchField } from 'components/Form/SearchField'

function HiringManager () {
  const { supabaseClient } = useSessionContext()

  const [candidates, setCandidates] = useState<CandidateType[] | null>(null)
  const [candidatesQueries, setCandidatesQueries] = useState<
    CandidateType[] | null
  >(null)
  const [jobs, setJobs] = useState<JobType[] | null>(null)
  const [questions, setQuestions] = useState<QuestionType[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [activeNav, setActiveNav] = useState('developers')
  const [isSucess, setSuccess] = useState(false)

  const getUsers = async () => {
    setLoading(true)
    const { data } = await supabaseClient.from('users').select('*')
    setLoading(false)
    setCandidates(data as unknown as CandidateType[])
    setCandidatesQueries(data as unknown as CandidateType[])
  }

  const getJobs = async () => {
    setLoading(true)
    const { data } = await supabaseClient
      .from('jobs')
      .select('*')
      .order('id', { ascending: false })
    setJobs(data as unknown as JobType[])
    setLoading(false)
  }

  const getQuestions = async () => {
    setLoading(true)
    const { data } = await supabaseClient.from('questions').select('*')
    setQuestions(data as unknown as QuestionType[])
    setLoading(false)
  }

  const handleSearch = (value: string) => {
    console.log(value, 'value')
    const copy = JSON.stringify(candidates)

    const filteredCandidates = JSON.parse(copy)?.filter(
      (item: { name: string }) => {
        const fullName = `${item.name}`
        console.log(fullName)
        return fullName.toLowerCase().includes(value.toLowerCase())
      }
    )

    if (value === '') {
      return setCandidates(candidatesQueries)
    } else {
      return setCandidates(filteredCandidates as unknown as CandidateType[])
    }
  }

  useEffect(() => {
    getUsers()
    getJobs()
    getQuestions()
  }, [isSucess])

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
                  <HiringManagerNav
                    activeRoute={activeNav}
                    setActiveNav={(nav) => setActiveNav(nav)}
                  />
                  <SearchField
                    onChange={(event: {
                      target: { value: SetStateAction<string> }
                    }) => handleSearch(String(event.target.value))}
                  />
                </Stack>
                {activeNav === 'developers' && (
                  <Candidates list={candidates ?? []} />
                )}
                {activeNav === 'jobs' && (
                  <Jobs list={jobs ?? []} setSuccess={setSuccess} />
                )}
                {activeNav === 'questions' && (
                  <Questions list={questions ?? []} setSuccess={setSuccess} />
                )}
              </Stack>
            )}
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default HiringManager

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
