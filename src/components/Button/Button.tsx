import { Typography } from '@mui/material'
import MUIButton, { ButtonProps } from '@mui/material/Button'
import { ReactNode, FC } from 'react'

interface Props extends ButtonProps {
  children?: ReactNode
  label: string
  labelColor?: string
}

const Button: FC<Props> = ({
  variant = 'contained',
  label,
  children,
  color = 'inherit',
  labelColor = 'common.white',
  ...props
}) => {
  const { disabled } = props

  const boxShadow =
    variant === 'contained'
      ? '0px 1px 5px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.2)'
      : 'none'

  return (
    <MUIButton
      {...props}
      variant={variant}
      color={color}
      fullWidth
      sx={{
        width: '100%',
        height: '42px',
        borderRadius: '4px',
        boxShadow,
        '&:hover': {
          boxShadow
        }
      }}
    >
      <Typography
        fontSize='15px'
        fontWeight='600'
        color={disabled ? 'ink.38' : labelColor}
      >
        {label}
      </Typography>
    </MUIButton>
  )
}

export { Button }
