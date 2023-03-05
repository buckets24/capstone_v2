import { FC, ReactNode } from 'react'
import { Box, Modal } from '@mui/material'
import { ModalBoxStyle } from './styles'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: ReactNode
}

const ModalPopup: FC<ModalProps> = ({ open, onClose, children }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Box sx={ModalBoxStyle}>{children}</Box>
    </Modal>
  )
}

export default ModalPopup
