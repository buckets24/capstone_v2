import { Stack, Box, FormControlLabel, Switch, Chip } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useSessionContext } from '@supabase/auth-helpers-react'
import { Button } from 'components/Button/Button'
import { FormTextField } from 'components/Form/TextField'
import { FormikValues, useFormik } from 'formik'
import { ChangeEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { useUserStore } from 'stores/user.store'
import { CandidateType } from 'types/Candidate.type'
import { profileExperieneSchema } from './form.schema'
import { IconButton } from 'components/Button/IconButton'

interface ProfileExperienceFormModuleProps {
  onClose: () => void
  experienceIndex?: number | null
}

function ProfileExperienceFormModule ({
  onClose,
  experienceIndex
}: ProfileExperienceFormModuleProps) {
  const { supabaseClient } = useSessionContext()
  const { candidate, submitting, setSubmitting, setCandidate } = useUserStore()

  const currentExperience =
    experienceIndex !== null
      ? candidate?.working_experience[experienceIndex!]
      : null

  const [isPresent, setPresent] = useState(
    currentExperience?.isPresent! || false
  )
  const [techSkills, setTechSkills] = useState<string[]>(
    currentExperience?.skills || []
  )
  const [techSkill, setTechSkill] = useState<string>('')

  const notifySuccess = () =>
    toast.success('Successfully update your experience.')
  const notifyError = () => toast.success('Error updating the your experience.')

  function addSkill (skill: string) {
    setTechSkills([...techSkills, skill])

    setTechSkill('')
  }

  function removeSkill (index: number) {
    setTechSkills(techSkills.splice(index, index))
  }

  const props = useFormik({
    initialValues: {
      company: currentExperience?.company ?? '',
      position: currentExperience?.position ?? '',
      description: currentExperience?.description ?? '',
      startDate: currentExperience?.startDate ?? '',
      endDate: currentExperience?.endDate ?? '',
      isPresent,
      skills: []
    },
    validationSchema: profileExperieneSchema,
    onSubmit: async (values: FormikValues) => {
      const experiences = candidate?.working_experience

      let payload = null
      setSubmitting(true)

      if (!experiences) {
        payload = [
          {
            ...candidate,
            working_experience: [
              {
                ...values,
                skills: techSkills,
                isPresent
              }
            ]
          }
        ]
      }

      if (experiences) {
        if (typeof experienceIndex === 'number') {
          experiences[experienceIndex].company = values?.company
          experiences[experienceIndex].position = values?.position
          experiences[experienceIndex].startDate = values?.startDate
          experiences[experienceIndex].endDate = values?.endDate
          experiences[experienceIndex].description = values?.description
          experiences[experienceIndex].isPresent = isPresent
          experiences[experienceIndex].skills = techSkills

          payload = [
            {
              ...candidate,
              working_experience: experiences
            }
          ]
        } else {
          payload = [
            {
              ...candidate,
              working_experience: [
                ...experiences!,
                {
                  ...values,
                  skills: techSkills,
                  isPresent
                }
              ]
            }
          ]
        }
      }

      const { data, error } = await supabaseClient
        .from('users')
        .update(payload)
        .eq('email', candidate?.email)
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
              name='company'
              value={props?.values.company}
              onBlur={props?.handleBlur}
              onChange={props?.handleChange}
              error={Boolean(props?.touched.company && props?.errors.company)}
              fullWidth
              label='Company'
            />
          </Stack>

          <Stack>
            <FormTextField
              name='position'
              value={props?.values.position}
              onBlur={props?.handleBlur}
              onChange={props?.handleChange}
              error={Boolean(props?.touched.position && props?.errors.position)}
              fullWidth
              label='Position'
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
              <FormControlLabel
                control={
                  <Switch
                    checked={isPresent === true}
                    value={isPresent}
                    onChange={() => setPresent(!isPresent)}
                  />
                }
                label='Is present?'
              />
              <FormTextField
                disabled={isPresent}
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
              name='techSkill'
              value={techSkill}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setTechSkill(event?.target?.value)}
              fullWidth
              label='Tech Skill'
            />
            <IconButton color='secondary' onClick={() => addSkill(techSkill)}>
              <AddIcon />
            </IconButton>
          </Stack>

          <Stack flexDirection='row' flexWrap='wrap' gap={1}>
            {techSkills?.map((skill, index) => (
              <Chip
                key={skill}
                sx={{ width: 'auto' }}
                label={skill}
                onDelete={() => removeSkill(index)}
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

export { ProfileExperienceFormModule }
