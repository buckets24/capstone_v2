import { Typography } from '@mui/material'

const H4 = ({ text }: { text: string }) => {
  return (
    <Typography
      fontSize={{ xs: 34, sm: 34 }}
      fontWeight={600}
      color='ink.87'
      lineHeight={{ xs: '37px', sm: '41px' }}
    >
      {text}
    </Typography>
  )
}

export default H4
