import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#4dabf5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#f50057',
    },
    mode: 'light',
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '3.5rem' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
  },
  status: {
    danger: '#d32f2f',
    success: '#2e7d32',
  },
});

export default theme;
