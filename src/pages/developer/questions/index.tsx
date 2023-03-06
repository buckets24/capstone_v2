import { Box, Container, Stack } from '@mui/material'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { GetServerSidePropsContext } from 'next'
import Header from 'components/Layout/Header'
import { Button } from 'components/Button/Button'
import { navigate } from 'utils/navigate'
import DeveloperQuestionsModule from 'modules/Developer/Questions'
import { useUserStore } from 'stores/user.store'

interface Props {
  userId: string
}

function DeveloperQuestions ({ userId }: Props) {
  const { candidate } = useUserStore()

  return (
    <>
      <Header role='developer' />
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
          <Stack gap={3}>
            <Stack
              flexDirection='row'
              gap={1}
              justifyContent='flex-end'
            >
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
            <DeveloperQuestionsModule user={candidate} />
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default DeveloperQuestions

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
