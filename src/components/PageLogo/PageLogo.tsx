import Box, { BoxProps } from '@mui/material/Box'
import { FC } from 'react'
import Image from 'next/image'

const PageLogo: FC<BoxProps> = ({ ...props }) => {
  return (
    <Box display='flex' justifyContent='center' {...props}>
      <Image src='/assets/ohmyhome.svg' width={148} height={27} />
    </Box>
  )
}

export { PageLogo }
