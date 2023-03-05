import { Stack, Box } from '@mui/material'
import { useSessionContext } from '@supabase/auth-helpers-react'
import { Button } from 'components/Button/Button'
import { FormTextField } from 'components/Form/TextField'
import { FormikValues, useFormik } from 'formik'
import { toast } from 'react-toastify'
import { useUserStore } from 'stores/user.store'
import { CandidateType } from 'types/Candidate.type'
import { profileAboutSchema } from './form.schema'

interface ProfileAboutFormModuleProps {
  onClose: () => void
}

function ProfileAboutFormModule ({ onClose }: ProfileAboutFormModuleProps) {
  const { supabaseClient } = useSessionContext()
  const { candidate, submitting, setCandidate } = useUserStore()

  const notifySuccess = () => toast.success('Successfully update the profile.')
  const notifyError = () => toast.success('Error updating the profile.')

  const props = useFormik({
    initialValues: {
      about: candidate?.about ?? ''
    },
    validationSchema: profileAboutSchema,
    onSubmit: async (values: FormikValues) => {
      const { data, error } = await supabaseClient
        .from('candidates')
        .update([
          {
            ...candidate,
            ...values
          }
        ])
        .eq('email', candidate?.email)
        .select()

      if (!error) {
        setCandidate(data?.[0] as unknown as CandidateType)
        notifySuccess()
        onClose()
      } else {
        notifyError()
      }
    }
  })

  return (
    <>
      <form>
        <Stack
          direction='column'
          gap={3}
        >
          <Stack
            flexDirection='row'
            justifyContent='space-between'
            gap={1}
          >
            <Box
              flex={1}
              width={500}
            >
              <FormTextField
                name='about'
                value={props?.values.about}
                onBlur={props?.handleBlur}
                onChange={props?.handleChange}
                error={Boolean(props?.touched.about && props?.errors.about)}
                fullWidth
                multiline
                rows={20}
                label='About'
              />
            </Box>
          </Stack>

          <Box>
            <Button
              label={submitting ? 'Submitting' : 'Submit'}
              disabled={!props?.isValid || submitting}
              onClick={() => props?.handleSubmit()}
              color='primary'
            />
          </Box>
        </Stack>
      </form>
    </>
  )
}

export { ProfileAboutFormModule }
