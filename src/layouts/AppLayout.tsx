import { Navigate, Outlet } from 'react-router';

import { AppHeader, Sidebar } from '@/components';

import { rootStore } from '@/stores';
import { Box, Drawer } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { DRAWER_WIDTH } from '@/constants';

const AppLayout = observer(() => {
  if (!rootStore.auth.isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppHeader />
      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden', zIndex: 2 }}>
        <Box
          sx={{
            flex: 1,
            transition: (theme) =>
              theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
            mr: rootStore.sidebar.isOpen ? 0 : 0,
            width: '100%',
          }}
        >
          <Outlet />
        </Box>
        <Drawer
          variant="persistent"
          anchor="right"
          open={rootStore.sidebar.isOpen}
          sx={{
            width: DRAWER_WIDTH,
            borderLeft: 1,
            borderColor: 'divider',
            overflow: 'hidden',
          }}
        >
          <Sidebar />
        </Drawer>
      </Box>
    </Box>
  );
});

export default AppLayout;
