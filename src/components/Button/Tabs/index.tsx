import * as React from 'react'
import { Tabs as StyledTabs } from '@mui/material'
import Box from '@mui/material/Box'
import { FC } from 'react'

interface TabsProps {
  children?: React.ReactNode
  value: number
  onChange: (event: React.SyntheticEvent, newValue: number) => void
}

const Tabs: FC<TabsProps> = ({ children }) => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box>
      <StyledTabs
        variant='scrollable'
        value={value}
        onChange={handleChange}
      >
        {children}
      </StyledTabs>
    </Box>
  )
}

export default Tabs
