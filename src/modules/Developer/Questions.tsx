import { Box, Paper, Stack, Typography } from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { CandidateType } from 'types/Candidate.type'
import { ChangeEvent, useEffect, useState } from 'react'
import { useUserStore } from 'stores/user.store'
import { useRouter } from 'next/router'
import { Button } from 'components/Button/Button'
import { FormTextField } from 'components/Form/TextField'
import { useSessionContext } from '@supabase/auth-helpers-react'
import { toast } from 'react-toastify'

interface DeveloperMainInfoProps {
  user: CandidateType | null
}

function DeveloperQuestionsModule ({ user }: DeveloperMainInfoProps) {
  const { supabaseClient } = useSessionContext()

  const candidateState = useUserStore((state) => state.candidate)
  const router = useRouter()
  const [candidate, setCandidate] = useState<CandidateType | null>(null)
  const [expanded, setExpanded] = useState<number | null>(null)
  const [questions, setQuestions] = useState<{ question: string, answer: string | number | boolean }[] | null | undefined>(null)
  const [submitting, setSubmitting] = useState(false)

  const notifySuccess = () =>
    toast.success('Successfully update your experience.')
  const notifyError = () => toast.success('Error updating the your experience.')

  const updateAnswer = (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
    if (!questions) return

    const newItems = questions?.map((item, i) => {
      if (index === i) {
        return { ...item, answer: e.target.value }
      } else {
        return item
      }
    })

    setQuestions(newItems)
  }

  async function saveAnswers () {
    const payload = [
      {
        ...candidate,
        questions
      }
    ]

    const { data, error } = await supabaseClient
      .from('users')
      .update(payload)
      .eq('email', candidate?.email)
      .select()

    if (!error) {
      setCandidate(data?.[0] as unknown as CandidateType)
      notifySuccess()
      setSubmitting(false)
    } else {
      notifyError()
      setSubmitting(false)
    }
  }

  useEffect(() => {
    setCandidate(router.isReady ? candidateState : candidateState)
  }, [router])

  useEffect(() => {
    setCandidate(candidateState)
    setQuestions(candidateState?.questions)
  }, [candidateState])

  return (
    <Paper sx={{ overflow: 'hidden', px: 4 }}>
      <Box mb={5}>
        <Stack
          flexDirection='column'
          alignItems='center'
          p={3}
          gap={3}
        >
          <Typography
            variant='h6'
            fontWeight={600}
            textTransform='uppercase'
            sx={{
              borderBottom: '1px solid'
            }}
          >
            Interview Questions
          </Typography>
          <Stack width='100%'>
            {questions?.map((item, index) => {
              return (
                <Accordion
                  key={item?.question}
                  expanded={expanded === index}
                  onChange={() => setExpanded(expanded === index ? null : index)}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography>{item?.question}</Typography>
                  </AccordionSummary>

                  <AccordionDetails>
                    <FormTextField
                      rows={10}
                      multiline
                      value={item?.answer}
                      fullWidth
                      onChange={updateAnswer(index)}
                    />
                  </AccordionDetails>
                </Accordion>
              )
            })}
          </Stack>
        </Stack>
        <Stack
          px={3}
          alignItems='flex-end'
        >
          <Box width='auto'>
            <Button
              disabled={submitting}
              label={submitting ? 'Updating Answers' : 'Update Aswers'}
              color='primary'
              onClick={saveAnswers}
            />
          </Box>
        </Stack>
      </Box>
    </Paper>
  )
}

export default DeveloperQuestionsModule
