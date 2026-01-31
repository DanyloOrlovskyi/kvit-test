import { SatelliteAlt } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

const EmptyMapView = () => {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.100',
      }}
    >
      <Box sx={{ textAlign: 'center', color: 'text.secondary' }}>
        <SatelliteAlt sx={{ fontSize: 48, opacity: 0.5, mb: 1 }} />
        <Typography>Немає об'єктів для відображення</Typography>
      </Box>
    </Box>
  );
};

export default EmptyMapView;
