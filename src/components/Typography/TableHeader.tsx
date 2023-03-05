import { Typography } from '@mui/material'

const TableHeader = ({ text }: { text: string }) => {
  return (
    <Typography
      fontSize={14}
      fontWeight={500}
      color='ink.87'
      letterSpacing='0.14px'
      lineHeight='24px'
    >
      {text}
    </Typography>
  )
}

export default TableHeader
