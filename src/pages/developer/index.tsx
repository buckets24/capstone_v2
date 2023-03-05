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

interface Props {
  userId: string
}

function Developer ({ userId }: Props) {
  const { supabaseClient } = useSessionContext()
  const [user, setUser] = useState<CandidateType | null>(null)

  const getUser = async () => {
    const { data } = await supabaseClient
      .from('candidates')
      .select('*')
      .eq('userId', userId)
    if (data) {
      setUser(data?.[0] as unknown as CandidateType)
    }
  }

  // const handleFileAttach = async (event: ChangeEvent<HTMLInputElement>) => {
  //   console.log(event)
  //   if (!event?.target?.files) return

  //   setPreviewImage(event?.target?.files?.[0])
  // }

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    console.log(user, 'user')
  }, [user])

  return (
    <Box
      display='flex'
      alignItems='center'
      py={10}
    >
      <Container
        component='main'
        maxWidth='md'
      >
        <Stack gap={3}>
          <DeveloperMainInfo user={user} />
          <DeveloperAboutInfo user={user} />
          <DeveloperWorkingExperience user={user} />
          <DeveloperEducation user={user} />
        </Stack>
      </Container>
    </Box>
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
