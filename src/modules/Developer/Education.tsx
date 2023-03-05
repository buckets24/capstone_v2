import { Box, Chip, Divider, Paper, Stack, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import { CandidateType } from 'types/Candidate.type'
import { useEffect, useState } from 'react'
import { Drawer } from 'components/Drawer'
import { useUserStore } from 'stores/user.store'
import { Button } from 'components/Button/Button'
import ProfileEducationFormModule from './ProfileEducationForm'

interface DeveloperEducationProps {
  user: CandidateType | null
}

function DeveloperEducation ({ user }: DeveloperEducationProps) {
  const [isDrawerActive, setDrawer] = useState(false)
  const candidateStore = useUserStore()

  const [candidate, setCandidate] = useState<CandidateType | null>(null)
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)

  useEffect(() => {
    candidateStore.setSubmitting(false)
    setCandidate(candidateStore?.candidate)
  }, [candidateStore?.candidate])

  return (
    <Paper sx={{ overflow: 'hidden', px: 4 }}>
      {candidate?.school_info
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
                Education
              </Typography>

              {candidate?.school_info?.map((school, index) => (
                <Stack
                  gap={2}
                  key={school.school}
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
                        {school?.school}
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
                          {school?.course}
                        </Typography>
                        <Typography
                          variant='subtitle2'
                          color='ink.500'
                          fontWeight={300}
                          textTransform='capitalize'
                        >
                          {school?.startDate} - {school?.endDate}
                        </Typography>
                      </Stack>
                    </Stack>

                    <Stack>
                      <Button
                        label='Edit'
                        onClick={() => {
                          setDrawer(true)
                          setCurrentIndex(index)
                        }}
                        color='primary'
                        variant='text'
                        labelColor='primary'
                        startIcon={<EditIcon />}
                      />
                    </Stack>
                  </Stack>

                  <Stack>
                    <Typography
                      variant='subtitle2'
                      color='ink.500'
                      fontWeight={300}
                      textTransform='capitalize'
                    >
                      {school?.description}
                    </Typography>
                  </Stack>

                  <Stack
                    flexDirection='row'
                    flexWrap='wrap'
                    gap={1}
                  >
                    {school?.awards?.map((award) => (
                      <Chip
                        key={award}
                        label={award}
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
                label='Add Education Info'
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
          <ProfileEducationFormModule
            educationIndex={currentIndex}
            onClose={() => setDrawer(false)}
          />
        </Box>
      </Drawer>
    </Paper>
  )
}

export default DeveloperEducation
