import { Tab as StyledTab } from '@mui/material'

const Tab = ({ ...props }) => {
  return (
    <StyledTab
      {...props}
      sx={{
        color: 'ink.56',
        textTransform: 'capitalize',
        minHeight: { xs: '48px', sm: '56px' }
      }}
    />
  )
}

export default Tab
