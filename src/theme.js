import { createTheme } from '@mui/material/styles';

// Custom keyframes for flip animation (used in FeatureList)
const flipIn = {
  '0%': { transform: 'rotateY(90deg)', opacity: 0 },
  '100%': { transform: 'rotateY(0deg)', opacity: 1 },
};

const theme = createTheme({
  palette: {
    // primary: { main: '#1976d2' },
    secondary: { main: '#9c27b0' },
    background: { default: '#fafafa', paper: '#fff' },
    text: { primary: '#000', secondary: '#7f7f7f' },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    fontSize: 14,
    h6: { fontWeight: 700 },
    body2: { fontSize: '0.95rem' },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid #ccc',
          borderRadius: 8,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize',
          borderRadius: 4,
          fontSize: '0.65rem',
          fontWeight: 500,
          px: 0.5,
          py: 0.5,
        },
        outlined: {
          backgroundColor: '#ebebeb',
          color: '#7f7f7f',
        },
        colorPrimary: {
          backgroundColor: 'white',
          color: 'black',
        },
        colorSecondary: {
          backgroundColor: 'white',
          color: 'black',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
        },
        circular: {
          borderRadius: '20%',
        },
      },
    },
    MuiBox: {
      // No direct styleOverrides, but Box uses theme values
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#00000099',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          boxSizing: 'border-box',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          zIndex: 1201,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          flexDirection: 'column',
          paddingTop: 16,
          paddingBottom: 16,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 0,
          marginBottom: 4,
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          textAlign: 'center',
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          width: '100%',
          height: 160,
          objectFit: 'cover',
        },
      },
    },
  },
  // Custom animations
  transitions: {
    flipIn,
  },
});

export default theme;
