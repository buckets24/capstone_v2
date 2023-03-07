import {
  Stack,
  Box,
  MenuItem,
  Divider,
  FormControlLabel,
  Switch
} from '@mui/material'
import { useSessionContext } from '@supabase/auth-helpers-react'
import { Button } from 'components/Button/Button'
import { FormTextField } from 'components/Form/TextField'
import { AvatarUpload } from 'components/Upload/Avatar'
import { FormikValues, useFormik } from 'formik'
import { ChangeEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useUserStore } from 'stores/user.store'
import { CandidateType } from 'types/Candidate.type'
import { profileFormSchema } from './form.schema'

interface ProfileFormModuleProps {
  onClose: () => void
}

function ProfileFormModule ({ onClose }: ProfileFormModuleProps) {
  const { supabaseClient } = useSessionContext()
  const { candidate, submitting, setCandidate } = useUserStore()

  const notifySuccess = () => toast.success('Successfully update the profile.')
  const notifyError = () => toast.success('Error updating the profile.')

  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isActivelyLooking, setIsLooking] = useState(
    candidate?.actively_looking || false
  )

  const handleFileAttach = async (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event?.target?.files)
    if (!event?.target?.files) return

    if (event.target.files.length > 0) {
      const src = URL.createObjectURL(event.target.files[0])
      setPreviewImage(src)
    }
  }

  useEffect(() => {
    console.log(submitting, 'submitting')
  }, [submitting])

  const props = useFormik({
    initialValues: {
      first_name: candidate?.first_name ?? '',
      last_name: candidate?.last_name ?? '',
      birthday: candidate?.birthday ?? '',
      job_title: candidate?.job_title ?? '',
      email: candidate?.email ?? '',
      mobile: candidate?.mobile ?? '',
      location: candidate?.location ?? '',
      github_link: candidate?.github_link ?? '',
      linkedin_link: candidate?.linkedin_link ?? '',
      twitter_link: candidate?.twitter_link ?? '',
      facebook_link: candidate?.facebook_link ?? '',
      expected_salary: candidate?.expected_salary ?? '',
      actively_looking: isActivelyLooking
    },
    validationSchema: profileFormSchema,
    isInitialValid: true,
    onSubmit: async (values: FormikValues) => {
      console.log(values?.birthday)

      const { data, error } = await supabaseClient
        .from('developers')
        .update([
          {
            ...candidate,
            ...values,
            actively_looking: isActivelyLooking
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
        <Stack direction='column' gap={3}>
          <Stack justifyContent='center' alignItems='center' pb={3}>
            <AvatarUpload previewImage={previewImage}>
              <input
                id='dropzone-file'
                type='file'
                accept='image/*'
                style={{ visibility: 'hidden' }}
                onChange={handleFileAttach}
              />
            </AvatarUpload>
          </Stack>

          <Stack flexDirection='row' justifyContent='space-between' gap={1}>
            <Box flex={1}>
              <FormTextField
                name='first_name'
                value={props?.values.first_name}
                onBlur={props?.handleBlur}
                onChange={props?.handleChange}
                error={Boolean(
                  props?.touched.first_name && props?.errors.first_name
                )}
                fullWidth
                label='First Name'
              />
            </Box>

            <Box flex={1}>
              <FormTextField
                name='last_name'
                value={props?.values.last_name}
                onBlur={props?.handleBlur}
                onChange={props?.handleChange}
                error={Boolean(
                  props?.touched.last_name && props?.errors.last_name
                )}
                fullWidth
                label='Last Name'
              />
            </Box>
          </Stack>

          <Box>
            <FormTextField
              name='birthday'
              value={props?.values.birthday}
              onBlur={props?.handleBlur}
              onChange={props?.handleChange}
              error={Boolean(props?.touched.birthday && props?.errors.birthday)}
              fullWidth
              label='Birthday'
              type='date'
            />
          </Box>

          <Box>
            <FormTextField
              name='job_title'
              value={props?.values.job_title}
              onBlur={props?.handleBlur}
              onChange={props?.handleChange}
              error={Boolean(
                props?.touched.job_title && props?.errors.job_title
              )}
              fullWidth
              label='Job Title'
            />
          </Box>

          <Box>
            <FormTextField
              select
              name='location'
              value={props?.values.location}
              onBlur={props?.handleBlur}
              onChange={props?.handleChange}
              error={Boolean(props?.touched.location && props?.errors.location)}
              fullWidth
              label='Location'
            >
              <MenuItem value='Philippines'>Philippines</MenuItem>
              <MenuItem value='Singapore'>Singapore</MenuItem>
              <MenuItem value='Malaysia'>Malaysia</MenuItem>
            </FormTextField>
          </Box>

          <Stack flexDirection='row' justifyContent='space-between' gap={1}>
            <Box flex={1}>
              <FormTextField
                disabled
                name='email'
                value={props?.values.email}
                onBlur={props?.handleBlur}
                onChange={props?.handleChange}
                error={Boolean(props?.touched.email && props?.errors.email)}
                fullWidth
                label='Email Address'
              />
            </Box>

            <Box flex={1}>
              <FormTextField
                name='mobile'
                value={props?.values.mobile}
                onBlur={props?.handleBlur}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  const value = event.target.value.replace(/\D/g, '')
                  props?.setFieldValue('mobile', value, true)
                }}
                error={Boolean(props?.touched.mobile && props?.errors.mobile)}
                fullWidth
                label='Mobile Number'
              />
            </Box>
          </Stack>
          <Divider />
          <Stack flexDirection='column' justifyContent='space-between' gap={2}>
            <Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={isActivelyLooking === true}
                    value={isActivelyLooking}
                    onChange={() => setIsLooking(!isActivelyLooking)}
                  />
                }
                label='Actively Looking?'
              />
            </Box>
            <Box>
              <FormTextField
                name='expected_salary'
                value={props?.values.expected_salary}
                onBlur={props?.handleBlur}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  const value = event.target.value.replace(/\D/g, '')
                  props?.setFieldValue('expected_salary', value, true)
                }}
                error={Boolean(
                  props?.touched.expected_salary &&
                    props?.errors.expected_salary
                )}
                fullWidth
                label='Expected salary in USD'
              />
            </Box>
          </Stack>
          <Divider />
          <Stack flexDirection='column' justifyContent='space-between' gap={2}>
            <Box flex={1}>
              <FormTextField
                name='github_link'
                value={props?.values.github_link}
                onBlur={props?.handleBlur}
                onChange={props?.handleChange}
                error={Boolean(
                  props?.touched.github_link && props?.errors.github_link
                )}
                fullWidth
                label='Github'
              />
            </Box>
            <Box flex={1}>
              <FormTextField
                name='linkedin_link'
                value={props?.values.linkedin_link}
                onBlur={props?.handleBlur}
                onChange={props?.handleChange}
                error={Boolean(
                  props?.touched.linkedin_link && props?.errors.linkedin_link
                )}
                fullWidth
                label='Linkedin'
              />
            </Box>
            <Box flex={1}>
              <FormTextField
                name='facebook_link'
                value={props?.values.facebook_link}
                onBlur={props?.handleBlur}
                onChange={props?.handleChange}
                error={Boolean(
                  props?.touched.facebook_link && props?.errors.facebook_link
                )}
                fullWidth
                label='Facebook'
              />
            </Box>
            <Box flex={1}>
              <FormTextField
                name='twitter_link'
                value={props?.values.twitter_link}
                onBlur={props?.handleBlur}
                onChange={props?.handleChange}
                error={Boolean(
                  props?.touched.twitter_link && props?.errors.twitter_link
                )}
                fullWidth
                label='Twitter'
              />
            </Box>
          </Stack>
          <Divider />
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

export { ProfileFormModule }
