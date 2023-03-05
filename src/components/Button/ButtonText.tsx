import { Typography } from '@mui/material'
import MUIButton, { ButtonProps } from '@mui/material/Button'
import { ReactNode, FC } from 'react'

interface Props extends ButtonProps {
  children?: ReactNode
  label: string
}

const ButtonText: FC<Props> = ({
  color = 'primary',
  variant = 'contained',
  label,
  children,
  ...props
}) => {
  return (
    <MUIButton
      {...props}
      color='primary'
      variant='text'
      sx={{
        '&:hover': {
          bgcolor: 'transparent'
        }
      }}
    >
      <Typography
        fontSize='15px'
        fontWeight='600'
        color={color}
      >
        {label}
      </Typography>
    </MUIButton>
  )
}

export { ButtonText }
