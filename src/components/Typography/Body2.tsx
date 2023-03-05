import { Typography, TypographyProps } from '@mui/material'
import { FC } from 'react'

interface Body2Props extends TypographyProps {
  text: string
  light?: boolean
}

const Body2: FC<Body2Props> = ({ text, light = false, ...props }) => {
  return (
    <Typography
      fontSize={14}
      fontWeight={400}
      color={light ? 'ink.57' : 'ink.87'}
      lineHeight='20px'
      {...props}
    >
      {text}
    </Typography>
  )
}

export default Body2
