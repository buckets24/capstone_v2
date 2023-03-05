import Box, { BoxProps } from '@mui/material/Box'
import { FC, ReactNode } from 'react'

interface Props extends BoxProps {
  children: ReactNode
}

const ContentContainer: FC<Props> = ({ children, ...props }) => {
  return (
    <Box
      {...props}
      bgcolor='common.white'
      borderRadius='4px'
      overflow='hidden'
      position='relative'
      sx={{
        boxShadow: {
          xs: 'none',
          md: '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.2);'
        }
      }}
    >
      {children}
    </Box>
  )
}

export { ContentContainer }
