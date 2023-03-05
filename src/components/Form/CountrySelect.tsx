import {
  Box,
  InputAdornment,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Typography,
  useTheme
} from '@mui/material'
import { Countries } from 'config/countries'
import Image from 'next/image'
import React, { FC, useCallback, useMemo, useRef, useState } from 'react'
import { CountryType } from 'common/types/Country.type'

interface CountrySelectProps {
  selectCountry: (country: CountryType) => void
  currentCountry?: string
}

const CountrySelect: FC<CountrySelectProps> = ({
  selectCountry,
  currentCountry
}) => {
  const theme = useTheme()
  const menuRef = useRef(null)
  const [isOpen, setOpen] = useState<boolean>(false)

  const initialCountry = useMemo(() => {
    const countryCode = currentCountry || 'SGP'
    return (
      Countries.find((country) => country.code === countryCode) ?? Countries[0]
    )
  }, [])

  const [country, setCountry] = useState<CountryType>(initialCountry)

  const handleSelectCountry = useCallback((country: CountryType) => {
    selectCountry(country)
    setCountry(country)
    setOpen(false)
  }, [])

  return (
    <Box position='relative'>
      <TextField
        data-testid='country-select'
        size='small'
        ref={menuRef}
        fullWidth
        type='text'
        onClick={() => setOpen(true)}
        InputProps={{
          startAdornment: (
            <InputAdornment
              position='start'
              sx={{
                cursor: 'pointer',
                pr: 2
              }}
              id='country-button'
            >
              <Box
                width='20px'
                height='20px'
                mx={1}
              >
                <Image
                  src={country?.img || ''}
                  alt={country?.code}
                  height='100%'
                  width='100%'
                />
              </Box>
              <Typography
                data-testid='country-select-current'
                fontSize={18}
                fontWeight={400}
                color={theme?.palette?.ink?.['800']}
              >
                {`+${country?.phone}`}
              </Typography>
            </InputAdornment>
          )
        }}
        sx={{
          cursor: 'pointer'
        }}
      />
      <Box display={isOpen ? 'block' : 'none'}>
        <Menu
          data-testid='country-menu'
          anchorEl={menuRef.current}
          onClose={() => setOpen(false)}
          open={isOpen}
          sx={{ height: '200px' }}
        >
          {Countries.map((country: CountryType) => (
            <MenuItem
              key={country?.name}
              onClick={() => handleSelectCountry(country)}
            >
              <ListItemText>{`+${country?.phone} ${country?.code}`}</ListItemText>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Box>
  )
}

export { CountrySelect }
