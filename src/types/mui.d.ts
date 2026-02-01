import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
      success: string;
    };
  }

  interface ThemeOptions {
    status?: {
      danger: string;
      success: string;
    };
  }
}
