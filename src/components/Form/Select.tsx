import React, { FC, ReactNode } from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select, { SelectProps } from '@mui/material/Select'

interface Props extends SelectProps {
  children: ReactNode
}

const FormSelect: FC<Props> = ({ children, ...props }) => {
  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel size='small'>{props?.label}</InputLabel>
        <Select
          {...props}
          size='small'
          label={props?.label}
        >
          {children}
        </Select>
      </FormControl>
    </Box>
  )
}

export { FormSelect }
