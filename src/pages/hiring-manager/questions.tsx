/* eslint-disable multiline-ternary */
import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useEffect, useState } from 'react'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { GetServerSidePropsContext } from 'next'
import { useSessionContext } from '@supabase/auth-helpers-react'
import Header from 'components/Layout/Header'
import { HiringManagerNav } from 'components/Nav/HiringManagerNav'
import { useRouter } from 'next/router'
import { Button } from 'components/Button/Button'
import { AddCircleRounded } from '@mui/icons-material'
import QuestionForm from 'modules/HiringManager/QuestionForm'
import { Drawer } from 'components/Drawer'
import { QuestionType } from 'types/Question.type'

interface Props {
  userId: string
}

function QuestionsPage ({ userId }: Props) {
  const { supabaseClient } = useSessionContext()
  const router = useRouter()

  const [isDrawerActive, setDrawer] = useState(false)
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  const [isSucess, setSuccess] = useState(false)
  const [questions, setQuestions] = useState<QuestionType[] | null>(null)
  const [loading, setLoading] = useState(false)

  const getQuestions = async () => {
    setLoading(true)

    const { data } = await supabaseClient.from('questions').select('*')

    setLoading(false)

    if (data?.length === 0) {
      setQuestions(null)
    } else {
      setQuestions(data as unknown as QuestionType[])
    }

    setSuccess(false)
  }

  useEffect(() => {
    if (userId) {
      getQuestions()
    }
  }, [userId])

  useEffect(() => {
    if (isSucess) {
      getQuestions()
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
                      label='Add Question'
                      startIcon={<AddCircleRounded />}
                      onClick={() => {
                        setDrawer(true)
                      }}
                    />
                  </Box>
                </Stack>

                <Stack alignItems='center' width='100%' gap={2}>
                  {questions ? (
                    <>
                      {questions?.map((item, index) => {
                        return (
                          <Paper
                            key={index}
                            sx={{ width: '100%', px: 3, py: 2 }}
                          >
                            <Stack
                              flexDirection='row'
                              alignItems='center'
                              justifyContent='space-between'
                            >
                              <Typography variant='Overline2'>
                                {item?.question}
                              </Typography>

                              <Box>
                                <Button
                                  label='Edit'
                                  variant='text'
                                  labelColor='primary'
                                  color='primary'
                                  startIcon={<EditIcon />}
                                  onClick={() => {
                                    setCurrentIndex(index)
                                    setDrawer(true)
                                  }}
                                />
                              </Box>
                            </Stack>
                          </Paper>
                        )
                      })}
                    </>
                  ) : (
                    <Paper sx={{ width: '100%' }}>
                      <Stack alignItems='center' my={2}>
                        <Typography variant='Overline2'>
                          No Questions
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
            <QuestionForm
              questions={questions}
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

export default QuestionsPage

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
