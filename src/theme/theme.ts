import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#1976d2',
          light: '#42a5f5',
          dark: '#1565c0',
          contrastText: '#ffffff'
        },
        secondary: {
          main: '#dc004e',
          light: '#ff5983',
          dark: '#9a0036',
          contrastText: '#ffffff'
        },
        background: {
          default: '#f5f5f5',
          paper: '#ffffff'
        },
        text: {
          primary: '#212121',
          secondary: '#757575'
        },
        error: {
          main: '#f44336',
          light: '#e57373',
          dark: '#d32f2f',
          contrastText: '#ffffff'
        },
        warning: {
          main: '#ff9800',
          light: '#ffb74d',
          dark: '#f57c00',
          contrastText: '#000000'
        },
        success: {
          main: '#4caf50',
          light: '#81c784',
          dark: '#388e3c',
          contrastText: '#ffffff'
        }
      }
    },
    dark: {
      palette: {
        primary: {
          main: '#90caf9',
          light: '#e3f2fd',
          dark: '#42a5f5',
          contrastText: '#000000'
        },
        secondary: {
          main: '#f48fb1',
          light: '#fce4ec',
          dark: '#ad1457',
          contrastText: '#000000'
        },
        background: {
          default: '#121212',
          paper: '#1e1e1e'
        },
        text: {
          primary: '#ffffff',
          secondary: '#b0b0b0'
        },
        error: {
          main: '#f44336',
          light: '#e57373',
          dark: '#d32f2f',
          contrastText: '#ffffff'
        },
        warning: {
          main: '#ff9800',
          light: '#ffb74d',
          dark: '#f57c00',
          contrastText: '#000000'
        },
        success: {
          main: '#4caf50',
          light: '#81c784',
          dark: '#388e3c',
          contrastText: '#ffffff'
        }
      }
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      fontSize: '2rem'
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.25rem'
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43
    }
  },
  shape: {
    borderRadius: 8
  }
});

export default theme;