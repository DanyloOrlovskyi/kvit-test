import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'leaflet/dist/leaflet.css';
import './styles/index.css';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme.ts';

import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);
