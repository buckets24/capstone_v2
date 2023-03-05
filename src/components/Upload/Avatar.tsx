import { Box, FormLabel, Typography } from '@mui/material'
import Image from 'next/image'
import { ReactNode } from 'react'

interface AvatarUploadProps {
  children: ReactNode
  previewImage: string | null
}

function AvatarUpload ({ children, previewImage }: AvatarUploadProps) {
  const hasImage = previewImage !== null

  return (
    <Box>
      <FormLabel
        htmlFor='dropzone-file'
        sx={{
          bgcolor: 'ink.200',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 102,
          height: 102,
          borderRadius: '100%',
          position: 'relative',
          borderWidth: 2,
          borderStyle: hasImage ? 'solid' : 'dashed',
          cursor: 'pointer',
          overflow: 'hidden'
        }}
      >
        {hasImage
          ? (
            <Box>
              <Image
                src={previewImage}
                layout='fill'
              />
            </Box>
            )
          : (
            <Box
              position='absolute'
              display='flex'
              flexDirection='column'
              alignItems='center'
            >
              <svg
                style={{ width: 40 }}
                aria-hidden='true'
                viewBox='0 0 24 24'
                fill='none'
                stroke='rgba(0, 0, 0, 0.5)'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                />
              </svg>
              <Typography fontSize={15}>Upload</Typography>
            </Box>
            )}
        {children}
      </FormLabel>
    </Box>
  )
}

export { AvatarUpload }
