import { Typography, TypographyProps } from '@mui/material'
import { FC } from 'react'

interface ButtonMediumProps extends TypographyProps {
  text: string
}

const ButtonMedium: FC<ButtonMediumProps> = ({ text, ...props }) => {
  return (
    <Typography
      fontSize={14}
      fontWeight={600}
      color='orange.ohmyhome'
      lineHeight='24px'
      {...props}
    >
      {text}
    </Typography>
  )
}

export default ButtonMedium
