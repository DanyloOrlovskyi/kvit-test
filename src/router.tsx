import { createBrowserRouter } from 'react-router';

import AppHeader from './components/AppHeader.tsx';
import AuthDialog from './components/AuthDialog';
import MapView from './components/MapView';
import Sidebar from './components/Sidebar';

import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router';
import { rootStore } from './stores';

const ProtectedLayout = observer(() => {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppHeader />

      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <MapView />
        <Sidebar />
      </Box>
    </Box>
  );
});

const AuthGuard = observer(() => {
  if (rootStore.auth.isAuthenticated) {
    return <Outlet />;
  }

  return <AuthDialog />;
});

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthGuard />,
    children: [
      {
        index: true,
        element: <ProtectedLayout />,
      },
    ],
  },
]);
