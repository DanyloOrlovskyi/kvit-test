import React from "react";
import AppHeader from "./components/AppHeader.tsx";

import Sidebar from "./components/Sidebar";
import MapView from "./components/MapView";
import AuthDialog from "./components/AuthDialog";

import { rootStore } from "./stores";
import { observer } from "mobx-react-lite";

import { Box } from "@mui/material";

const App: React.FC = observer(() => {
  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <AppHeader />

      {rootStore.auth.isAuthenticated ? (
        <Box sx={{ flex: 1, display: "flex", overflow: "hidden" }}>
          <MapView />
          <Sidebar
            activeObjects={rootStore.objectTracker.activeObjects}
            lostObjects={rootStore.objectTracker.lostObjects}
          />
        </Box>
      ) : (
        <AuthDialog />
      )}
    </Box>
  );
});

export default App;
