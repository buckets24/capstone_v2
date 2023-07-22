import { Stack, Box } from '@mui/material'
import { Button } from 'components/Button/Button'
import { useRouter } from 'next/router'

interface HiringManagerNavProps {
  activeRoute: string
}

function HiringManagerNav ({ activeRoute }: HiringManagerNavProps) {
  const router = useRouter()
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
          labelColor={activeRoute === '/hiring-manager' ? 'inherit' : 'primary'}
          variant={activeRoute === '/hiring-manager' ? 'contained' : 'outlined'}
          label='Developers'
          onClick={() =>
            router.push('/hiring-manager', undefined, { shallow: true })}
        />
      </Box>
      <Box>
        <Button
          color='primary'
          labelColor={
            activeRoute === '/hiring-manager/jobs' ? 'inherit' : 'primary'
          }
          variant={
            activeRoute === '/hiring-manager/jobs' ? 'contained' : 'outlined'
          }
          label='Jobs'
          onClick={() =>
            router.push('/hiring-manager/jobs', undefined, { shallow: true })}
        />
      </Box>
      <Box>
        <Button
          color='primary'
          labelColor={
            activeRoute === '/hiring-manager/questions' ? 'inherit' : 'primary'
          }
          variant={
            activeRoute === '/hiring-manager/questions'
              ? 'contained'
              : 'outlined'
          }
          label='Questions'
          onClick={() =>
            router.push('/hiring-manager/questions', undefined, {
              shallow: true
            })}
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
