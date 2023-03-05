import { Typography, TypographyProps } from '@mui/material'
import { FC } from 'react'

interface ButtonText3Props extends TypographyProps {
  text: string
  light?: boolean
}

const ButtonText3: FC<ButtonText3Props> = ({
  text,
  light = false,
  ...props
}) => {
  return (
    <Typography
      fontSize={12}
      fontWeight={700}
      color={light ? 'ink.57' : 'ink.60'}
      lineHeight='20px'
      {...props}
    >
      {text}
    </Typography>
  )
}

export default ButtonText3
