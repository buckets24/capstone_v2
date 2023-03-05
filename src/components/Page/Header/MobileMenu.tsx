import { Menu, MenuItem, IconButton, Badge } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MailIcon from '@mui/icons-material/Mail'
import { FC, MouseEvent } from 'react'

interface MobileMenuProps {
  mobileMoreAnchorEl: HTMLElement | null
  mobileMenuId: string
  isMobileMenuOpen: boolean
  handleMobileMenuClose: () => void
  handleProfileMenuOpen: (event: MouseEvent<HTMLElement>) => void
}

const MobileMenu: FC<MobileMenuProps> = ({
  mobileMoreAnchorEl,
  mobileMenuId,
  isMobileMenuOpen,
  handleMobileMenuClose,
  handleProfileMenuOpen
}) => {
  return (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size='large'
          aria-label='show 4 new mails'
          color='inherit'
        >
          <Badge
            badgeContent={4}
            color='error'
          >
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size='medium'
          // aria-label='show 17 new notifications'
          // color='inherit'
        >
          <Badge
            badgeContent={17}
            color='error'
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size='medium'
          // aria-label='account of current user'
          // aria-controls='primary-search-account-menu'
          // aria-haspopup='true'
          // color='inherit'
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  )
}

export { MobileMenu }
