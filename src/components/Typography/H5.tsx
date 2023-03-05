import { Typography } from '@mui/material'

const H5 = ({ text }: { text: string }) => {
  return (
    <Typography
      fontSize={{ xs: 16, sm: 24 }}
      fontWeight={600}
      color='ink.87'
      lineHeight={{ xs: '24px', sm: '32px' }}
    >
      {text}
    </Typography>
  )
}

export default H5
