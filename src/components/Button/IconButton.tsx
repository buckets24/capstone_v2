import MUIIconButton, { IconButtonProps } from '@mui/material/IconButton'
import { ReactNode, FC } from 'react'

interface Props extends IconButtonProps {
  children?: ReactNode
}

const IconButton: FC<Props> = ({ children, ...props }) => {
  return <MUIIconButton {...props}>{children}</MUIIconButton>
}

export { IconButton }
