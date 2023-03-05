import { Typography } from '@mui/material'

const BadgeLabel = ({
  text,
  light = false
}: {
  text: string
  light?: boolean
}) => {
  return (
    <Typography
      fontSize={12}
      fontWeight={500}
      color={light ? 'ink.56' : 'ink.87'}
      letterSpacing='0.14px'
      lineHeight='20px'
    >
      {text}
    </Typography>
  )
}

export default BadgeLabel
