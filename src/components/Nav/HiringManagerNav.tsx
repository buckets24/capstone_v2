import { Stack, Box } from '@mui/material'
import { Button } from 'components/Button/Button'

interface HiringManagerNavProps {
  activeRoute: string
  setActiveNav: (activeRoute: string) => void
}

function HiringManagerNav ({
  activeRoute,
  setActiveNav
}: HiringManagerNavProps) {
  return (
    <Stack
      flexDirection='row'
      justifyContent='flex-start'
      alignItems='flex-start'
      gap={1}
    >
      <Box>
        <Button
          color='primary'
          labelColor={activeRoute === 'developers' ? 'inherit' : 'primary'}
          variant={activeRoute === 'developers' ? 'contained' : 'outlined'}
          label='Developers'
          onClick={() => setActiveNav('developers')}
        />
      </Box>
      <Box>
        <Button
          color='primary'
          labelColor={activeRoute === 'jobs' ? 'inherit' : 'primary'}
          variant={activeRoute === 'jobs' ? 'contained' : 'outlined'}
          label='Jobs'
          onClick={() => setActiveNav('jobs')}
        />
      </Box>
      <Box>
        <Button
          color='primary'
          labelColor={activeRoute === 'questions' ? 'inherit' : 'primary'}
          variant={activeRoute === 'questions' ? 'contained' : 'outlined'}
          label='Questions'
          onClick={() => setActiveNav('questions')}
        />
      </Box>
      {/* <Box>
        <Button
          color='primary'
          labelColor={
            activeRoute === '/hiring-manager/interviews' ? 'inherit' : 'primary'
          }
          variant={
            activeRoute === '/hiring-manager/interviews'
              ? 'contained'
              : 'outlined'
          }
          label='Interviews'
          onClick={() => navigate('/hiring-manager/interviews')}
        />
      </Box> */}
    </Stack>
  )
}

export { HiringManagerNav }
