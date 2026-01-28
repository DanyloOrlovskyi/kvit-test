import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Logout as LogoutIcon, Satellite } from "@mui/icons-material";

import { rootStore } from "../stores";

export default function AppHeader() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Satellite sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Object Tracker System
        </Typography>
        {rootStore.auth.isAuthenticated && (
          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={rootStore.auth.logout}
          >
            Вийти
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
