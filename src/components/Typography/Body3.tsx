import { Typography } from '@mui/material'

const Body3 = ({ text, light = false }: { text: string; light?: boolean }) => {
  return (
    <Typography
      fontSize={{ xs: 12, sm: 14 }}
      fontWeight={400}
      color={light ? 'ink.56' : 'ink.87'}
      letterSpacing='0.14px'
      lineHeight={{ xs: '18px', sm: '20px' }}
    >
      {text}
    </Typography>
  )
}

export default Body3
