import { Box, Stack } from '@mui/material'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useSessionContext, useUser } from '@supabase/auth-helpers-react'
import { Button } from 'components/Button/Button'
import { GetServerSidePropsContext } from 'next'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useUserStore } from 'stores/user.store'
import { CandidateType } from 'types/Candidate.type'
import { developerQuestions } from 'utils/developerQuestions'
import { useNavigate } from 'utils/navigate'

export default function RoleSelectPage ({
  userId,
  userEmail
}: {
  userId: string
  userEmail: string
}) {
  const user = useUser()
  const { supabaseClient } = useSessionContext()
  const { setCandidate, candidate } = useUserStore()
  const [submitting, setSubmitting] = useState(false)
  const { navigate } = useNavigate()

  const hasRecords = candidate !== undefined

  const notifySuccess = () => toast.success('Successfully added your role.')
  const notifyError = () => toast.success('Error adding the your role.')

  const updateRole = async (role: string) => {
    const { data, error } = await supabaseClient
      .from('users')
      .update([
        {
          ...candidate,
          role
        }
      ])
      .eq('email', user?.email)
      .select()

    if (!error) {
      setCandidate(data?.[0] as unknown as CandidateType)
      notifySuccess()
      setSubmitting(false)
      navigate(role === 'developer' ? '/developer' : '/hiring-manager')
    } else {
      notifyError()
      setSubmitting(false)
    }
  }

  const createUser = async (role: string) => {
    const { data, error } = await supabaseClient
      .from('users')
      .insert([
        {
          role,
          email: user?.email,
          questions: developerQuestions,
          userId
        }
      ])
      .eq('email', user?.email)
      .select()

    if (!error) {
      setCandidate(data?.[0] as unknown as CandidateType)
      notifySuccess()
      setSubmitting(false)
      navigate(role === 'developer' ? '/developer' : '/hiring-manager')
    } else {
      notifyError()
      setSubmitting(false)
    }
  }

  return (
    <Stack
      width='100vw'
      height='100vh'
      justifyContent='center'
      alignItems='center'
    >
      <Box width='40%' height='300px'>
        <Stack width='100%' alignItems='center'>
          <h1>Role Select</h1>
        </Stack>
        <Stack flexDirection={{ xs: 'column', sm: 'row' }} gap='10px' mt={3}>
          <Button
            disabled={submitting}
            label='Software Engineer'
            color='primary'
            onClick={() =>
              hasRecords ? updateRole('developer') : createUser('developer')}
          />
          <Button
            disabled={submitting}
            label='Hiring Manager'
            color='primary'
            variant='outlined'
            labelColor='orange.main'
            onClick={() =>
              hasRecords
                ? updateRole('hiring-manager')
                : createUser('hiring-manager')}
          />
        </Stack>
      </Box>
    </Stack>
  )
}

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
      userId: session.user?.id,
      userEmail: session.user?.email
    }
  }
}
