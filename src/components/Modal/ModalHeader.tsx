import { FC } from 'react'
import { Box } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import H7 from '../Typography/H7'
import { IconButton } from '../Button/IconButton'

interface ModalHeaderProps {
  onClose: () => void
  text: string
}

const ModalHeader: FC<ModalHeaderProps> = ({ onClose, text }) => {
  return (
    <Box
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      pb={0}
    >
      <H7 text={text} />

      <IconButton onClick={onClose}>
        <CloseIcon
          sx={{
            color: 'rgba(0, 0, 0, 0.56)'
          }}
        />
      </IconButton>
    </Box>
  )
}

export default ModalHeader
