import { TablePagination } from '@mui/material'
import { FC, useState, MouseEvent } from 'react'

interface PaginationProps {}

const Pagination: FC<PaginationProps> = () => {
  const [page, setPage] = useState(2)

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }

  return (
    <TablePagination
      component='div'
      count={100}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={10}
      rowsPerPageOptions={[]}
      size='small'
    />
  )
}

export { Pagination }
