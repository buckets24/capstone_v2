import { Box, Divider, Link, Paper, Stack, Typography } from '@mui/material'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import PauseCircleFilledSharpIcon from '@mui/icons-material/PauseCircleFilledSharp'
import VerifiedSharpIcon from '@mui/icons-material/VerifiedSharp'
import { CandidateType } from 'types/Candidate.type'
import { ButtonFacebook } from 'components/SocialButton/ButtonFacebook'
import { ButtonGithub } from 'components/SocialButton/ButtonGithub'
import { ButtonLinkedin } from 'components/SocialButton/ButtonLinkedin'
import { ButtonTwitter } from 'components/SocialButton/ButtonTwitter'

interface CandidateCardProps {
  candidate: CandidateType | null
}

function CandidateCard ({ candidate }: CandidateCardProps) {
  return (
    <Box width='100%'>
      <Paper>
        <Stack
          py={1}
          px={3}
          gap={0.5}
        >
          <Stack
            flexDirection='column'
            gap={1}
            py={2}
          >
            <Stack
              flexDirection='row'
              alignItems='center'
              justifyContent='space-between'
            >
              <Stack flex={1}>
                <Typography
                  variant='h6'
                  fontWeight={600}
                >
                  {`${candidate?.first_name}`} {`${candidate?.last_name}`}
                </Typography>
                <Typography
                  variant='Caption2'
                >
                  {candidate?.job_title}
                </Typography>
              </Stack>
              <Stack>
                <Typography
                  variant='Caption1'
                  fontWeight={600}
                >
                  {candidate?.mobile}
                </Typography>
              </Stack>
            </Stack>

            <Stack>
              <Typography
                variant='Caption2'
                lineHeight={1.5}
              >
                {candidate?.about}
              </Typography>
            </Stack>
          </Stack>

          <Stack
            justifyContent='center'
            flexDirection='row'
            pb={2}
          >
            {candidate?.github_link
              ? (
                <Box width={40}>
                  <ButtonGithub
                    component={Link}
                    target='_blank'
                    href={candidate?.github_link}
                  />
                </Box>)
              : null}
            {candidate?.linkedin_link
              ? (
                <Box width={40}>
                  <ButtonLinkedin
                    component={Link}
                    target='_blank'
                    href={candidate?.linkedin_link}
                  />
                </Box>)
              : null}
            {candidate?.facebook_link
              ? (
                <Box width={40}>
                  <ButtonFacebook
                    component={Link}
                    target='_blank'
                    href={candidate?.facebook_link}
                  />
                </Box>)
              : null}
            {candidate?.twitter_link
              ? (
                <Box width={40}>
                  <ButtonTwitter
                    component={Link}
                    target='_blank'
                    href={candidate?.twitter_link}
                  />
                </Box>)
              : null}
          </Stack>

          <Divider />
          <Stack
            flexDirection='row'
            gap={1}
            justifyContent='space-between'
            pt={1}
          >
            <Stack
              flexDirection='row'
              gap={1}
            >
              <Stack
                flexDirection='row'
                alignItems='center'
                gap={1}
              >
                <EmailOutlinedIcon
                  fontSize='small'
                  color='secondary'
                />
                <Typography
                  variant='Caption2'
                  color='ink.500'
                >
                  {candidate?.email}
                </Typography>
              </Stack>
              <Divider orientation='vertical' />
              <Stack
                flexDirection='row'
                alignItems='center'
                gap={1}
              >
                <CalendarMonthOutlinedIcon
                  fontSize='small'
                  color='secondary'
                />
                <Typography
                  variant='Caption2'
                  color='ink.500'
                >
                  {candidate?.birthday ?? '-'}
                </Typography>
              </Stack>
              <Divider orientation='vertical' />
              <Stack
                flexDirection='row'
                alignItems='center'
              >
                <LocationOnOutlinedIcon
                  fontSize='small'
                  color='secondary'
                />
                <Typography
                  variant='Caption2'
                  color='ink.500'
                >
                  {candidate?.location}
                </Typography>
              </Stack>
            </Stack>

            <Stack
              flexDirection='row'
              alignItems='center'
              gap={1}
            >
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
                    />)
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
                  {candidate?.actively_looking ? 'Actively looking' : 'Not looking'}
                </Typography>
              </Stack>
              <Divider orientation='vertical' />
              <Stack flexDirection='row'>
                <Typography
                  variant='caption'
                  color='ink.500'
                  fontWeight={600}
                >
                  Expected Salary {candidate?.expected_salary} USD
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  )
}

export {
  CandidateCard
}
