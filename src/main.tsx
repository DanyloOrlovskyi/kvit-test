import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'leaflet/dist/leaflet.css';
import './styles/index.css';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme.ts';

import { RouterProvider } from 'react-router';
import { router } from './router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
