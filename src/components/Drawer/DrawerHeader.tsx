import { FC } from 'react'
import { Box } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import H7 from '../Typography/H7'
import { IconButton } from '../Button/IconButton'

interface BottomSheetHeaderProps {
  onClose: () => void
  text: string
}

const BottomSheetHeader: FC<BottomSheetHeaderProps> = ({ onClose, text }) => {
  return (
    <Box
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      p={2}
      pb={0}
    >
      <H7 text={text} />

      <IconButton onClick={onClose}>
        <CloseIcon
          sx={{
            color: 'ink.56'
          }}
        />
      </IconButton>
    </Box>
  )
}

export default BottomSheetHeader
