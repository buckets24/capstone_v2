import { FC, ReactNode } from 'react'
import { Box, Drawer as MUIDrawer } from '@mui/material'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import { IconButton } from 'components/Button/IconButton'

interface DrawerProps {
  open: boolean
  onClose: () => void
  children: ReactNode
}

const Drawer: FC<DrawerProps> = ({ open, onClose, children }) => {
  return (
    <MUIDrawer
      anchor='right'
      open={open}
      onClose={onClose}
      PaperProps={{
        style: { borderRadius: 8 }
      }}
    >
      <Box width='auto' display='flex' justifyContent='flex-end' pr={2}>
        <IconButton onClick={onClose}>
          <CancelOutlinedIcon />
        </IconButton>
      </Box>
      <Box p={3}>{children}</Box>
    </MUIDrawer>
  )
}

export default Drawer
