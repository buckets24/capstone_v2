import { Box, Divider, Paper, Stack, Typography } from '@mui/material'
import { JobType } from 'types/Jobs.type'
import { ReactNode } from 'react'

interface JobCardProps {
  job: JobType | null
  children: ReactNode
}

function JobCard ({ job, children }: JobCardProps) {
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
            // py={2}
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
                  {job?.title}
                </Typography>
                <Typography variant='Caption2'>
                  {job?.level.toString().toUpperCase()} -{' '}
                  {job?.type.toString().toUpperCase()}
                </Typography>
              </Stack>
              <Stack>
                <Typography
                  variant='Caption2'
                  fontWeight={600}
                >
                  {job?.status.toString().toUpperCase()}
                </Typography>
              </Stack>
            </Stack>

            <Stack>
              <Typography
                variant='Caption2'
                lineHeight={1.5}
              >
                {job?.description}
              </Typography>
            </Stack>

            <Divider />

            <Stack pb={1}>
              <Typography
                variant='Caption2'
                lineHeight={1.5}
              >
                {job?.requirements}
              </Typography>
            </Stack>
          </Stack>

          <Divider />
          <Stack
            flexDirection='row'
            gap={1}
            justifyContent='space-between'
          >
            <Stack
              flexDirection='row'
              alignItems='center'
              gap={1}
            >
              <Stack flexDirection='row'>
                <Typography
                  variant='caption'
                  color='ink.500'
                  fontWeight={600}
                >
                  Salary: {job?.salary_min} - {job?.salary_max} USD
                </Typography>
              </Stack>
            </Stack>
            <Stack flexDirection='row'>{children}</Stack>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  )
}

export { JobCard }
