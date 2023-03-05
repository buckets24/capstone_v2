import { Stack, Box, Link, Typography, Paper } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { useEffect, useState } from 'react'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import AvatarImage from 'components/Avatar'
import { ButtonFacebook } from 'components/SocialButton/ButtonFacebook'
import { ButtonGithub } from 'components/SocialButton/ButtonGithub'
import { ButtonLinkedin } from 'components/SocialButton/ButtonLinkedin'
import { ButtonTwitter } from 'components/SocialButton/ButtonTwitter'
import { IconButton } from 'components/Button/IconButton'
import { Drawer } from 'components/Drawer'
import ProfileFormModule from 'modules/Developer/ProfileForm'
import { useUserStore } from 'stores/user.store'
import { CandidateType } from 'types/Candidate.type'
import { useRouter } from 'next/router'

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
    <Paper sx={{ overflow: 'hidden' }}>
      <Stack alignItems='flex-end'>
        <IconButton onClick={() => setDrawer(true)}>
          <EditIcon />
        </IconButton>
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
              {candidate?.job_title}{' '}
              {candidate?.actively_looking
                ? '- Actively looking'
                : '- Actively looking'}
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
            <Box width={40}>
              <ButtonGithub
                component={Link}
                target='_blank'
                href='https://github.com'
              />
            </Box>
            <Box width={40}>
              <ButtonLinkedin
                component={Link}
                target='_blank'
                href='https://linkedin.com'
              />
            </Box>
            <Box width={40}>
              <ButtonFacebook
                component={Link}
                target='_blank'
                href='https://facebook.com'
              />
            </Box>
            <Box width={40}>
              <ButtonTwitter
                component={Link}
                target='_blank'
                href='https://twitter.com'
              />
            </Box>
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
    </Paper>
  )
}

export default DeveloperMainInfo
