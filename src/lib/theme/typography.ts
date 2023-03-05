import { createTheme } from '@mui/material/styles'
import { CSSProperties } from 'react'
import { breakpointValues } from './breakingPoints'

const themeFontFamily = {
  primary: ['Plus Jakarta Sans', 'sans-serif'].join(',')
}

const typographyTheme = createTheme({
  breakpoints: {
    values: breakpointValues
  }
})

const typographyValue = {
  T1XL: {
    fontFamily: themeFontFamily.primary,
    fontWeight: 'bold',
    letterSpacing: '-0.02rem',
    [typographyTheme.breakpoints.down('sm')]: {
      fontSize: '2.25rem',
      lineHeight: '100%'
    },
    [typographyTheme.breakpoints.up('sm')]: {
      fontSize: '3rem',
      lineHeight: '110%'
    },
    [typographyTheme.breakpoints.up('md')]: {
      fontSize: '4rem',
      lineHeight: '110%'
    }
  },
  T1: {
    fontFamily: themeFontFamily.primary,
    fontWeight: 'bold',
    letterSpacing: '-0.02rem',
    [typographyTheme.breakpoints.down('sm')]: {
      fontSize: '2rem',
      lineHeight: '100%'
    },
    [typographyTheme.breakpoints.up('sm')]: {
      fontSize: '2.5rem',
      lineHeight: '110%'
    },
    [typographyTheme.breakpoints.up('md')]: {
      fontSize: '3rem',
      lineHeight: '110%'
    }
  },
  T2: {
    fontFamily: themeFontFamily.primary,
    fontWeight: 'bold',
    letterSpacing: '-0.02rem',
    [typographyTheme.breakpoints.down('sm')]: {
      fontSize: '1.875rem',
      lineHeight: '100%'
    },
    [typographyTheme.breakpoints.up('sm')]: {
      fontSize: '2.25rem',
      lineHeight: '100%'
    },
    [typographyTheme.breakpoints.up('md')]: {
      fontSize: '2.5rem',
      lineHeight: '110%'
    }
  },
  T3: {
    fontFamily: themeFontFamily.primary,
    fontWeight: 'bold',
    lineHeight: '110%',
    [typographyTheme.breakpoints.down('sm')]: {
      fontSize: '1.75rem',
      letterSpacing: '-0.02rem'
    },
    [typographyTheme.breakpoints.up('sm')]: {
      fontSize: '1.75rem',
      letterSpacing: '-0.01rem'
    },
    [typographyTheme.breakpoints.up('md')]: {
      fontSize: '2.25rem',
      letterSpacing: '-0.02rem'
    }
  },
  T4: {
    fontFamily: themeFontFamily.primary,
    fontWeight: 'bold',
    lineHeight: '110%',
    [typographyTheme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
      letterSpacing: '-0.02rem'
    },
    [typographyTheme.breakpoints.up('sm')]: {
      fontSize: '1.5rem',
      letterSpacing: '-0.01rem'
    },
    [typographyTheme.breakpoints.up('md')]: {
      fontSize: '1.875rem',
      letterSpacing: '-0.02rem'
    }
  },
  T5: {
    fontFamily: themeFontFamily.primary,
    fontWeight: 'bold',
    lineHeight: '110%',
    [typographyTheme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
      letterSpacing: '-0.02rem'
    },
    [typographyTheme.breakpoints.up('sm')]: {
      fontSize: '1.5rem',
      letterSpacing: '-0.01rem'
    },
    [typographyTheme.breakpoints.up('md')]: {
      fontSize: '1.75rem',
      letterSpacing: '-0.02rem'
    }
  },
  T6: {
    fontFamily: themeFontFamily.primary,
    fontWeight: 'bold',
    lineHeight: '110%',
    [typographyTheme.breakpoints.down('sm')]: {
      fontSize: '1.25rem',
      letterSpacing: '-0.01rem'
    },
    [typographyTheme.breakpoints.up('sm')]: {
      fontSize: '1.25rem',
      letterSpacing: '-0.01rem'
    },
    [typographyTheme.breakpoints.up('md')]: {
      fontSize: '1.5rem',
      letterSpacing: '-0.02rem'
    }
  },
  T7: {
    fontFamily: themeFontFamily.primary,
    fontWeight: 'bold',
    lineHeight: '110%',
    [typographyTheme.breakpoints.down('sm')]: {
      fontSize: '1.125rem',
      letterSpacing: '-0.01rem'
    },
    [typographyTheme.breakpoints.up('sm')]: {
      fontSize: '1.125rem',
      letterSpacing: '-0.01rem'
    },
    [typographyTheme.breakpoints.up('md')]: {
      fontSize: '1.25rem',
      letterSpacing: '-0.02rem'
    }
  },
  Subtitle1: {
    fontFamily: themeFontFamily.primary,
    fontWeight: '500',
    [typographyTheme.breakpoints.down('sm')]: {
      fontSize: '1.25rem',
      lineHeight: '120%',
      letterSpacing: '-0.02rem'
    },
    [typographyTheme.breakpoints.up('sm')]: {
      fontSize: '1.375rem',
      lineHeight: '140%',
      letterSpacing: '-0.02rem'
    },
    [typographyTheme.breakpoints.up('md')]: {
      fontSize: '1.375rem',
      lineHeight: '125%',
      letterSpacing: '-0.03rem'
    }
  },
  Subtitle2: {
    fontFamily: themeFontFamily.primary,
    letterSpacing: '-0.01rem',
    fontWeight: '500',
    [typographyTheme.breakpoints.down('sm')]: {
      fontSize: '1.125rem',
      lineHeight: '130%'
    },
    [typographyTheme.breakpoints.up('sm')]: {
      fontSize: '1.25rem',
      lineHeight: '125%'
    },
    [typographyTheme.breakpoints.up('md')]: {
      fontSize: '1.25rem',
      lineHeight: '133%'
    }
  },
  Subtext1: {
    fontFamily: themeFontFamily.primary,
    fontWeight: 'normal',
    letterSpacing: '-0.01rem',
    [typographyTheme.breakpoints.down('sm')]: {
      fontSize: '1.125rem',
      lineHeight: '125%'
    },
    [typographyTheme.breakpoints.up('sm')]: {
      fontSize: '1.125rem',
      lineHeight: '125%'
    },
    [typographyTheme.breakpoints.up('md')]: {
      fontSize: '1.125rem',
      lineHeight: '155%'
    }
  },
  Subtext2: {
    fontFamily: themeFontFamily.primary,
    fontWeight: 'normal',
    lineHeight: '125%',
    [typographyTheme.breakpoints.down('sm')]: {
      fontSize: '0.875rem'
    },
    [typographyTheme.breakpoints.up('sm')]: {
      fontSize: '1rem',
      letterSpacing: '-0.01rem'
    },
    [typographyTheme.breakpoints.up('md')]: {
      fontSize: '1rem',
      letterSpacing: '-0.01rem'
    }
  },
  Subtext3: {
    fontFamily: themeFontFamily.primary,
    fontWeight: 'normal',
    lineHeight: '125%',
    [typographyTheme.breakpoints.down('sm')]: {
      fontSize: '0.75rem'
    },
    [typographyTheme.breakpoints.up('sm')]: {
      fontSize: '0.875rem',
      letterSpacing: '-0.01rem'
    },
    [typographyTheme.breakpoints.up('md')]: {
      fontSize: '0.875rem',
      letterSpacing: '-0.01rem'
    }
  },
  BodyText1: {
    fontFamily: themeFontFamily.primary,
    fontWeight: 'normal',
    lineHeight: '162%',
    [typographyTheme.breakpoints.down('sm')]: {
      fontSize: '1rem',
      letterSpacing: '-0.01rem'
    },
    [typographyTheme.breakpoints.up('sm')]: {
      fontSize: '1.125rem',
      letterSpacing: '-0.01rem'
    },
    [typographyTheme.breakpoints.up('md')]: {
      fontSize: '1.125rem'
    }
  },
  BodyText2: {
    fontFamily: themeFontFamily.primary,
    fontWeight: 'normal',
    lineHeight: '162%',
    [typographyTheme.breakpoints.down('sm')]: {
      fontSize: '0.875rem',
      letterSpacing: '-0.01rem'
    },
    [typographyTheme.breakpoints.up('sm')]: {
      fontSize: '1rem',
      letterSpacing: '-0.01rem'
    },
    [typographyTheme.breakpoints.up('md')]: {
      fontSize: '1rem'
    }
  },
  ButtonText1: {
    fontFamily: themeFontFamily.primary,
    fontWeight: 'bold',
    lineHeight: '100%',
    letterSpacing: '-0.01rem',
    [typographyTheme.breakpoints.down('sm')]: {
      fontSize: '1rem'
    },
    [typographyTheme.breakpoints.up('sm')]: {
      fontSize: '1.125rem'
    },
    [typographyTheme.breakpoints.up('md')]: {
      fontSize: '1.125rem'
    }
  },
  ButtonText2: {
    fontFamily: themeFontFamily.primary,
    fontWeight: 'bold',
    letterSpacing: '-0.01rem',
    [typographyTheme.breakpoints.down('sm')]: {
      fontSize: '0.875rem',
      lineHeight: '100%'
    },
    [typographyTheme.breakpoints.up('sm')]: {
      fontSize: '1rem',
      lineHeight: '110%'
    },
    [typographyTheme.breakpoints.up('md')]: {
      fontSize: '1rem',
      lineHeight: '110%'
    }
  },
  Caption1: {
    fontFamily: themeFontFamily.primary,
    fontWeight: 'normal',
    letterSpacing: '-0.01rem',
    [typographyTheme.breakpoints.down('sm')]: {
      fontSize: '0.75rem',
      lineHeight: '130%'
    },
    [typographyTheme.breakpoints.up('sm')]: {
      fontSize: '0.875rem',
      lineHeight: '100%'
    },
    [typographyTheme.breakpoints.up('md')]: {
      fontSize: '0.875rem',
      lineHeight: '130%'
    }
  },
  Caption2: {
    fontFamily: themeFontFamily.primary,
    fontWeight: 'normal',
    lineHeight: '130%',
    [typographyTheme.breakpoints.down('sm')]: {
      fontSize: '0.625rem'
    },
    [typographyTheme.breakpoints.up('sm')]: {
      fontSize: '0.75rem'
    },
    [typographyTheme.breakpoints.up('md')]: {
      fontSize: '0.75rem'
    }
  },
  Overline1: {
    fontFamily: themeFontFamily.primary,
    fontWeight: 'bold',
    textTransform: 'uppercase' as CSSProperties['textTransform'],
    letterSpacing: '0.1rem',
    [typographyTheme.breakpoints.down('sm')]: {
      fontSize: '0.75rem',
      lineHeight: '125%'
    },
    [typographyTheme.breakpoints.up('sm')]: {
      fontSize: '1rem',
      lineHeight: '100%'
    },
    [typographyTheme.breakpoints.up('md')]: {
      fontSize: '1rem',
      lineHeight: '110%'
    }
  },
  Overline2: {
    fontFamily: themeFontFamily.primary,
    fontWeight: 'bold',
    textTransform: 'uppercase' as CSSProperties['textTransform'],
    letterSpacing: '0.1rem',
    lineHeight: '125%',
    [typographyTheme.breakpoints.down('sm')]: {
      fontSize: '0.75rem'
    },
    [typographyTheme.breakpoints.up('sm')]: {
      fontSize: '0.875rem'
    },
    [typographyTheme.breakpoints.up('md')]: {
      fontSize: '0.875rem'
    }
  },

  Numeral1: {
    fontFamily: themeFontFamily.primary,
    fontWeight: 'normal',
    [typographyTheme.breakpoints.down('sm')]: {
      fontSize: '1rem',
      lineHeight: '1.25rem'
    },
    [typographyTheme.breakpoints.up('sm')]: {
      fontSize: '1.125rem',
      lineHeight: '1.75rem'
    },
    [typographyTheme.breakpoints.up('md')]: {
      fontSize: '1.125rem',
      lineHeight: '1.75rem'
    }
  },

  Numeral2: {
    fontFamily: themeFontFamily.primary,
    fontWeight: 'normal',
    [typographyTheme.breakpoints.down('sm')]: {
      fontSize: '0.875rem',
      lineHeight: '1rem'
    },
    [typographyTheme.breakpoints.up('sm')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem'
    },
    [typographyTheme.breakpoints.up('md')]: {
      fontSize: '1rem',
      lineHeight: '1.5rem'
    }
  },

  Numeral3: {
    fontFamily: themeFontFamily.primary,
    fontWeight: 'normal',
    [typographyTheme.breakpoints.down('sm')]: {
      fontSize: '0.75rem',
      lineHeight: '1rem'
    },
    [typographyTheme.breakpoints.up('sm')]: {
      fontSize: '0.875rem',
      lineHeight: '1.25rem'
    },
    [typographyTheme.breakpoints.up('md')]: {
      fontSize: '0.875rem',
      lineHeight: '1.25rem'
    }
  },
  Numeral4: {
    fontFamily: themeFontFamily.primary,
    fontWeight: 'normal',
    [typographyTheme.breakpoints.down('sm')]: {
      fontSize: '0.75rem',
      lineHeight: '1rem'
    },
    [typographyTheme.breakpoints.up('sm')]: {
      fontSize: '0.75rem',
      lineHeight: '1rem'
    },
    [typographyTheme.breakpoints.up('md')]: {
      fontSize: '0.75rem',
      lineHeight: '1rem'
    }
  }
}

export { typographyTheme, typographyValue, themeFontFamily }
