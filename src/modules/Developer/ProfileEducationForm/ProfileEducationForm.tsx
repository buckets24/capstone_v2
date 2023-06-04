import { Stack, Box, Chip } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useSessionContext, useUser } from '@supabase/auth-helpers-react'
import { Button } from 'components/Button/Button'
import { FormTextField } from 'components/Form/TextField'
import { FormikValues, useFormik } from 'formik'
import { ChangeEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { useUserStore } from 'stores/user.store'
import { CandidateType } from 'types/Candidate.type'
import { profileEducationSchema } from './form.schema'
import { IconButton } from 'components/Button/IconButton'

interface ProfileEducationFormModuleProps {
  onClose: () => void
  educationIndex?: number | null
}

function ProfileEducationFormModule ({
  onClose,
  educationIndex
}: ProfileEducationFormModuleProps) {
  const { supabaseClient } = useSessionContext()
  const { candidate, submitting, setSubmitting, setCandidate } = useUserStore()
  const user = useUser()

  const currentSchool =
    educationIndex !== null ? candidate?.school_info[educationIndex!] : null

  const [awards, setAwards] = useState<string[]>(currentSchool?.awards || [])
  const [award, setAward] = useState<string>('')

  const notifySuccess = () =>
    toast.success('Successfully update your education profile.')
  const notifyError = () =>
    toast.success('Error updating the your education profile.')

  function addAward (award: string) {
    setAwards([...awards, award])

    setAward('')
  }

  function removeAward (index: number) {
    setAwards(awards.splice(index, index))
  }

  const props = useFormik({
    initialValues: {
      school: currentSchool?.school ?? '',
      course: currentSchool?.course ?? '',
      description: currentSchool?.description ?? '',
      startDate: currentSchool?.startDate ?? '',
      endDate: currentSchool?.endDate ?? '',
      awards: []
    },
    validationSchema: profileEducationSchema,
    onSubmit: async (values: FormikValues) => {
      const schoolInfo = candidate?.school_info
      let payload = null
      setSubmitting(true)

      if (!schoolInfo) {
        payload = [
          {
            ...candidate,
            school_info: [
              {
                ...values,
                awards
              }
            ]
          }
        ]
      }

      if (schoolInfo) {
        if (typeof educationIndex === 'number') {
          schoolInfo[educationIndex].school = values?.school
          schoolInfo[educationIndex].course = values?.course
          schoolInfo[educationIndex].startDate = values?.startDate
          schoolInfo[educationIndex].endDate = values?.endDate
          schoolInfo[educationIndex].description = values?.description
          schoolInfo[educationIndex].awards = awards

          payload = [
            {
              ...candidate,
              school_info: schoolInfo
            }
          ]
        } else {
          payload = [
            {
              ...candidate,
              school_info: [
                ...candidate.school_info,
                {
                  ...values,
                  awards
                }
              ]
            }
          ]
        }
      }

      const { data, error } = await supabaseClient
        .from('users')
        .update(payload)
        .eq('email', user?.email)
        .select()

      if (!error) {
        setCandidate(data?.[0] as unknown as CandidateType)
        notifySuccess()
        onClose()
        setSubmitting(false)
      } else {
        notifyError()
        setSubmitting(false)
      }
    }
  })

  return (
    <>
      <form>
        <Stack direction='column' gap={3}>
          <Stack>
            <FormTextField
              name='school'
              value={props?.values.school}
              onBlur={props?.handleBlur}
              onChange={props?.handleChange}
              error={Boolean(props?.touched.school && props?.errors.school)}
              fullWidth
              label='School'
            />
          </Stack>

          <Stack>
            <FormTextField
              name='course'
              value={props?.values.course}
              onBlur={props?.handleBlur}
              onChange={props?.handleChange}
              error={Boolean(props?.touched.course && props?.errors.course)}
              fullWidth
              label='Course'
            />
          </Stack>

          <Stack flexDirection='column'>
            <FormTextField
              name='startDate'
              value={props?.values.startDate ?? ''}
              onBlur={props?.handleBlur}
              onChange={props?.handleChange}
              error={Boolean(
                props?.touched.startDate && props?.errors.startDate
              )}
              fullWidth
              type='date'
              helperText='Start Date'
            />
            <Box>
              <FormTextField
                name='endDate'
                value={props?.values.endDate ?? ''}
                onBlur={props?.handleBlur}
                onChange={props?.handleChange}
                error={Boolean(props?.touched.endDate && props?.errors.endDate)}
                fullWidth
                type='date'
                helperText='End Date'
              />
            </Box>
          </Stack>

          <Stack>
            <FormTextField
              rows={10}
              multiline
              name='description'
              value={props?.values.description}
              onBlur={props?.handleBlur}
              onChange={props?.handleChange}
              error={Boolean(
                props?.touched.description && props?.errors.description
              )}
              fullWidth
              label='Description'
            />
          </Stack>

          <Stack flexDirection='row' gap={1}>
            <FormTextField
              name='award'
              value={award}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setAward(event?.target?.value)}
              fullWidth
              label='Award'
            />
            <IconButton color='secondary' onClick={() => addAward(award)}>
              <AddIcon />
            </IconButton>
          </Stack>

          <Stack flexDirection='row' flexWrap='wrap' gap={1}>
            {awards?.map((award, index) => (
              <Chip
                key={award}
                sx={{ width: 'auto' }}
                label={award}
                onDelete={() => removeAward(index)}
              />
            ))}
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

export { ProfileEducationFormModule }
