import { common } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

import { breakpointValues } from './breakingPoints'
import { themeColors } from './colors'
import { themeFontFamily, typographyValue } from './typography'

export const baseTheme = createTheme({
  breakpoints: {
    values: breakpointValues
  },
  typography: {
    fontFamily: themeFontFamily.primary,
    fontSize: 16,
    ...typographyValue
  },
  palette: {
    primary: {
      main: themeColors.orange[500]
    },
    secondary: {
      contrastText: common.white,
      main: themeColors.azure[500]
    },
    success: {
      contrastText: common.white,
      main: themeColors.lime[500]
    },
    warning: {
      contrastText: common.white,
      main: themeColors.lemon[500]
    },
    error: {
      contrastText: common.white,
      main: themeColors.grapefruit[500]
    },
    ...themeColors
  },
  shape: {
    borderRadius: 8
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
          boxShadow: 'none',
          '&:active': {
            boxShadow: 'none'
          },
          '&:hover': {
            boxShadow: 'none'
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          background: '#FFFFFF',
          paddingRight: '5px'
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: themeColors.ink[800]
        }
      },
      defaultProps: {
        variantMapping: {
          T1XL: 'h1',
          T1: 'h1',
          T2: 'h2',
          T3: 'h3',
          T4: 'h4',
          T5: 'h5',
          T6: 'h6',
          T7: 'h6',
          BodyText1: 'p',
          BodyText2: 'p'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderWidth: '2px',
          borderRadius: '8px',
          fontSize: '14px',
          color: themeColors.ink[800],
          minHeight: '50px',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: themeColors.orange[500]
          },
          '& input::-webkit-outer-spin-button': {
            WebkitAppearance: 'none',
            margin: 0
          },
          '& input::-webkit-inner-spin-button': {
            WebkitAppearance: 'none',
            margin: 0
          },
          '& input[type=number]': {
            MozAppearance: 'textfield'
          }
        },
        notchedOutline: {
          borderWidth: '2px',
          borderColor: themeColors.ink[200]
        }
      }
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: '8px'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          margin: 0,
          maxWidth: 'none'
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          margin: 0,
          maxWidth: 'auto'
        }
      }
    }
  }
})
