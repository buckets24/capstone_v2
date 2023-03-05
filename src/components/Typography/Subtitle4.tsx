import { Typography, TypographyProps } from '@mui/material'
import { FC } from 'react'

interface Subtitle4Props extends TypographyProps {
  text: string
  light?: boolean
}

const Subtitle4: FC<Subtitle4Props> = ({ text, light = false, ...props }) => {
  return (
    <Typography
      fontSize={14}
      fontWeight={600}
      color={light ? 'ink.57' : 'ink.87'}
      lineHeight='20px'
      {...props}
    >
      {text}
    </Typography>
  )
}

export default Subtitle4
