import { TextField as MUITextField } from '@mui/material'

const FormTextField = ({ ...props }) => {
  return (
    <MUITextField
      {...props}
      size='small'
      sx={{
        width: '100%',
        '& .MuiInputBase-root': {
          color: 'common.black',
          fontWeight: 500
        }
      }}
    />
  )
}

export { FormTextField }
