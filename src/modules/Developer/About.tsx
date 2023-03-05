import { Box, Paper, Stack, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import { IconButton } from 'components/Button/IconButton'
import { CandidateType } from 'types/Candidate.type'
import { useEffect, useState } from 'react'
import { Drawer } from 'components/Drawer'
import ProfileAboutFormModule from './ProfileAboutForm'
import { useUserStore } from 'stores/user.store'
import { useRouter } from 'next/router'

interface DeveloperMainInfoProps {
  user: CandidateType | null
}

function DeveloperAboutInfo ({ user }: DeveloperMainInfoProps) {
  const candidateState = useUserStore((state) => state.candidate)
  const [isDrawerActive, setDrawer] = useState(false)
  const router = useRouter()
  const [candidate, setCandidate] = useState<CandidateType | null>(null)

  useEffect(() => {
    setCandidate(router.isReady ? candidateState : candidateState)
  }, [router])

  useEffect(() => {
    setCandidate(candidateState)
  }, [candidateState])

  return (
    <Paper sx={{ overflow: 'hidden', px: 4 }}>
      <Stack alignItems='flex-end'>
        <IconButton onClick={() => setDrawer(true)}>
          <EditIcon />
        </IconButton>
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
          About Me
        </Typography>

        <Stack>
          <Typography
            variant='subtitle2'
            color='ink.500'
            fontWeight={300}
            textTransform='capitalize'
          >
            {candidate?.about}
          </Typography>
        </Stack>
      </Stack>

      <Drawer
        open={isDrawerActive}
        onClose={() => setDrawer(false)}
      >
        <Box>
          <ProfileAboutFormModule onClose={() => setDrawer(false)} />
        </Box>
      </Drawer>
    </Paper>
  )
}

export default DeveloperAboutInfo
