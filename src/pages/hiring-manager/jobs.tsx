import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { GetServerSidePropsContext } from 'next'
import { useSessionContext } from '@supabase/auth-helpers-react'
import EditIcon from '@mui/icons-material/Edit'
import Header from 'components/Layout/Header'
import { HiringManagerNav } from 'components/Nav/HiringManagerNav'
import { useRouter } from 'next/router'
import { Button } from 'components/Button/Button'
import { AddCircleRounded } from '@mui/icons-material'
import { Drawer } from 'components/Drawer'
import HiringManagerForm from 'modules/HiringManager/Form'
import { JobType } from 'types/Jobs.type'
import JobCard from 'components/JobCard'
import { useJobsStore } from 'stores/jobs.store'

interface Props {
  userId: string
}

function JobsPage({ userId }: Props) {
  const { supabaseClient } = useSessionContext()
  const router = useRouter()
  const { jobs, setJobs, setJob } = useJobsStore()

  const [isDrawerActive, setDrawer] = useState(false)
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  const [isSucess, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const getJobs = async () => {
    setLoading(true)

    const { data } = await supabaseClient
      .from('jobs')
      .select('*')
    // .order('id', { ascending: false })

    setLoading(false)
    setSuccess(false)

    if (data?.length === 0) {
      setJobs(null)
    } else {
      setJobs(data as unknown as JobType[])
    }
  }

  useEffect(() => {
    if (userId) {
      getJobs()
    }
  }, [userId])

  useEffect(() => {
    if (isSucess) {
      getJobs()
    }
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
                      label='Add Job'
                      startIcon={<AddCircleRounded />}
                      onClick={() => {
                        setJob(null)
                        setDrawer(true)
                      }}
                    />
                  </Box>
                </Stack>

                <Stack alignItems='center' width='100%' gap={2}>
                  {jobs ? (
                    <>
                      {jobs?.map((job, index) => {
                        return (
                          <Paper key={index} sx={{ width: '100%' }}>
                            <JobCard job={job}>
                              <Button
                                label='Edit'
                                variant='text'
                                labelColor='primary'
                                color='primary'
                                startIcon={<EditIcon />}
                                onClick={() => {
                                  setJob(jobs[index])
                                  setCurrentIndex(index)
                                  setDrawer(true)
                                }}
                              />
                            </JobCard>
                          </Paper>
                        )
                      })}
                    </>
                  ) : (
                    <Paper sx={{ width: '100%' }}>
                      <Stack alignItems='center' my={2}>
                        <Typography variant='Overline2'>
                          No Job posting.
                        </Typography>
                      </Stack>
                    </Paper>
                  )}
                </Stack>
              </Stack>
            )}
          </Stack>
        </Container>

        <Drawer open={isDrawerActive} onClose={() => setDrawer(false)}>
          <Box width={500}>
            <HiringManagerForm
              currentIndex={currentIndex}
              callback={() => setSuccess(true)}
              onClose={() => setDrawer(false)}
            />
          </Box>
        </Drawer>
      </Box>
    </>
  )
}

export default JobsPage

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
