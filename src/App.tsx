import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router';

const App = observer(() => {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Outlet />
    </Box>
  );
});

export default App;
