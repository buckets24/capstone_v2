import { Stack, Box, MenuItem } from '@mui/material'
import { useSessionContext } from '@supabase/auth-helpers-react'
import { Button } from 'components/Button/Button'
import { FormTextField } from 'components/Form/TextField'
import { FormikValues, useFormik } from 'formik'
import { ChangeEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useJobsStore } from 'stores/jobs.store'
import { JobType } from 'types/Jobs.type'
import { jobSchema } from './form.schema'

interface ProfileAboutFormModuleProps {
  onClose: () => void
  callback: () => void
  currentIndex: number | null
  jobs?: JobType[]
}

function HiringManagerForm ({
  onClose,
  callback,
  currentIndex,
  jobs
}: ProfileAboutFormModuleProps) {
  const { supabaseClient } = useSessionContext()
  const { job, setJob } = useJobsStore()

  const [submitting, setSubmitting] = useState(false)

  const notifySuccess = () =>
    toast.success('Successfully added/updated the job.')
  const notifyError = () => toast.error('Error adding/updating the job.')

  const props = useFormik({
    initialValues: {
      title: job?.title ?? '',
      description: job?.description ?? '',
      salary_max: job?.salary_max ?? '',
      salary_min: job?.salary_min ?? '',
      requirements: job?.requirements ?? '',
      status: job?.status ?? '',
      type: job?.type ?? '',
      level: job?.level ?? ''
    },
    validationSchema: jobSchema,
    onSubmit: async (values: FormikValues) => {
      const jobList = jobs
      let client = null

      setSubmitting(true)

      /**
       * Update
       */
      if (jobList) {
        if (typeof currentIndex === 'number') {
          jobList[currentIndex].title = values?.title
          jobList[currentIndex].description = values?.description
          jobList[currentIndex].salary_max = values?.salary_max
          jobList[currentIndex].salary_min = values?.salary_min
          jobList[currentIndex].requirements = values?.requirements
          jobList[currentIndex].status = values?.status
          jobList[currentIndex].type = values?.type
          jobList[currentIndex].level = values?.level
        }
      }

      if (job?.id) {
        client = await supabaseClient
          .from('jobs')
          .update(values)
          .match({ id: jobList?.[currentIndex!]?.id! })
          .select()
      } else {
        client = await supabaseClient.from('jobs').insert(values).select()
      }

      if (!client?.error) {
        setJob(null)
        notifySuccess()
        onClose()
        callback()
        setSubmitting(false)
      } else {
        notifyError()
        setSubmitting(false)
      }
    }
  })

  console.log(jobs)

  useEffect(() => {
    setJob({ ...job, ...props?.values } as JobType)
  }, [props?.values])

  return (
    <>
      <form>
        <Stack direction='column' gap={3} p={2}>
          <Stack gap={3}>
            <Box>
              <FormTextField
                name='title'
                value={props?.values.title}
                onBlur={props?.handleBlur}
                onChange={props?.handleChange}
                error={Boolean(props?.touched.title && props?.errors.title)}
                fullWidth
                label='Title'
              />
            </Box>

            <Box>
              <FormTextField
                select
                name='type'
                value={props?.values.type}
                onBlur={props?.handleBlur}
                onChange={props?.handleChange}
                error={Boolean(props?.touched.type && props?.errors.type)}
                fullWidth
                label='Type'
              >
                <MenuItem value='frontend'>Frontend</MenuItem>
                <MenuItem value='backend'>Backend</MenuItem>
                <MenuItem value='mobile'>Mobile</MenuItem>
              </FormTextField>
            </Box>

            <Box>
              <FormTextField
                select
                name='level'
                value={props?.values.level}
                onBlur={props?.handleBlur}
                onChange={props?.handleChange}
                error={Boolean(props?.touched.level && props?.errors.level)}
                fullWidth
                label='Level'
              >
                <MenuItem value='junior'>Junior Level</MenuItem>
                <MenuItem value='mid'>Mid Level</MenuItem>
                <MenuItem value='senior'>Senior Level</MenuItem>
              </FormTextField>
            </Box>

            <Box>
              <FormTextField
                name='description'
                value={props?.values.description}
                onBlur={props?.handleBlur}
                onChange={props?.handleChange}
                error={Boolean(
                  props?.touched.description && props?.errors.description
                )}
                fullWidth
                multiline
                rows={20}
                label='Description'
              />
            </Box>
            <Box>
              <FormTextField
                name='requirements'
                value={props?.values.requirements}
                onBlur={props?.handleBlur}
                onChange={props?.handleChange}
                error={Boolean(
                  props?.touched.requirements && props?.errors.requirements
                )}
                fullWidth
                multiline
                rows={20}
                label='Requirements'
              />
            </Box>

            <Box>
              <Stack flexDirection='row' justifyContent='space-between' gap={1}>
                <Box flex={1}>
                  <FormTextField
                    name='salary_min'
                    value={props?.values.salary_min}
                    onBlur={props?.handleBlur}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      const value = event.target.value.replace(/\D/g, '')
                      props?.setFieldValue('salary_min', value, true)
                    }}
                    error={Boolean(
                      props?.touched.salary_min && props?.errors.salary_min
                    )}
                    fullWidth
                    label='Min Salary USD'
                  />
                </Box>

                <Box flex={1}>
                  <FormTextField
                    name='salary_max'
                    value={props?.values.salary_max}
                    onBlur={props?.handleBlur}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      const value = event.target.value.replace(/\D/g, '')
                      props?.setFieldValue('salary_max', value, true)
                    }}
                    error={Boolean(
                      props?.touched.salary_max && props?.errors.salary_max
                    )}
                    fullWidth
                    label='Max Salary USD'
                  />
                </Box>
              </Stack>
            </Box>

            <Box>
              <FormTextField
                select
                name='status'
                value={props?.values.status}
                onBlur={props?.handleBlur}
                onChange={props?.handleChange}
                error={Boolean(props?.touched.status && props?.errors.status)}
                fullWidth
                label='Status'
              >
                <MenuItem value='ongoing'>On-going</MenuItem>
                <MenuItem value='onhold'>On-hold</MenuItem>
                <MenuItem value='archived'>Archived</MenuItem>
              </FormTextField>
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

export { HiringManagerForm }
