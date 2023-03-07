import {
  Box,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Typography
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import { CandidateType } from 'types/Candidate.type'
import { useEffect, useState } from 'react'
import { Drawer } from 'components/Drawer'
import ProfileExperienceFormModule from './ProfileExperienceForm'
import { useUserStore } from 'stores/user.store'
import { Button } from 'components/Button/Button'
import { IconButton } from 'components/Button/IconButton'
import { useSessionContext } from '@supabase/auth-helpers-react'
import { toast } from 'react-toastify'

interface DeveloperWorkingExperienceProps {
  user: CandidateType | null
}

function DeveloperWorkingExperience ({ user }: DeveloperWorkingExperienceProps) {
  const candidateStore = useUserStore()
  const { supabaseClient } = useSessionContext()

  const [isDrawerActive, setDrawer] = useState(false)
  const [candidate, setCandidate] = useState<CandidateType | null>(null)
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  const [removeIndex, setRemoveIndex] = useState<number | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const notifySuccess = () =>
    toast.success('Successfully update your experience.')
  const notifyError = () => toast.error('Error updating the your experience.')

  async function removeItem (itemIndex: number) {
    const items = candidate?.working_experience
    if (!items) return

    const newItems = items?.filter((item, index) => itemIndex !== index && item)

    setSubmitting(true)

    const { data, error } = await supabaseClient
      .from('developers')
      .update([
        {
          ...candidate,
          working_experience: newItems?.length === 0 ? null : newItems
        }
      ])
      .eq('email', candidate?.email)
      .select()

    if (!error) {
      setCandidate(data?.[0] as unknown as CandidateType)
      notifySuccess()
      setSubmitting(false)
      setCurrentIndex(null)
      setRemoveIndex(null)
    } else {
      notifyError()
      setSubmitting(false)
    }
  }

  useEffect(() => {
    candidateStore.setSubmitting(false)
    setCandidate(candidateStore?.candidate)
  }, [candidateStore?.candidate])

  return (
    <Paper sx={{ overflow: 'hidden', px: 4 }}>
      {candidate?.working_experience
        ? (
          <>
            <Stack alignItems='flex-end'>
              <Box my={2}>
                <Button
                  label='Add'
                  onClick={() => {
                    setDrawer(true)
                    setCurrentIndex(null)
                  }}
                  color='primary'
                  variant='outlined'
                  labelColor='primary'
                  startIcon={<AddIcon />}
                />
              </Box>
            </Stack>
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
                Working Experience
              </Typography>

              {candidate?.working_experience?.map((experience, index) => (
                <Stack
                  gap={2}
                  key={experience.company}
                  width='100%'
                >
                  <Stack
                    flexDirection='row'
                    justifyContent='space-between'
                    width='100%'
                  >
                    <Stack
                      alignItems='flex-start'
                      gap={1}
                    >
                      <Typography
                        variant='subtitle1'
                        color='ink.900'
                        fontWeight={600}
                        textTransform='capitalize'
                      >
                        {experience?.company}
                      </Typography>
                      <Stack
                        flexDirection='row'
                        gap={2}
                      >
                        <Typography
                          variant='subtitle2'
                          color='ink.900'
                          fontWeight={600}
                          textTransform='capitalize'
                        >
                          {experience?.position}
                        </Typography>
                        <Typography
                          variant='subtitle2'
                          color='ink.500'
                          fontWeight={300}
                          textTransform='capitalize'
                        >
                          {experience?.startDate}{' '}
                          {experience.isPresent
                            ? '- Present'
                            : `- ${experience?.endDate}`}
                        </Typography>
                      </Stack>
                    </Stack>

                    {removeIndex === index
                      ? (
                        <Stack
                          flexDirection='row'
                          alignItems='center'
                          gap={1}
                        >
                          {submitting
                            ? (
                              <CircularProgress size={40} />
                              )
                            : (
                              <>
                                <Button
                                  label='Cancel'
                                  color='secondary'
                                  onClick={() => setRemoveIndex(null)}
                                />
                                <Button
                                  color='error'
                                  label='Remove'
                                  onClick={() => removeItem(index)}
                                />
                              </>
                              )}
                        </Stack>
                        )
                      : (
                        <Stack
                          flexDirection='row'
                          alignItems='center'
                        >
                          <>
                            <IconButton
                              color='error'
                              onClick={() => {
                                setDrawer(true)
                                setCurrentIndex(index)
                              }}
                            >
                              <EditIcon color='success' />
                            </IconButton>
                            <IconButton
                              color='error'
                              onClick={() => setRemoveIndex(index)}
                            >
                              <RemoveCircleOutlineIcon />
                            </IconButton>
                          </>
                        </Stack>
                        )}
                  </Stack>

                  <Stack>
                    <Typography
                      variant='subtitle2'
                      color='ink.500'
                      fontWeight={300}
                      textTransform='capitalize'
                    >
                      {experience?.description}
                    </Typography>
                  </Stack>

                  <Stack
                    flexDirection='row'
                    flexWrap='wrap'
                    gap={1}
                  >
                    {experience?.skills?.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        variant='outlined'
                      />
                    ))}
                  </Stack>

                  <Divider />
                </Stack>
              ))}
            </Stack>
          </>
          )
        : (
          <Stack alignItems='center'>
            <Box my={2}>
              <Button
                label='Add Work Experience'
                onClick={() => {
                  setDrawer(true)
                  setCurrentIndex(null)
                }}
                color='primary'
                variant='outlined'
                labelColor='primary'
                startIcon={<AddIcon />}
              />
            </Box>
          </Stack>
          )}

      <Drawer
        open={isDrawerActive}
        onClose={() => setDrawer(false)}
      >
        <Box width={500}>
          <ProfileExperienceFormModule
            experienceIndex={currentIndex}
            onClose={() => setDrawer(false)}
          />
        </Box>
      </Drawer>
    </Paper>
  )
}

export default DeveloperWorkingExperience
