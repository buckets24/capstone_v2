import { Typography } from '@mui/material'

const H7 = ({ text }: { text: string }) => {
  return (
    <Typography
      fontSize={{ xs: 18, sm: 20 }}
      fontWeight={600}
      color='ink.87'
      lineHeight={{ xs: '27px', sm: '30px' }}
    >
      {text}
    </Typography>
  )
}

export default H7
