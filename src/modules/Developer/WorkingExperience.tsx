import { Box, Chip, Divider, Paper, Stack, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import { CandidateType } from 'types/Candidate.type'
import { useEffect, useState } from 'react'
import { Drawer } from 'components/Drawer'
import ProfileExperienceFormModule from './ProfileExperienceForm'
import { useUserStore } from 'stores/user.store'
import { Button } from 'components/Button/Button'

interface DeveloperWorkingExperienceProps {
  user: CandidateType | null
}

function DeveloperWorkingExperience ({ user }: DeveloperWorkingExperienceProps) {
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
