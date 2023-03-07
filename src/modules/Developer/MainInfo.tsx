import { Stack, Box, Link, Typography, Paper } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import PauseCircleFilledSharpIcon from '@mui/icons-material/PauseCircleFilledSharp'
import VerifiedSharpIcon from '@mui/icons-material/VerifiedSharp'
import { useEffect, useState } from 'react'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import AvatarImage from 'components/Avatar'
import { ButtonFacebook } from 'components/SocialButton/ButtonFacebook'
import { ButtonGithub } from 'components/SocialButton/ButtonGithub'
import { ButtonLinkedin } from 'components/SocialButton/ButtonLinkedin'
import { ButtonTwitter } from 'components/SocialButton/ButtonTwitter'
import { Drawer } from 'components/Drawer'
import ProfileFormModule from 'modules/Developer/ProfileForm'
import { useUserStore } from 'stores/user.store'
import { CandidateType } from 'types/Candidate.type'
import { useRouter } from 'next/router'
import { Button } from 'components/Button/Button'

interface DeveloperWorkingExperienceProps {
  user: CandidateType | null
}

function DeveloperMainInfo ({ user }: DeveloperWorkingExperienceProps) {
  const [isDrawerActive, setDrawer] = useState(false)
  const router = useRouter()
  const candidateState = useUserStore((state) => state.candidate)

  const [candidate, setCandidate] = useState<CandidateType | null>(null)

  useEffect(() => {
    setCandidate(router.isReady ? candidateState : candidateState)
  }, [router])

  useEffect(() => {
    setCandidate(candidateState)
  }, [candidateState])

  return (
    <Paper sx={{ overflow: 'hidden', px: 2 }}>
      {candidate?.first_name
        ? (
          <>
            <Stack
              flexDirection='row'
              justifyContent='space-between'
              alignItems='center'
            >
              <Box>
                <Stack
                  flexDirection='row'
                  alignItems='center'
                  gap={1}
                >
                  {candidate?.actively_looking
                    ? (
                      <VerifiedSharpIcon
                        color='primary'
                        fontSize='small'
                      />
                      )
                    : (
                      <PauseCircleFilledSharpIcon
                        color='secondary'
                        fontSize='small'
                      />
                      )}
                  <Typography
                    variant='caption'
                    color='ink.500'
                    fontWeight={600}
                  >
                    {candidate?.actively_looking
                      ? 'Actively looking'
                      : 'Not looking'}
                  </Typography>
                </Stack>
                {candidate?.expected_salary
                  ? (
                    <Stack>
                      <Typography
                        variant='caption'
                        color='ink.500'
                        fontWeight={600}
                        textTransform='capitalize'
                      >
                        Expected Salary: {`${candidate?.expected_salary} USD`}
                      </Typography>
                    </Stack>
                    )
                  : null}
              </Box>
              <Box my={2}>
                <Button
                  label='Edit'
                  onClick={() => {
                    setDrawer(true)
                  }}
                  color='primary'
                  variant='outlined'
                  labelColor='primary'
                  startIcon={<EditIcon />}
                />
              </Box>
            </Stack>
            <Stack flexDirection='row'>
              <Stack
                alignItems='center'
                flex={1}
                p={3}
                gap={1}
              >
                <Box pb={3}>
                  <AvatarImage
                    alt='Remy Sharp'
                    src='https://picsum.photos/seed/picsum/200/300'
                  />
                </Box>

                <Stack
                  flexDirection='column'
                  alignItems='center'
                >
                  <Typography
                    variant='h4'
                    fontWeight={600}
                    textTransform='uppercase'
                  >
                    {`${candidate?.first_name} ${candidate?.last_name}`}
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    color='ink.500'
                    fontWeight={600}
                    textTransform='capitalize'
                  >
                    {candidate?.job_title}
                  </Typography>
                </Stack>

                <Stack
                  flexDirection={{ xs: 'column', md: 'row' }}
                  gap={2}
                >
                  <Stack
                    flexDirection='row'
                    alignItems='center'
                    gap={1}
                  >
                    <EmailOutlinedIcon />
                    <Typography
                      variant='subtitle1'
                      color='ink.500'
                    >
                      {candidate?.email}
                    </Typography>
                  </Stack>

                  <Stack
                    flexDirection='row'
                    alignItems='center'
                    gap={1}
                  >
                    <CalendarMonthOutlinedIcon />
                    <Typography
                      variant='subtitle1'
                      color='ink.500'
                    >
                      {candidate?.birthday ?? '-'}
                    </Typography>
                  </Stack>

                  <Stack
                    flexDirection='row'
                    alignItems='center'
                    gap={1}
                  >
                    <LocationOnOutlinedIcon />
                    <Typography
                      variant='subtitle1'
                      color='ink.500'
                    >
                      {candidate?.location}
                    </Typography>
                  </Stack>
                </Stack>

                <Stack flexDirection='row'>
                  {candidate?.github_link
                    ? (
                      <Box width={40}>
                        <ButtonGithub
                          component={Link}
                          target='_blank'
                          href={candidate?.github_link}
                        />
                      </Box>
                      )
                    : null}
                  {candidate?.linkedin_link
                    ? (
                      <Box width={40}>
                        <ButtonLinkedin
                          component={Link}
                          target='_blank'
                          href={candidate?.linkedin_link}
                        />
                      </Box>
                      )
                    : null}
                  {candidate?.facebook_link
                    ? (
                      <Box width={40}>
                        <ButtonFacebook
                          component={Link}
                          target='_blank'
                          href={candidate?.facebook_link}
                        />
                      </Box>
                      )
                    : null}
                  {candidate?.twitter_link
                    ? (
                      <Box width={40}>
                        <ButtonTwitter
                          component={Link}
                          target='_blank'
                          href={candidate?.twitter_link}
                        />
                      </Box>
                      )
                    : null}
                </Stack>
              </Stack>

              <Drawer
                open={isDrawerActive}
                onClose={() => setDrawer(false)}
              >
                <Box>
                  <ProfileFormModule onClose={() => setDrawer(false)} />
                </Box>
              </Drawer>
            </Stack>
          </>
          )
        : (
          <Stack alignItems='center'>
            <Box my={2}>
              <Button
                label='Add your main information'
                onClick={() => {
                  setDrawer(true)
                }}
                color='primary'
                variant='outlined'
                labelColor='primary'
                startIcon={<AddIcon />}
              />
            </Box>
          </Stack>
          )}
    </Paper>
  )
}

export default DeveloperMainInfo
