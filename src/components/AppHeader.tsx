import { Logout as LogoutIcon, Satellite } from '@mui/icons-material';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';

import { rootStore } from '@/stores';

export default function AppHeader() {
  const handleLogout = () => {
    rootStore.auth.logout();
  };

  return (
    <AppBar position="static" sx={{zIndex: 3}}>
      <Toolbar>
        <Satellite sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Object Tracker System
        </Typography>
        {rootStore.auth.isAuthenticated && (
          <Button sx={{ color: 'white' }} startIcon={<LogoutIcon />} onClick={handleLogout}>
            Вийти
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
