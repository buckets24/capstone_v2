import { Box, Chip, Divider, Link, Paper, Stack, Typography } from '@mui/material'
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

function CandidateCardFull ({ candidate }: CandidateCardProps) {
  return (
    <Stack
      width='100%'
      gap={2}
    >
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
                  Expected Salary {candidate?.expected_salary} SGD
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Paper>

      {/* EXPERIENCE */}
      <Paper>
        <Stack
          py={1}
          px={3}
        >
          {!candidate?.working_experience
            ? (
              <Box>
                <Typography
                  variant='Overline2'
                >
                  Working Experience not available
                </Typography>
              </Box>
              )
            : (
              <Stack py={2}>
                <Stack alignItems='center'>
                  <Typography
                    textTransform='uppercase'
                    sx={{
                      borderBottom: '1px solid'
                    }}
                  >
                    Working Experience
                  </Typography>
                </Stack>
                {candidate?.working_experience?.map((experience, index) => {
                  return (
                    <Stack
                      key={index}
                      flexDirection='column'
                      gap={1}
                      py={2}
                    >
                      <Stack
                        flexDirection='row'
                        alignItems='center'
                        justifyContent='space-between'
                      >
                        <Stack
                          flexDirection='row'
                          alignItems='center'
                          justifyContent='space-between'
                          width='100%'
                        >
                          <Stack flex={1}>
                            <Typography
                              variant='BodyText2'
                              fontWeight={600}
                            >
                              {experience?.company}
                            </Typography>
                            <Typography
                              variant='Caption2'
                            >
                              {experience?.position}
                            </Typography>
                          </Stack>

                          <Stack>
                            <Typography
                              variant='Caption1'
                              fontWeight={600}
                              textTransform='capitalize'
                            >
                              {experience?.startDate}{' '}
                              {experience.isPresent
                                ? '- Present'
                                : `- ${experience?.endDate}`}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack>

                      <Stack>
                        <Typography
                          variant='Caption2'
                          lineHeight={1.5}
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
                            label={<small>{skill}</small>}
                            variant='outlined'
                            size='small'
                          />
                        ))}
                      </Stack>
                    </Stack>
                  )
                })}
              </Stack>
              )}
        </Stack>
      </Paper>

      {/* EDUCATION */}
      <Paper>
        <Stack
          py={1}
          px={3}
        >
          {!candidate?.school_info
            ? (
              <Box>
                <Typography
                  variant='Overline2'
                >
                  Education information not available
                </Typography>
              </Box>
              )
            : (
              <Stack py={2}>
                <Stack alignItems='center'>
                  <Typography
                    textTransform='uppercase'
                    sx={{
                      borderBottom: '1px solid'
                    }}
                  >
                    Education
                  </Typography>
                </Stack>
                {candidate?.school_info?.map((item, index) => {
                  return (
                    <Stack
                      key={index}
                      flexDirection='column'
                      gap={1}
                      py={2}
                    >
                      <Stack
                        flexDirection='row'
                        alignItems='center'
                        justifyContent='space-between'
                      >
                        <Stack
                          flexDirection='row'
                          alignItems='center'
                          justifyContent='space-between'
                          width='100%'
                        >
                          <Stack flex={1}>
                            <Typography
                              variant='BodyText2'
                              fontWeight={600}
                            >
                              {item?.school}
                            </Typography>
                            <Typography
                              variant='Caption2'
                            >
                              {item?.course}
                            </Typography>
                          </Stack>

                          <Stack>
                            <Typography
                              variant='Caption1'
                              fontWeight={600}
                              textTransform='capitalize'
                            >
                              {item?.startDate}{' - '}
                              {item.endDate}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack>

                      <Stack>
                        <Typography
                          variant='Caption2'
                          lineHeight={1.5}
                        >
                          {item?.description}
                        </Typography>
                      </Stack>

                      <Stack
                        flexDirection='row'
                        flexWrap='wrap'
                        gap={1}
                      >
                        {item?.awards?.map((award) => (
                          <Chip
                            key={award}
                            label={<small>{award}</small>}
                            variant='outlined'
                            size='small'
                          />
                        ))}
                      </Stack>
                    </Stack>
                  )
                })}
              </Stack>
              )}
        </Stack>
      </Paper>

      {/* QUESTIONS */}
      <Paper>
        <Stack
          py={2}
          px={3}
          gap={2}
        >
          <Stack alignItems='center'>
            <Typography
              textTransform='uppercase'
              sx={{
                borderBottom: '1px solid'
              }}
            >
              Interview Questions
            </Typography>
          </Stack>
          {candidate?.questions?.map((item, index) => {
            return (
              <Stack
                key={index}
              >
                <Typography
                  variant='BodyText2'
                  fontWeight={600}
                  lineHeight={1.5}
                >
                  {item?.question}
                </Typography>
                <Typography
                  variant='Caption1'
                  lineHeight={1.5}
                >
                  {item?.answer ?? 'N/A'}
                </Typography>
              </Stack>
            )
          })}
        </Stack>
      </Paper>
    </Stack>
  )
}

export {
  CandidateCardFull
}
