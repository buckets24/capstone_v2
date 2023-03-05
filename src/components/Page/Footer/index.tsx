import { Typography } from '@mui/material'
import Stack from '@mui/system/Stack'

const PageFooter = () => {
  return (
    <Stack
      width='100%'
      alignItems='center'
    >
      <Typography
        color='rgba(0, 0, 0, 0.56)'
        fontSize={14}
        fontWeight={400}
      >
        © 2023 Ohmyhome • Policies • Terms
      </Typography>
    </Stack>
  )
}

export { PageFooter }
