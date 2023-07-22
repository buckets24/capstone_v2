import { Stack, Box } from '@mui/material'
import { useSessionContext } from '@supabase/auth-helpers-react'
import { Button } from 'components/Button/Button'
import { FormTextField } from 'components/Form/TextField'
import { FormikValues, useFormik } from 'formik'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { QuestionType } from 'types/Question.type'
import { questionSchema } from './form.schema'

interface ProfileAboutFormModuleProps {
  questions: QuestionType[] | null
  onClose: () => void
  callback: () => void
  currentIndex: number | null
}

function QuestionForm ({
  callback,
  onClose,
  questions,
  currentIndex
}: ProfileAboutFormModuleProps) {
  const { supabaseClient } = useSessionContext()

  const [submitting, setSubmitting] = useState(false)

  const notifySuccess = () => toast.success('Successfully update the question.')
  const notifyError = () => toast.error('Error updating the question.')

  const props = useFormik({
    initialValues: {
      question: questions?.[currentIndex!]?.question ?? ''
    },
    validationSchema: questionSchema,
    onSubmit: async (values: FormikValues) => {
      const questionList = questions
      let client = null

      setSubmitting(true)

      if (questionList) {
        if (typeof currentIndex === 'number') {
          client = await supabaseClient
            .from('questions')
            .update(values)
            .match({ id: questionList?.[currentIndex!]?.id! })
            .select()
        } else {
          client = await supabaseClient
            .from('questions')
            .insert(values)
            .select()
        }
      } else {
        client = await supabaseClient.from('questions').insert(values).select()
      }

      if (!client?.error) {
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

  return (
    <>
      <form>
        <Stack direction='column' gap={3} p={2}>
          <Stack flexDirection='row' justifyContent='space-between' gap={1}>
            <Box flex={1} width={500}>
              <FormTextField
                name='question'
                value={props?.values.question}
                onBlur={props?.handleBlur}
                onChange={props?.handleChange}
                error={Boolean(
                  props?.touched.question && props?.errors.question
                )}
                fullWidth
                multiline
                rows={5}
                label='Question'
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

export { QuestionForm }
