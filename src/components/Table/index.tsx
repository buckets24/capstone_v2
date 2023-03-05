import { Table, TableBody, TableContainer, TableHead } from '@mui/material'
import { FC, ReactNode } from 'react'

interface TransactionTableProps {
  header: ReactNode
  body: ReactNode
}

const TransactionTable: FC<TransactionTableProps> = ({ header, body }) => {
  return (
    <TableContainer sx={{ bgcolor: 'common.white' }}>
      <Table size='small'>
        <TableHead>{header}</TableHead>
        <TableBody>{body}</TableBody>
      </Table>
    </TableContainer>
  )
}

export { TransactionTable }
