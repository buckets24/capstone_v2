import { Typography } from '@mui/material'

const H8 = ({ text }: { text: string }) => {
  return (
    <Typography fontSize={16} fontWeight={600} color='ink.87'>
      {text}
    </Typography>
  )
}

export default H8
