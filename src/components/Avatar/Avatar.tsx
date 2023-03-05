import { Avatar } from '@mui/material'

const AvatarImage = ({ ...props }) => {
  return (
    <Avatar
      sx={{ width: 102, height: 102 }}
      {...props}
    />
  )
}

export { AvatarImage }
