import MUIAlert from '@mui/material/Alert'
import { FC } from 'react'
import Body2 from '../Typography/Body2'

interface AlertProps {
  text: string
}

const Alert: FC<AlertProps> = ({ text }) => {
  return (
    <MUIAlert
      severity='info'
      sx={{ mt: 2, mb: 2 }}
    >
      <Body2 text={text} />
    </MUIAlert>
  )
}

export default Alert
